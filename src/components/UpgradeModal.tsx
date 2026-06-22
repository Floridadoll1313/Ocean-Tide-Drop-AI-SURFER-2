import React from "react";
import { X, Sparkles } from "lucide-react";
import { PRICING } from "../config/pricing";
import { useNavigate } from "react-router-dom";

export default function UpgradeModal({
  open,
  tier,
  onClose,
}: {
  open: boolean;
  tier: string;
  onClose: () => void;
}) {
  const navigate = useNavigate();

  if (!open) return null;

  const plan = PRICING[tier];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">

      <div className="w-full max-w-md p-8 rounded-3xl border border-cyan-500/20 bg-white/5 shadow-[0_0_80px_rgba(0,255,255,0.1)] text-center relative">

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X />
        </button>

        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-4">
          <Sparkles className="text-cyan-300 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black text-cyan-300 mb-2">
          Unlock {plan?.label}
        </h2>

        <p className="text-white/60 text-sm mb-6">
          Upgrade your system to access premium AI infrastructure.
        </p>

        <div className="text-xs text-white/40 mb-6">
          Starting at ${plan?.price}/mo
        </div>

        <button
          onClick={() => navigate("/pricing?upgrade=" + tier)}
          className="w-full py-4 bg-cyan-400 text-black font-black rounded-xl hover:bg-cyan-300 transition"
        >
          Continue to Checkout 🌊
        </button>

      </div>
    </div>
  );
}