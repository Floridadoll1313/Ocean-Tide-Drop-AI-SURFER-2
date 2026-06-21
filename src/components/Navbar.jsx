import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex gap-4 p-4 bg-black text-white">
      <Link to="/">Home</Link>

      {/* ALWAYS visible */}
      <Link to="/pricing">Pricing</Link>

      {/* 🔒 MEMBERS ONLY TOOL WALL */}
      {user && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tools">AI Tools</Link>
          <Link to="/analytics">Analytics</Link>
        </>
      )}

      <div className="ml-auto">
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Join the Wave 🌊</Link>
        )}
      </div>
    </nav>
  );
}