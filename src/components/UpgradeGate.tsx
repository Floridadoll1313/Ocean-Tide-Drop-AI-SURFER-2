import React from "react";
import { Lock, ArrowUpRight, Waves, CreditCard } from "lucide-react";

/**
 * 🌊 Tier system (single source of truth)
 */
const TIERS: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
};

const TIER_LABELS: Record<string, string> = {
  free: "Free Tide",
  bronze: "Bronze Tide",
  wave: "Wave Tier",
  tsunami: "Tsunami Elite",
};

/**
 * 💳 Stripe mapping (IMPORTANT PART)
 * This is what makes it "Stripe-aware"
 */
const STRIPE_PLANS: Record<
  string,
  { name: string; price: string; stripeTier: string }
> = {
  bronze: {
    name: "Bronze Tide",
    price: "$29/mo",
    stripeTier: "bronze",
  },
  wave: {
    name: "Wave Tier",
    price: "$99/mo",
    stripeTier: "wave",
  },
  tsunami: {
    name: "Tsunami Elite",
    price: "$250/mo",
    stripeTier: "tsunami",
  },
};

export default function UpgradeGate({
  currentTier = "free",
  requiredTier = "bronze",
  title = "Unlock This System",
  description = "Upgrade to access this feature.",
}: {
  currentTier?: string;
  requiredTier?: string;
  title?: string;
  description?: string;
}) {
  const currentLevel = TIERS[currentTier] ?? 0;
  const requiredLevel = TIERS[requiredTier] ?? 1;

  const targetPlan =
    STRIPE_PLANS[requiredTier] || STRIPE_PLANS["bronze"];

  const missingFeatures = [
    "Automated AI workflows",
    "Revenue system unlock",
    "Premium prompt library",
  ];

  const handleUpgrade = () => {
    /**
     * 🌊 Stripe-aware redirect
     * We pass the correct tier into pricing/checkout flow
     */
    window.location.href = `/pricing?tier=${targetPlan.stripeTier}`;
  };

  return (
    <div className="relative w-full flex items-center justify-center py-16 px-6">

      {/* 🌊 BACKGROUND */}
      <div className="absolute inset-0 opacity-40 blur-[120px] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent" />

      {/* 💳 MAIN CARD */}
      <div className="relative max-w-2xl w-full bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 text-center shadow-[0_0_50px_rgba(0,255,255,0.08)]">

        {/* LOCK ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
            <Lock className="text-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">
          {title}
        </h2>

        <p className="text-white/60 text-sm mb-6">
          {description}
        </p>

        {/* 💡 STRIPE PLAN DISPLAY */}
        <div className="mb-8 bg-black/30 border border-white/10 rounded-xl p-5 text-left">

          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-cyan-300 uppercase tracking-widest">
              Recommended Upgrade
            </p>

            <div className="flex items-center gap-1 text-white/50 text-xs">
              <CreditCard className="w-3 h-3" />
              Stripe Plan
            </div>
          </div>

          <div className="text-xl font-bold text-white">
            {targetPlan.name}
          </div>

          <div className="text-cyan-300 text-sm font-bold mb-3">
            {targetPlan.price}
          </div>

          <div className="space-y-2 mt-4">
            {missingFeatures.map((item, i) => (
              <div key={i} className="text-white/70 text-sm flex items-center gap-2">
                <Waves className="w-3 h-3 text-cyan-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ⚡ URGENCY LINE */}
        <div className="text-xs text-white/40 mb-6">
          Instant activation • Stripe secure checkout • Cancel anytime
        </div>

        {/* 💳 CTA */}
        <button
          onClick={handleUpgrade}
          className="w-full py-4 rounded-2xl bg-cyan-400 text-black font-black uppercase tracking-widest hover:bg-cyan-300 transition flex items-center justify-center gap-2"
        >
          Upgrade to {targetPlan.name}
          <ArrowUpRight className="w-4 h-4" />
        </button>

        {/* BACK */}
        <p className="mt-6 text-xs text-white/40">
          You can downgrade or cancel anytime in billing
        </p>

      </div>
    </div>
  );
}