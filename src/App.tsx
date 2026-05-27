// src/App.tsx (Updated for Google Sign-In)
import React from 'react';
import './App.css';
import AuthStatus from './AuthStatus';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import PasswordResetForm from './PasswordResetForm';
import GoogleSignInButton from './GoogleSignInButton'; // <--- Import GoogleSignInButton
import useAuthStatus from './hooks/useAuthStatus';

function App() {
  const { user, loading } = useAuthStatus();

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My Firebase App</h1>
        </header>
        <main>
          <p>Loading application...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Firebase App!</h1>
      </header>
      <main>
        <AuthStatus />

        {!user ? (
          <>
            <SignUpForm />
            <SignInForm />
            <GoogleSignInButton /> {/* <--- Render GoogleSignInButton */}
            <PasswordResetForm />
          </>
        ) : (
          <div style={{ marginTop: '30px', padding: '20px', border: '2px dashed green', borderRadius: '10px' }}>
            <h2>Protected Content</h2>
            <p>This content is only visible to authenticated users.</p>
            <p>You can put your main application features here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
