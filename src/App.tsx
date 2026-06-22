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

/**
 * 🌊 TIER ORDER (fallback safety layer)
 */
const TIER_LEVELS: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
  enterprise: 4,
};

export default function App() {
  const [userTier, setUserTier] = useState("free");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🌊 LOAD USER SESSION
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
   * ⚡ REALTIME UPGRADES (Stripe → Supabase → UI)
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
            console.log("🌊 LIVE UPGRADE:", newTier);
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
   * 🔐 GLOBAL FEATURE GUARD WRAPPER
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
   * 🌊 LOADING STATE
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>Syncing ocean system... 🌊</p>
      </div>
    );
  }

  return (
    <>
      {/* 🌊 NAVBAR (tier-aware) */}
      <Navbar userTier={userTier} />

      <Routes>

        {/* 🌊 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 DASHBOARD (BRONZE+) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userTier={userTier} requiredTier="bronze">
              <Dashboard userTier={userTier} />
            </ProtectedRoute>
          }
        />

        {/* 🔵 TOOLS (WAVE+) */}
        <Route
          path="/tools"
          element={
            <ProtectedRoute userTier={userTier} requiredTier="wave">
              <Tools userTier={userTier} />
            </ProtectedRoute>
          }
        />

        {/* 🌊 EXAMPLE: FEATURE-GATED ROUTE (NEW SYSTEM) */}
        <Route
          path="/premium-lab"
          element={
            <Gate requiredTier="wave">
              <div className="p-10 text-white">
                Premium AI Lab unlocked 🌊⚡
              </div>
            </Gate>
          }
        />

      </Routes>
    </>
  );
}