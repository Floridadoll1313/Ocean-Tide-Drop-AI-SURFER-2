// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi-h1ccOtyFq3h2uWq037pPiE76fX4wNk",
  authDomain: "otdaisurfer-org.firebaseapp.com",
  projectId: "otdaisurfer-org",
  storageBucket: "otdaisurfer-org.firebasestorage.app",
  messagingSenderId: "534903080702",
  appId: "1:534903080702:web:b392690ad1468185d987af",
  measurementId: "G-HGSEPKW1L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
