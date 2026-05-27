// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus'; // Import your custom hook

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuthStatus();

  if (loading) {
    return <p>Checking authentication...</p>; // Or a loading spinner
  }

  if (!user) {
    // If not authenticated, redirect to the home page (or a login page)
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;
