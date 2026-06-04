// src/firebase.js
import { initializeApp } from "firebase/app";

// === STEP 2: Your actual Firebase configuration ===
const firebaseConfig = {
  apiKey: "AIzaSyDna4Fq9NSezv-i7AiBWZLmN6ttdP7G25I",
  authDomain: "gen-lang-client-0228089257.firebaseapp.com",
  projectId: "gen-lang-client-0228089257",
  storageBucket: "gen-lang-client-0228089257.firebasestorage.app",
  messagingSenderId: "769231987436",
  appId: "1:769231987436:web:8abb6183685fa9bcd07bc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// === STEP 3: Add your services below this line ===
// For example, if you want to use Firestore database:
import { getFirestore } from 'firebase/firestore';
export const db = getFirestore(app); 

// Or if you want to use Authentication:
// import { getAuth } from 'firebase/auth';
// export const auth = getAuth(app);
