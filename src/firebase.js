// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy2YyAE1uzK2WxhSU2ASqBfNNmmxZHRts",
  authDomain: "task-app-fc85c.firebaseapp.com",
  projectId: "task-app-fc85c",
  storageBucket: "task-app-fc85c.appspot.com",
  messagingSenderId: "22638326200",
  appId: "1:22638326200:web:77896d8c975408e9615f4d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
