import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDpV3sdByDKzPnkL0bFG4Xf0P6EjA9pPyU",
  authDomain: "blackhand-corp.firebaseapp.com",
  projectId: "blackhand-corp",
  storageBucket: "blackhand-corp.appspot.com",
  messagingSenderId: "65791443538",
  appId: "1:65791443538:web:4210302847bef63fb6558b",
  measurementId: "G-9BX006QPNP"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);