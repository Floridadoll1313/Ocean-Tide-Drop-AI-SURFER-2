import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDna4Fq9NSezv-i7AiBWZLmN6ttdP7G25I",
  authDomain: "gen-lang-client-0228089257.firebaseapp.com",
  projectId: "gen-lang-client-0228089257",
  storageBucket: "gen-lang-client-0228089257.firebasestorage.app",
  messagingSenderId: "769231987436",
  appId: "1:769231987436:web:8abb6183685fa9bcd07bc9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
