import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Lock, Waves, ArrowRight } from "lucide-react";

type Props = {
  currentTier: string;
  requiredTier: string;
  upgradeTier: string;
  title?: string;
  description?: string;
};

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  bronze: "Starter Wave",
  wave: "Growth Wave",
  tsunami: "Tsunami Elite",
};

const TIER_PRICES: Record<string, string> = {
  bronze: "$29/mo",
  wave: "$99/mo",
  tsunami: "$250/mo",
};

export default function UpgradeGate({
  currentTier,
  requiredTier,
  upgradeTier,
  title = "This wave is locked",
  description = "Upgrade your system to unlock higher-level automation and revenue tools.",
}: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const goCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierId: upgradeTier,
        }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe not configured. Check backend.");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center p-6 text-center overflow-hidden">

      {/* 🌊 animated ocean glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
      <div className="absolute inset-0 opacity-40 blur-[120px] bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.25),transparent_60%)] animate-pulse" />

      {/* floating wave particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>

      {/* MAIN CARD */}
      <div className="relative max-w-lg w-full bg-white/5 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-10 shadow-[0_0_60px_rgba(0,255,255,0.12)]">

        {/* lock icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-400/20">
          <Lock className="text-cyan-300" />
        </div>

        {/* title */}
        <h1 className="text-3xl font-black text-white mb-2">
          {title}
        </h1>

        {/* description */}
        <p className="text-white/60 text-sm mb-6">
          {description}
        </p>

        {/* tier comparison */}
        <div className="flex items-center justify-between bg-black/30 border border-white/10 rounded-xl p-4 mb-6">
          <div>
            <p className="text-xs text-white/40">Current</p>
            <p className="text-sm font-bold text-white">
              {TIER_LABELS[currentTier] || currentTier}
            </p>
          </div>

          <Waves className="text-cyan-400 animate-pulse" />

          <div>
            <p className="text-xs text-white/40">Required</p>
            <p className="text-sm font-bold text-cyan-300">
              {TIER_LABELS[requiredTier] || requiredTier}
            </p>
          </div>
        </div>

        {/* upgrade highlight */}
        <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs text-cyan-300 uppercase tracking-widest">
                Recommended Upgrade
              </p>
              <p className="text-lg font-bold text-white">
                {TIER_LABELS[upgradeTier] || upgradeTier}
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-black text-cyan-300">
                {TIER_PRICES[upgradeTier] || ""}
              </p>
              <p className="text-xs text-white/40">per month</p>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={goCheckout}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95"
        >
          {loading ? (
            "Launching Checkout..."
          ) : (
            <>
              Unlock Now
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* secondary action */}
        <button
          onClick={() => navigate("/pricing")}
          className="w-full mt-3 text-xs text-white/40 hover:text-white transition"
        >
          Compare all tiers
        </button>

        {/* sparkle footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-white/30 uppercase tracking-widest">
          <Sparkles size={12} />
          Secure Stripe Checkout
        </div>
      </div>
    </div>
  );
}