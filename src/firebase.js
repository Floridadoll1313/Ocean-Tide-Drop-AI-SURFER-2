// src/firebase.js
import { initializeApp } from "firebase/app";
// This line imports the Firestore database tool
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDna4Fq9NSezv-i7AiBWZLmN6ttdP7G25I",
  authDomain: "gen-lang-client-0228089257.firebaseapp.com",
  projectId: "gen-lang-client-0228089257",
  storageBucket: "gen-lang-client-0228089257.firebasestorage.app",
  messagingSenderId: "769231987436",
  appId: "1:769231987436:web:8abb6183685fa9bcd07bc9"
};

// Initialize the core app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it so your other files can see it
export const db = getFirestore(app);
