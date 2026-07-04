// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2AHOe8omkWjY6vUZK2k1cmpgjCdNpBf0",
  authDomain: "expense-tracker-8c75a.firebaseapp.com",
  projectId: "expense-tracker-8c75a",
  storageBucket: "expense-tracker-8c75a.firebasestorage.app",
  messagingSenderId: "358717970865",
  appId: "1:358717970865:web:6020666737e2c32c33c590",
  measurementId: "G-LFL3RVHY0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);