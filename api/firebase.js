// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB5pSQGJzQ_VENdZdTd8O3ftV5e_X8pLLo",
  authDomain: "juliens-gym-ab49c.firebaseapp.com",
  projectId: "juliens-gym-ab49c",
  storageBucket: "juliens-gym-ab49c.appspot.com",
  messagingSenderId: "1098321894467",
  appId: "1:1098321894467:web:29f217e4678411c97c08f6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const registerWithFirebase = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithFirebase = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
