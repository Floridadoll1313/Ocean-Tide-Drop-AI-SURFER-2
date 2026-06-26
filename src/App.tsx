import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import FeatureGate from "./components/FeatureGate";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Tools from "./pages/tools/tools";
import Dashboard from "./pages/dashboard/dashboard";

import { supabase } from "./utils/supabase";

export default function App() {
  const [userTier, setUserTier] = useState("free");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
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

      if (userData?.tier) setUserTier(userData.tier);

      setLoading(false);
    }

    load();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>🌊 syncing ocean system...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar userTier={userTier} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

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

        <Route
          path="/terminal"
          element={
            <Gate requiredTier="wave">
              <div className="min-h-screen bg-slate-950 text-white p-10">
                <h1 className="text-4xl font-bold">
                  🌊 AI Terminal Engine
                </h1>
                <p className="text-slate-400 mt-3">
                  Prompt system active. Ready for commands.
                </p>
              </div>
            </Gate>
          }
        />
      </Routes>
    </>
  );
}