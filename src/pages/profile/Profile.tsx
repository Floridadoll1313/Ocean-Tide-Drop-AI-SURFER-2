import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Profile() {
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
    return <Navigate to="/" replace />;
  }

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto text-left">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-[#ff5E00] tracking-tight mb-8">
          Your Account Profile
        </h1>
        
        <div className="glass-card p-8 rounded-3xl border border-[#00eaff]/20 relative overflow-hidden bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || "User"} className="w-24 h-24 rounded-full border-4 border-[#00eaff]" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#00eaff]/20 border-4 border-[#00eaff] flex items-center justify-center text-4xl font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">{user.displayName || "Surfer"}</h2>
              <p className="text-cyan-200">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Account ID</h3>
              <p className="text-sm font-mono bg-black/40 p-3 rounded-lg text-white/70 border border-white/10 break-all">{user.uid}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Provider</h3>
              <p className="text-sm bg-black/40 p-3 rounded-lg text-white/70 border border-white/10 capitalize">
                 {user.providerData[0]?.providerId.split('.')[0] || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
