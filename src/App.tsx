import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import FeatureGate from "./components/FeatureGate";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";

import { supabase } from "./utils/supabase";

export default function App() {
  const [userTier, setUserTier] = useState("free");
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initUser() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userEmail = sessionData?.session?.user?.email;

        if (!userEmail) {
          setUserTier("free");
          setEmail(null);
          setLoading(false);
          return;
        }

        setEmail(userEmail);

        const { data: userData, error } = await supabase
          .from("users")
          .select("tier")
          .eq("email", userEmail)
          .single();

        if (!error && userData?.tier) {
          setUserTier(userData.tier);
        } else {
          setUserTier("free");
        }

        setLoading(false);
      } catch (err) {
        console.error("Auth init error:", err);
        setUserTier("free");
        setLoading(false);
      }
    }

    initUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        🌊 Syncing ocean system...
      </div>
    );
  }

  return (
    <>
      <Navbar userTier={userTier} />

      <Routes>
        {/* 🌺 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 MEMBERS */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userTier={userTier} requiredTier="bronze">
              <Dashboard userTier={userTier} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tools"
          element={
            <ProtectedRoute userTier={userTier} requiredTier="wave">
              <Tools userTier={userTier} />
            </ProtectedRoute>
          }
        />

        {/* ⚡ PREMIUM GATED FEATURE */}
        <Route
          path="/premium-lab"
          element={
            <FeatureGate userTier={userTier} requiredTier="wave">
              <div className="p-10 text-white">
                🌊 Premium AI Lab
              </div>
            </FeatureGate>
          }
        />
      </Routes>
    </>
  );
}