// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus'; // Import your custom authentication status hook

const ProtectedRoute: React.FC = () => {
  // Get the current user and loading status from your custom hook
  const { user, loading } = useAuthStatus();

  if (loading) {
    // While the authentication status is being determined, show a loading indicator.
    // This prevents flashing unauthenticated content before a redirect.
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Take full viewport height
        fontSize: '1.2em',
        color: '#ccc' // A light grey color for text
      }}>
        Checking authentication status...
      </div>
    );
  }

  if (!user) {
    // If no user is authenticated, redirect them to the home page.
    // The `replace` prop ensures that the unauthenticated route is not added
    // to the history stack, so the user can't just press the back button
    // to get to the protected page.
    return <Navigate to="/" replace />;
  }

  // If a user is authenticated, render the child routes (Outlet).
  // `Outlet` is a component from react-router-dom that renders the
  // component defined for the nested route (e.g., your DashboardPage).
  return <Outlet />;
};

export default ProtectedRoute;
