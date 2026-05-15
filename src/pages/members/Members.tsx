import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Members() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 rounded-full border-4 border-[#00eaff] border-t-transparent animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">Access Denied</h1>
          <p className="text-white/60 mb-8 max-w-md">You must be signed in to enter the Members Sanctum.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase text-[#00eaff] mb-4 drop-shadow-[0_0_15px_rgba(0,234,255,0.4)]">Members Sanctum</h1>
        <p className="text-white/60 mb-8 max-w-md text-center">Welcome to the inner realm of Ocean Tide Drop AI Surfer, {user.displayName || "Surfer"}.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-2xl font-bold mb-4 text-white">Exclusive Tools</h3>
            <p className="text-white/70 text-sm">Access to advance automation templates and AI models.</p>
          </div>
          <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-2xl font-bold mb-4 text-white">Community</h3>
            <p className="text-white/70 text-sm">Join the private discord and connect with other members.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
