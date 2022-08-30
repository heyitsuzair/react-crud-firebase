// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "crud-92de0.firebaseapp.com",
  projectId: "crud-92de0",
  storageBucket: "crud-92de0.appspot.com",
  messagingSenderId: "227954006660",
  appId: "1:227954006660:web:887dc7932be82df58c40d1",
  measurementId: "G-ZFD6XZLHTX",
};

// Initialize Firebase
//eslint-disable-next-line
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
