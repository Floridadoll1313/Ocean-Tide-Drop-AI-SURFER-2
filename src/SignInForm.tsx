// src/SignInForm.tsx
import React, { useState } from 'react';
import { auth } from './firebase'; // Import the auth instance you exported from firebase.ts
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase function for signing in

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the browser's default form submission behavior
    setError(null);    // Clear any previous errors
    setSuccess(null);  // Clear any previous success messages

    try {
      // Call the Firebase function to sign in a user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      setSuccess('Sign in successful! You are now logged in.');
      setEmail('');      // Clear the email field
      setPassword('');   // Clear the password field
    } catch (err: any) {
      // Catch and display any errors during the sign-in process
      console.error('Error signing in:', err.message);
      setError(err.message); // Display the Firebase error message to the user
    }
  };

  return (
    <form onSubmit={handleSignIn} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email-signin" // Give a unique ID if both forms are on the same page
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginLeft: '10px', padding: '5px', width: 'calc(100% - 70px)' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password-signin" // Give a unique ID
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginLeft:
