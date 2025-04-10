import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHmkYzvAchNC-IL4bSElCEGt2GlMCerCk",
  authDomain: "prepagent-2d5ba.firebaseapp.com",
  projectId: "prepagent-2d5ba",
  storageBucket: "prepagent-2d5ba.firebasestorage.app",
  messagingSenderId: "1068265938050",
  appId: "1:1068265938050:web:eb4f28ff72b36e3778a89b",
  measurementId: "G-WTH25GR939"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);