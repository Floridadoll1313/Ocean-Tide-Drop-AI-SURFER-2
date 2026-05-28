// src/AuthStatus.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { auth } from './firebase'; // Import the auth object for signOut
import { signOut } from 'firebase/auth'; // Import signOut function
import useAuthStatus from './hooks/useAuthStatus'; // Import your custom hook

const AuthStatus: React.FC = () => {
  const { user, loading } = useAuthStatus(); // Use the custom hook to get user and loading state
  const navigate = useNavigate(); // Initialize the navigate hook for redirection

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully!');
      // Redirect to a public page after signing out, e.g., the authentication page
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.'); // Provide user feedback for sign-out errors
    }
  };

  if (loading) {
    // Show a loading message while the authentication status is being determined
    return <div style={{ color: 'white' }}>Checking authentication status...</div>;
  }

  return (
    <div style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
      {user ? (
        // If a user is signed in
        <>
          {/* Display user's display name or email */}
          <span style={{ fontSize: '0.9em' }}>
            Welcome, {user.displayName || user.email}!
          </span>
          {/* Display user's photo if available */}
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User Avatar"
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
          )}
          <button
            onClick={handleSignOut}
            style={{
              padding: '8px 15px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: '#dc3545', // Bootstrap's danger color for sign out
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease', // Smooth hover effect
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        // If no user is signed in
        <span style={{ fontSize: '0.9em' }}>You are not signed in.</span>
      )}
    </div>
  );
};

export default AuthStatus;
