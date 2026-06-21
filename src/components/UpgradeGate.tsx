import React from "react";
import { Lock, ArrowUpRight, Waves } from "lucide-react";

const TIER_ORDER: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
};

const TIER_NAMES: Record<string, string> = {
  free: "Free Tide",
  bronze: "Bronze Tide",
  wave: "Wave Tier",
  tsunami: "Tsunami Elite",
};

const TIER_VALUE: Record<string, string[]> = {
  bronze: ["Basic AI tools", "Starter workflows", "Guided setup"],
  wave: ["Automation engine", "Prompt library", "Revenue systems"],
  tsunami: ["Full SaaS system", "Advanced AI infrastructure", "Elite scaling tools"],
};

export default function UpgradeGate({
  currentTier = "free",
  requiredTier = "bronze",
  title = "Unlock This System",
  description = "Upgrade to access this feature.",
  upgradeTier = "bronze",
}: {
  currentTier?: string;
  requiredTier?: string;
  upgradeTier?: string;
  title?: string;
  description?: string;
}) {
  const currentLevel = TIER_ORDER[currentTier] ?? 0;
  const requiredLevel = TIER_ORDER[requiredTier] ?? 1;

  const canUpgradeTo = upgradeTier || requiredTier;

  const missingOut = TIER_VALUE[requiredTier] || [];

  return (
    <div className="relative w-full flex items-center justify-center py-16 px-6">
      
      {/* 🌊 BACKDROP */}
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

        {/* 🌊 VALUE PREVIEW */}
        <div className="mb-8 text-left bg-black/30 border border-white/10 rounded-xl p-5">
          <p className="text-xs text-cyan-300 uppercase tracking-widest mb-3">
            What you unlock in {TIER_NAMES[requiredTier]}
          </p>

          <div className="space-y-2">
            {missingOut.map((item, i) => (
              <div key={i} className="text-white/70 text-sm flex items-center gap-2">
                <Waves className="w-3 h-3 text-cyan-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 URGENCY STRIP */}
        <div className="text-xs text-white/40 mb-6">
          Instant unlock • Cancel anytime • Upgrade takes under 30 seconds
        </div>

        {/* 💳 PRIMARY CTA */}
        <button
          onClick={() => {
            window.location.href = `/pricing?upgrade=${canUpgradeTo}`;
          }}
          className="w-full py-4 rounded-2xl bg-cyan-400 text-black font-black uppercase tracking-widest hover:bg-cyan-300 transition flex items-center justify-center gap-2"
        >
          Upgrade to {TIER_NAMES[canUpgradeTo]}
          <ArrowUpRight className="w-4 h-4" />
        </button>

        {/* BACK LINK */}
        <p className="mt-6 text-xs text-white/40 hover:text-white transition">
          Go back to dashboard
        </p>

      </div>
    </div>
  );
}