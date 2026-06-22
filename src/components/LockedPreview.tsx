import React from "react";
import { Lock } from "lucide-react";
import { PRICING } from "../config/pricing";

export default function LockedPreview({
  children,
  requiredTier = "bronze",
  onUpgrade,
}: {
  children: React.ReactNode;
  requiredTier?: string;
  onUpgrade?: () => void;
}) {
  return (
    <div className="relative group overflow-hidden rounded-2xl border border-white/10">

      {/* 🌫️ CONTENT (BLURRED UNDER LOCK) */}
      <div className="blur-sm scale-[1.02] opacity-60 pointer-events-none">
        {children}
      </div>

      {/* 🌊 OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md transition-all group-hover:bg-black/80">

        <div className="text-center space-y-3 p-6">

          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/30">
            <Lock className="text-cyan-300" size={18} />
          </div>

          <h3 className="text-white font-bold text-lg">
            Premium Content Locked
          </h3>

          <p className="text-white/60 text-sm">
            Upgrade to <span className="text-cyan-300">{PRICING[requiredTier]?.label}</span> to unlock
          </p>

          <button
            onClick={onUpgrade}
            className="mt-2 px-5 py-2 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-all"
          >
            Unlock Now 🌊
          </button>

        </div>
      </div>

      {/* ⚡ HOVER GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-cyan-400/5 transition" />
    </div>
  );
}