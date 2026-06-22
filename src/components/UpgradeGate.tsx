import React from "react";
import { Lock, Sparkles } from "lucide-react";
import { PRICING } from "../config/pricing";
import { useNavigate } from "react-router-dom";

export default function UpgradeGate({ requiredTier = "bronze", title, description }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center bg-black overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-cyan-950 opacity-90" />

      <div className="relative z-10 max-w-md w-full p-10 text-center rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.08)]">

        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-5">
          <Lock className="text-cyan-300" />
        </div>

        <h1 className="text-2xl font-black text-cyan-300 mb-2">
          {title || "Locked Content"}
        </h1>

        <p className="text-white/60 text-sm mb-6">
          {description || "Upgrade your tier to unlock this system."}
        </p>

        <div className="text-xs text-white/40 mb-6">
          Required: {PRICING[requiredTier]?.label}
        </div>

        <button
          onClick={() => navigate("/pricing?upgrade=" + requiredTier)}
          className="w-full py-4 bg-cyan-400 text-black font-black rounded-xl hover:bg-cyan-300 transition flex items-center justify-center gap-2"
        >
          Upgrade Now <Sparkles size={16} />
        </button>

      </div>
    </div>
  );
}