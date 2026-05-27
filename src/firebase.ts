// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration, using the provided details
const firebaseConfig = {
  apiKey: "AIzaSyB-ESc7O76NImSsdspCWIP6zygLwuWkDm0", // Updated API Key
  authDomain: "otd-ai-surfer.firebaseapp.com",
  projectId: "otd-ai-surfer",
  storageBucket: "otd-ai-surfer.firebasestorage.app",
  messagingSenderId: "46473040430",
  appId: "1:46473040430:web:8438a456c93831be0605bf",
  // If you are using analytics, you might have a measurementId here as well
  // measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Analytics (if you're using it)
// Be aware that getAnalytics might throw an error if the measurementId is missing
// or if it's not correctly set up in the Firebase Console for this app.
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore
const db = getFirestore(app);

// Export all initialized services and providers
export { app, analytics, auth, googleProvider, db };
