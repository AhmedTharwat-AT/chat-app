import { auth, db } from "../services/firebase";
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

export async function getUser(): Promise<any> {
  const currUser = auth.currentUser;

  if (!currUser) throw new Error("User is logged out!");

  const docRef = doc(db, "users", currUser.uid);
  const userData = await getDoc(docRef);

  if (!userData.exists()) throw new Error("no user data in data base!");

  const data = userData.data();

  return { ...data, uid: currUser.uid };
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
  }

  return room;
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
