import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbKg4xpu5w1S4xmV_n0tkVwalYSum5lRA",
  authDomain: "fixyli.firebaseapp.com",
  projectId: "fixyli",
  storageBucket: "fixyli.appspot.com",
  messagingSenderId: "172856667882",
  appId: "1:172856667882:web:6750c5b3a4dc5be8b6b193",
  measurementId: "G-RYGZG6M3CK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
