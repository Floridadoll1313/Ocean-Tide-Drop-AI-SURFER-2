// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <--- Add this import

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

// Initialize Firebase Authentication <--- Add this line
const auth = getAuth(app);

// Export the initialized 'app', 'analytics', AND 'auth' so other files can use them
export { app, analytics, auth }; // <--- Update this export
