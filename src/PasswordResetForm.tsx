// src/PasswordResetForm.tsx
import React, { useState } from 'react';
import { auth } from './firebase'; // Import the auth instance
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the password reset function

const PasswordResetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox (and spam folder).');
      setEmail('');
    } catch (err: any) {
      console.error('Error sending password reset email:', err.message);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handlePasswordReset} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Forgot Password?</h2>
      <p>Enter your email to receive a password reset link.</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <div>
        <label htmlFor="reset-email">Email:</label>
        <input
          type="email"
          id="reset-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginLeft: '10px', padding: '5px', width: 'calc(100% - 70px)' }}
        />
      </div>
      <button type="submit" style={{ marginTop: '15px', padding: '8px 15px', cursor: 'pointer', backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '4px' }}>Reset Password</button>
    </form>
  );
};

export default PasswordResetForm;
