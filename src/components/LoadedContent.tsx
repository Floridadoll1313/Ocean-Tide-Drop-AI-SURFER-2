import React from "react";
import { Lock } from "lucide-react";

export default function LockedContent({
  children,
  isLocked,
  onUpgrade,
  title = "Premium Content Locked",
}) {
  return (
    <div className="relative group overflow-hidden rounded-2xl">

      {/* CONTENT */}
      <div className={isLocked ? "blur-md scale-[1.02] transition-all duration-500" : ""}>
        {children}
      </div>

      {/* OVERLAY */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="text-center p-6 max-w-sm">

            <div className="mx-auto w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-400/30">
              <Lock className="text-cyan-300" />
            </div>

            <h3 className="text-white font-bold text-lg mb-1">
              {title}
            </h3>

            <p className="text-white/50 text-xs mb-4">
              Upgrade to unlock full access
            </p>

            <button
              onClick={onUpgrade}
              className="px-5 py-2 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition"
            >
              Unlock Now
            </button>

          </div>
        </div>
      )}
    </div>
  );
}