// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIhbw-3oEWqExMLqG8YMEY8P7iX_WZWPM",
  authDomain: "login-register-app-12095.firebaseapp.com",
  projectId: "login-register-app-12095",
  storageBucket: "login-register-app-12095.appspot.com",
  messagingSenderId: "570686833107",
  appId: "1:570686833107:web:1c91efaa6a4f1cc9fa2f26"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export default app;