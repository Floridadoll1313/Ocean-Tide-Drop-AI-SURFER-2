// src/GoogleSignInButton.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { auth, googleProvider } from './firebase';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const GoogleSignInButton: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading status
  const navigate = useNavigate(); // Initialize the navigate hook for redirection

  const handleGoogleSignIn = async () => {
    setError(null);       // Clear any previous errors
    setIsLoading(true);   // Set loading to true when the sign-in process begins

    try {
      const userCredential: UserCredential = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In successful:', userCredential.user);

      // --- Cloud Firestore Integration ---
      // This saves or updates user data in Firestore after a successful login
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

      // Redirect the user to the dashboard after successful sign-in and data save
      navigate('/dashboard');

    } catch (err: any) {
      console.error('Error during Google Sign-In:', err);
      // Display a user-friendly error message
      setError(err.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false); // Always set loading to false when the process finishes (success or error)
    }
  };

  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      {/* Display error message if present */}
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</p>}

      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading} // Disable the button while loading to prevent multiple clicks
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isLoading ? 'not-allowed' : 'pointer', // Change cursor for visual feedback
          backgroundColor: '#4285F4', // Google blue
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          margin: '0 auto',
          opacity: isLoading ? 0.7 : 1, // Reduce opacity during loading
          transition: 'opacity 0.2s ease-in-out', // Smooth transition for opacity
        }}
      >
        {isLoading ? (
          // Show "Signing In..." text when loading
          'Signing In...'
        ) : (
          // Show default button content when not loading
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google logo"
              style={{ width: '20px', height: '20px' }}
            />
            Sign in with Google
          </>
        )}
      </button>
    </div>
  );
};

export default GoogleSignInButton;
