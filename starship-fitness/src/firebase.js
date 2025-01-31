
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq-55f7ErqlM6J4lC41heXMwl1owwJOl4",
  authDomain: "starship-fitness.firebaseapp.com",
  projectId: "starship-fitness",
  storageBucket: "starship-fitness.appspot.com",
  messagingSenderId: "427197669921",
  appId: "1:427197669921:web:ec0aa38d5ce18a95537960",
  measurementId: "G-DW3WJS7R4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db };