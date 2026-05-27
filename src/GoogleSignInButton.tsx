// src/GoogleSignInButton.tsx
import React, { useState } from 'react';
import { auth, googleProvider } from './firebase'; // Import auth and googleProvider
import { signInWithPopup, UserCredential } from 'firebase/auth'; // Import signInWithPopup
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions for later
import { db } from './firebase'; // Import db for later

const GoogleSignInButton: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const userCredential: UserCredential = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In successful:', userCredential.user);

      // --- Cloud Firestore Integration (for Part 3) ---
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        createdAt: userCredential.user.metadata.creationTime,
        lastLoginAt: userCredential.user.metadata.lastSignInTime,
      }, { merge: true }); // Use merge:true to update if exists, create if not
      console.log('User data saved to Firestore.');
      // --- End Cloud Firestore Integration ---

    } catch (err: any) {
      console.error('Error during Google Sign-In:', err);
      // Handle specific errors, e.g., 'auth/popup-closed-by-user'
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button
        onClick={handleGoogleSignIn}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4285F4', // Google blue
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          margin: '0 auto',
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
          alt="Google logo"
          style={{ width: '20px', height: '20px' }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;
