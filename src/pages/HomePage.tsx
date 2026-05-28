// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Welcome to the Public Home Page!</h2>
      <p>Anyone can see this page.</p>
      <p>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#007bff' }}>
          Go to Dashboard (Protected)
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
