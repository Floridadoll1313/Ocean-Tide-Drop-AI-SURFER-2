// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <--- Add GoogleAuthProvider
import { getFirestore } from "firebase/firestore"; // <--- Add getFirestore for later

// Your web app's Firebase configuration
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

// Initialize Analytics (if you're using it)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider <--- Add this
const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore <--- Add this for later
const db = getFirestore(app);

// Export all initialized services and providers
export { app, analytics, auth, googleProvider, db }; // <--- Update this export
