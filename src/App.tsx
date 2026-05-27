// src/App.tsx (Completely REPLACED for Routing)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AuthStatus from './AuthStatus'; // Still useful for general auth display
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import PasswordResetForm from './PasswordResetForm';
import GoogleSignInButton from './GoogleSignInButton';
import HomePage from './pages/HomePage'; // Public home page
import DashboardPage from './pages/DashboardPage'; // Protected dashboard page
import ProtectedRoute from './components/ProtectedRoute'; // Your protected route component
import useAuthStatus from './hooks/useAuthStatus'; // Your auth status hook

// This component will be the entry point for unauthenticated users
const AuthFormsPage: React.FC = () => {
  return (
    <>
      <SignUpForm />
      <SignInForm />
      <GoogleSignInButton />
      <PasswordResetForm />
    </>
  );
};

function App() {
  const { loading } = useAuthStatus(); // We only need loading here for initial check

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
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My Firebase App with Routing</h1>
          <nav>
            <Link to="/" style={{ margin: '0 10px', color: 'white' }}>Home</Link>
            <Link to="/auth" style={{ margin: '0 10px', color: 'white' }}>Auth</Link> {/* New link for forms */}
            <Link to="/dashboard" style={{ margin: '0 10px', color: 'white' }}>Dashboard</Link>
          </nav>
          <AuthStatus /> {/* AuthStatus is always visible, shows login state */}
        </header>
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthFormsPage />} /> {/* Page for all auth forms */}

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* Add more protected routes here */}
            </Route>

            {/* Catch-all for unknown routes (optional) */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
