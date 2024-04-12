import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
