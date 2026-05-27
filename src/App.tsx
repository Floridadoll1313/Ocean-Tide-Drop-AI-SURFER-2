// src/App.tsx
import React from 'react';
import './App.css';
import AuthStatus from './AuthStatus';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm'; // <--- Import the SignInForm component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Firebase App!</h1>
      </header>
      <main>
        {/* The AuthStatus component will show if a user is logged in or out */}
        <AuthStatus />

        {/* The SignUpForm component allows new users to register */}
        <SignUpForm />

        {/* The SignInForm component allows existing users to log in */}
        <SignInForm /> {/* <--- Render the SignInForm component here */}

        {/* Other parts of your application will go below here */}
      </main>
    </div>
  );
}

export default App;
