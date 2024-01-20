import { auth, db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import users from "../data/users.json";

export async function getUser() {
  const currUser = auth.currentUser;

  if (!currUser) throw new Error("User is logged out!");

  const docRef = doc(db, "users", currUser.uid);
  const userData = await getDoc(docRef);

  if (!userData.exists()) throw new Error("no user data in data base!");

  return { ...userData.data(), uid: currUser.uid };
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

export async function initUsers() {
  const data = Object.entries(users);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    await setDoc(doc(db, "users", data[i][0]), data[i][1]);
  }
}
