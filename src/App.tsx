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
  const [email, setEmail] = useState(null);

  /**
   * 🌊 LOAD USER SESSION + TIER
   */
  useEffect(() => {
    async function initUser() {
      const { data: session } = await supabase.auth.getSession();

      const userEmail = session?.session?.user?.email;

      if (!userEmail) return;

      setEmail(userEmail);

      const { data } = await supabase
        .from("users")
        .select("tier")
        .eq("email", userEmail)
        .single();

      if (data?.tier) {
        setUserTier(data.tier);
      }
    }

    initUser();

    /**
     * ⚡ LIVE AUTO-UNLOCK LISTENER
     * (Stripe webhook → Supabase → UI updates instantly)
     */
    const channel = supabase
      .channel("tier-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: email ? `email=eq.${email}` : undefined,
        },
        (payload) => {
          const newTier = payload.new?.tier;

          if (newTier) {
            console.log("🌊 Tier updated live:", newTier);
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
   * 🌊 WRAPPER: inject tier into ProtectedRoute
   */
  function Protected({ children }) {
    return (
      <ProtectedRoute userTier={userTier}>
        {children}
      </ProtectedRoute>
    );
  }

  return (
    <>
      <Navbar userTier={userTier} />

      <Routes>
        {/* 🌊 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 MEMBERS ONLY (FREE LOGIN REQUIRED) */}
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard userTier={userTier} />
            </Protected>
          }
        />

        <Route
          path="/tools"
          element={
            <Protected>
              <Tools userTier={userTier} />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}