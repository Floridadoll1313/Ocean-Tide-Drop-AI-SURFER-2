import React from "react";
import { Lock, Sparkles, ArrowRight, Zap } from "lucide-react";
import { PRICING } from "../config/pricing";
import { useNavigate } from "react-router-dom";

export default function UpgradeGate({
  requiredTier = "bronze",
  title,
  description,
  currentTier = "free",
}) {
  const navigate = useNavigate();

  const tierLabel = PRICING?.[requiredTier]?.label || requiredTier;

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-black">

      {/* 🌊 Animated glow ocean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-cyan-950 opacity-90 animate-pulse" />

      {/* soft light waves */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_70%,rgba(0,180,255,0.12),transparent_55%)]" />

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md p-10 text-center rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,255,255,0.10)]">

        {/* lock icon */}
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-6 shadow-[0_0_20px_rgba(0,255,255,0.15)]">
          <Lock className="text-cyan-300" />
        </div>

        {/* title */}
        <h1 className="text-3xl font-black text-cyan-300 mb-2 tracking-tight">
          {title || "This Wave Is Locked"}
        </h1>

        {/* subtitle */}
        <p className="text-white/60 text-sm mb-6 leading-relaxed">
          {description || "Upgrade your tide level to unlock premium systems, automation engines, and member-only tools."}
        </p>

        {/* tier requirement card */}
        <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-left">
          <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-300 mb-1">
            Required Tier
          </div>

          <div className="text-lg font-bold text-white">
            {tierLabel}
          </div>

          <div className="text-xs text-white/50 mt-2">
            Your current access level is{" "}
            <span className="text-cyan-300 font-bold">{currentTier}</span>
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={() => navigate(`/pricing?upgrade=${requiredTier}`)}
          className="w-full py-4 bg-cyan-400 text-black font-black rounded-xl hover:bg-cyan-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,255,255,0.25)] active:scale-[0.98]"
        >
          Upgrade Now
          <ArrowRight size={16} />
        </button>

        {/* secondary micro CTA */}
        <button
          onClick={() => navigate("/pricing")}
          className="mt-4 text-xs text-white/40 hover:text-white transition flex items-center justify-center gap-1 w-full"
        >
          View all plans <Zap size={12} />
        </button>

      </div>
    </div>
  );
}