// src/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import getAuth and GoogleAuthProvider
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// Your web app's Firebase configuration (copied directly from your project settings)
const firebaseConfig = {
  apiKey: "AIzaSyDi-h1ccOtyFq3h2uWq037pPiE76fX4wNk",
  authDomain: "otdaisurfer-org.firebaseapp.com",
  projectId: "otdaisurfer-org",
  storageBucket: "otdaisurfer-org.firebasestorage.app",
  messagingSenderId: "534903080702",
  appId: "1:534903080702:web:b392690ad1468185d987af",
  measurementId: "G-HGSEPKW1L4"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore
const db = getFirestore(app);

// Export all initialized services and providers
export { app, analytics, auth, googleProvider, db };
