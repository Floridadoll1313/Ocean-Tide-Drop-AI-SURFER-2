// src/AuthStatus.tsx
import React from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import useAuthStatus from './hooks/useAuthStatus'; // Import the custom hook

const AuthStatus: React.FC = () => {
  const { user, loading } = useAuthStatus(); // Use the custom hook

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
        <p>You are not signed in.</p>
      )}
    </div>
  );
};

export default AuthStatus;
