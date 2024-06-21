// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD16Rb3LNsr6rR-PSbkD90r6QYjRRtuIzM",
  authDomain: "foody-app-2.firebaseapp.com",
  projectId: "foody-app-2",
  storageBucket: "foody-app-2.appspot.com",
  messagingSenderId: "878164704184",
  appId: "1:878164704184:web:095b4db3a8e13c1c3ded4d"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fileStorage = getStorage(app);
