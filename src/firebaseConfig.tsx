// src/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Correct Firebase config
const firebaseConfig = {

   apiKey: "AIzaSyBq95t2CVAitIcKJEYxzLoSF0pXqO_1KBs",
  authDomain: "darrangcollege-e66d0.firebaseapp.com",
  projectId: "darrangcollege-e66d0",
 storageBucket: "darrangcollege-e66d0.appspot.com",
  messagingSenderId: "319181508945",
  appId: "1:319181508945:web:623f69cf1a9ae91d34c370",
  measurementId: "G-Y9YEDYR3VQ"
};

// ✅ Initialize only once
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ✅ Export the same auth instance everywhere
export const auth = getAuth(app);
export default app;
