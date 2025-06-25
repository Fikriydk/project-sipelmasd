// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC09ivtmDnWs2NJh6G6tMG4fC9K4zEtBSs",
  authDomain: "sipelmasd-1169c.firebaseapp.com",
  projectId: "sipelmasd-1169c",
  storageBucket: "sipelmasd-1169c.firebasestorage.app",
  messagingSenderId: "17335400044",
  appId: "1:17335400044:web:e2eccbbcc7fcb15e408a49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);