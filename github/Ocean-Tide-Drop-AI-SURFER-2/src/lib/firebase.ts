import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Core services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google OAuth
export const googleProvider = new GoogleAuthProvider();

// ⚠️ Keep scopes lean for stability
googleProvider.addScope("https://www.googleapis.com/auth/drive");
googleProvider.addScope("https://www.googleapis.com/auth/documents");
googleProvider.addScope("https://www.googleapis.com/auth/spreadsheets");

// OPTIONAL: only add these if absolutely needed
// googleProvider.addScope("https://www.googleapis.com/auth/calendar");

export { signInWithPopup, signOut };

export default app;