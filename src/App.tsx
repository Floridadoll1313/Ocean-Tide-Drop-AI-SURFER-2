// src/App.tsx
import React from 'react';
import './App.css';
import AuthStatus from './AuthStatus';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import PasswordResetForm from './PasswordResetForm'; // <--- Import the PasswordResetForm component
import useAuthStatus from './hooks/useAuthStatus'; // <--- Import the custom hook

function App() {
  const { user, loading } = useAuthStatus(); // Use the custom hook here

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
        {/* Always show AuthStatus */}
        <AuthStatus />

        {/* Conditional Rendering: Show forms only if user is NOT logged in */}
        {!user ? (
          <>
            <SignUpForm />
            <SignInForm />
            <PasswordResetForm />
          </>
        ) : (
          // Conditional Rendering: Show protected content if user IS logged in
          <div style={{ marginTop: '30px', padding: '20px', border: '2px dashed green', borderRadius: '10px' }}>
            <h2>Protected Content</h2>
            <p>This content is only visible to authenticated users.</p>
            <p>You can put your main application features here.</p>
          </div>
        )}

        {/* Other parts of your application */}
      </main>
    </div>
  );
}

export default App;
