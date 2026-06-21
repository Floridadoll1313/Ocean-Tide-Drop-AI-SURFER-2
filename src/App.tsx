import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tools from "./pages/Tools";

import { supabase } from "./utils/supabase";

export default function App() {
  const [userTier, setUserTier] = useState("free");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🌊 LOAD SESSION + USER TIER
   */
  useEffect(() => {
    async function initUser() {
      setLoading(true);

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
   * ⚡ REALTIME AUTO-UNLOCK LISTENER
   * Stripe webhook → Supabase → instant UI update
   */
  useEffect(() => {
    if (!email) return;

    const channel = supabase
      .channel("tier-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `email=eq.${email}`,
        },
        (payload) => {
          const newTier = payload.new?.tier;

          if (newTier) {
            console.log("🌊 LIVE TIER UPDATE:", newTier);
            setUserTier(newTier);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email]);

  /**
   * 🔒 PROTECTED WRAPPER
   */
  function Protected({
    children,
    requiredTier = "bronze",
  }: {
    children: React.ReactNode;
    requiredTier?: string;
  }) {
    return (
      <ProtectedRoute
        userTier={userTier}
        requiredTier={requiredTier}
      >
        {children}
      </ProtectedRoute>
    );
  }

  /**
   * 🌊 LOADING STATE
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>Loading ocean system... 🌊</p>
      </div>
    );
  }

  return (
    <>
      <Navbar userTier={userTier} />

      <Routes>

        {/* 🌊 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 DASHBOARD (BRONZE+) */}
        <Route
          path="/dashboard"
          element={
            <Protected requiredTier="bronze">
              <Dashboard userTier={userTier} />
            </Protected>
          }
        />

        {/* 🔵 TOOLS (WAVE+) */}
        <Route
          path="/tools"
          element={
            <Protected requiredTier="wave">
              <Tools userTier={userTier} />
            </Protected>
          }
        />

      </Routes>
    </>
  );
}