import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import FeatureGate from "./components/FeatureGate";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Tools from "./pages/Tools";

// IMPORTANT FIX: match your real file path
import Dashboard from "./pages/dashboard/dashboard";

import { supabase } from "./utils/supabase";

/**
 * 🌊 Tier system (AI Surfer access control)
 */
const TIER_LEVELS: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
  enterprise: 4,
};

export default function App() {
  const [userTier, setUserTier] = useState<string>("free");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * 🌊 Load user session + tier
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
   * ⚡ Realtime tier upgrades (Stripe → Supabase → UI)
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
            console.log("🌊 Tier upgraded:", newTier);
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
   * 🌊 Loading screen
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <p className="text-lg">Syncing ocean system 🌊</p>
          <p className="text-sm text-slate-400 mt-2">
            Loading AI Surfer engine...
          </p>
        </div>
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

        {/* 🌊 Premium sandbox route */}
        <Route
          path="/premium-lab"
          element={
            <Gate requiredTier="wave">
              <div className="p-10 text-white">
                <h1 className="text-3xl font-bold">
                  🌊 AI Terminal Lab Unlocked
                </h1>
                <p className="text-slate-400 mt-2">
                  Experimental systems online.
                </p>
              </div>
            </Gate>
          }
        />
      </Routes>
    </>
  );
}