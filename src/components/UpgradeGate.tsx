import React from "react";
import { Lock, ArrowUpRight, Sparkles } from "lucide-react";

type Props = {
  currentTier?: string;
  requiredTier?: string;
  upgradeTier?: string;
  title?: string;
  description?: string;
};

export default function UpgradeGate({
  currentTier = "free",
  requiredTier = "wave",
  upgradeTier = "wave",
  title = "Premium System Locked",
  description = "Unlock higher waves to access deeper automation systems.",
}: Props) {
  const handleUpgrade = () => {
    window.location.href = "/pricing";
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">

        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-8">

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Lock className="w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <div className="text-center space-y-4">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} />
                Current Tide: {currentTier}
              </div>

              <h1 className="text-4xl font-black text-white">
                {title}
              </h1>

              <p className="text-white/60 max-w-lg mx-auto">
                {description}
              </p>

              <div className="bg-black/20 border border-white/10 rounded-2xl p-5 mt-6 text-left">

                <div className="text-sm text-white/50 mb-2">
                  Required Tier
                </div>

                <div className="text-2xl font-bold text-cyan-300 capitalize">
                  {requiredTier}
                </div>

                <div className="mt-4 text-sm text-white/60">
                  This area includes advanced workflows, automation systems,
                  premium AI tools, and member-only resources.
                </div>
              </div>

              <button
                onClick={handleUpgrade}
                className="mt-8 w-full py-4 rounded-2xl bg-cyan-500 text-black font-black text-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                Upgrade to {upgradeTier}
                <ArrowUpRight size={20} />
              </button>

              <div className="mt-6 text-xs text-white/40">
                Unlock higher waves to access deeper systems 🌊
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}    stripeTier: "wave",
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
