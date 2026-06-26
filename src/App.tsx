import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import FeatureGate from "./components/FeatureGate";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Tools from "./pages/tools/tools";
import Dashboard from "./pages/dashboard/dashboard";
import Terminal from "./pages/terminal/terminal";

import { supabase } from "./utils/supabase";

/**
 * 🌊 Tier system
 */
export default function App() {
  const [userTier, setUserTier] = useState("free");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🌊 Load user session + tier
   */
  useEffect(() => {
    async function initUser() {
      const { data } = await supabase.auth.getSession();
      const userEmail = data?.session?.user?.email;

      if (!userEmail) {
        setLoading(false);
        return;
      }

      setEmail(userEmail);

      const { data: userData } = await supabase
        .from("users")
        .select("tier")
        .eq("email", userEmail)
        .single();

      if (userData?.tier) {
        setUserTier(userData.tier);
      }

      setLoading(false);
    }

    initUser();
  }, []);

  /**
   * 🌊 Feature Gate wrapper
   */
  const Gate = ({
    children,
    requiredTier = "bronze",
  }: {
    children: React.ReactNode;
    requiredTier?: string;
  }) => {
    return (
      <FeatureGate userTier={userTier} requiredTier={requiredTier}>
        {children}
      </FeatureGate>
    );
  };

  /**
   * 🌊 Loading state
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>🌊 syncing ocean system...</p>
      </div>
    );
  }

  return (
    <>
      {/* 🌊 Navbar */}
      <Navbar userTier={userTier} />

      <Routes>
        {/* 🌊 Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 Dashboard (bronze+) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userTier={userTier} requiredTier="bronze">
              <Dashboard userTier={userTier} />
            </ProtectedRoute>
          }
        />

        {/* 🔵 Tools (wave+) */}
        <Route
          path="/tools"
          element={
            <ProtectedRoute userTier={userTier} requiredTier="wave">
              <Tools userTier={userTier} />
            </ProtectedRoute>
          }
        />

        {/* 🌊 Terminal (wave+) */}
        <Route
          path="/terminal"
          element={
            <ProtectedRoute userTier={userTier} requiredTier="wave">
              <Terminal />
            </ProtectedRoute>
          }
        />

        {/* 🌊 Optional Feature Gate Example */}
        <Route
          path="/premium-lab"
          element={
            <Gate requiredTier="wave">
              <div className="min-h-screen bg-slate-950 text-white p-10">
                <h1 className="text-4xl font-bold">
                  🌊 AI Terminal Lab Active
                </h1>
                <p className="text-slate-400 mt-3">
                  Experimental systems unlocked.
                </p>
              </div>
            </Gate>
          }
        />
      </Routes>
    </>
  );
}