// src/SignUpForm.tsx
import React, { useState } from 'react';
import { auth } from './firebase'; // Import the auth instance you exported from firebase.ts
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase function for signing up

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the browser's default form submission behavior
    setError(null);    // Clear any previous errors
    setSuccess(null);  // Clear any previous success messages

    try {
      // Call the Firebase function to create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      setSuccess('Sign up successful! You are now logged in.');
      setEmail('');      // Clear the email field
      setPassword('');   // Clear the password field
    } catch (err: any) {
      // Catch and display any errors during the sign-up process
      console.error('Error signing up:', err.message);
      setError(err.message); // Display the Firebase error message to the user
    }
  };

  return (
    <form onSubmit={handleSignUp} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
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
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginLeft: '10px', padding: '5px', width: 'calc(100% - 90px)' }}
        />
      </div>
      <button type="submit" style={{ marginTop: '15px', padding: '8px 15px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
