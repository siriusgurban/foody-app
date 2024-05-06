// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3KKXVNS_KXlGwzNrG57jprl1VbnBMOFA",
  authDomain: "foody-app-f27a2.firebaseapp.com",
  databaseURL: "https://foody-app-f27a2-default-rtdb.firebaseio.com",
  projectId: "foody-app-f27a2",
  storageBucket: "foody-app-f27a2.appspot.com",
  messagingSenderId: "16200119693",
  appId: "1:16200119693:web:e2da7d58be71411401f9c4"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fileStorage = getStorage(app);
