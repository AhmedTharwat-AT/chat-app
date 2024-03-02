import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore, memoryLocalCache } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = import.meta.env.VITE_API_KEY;
const authDomain = import.meta.env.VITE_authDomain;
const projectId = import.meta.env.VITE_projectId;
const storageBucket = import.meta.env.VITE_storageBucket;
const messagingSenderId = import.meta.env.VITE_messagingSenderId;
const appId = import.meta.env.VITE_appId;
const measurementId = import.meta.env.VITE_measurementId;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  databaseURL:
    "https://chat-app-a45e8-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
});
const rtdb = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { app, db, auth, rtdb, provider, analytics };
