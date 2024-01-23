import { auth, db, rtdb } from "../services/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import users from "../data/users.json";
import rooms from "../data/rooms.json";
import { onDisconnect, ref, set } from "firebase/database";

export async function getUser(): Promise<any> {
  const currUser = auth.currentUser;
  if (!currUser) throw new Error("User is logged out!");

  try {
    const docRef = doc(db, "users", currUser.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("no user data in database!");
    const data = userData.data();

    setUserStatus(currUser.uid, "online");

    const statusRef = ref(rtdb, "users/" + currUser.uid + "/status");
    onDisconnect(statusRef).set("offline");

    return { ...data, uid: currUser.uid };
  } catch (err) {
    console.log(err);
    throw new Error(err + "");
  }
}

export async function signUp(data: any) {
  const currUser = auth.currentUser;
  if (!currUser) throw new Error("User is logged out!");

  await setDoc(doc(db, "users", currUser.uid), {
    uid: currUser.uid,
    name: data.username,
    email: data.email,
    bio: "",
    about: "",
    photo: "",
    cover: "",
    friends: {},
    groups: {},
  });
}

// realtime db

export async function setUserStatus(id: string, status: string) {
  const statusRef = ref(rtdb, "users/" + id);
  set(statusRef, { status });
}

//

export async function addMember({
  room,
  member,
}: {
  room: string;
  member: { name: string; id: string; photo: string };
}) {
  const ref = collection(db, "rooms", room, "members");
  await addDoc(ref, member);
}

export async function getMembers(room: string = "RR1") {
  const ref = collection(db, "rooms", room, "members");
  const querySnapshot = await getDocs(ref);
  let data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
}

interface RoomType {
  [key: string]: string;
}

export async function getRoom(roomId: string) {
  const docRef = doc(db, "rooms", roomId);
  const docSnap = await getDoc(docRef);
  let room: RoomType | undefined;

  if (docSnap.exists()) {
    room = docSnap.data();
  } else {
    console.log("No such document!");
    throw new Error("Failed to load room data!");
  }

  return room;
}

export async function getUserDetails(id: string) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  let details: any;

  if (docSnap.exists()) {
    details = docSnap.data();
  } else {
    console.log("No such document!");
    throw new Error("Failed to fetch info!");
  }

  return details;
}

// messages
export async function sendMessage({ roomId, data }: any) {
  const messagesRef = collection(db, "rooms", roomId, "messages");

  await addDoc(messagesRef, data);

  return null;
}

export async function getMessages(roomId: any) {
  const messagesRef = collection(db, "rooms", roomId, "messages");

  const querySnapshot = await getDocs(messagesRef);

  let messages: any[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    messages.push(doc.data());
  });

  return messages;
}
//

export async function searchUsers(value: string) {
  if (!value) return;
  const q = query(
    collection(db, "users"),
    where("name", ">=", value),
    where("name", "<=", value + "\uf8ff"),
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) throw new Error("No matching doc.");

  let data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
}

export async function addFriend({ friend, user }: any) {
  const batch = writeBatch(db);

  let data = [friend, user];

  //create new room
  const roomRef = await addDoc(collection(db, "rooms"), {
    createdAt: +new Date() + "",
    messages: [],
    type: "private",
  });

  data.forEach((el, i, arr) => {
    //add a memeber to the room
    const membersRef = doc(collection(db, "rooms", roomRef.id, "members"));
    batch.set(membersRef, { id: el.uid, name: el.name, photo: el.photo });

    //add users to each other friend list
    const val = i == 0 ? 1 : 0;
    const userRef = doc(db, "users", el.uid);
    batch.update(userRef, {
      [`friends.${arr[val].uid}`]: {
        friend_id: arr[val].uid,
        name: arr[val].name,
        photo: arr[val].photo,
        room: roomRef.id,
      },
    });
  });
  await batch.commit();
}

// seeding
export async function initUsers() {
  const data = Object.entries(users);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    await setDoc(doc(db, "users", data[i][0]), data[i][1]);
  }
}

export async function initRooms() {
  const data = Object.entries(rooms);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    await setDoc(doc(db, "rooms", data[i][0]), data[i][1]);
  }
}
