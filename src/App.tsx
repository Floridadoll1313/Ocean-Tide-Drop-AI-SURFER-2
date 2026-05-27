// src/App.tsx
import React from 'react';
import './App.css'; // Assuming you have an App.css file
import AuthStatus from './AuthStatus'; // Import the AuthStatus component
import SignUpForm from './SignUpForm'; // Import the SignUpForm component

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

        {/* You can add a SignInForm component here later if you create one */}
        {/* <SignInForm /> */}

        {/* Other parts of your application will go below here */}
      </main>
    </div>
  );
}

export default App;
