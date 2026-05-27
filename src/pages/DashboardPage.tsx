// src/pages/DashboardPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // To show current user info

const DashboardPage: React.FC = () => {
  const currentUser = auth.currentUser;
  return (
    <div style={{ padding: '20px', textAlign: 'center', border: '2px solid purple', borderRadius: '8px' }}>
      <h2>Welcome to Your Dashboard!</h2>
      {currentUser && <p>You are logged in as: <strong>{currentUser.email || currentUser.displayName}</strong></p>}
      <p>This content is only visible to authenticated users.</p>
      <p>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
          Go back to Home
        </Link>
      </p>
    </div>
  );
};

export default DashboardPage;
