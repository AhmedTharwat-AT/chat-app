import { auth, db, rtdb } from "../services/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
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
    name: data.username,
    email: data.email,
    bio: "",
    about: "",
    photo: "",
    cover: "",
    friends: {},
    groups: {},
    state: "active",
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
  member: { name: string; id: string };
}) {
  const ref = collection(db, "rooms", room, "members");
  await addDoc(ref, member);
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

export async function sendMessage({ roomId, data }: any) {
  const docRef = doc(db, "rooms", roomId);

  await updateDoc(docRef, {
    messages: arrayUnion(data),
  });

  return null;
}

// test
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
