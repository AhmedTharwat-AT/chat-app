import { auth, db, provider, rtdb } from "../services/firebase";
import {
  addDoc,
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
import { signInWithPopup } from "firebase/auth";
import { SignData } from "../features/authentication/SignupForm";
import {
  getStorage,
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const storage = getStorage();

export async function getUser() {
  try {
    const currUser = auth.currentUser;
    if (!currUser) throw new Error("User is logged out!");

    const docRef = doc(db, "users", currUser.uid);
    const userData = await getDoc(docRef);
    if (!userData.exists()) throw new Error("no user data in database!");
    const data = userData.data();

    setUserStatus(currUser.uid, "online");

    return { ...data };
  } catch (err) {
    console.log(err);
  }
}

export async function googleSignIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      //add the user to firestore if its first time signing in
      signUp({ username: user.displayName, email: user.email });
    })
    .catch((error) => {
      console.log("Error signing in :", error);
    });
}

export async function signUp(data: SignData) {
  const currUser = auth.currentUser;
  if (!currUser) throw new Error("User is logged out!");

  //check if user data already exists in firestore
  const docRef = doc(db, "users", currUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return;

  await setDoc(docRef, {
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
  onDisconnect(statusRef).set({ status: "offline" });
}
//

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
  }

  return details;
}

// messages
export async function sendMessage({ roomId, data }: any) {
  const messagesRef = collection(db, "rooms", roomId, "messages");
  await addDoc(messagesRef, data);
  return null;
}

//

export async function searchUsers(value: string) {
  if (!value) return;
  const currUser = auth.currentUser;

  const q = query(
    collection(db, "users"),
    where("name", ">=", value),
    where("name", "<=", value + "\uf8ff"),
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) throw new Error("no matching users with this name.");

  let data: any[] = [];
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    if (currUser?.uid != user.uid) data.push(user);
  });

  return data;
}

export async function addFriend({ friend, user }: any) {
  const batch = writeBatch(db);

  let data = [friend, user];
  //create new room
  const roomRef = await addDoc(collection(db, "rooms"), {
    createdAt: +new Date() + "",
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

export async function addGroupMember({ room, member }: any) {
  const batch = writeBatch(db);
  // 1) add member to the group
  const groupRef = doc(db, "rooms", room.id, "members", member.uid);
  batch.set(groupRef, {
    name: member.name,
    id: member.uid,
    photo: member.photo,
  });

  // 2) add group to the member
  const memberRef = doc(db, "users", member.uid);
  batch.update(memberRef, {
    [`groups.${room.id}`]: {
      name: room.name,
      photo: room.photo,
      room: room.id,
    },
  });

  await batch.commit();
}

export async function createGroup({ details, user }: any) {
  // 1) upload photo
  const fileName = `${user.uid}-${crypto.randomUUID()}`;
  const reference = storageRef(storage, "images/" + fileName);
  await uploadBytes(reference, details.photo["0"], {
    contentType: "image/jpeg",
  });
  const photoUrl = await getDownloadURL(reference);

  // 2) create new room
  const roomRef = await addDoc(collection(db, "rooms"), {
    ...details, //description , name , photo
    photo: photoUrl,
    createdAt: +new Date() + "",
    type: "group",
  });

  const batch = writeBatch(db);

  // 3) add member to a room
  const membersRef = doc(db, "rooms", roomRef.id, "members", user.uid);
  batch.set(membersRef, {
    id: user.uid,
    name: user.name,
    photo: user.photo,
  });

  // 4) add room to the user
  batch.update(doc(db, "users", user.uid), {
    [`groups.${roomRef.id}`]: {
      name: details.name,
      photo: photoUrl,
      room: roomRef.id,
    },
  });

  await batch.commit();
}

//edit user data

async function deleteImage(name: string) {
  if (name.includes("firebasestorage.googleapis.com")) {
    const deleteRef = storageRef(storage, `${name}`);
    await deleteObject(deleteRef);
  }
}

export async function updateUserProperty(
  id: string,
  property: string,
  value: string,
) {
  await updateDoc(doc(db, "users", id), {
    [property]: value,
  });
}

//update profile or cover image
export async function updateImage(
  file: File,
  user: any,
  type: "photo" | "cover",
) {
  const fileName = `${user.uid}-${crypto.randomUUID()}`;
  const reference = storageRef(storage, "images/" + fileName);
  const metadata = {
    contentType: "image/jpeg",
  };
  // 1) delete old photo from storage
  await deleteImage(user[type]);
  // 2) Upload the file and metadata and get cover url
  await uploadBytes(reference, file, metadata);
  const url = await getDownloadURL(reference);
  // 3) update cover in user doc
  await updateDoc(doc(db, "users", user.uid), {
    [type]: url,
  });
  return url;
}

export async function updatePhoto(file: File, user: any) {
  const url = await updateImage(file, user, "photo");
  // 4) update photo in each friend's friends list
  const friends = Object.keys(user.friends);
  if (friends.length > 0) {
    for (let i = 0; i < friends.length; i++) {
      await updateUserProperty(friends[i], `friends.${user.uid}.photo`, url);
    }
  }
  // 5) update in each room members sub collection
  const friendsRooms = Object.values(user.friends).map((el: any) => el.room);
  const groups = Object.keys(user.groups);
  const rooms = [...groups, ...friendsRooms];
  if (rooms.length > 0) {
    for (let i = 0; i < rooms.length; i++) {
      await updateDoc(doc(db, "rooms", rooms[i], "members", user.uid), {
        photo: url,
      });
    }
  }
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
