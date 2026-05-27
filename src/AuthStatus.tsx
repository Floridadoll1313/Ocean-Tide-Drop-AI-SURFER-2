// src/AuthStatus.tsx
import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import the auth instance
import { User, onAuthStateChanged, signOut } from 'firebase/auth'; // Import specific auth functions

const AuthStatus: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This listener observes changes to the user's sign-in state.
    // It's crucial for knowing if a user is logged in or out.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <p>Loading authentication status...</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>You are not signed in. Please sign in to continue.</p>
        // Here you would typically have a link or button to your sign-in page
      )}
    </div>
  );
};

export default AuthStatus;
