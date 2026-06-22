import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Lock, ArrowRight } from "lucide-react";

export default function UpgradeGate({
  currentTier,
  requiredTier,
  title,
  description,
  upgradeTier = "wave",
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);

    try {
      // 🌊 send user to pricing page (Stripe handles upgrade)
      navigate("/pricing?upgrade=" + upgradeTier);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">

      {/* 🌊 glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-cyan-950 opacity-80" />

      <div className="relative z-10 max-w-lg w-full text-center p-10 rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.08)] animate-pulse">

        {/* LOCK ICON */}
        <div className="mx-auto w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-400/30">
          <Lock className="text-cyan-300" />
        </div>

        <h2 className="text-3xl font-black text-cyan-300 mb-2">
          {title || "Locked Wave Zone"}
        </h2>

        <p className="text-white/60 text-sm mb-2">
          Required tier: <span className="text-cyan-300 font-bold">{requiredTier}</span>
        </p>

        <p className="text-white/40 text-sm mb-6">
          {description || "Upgrade your system to unlock deeper access."}
        </p>

        {/* CTA */}
        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-cyan-400 text-black font-black hover:bg-cyan-300 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            "Redirecting..."
          ) : (
            <>
              Upgrade to Unlock <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="mt-4 text-[10px] uppercase tracking-widest text-white/30">
          Secure Stripe Upgrade Flow
        </p>
      </div>
    </div>
  );
}