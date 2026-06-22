import React from "react";
import { X, Sparkles } from "lucide-react";

export default function UpgradeModal({ open, tier, onClose, onCheckout }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">

      <div className="w-full max-w-md p-6 rounded-3xl border border-cyan-500/30 bg-slate-950 shadow-[0_0_60px_rgba(0,255,255,0.15)]">

        <button onClick={onClose} className="float-right text-white/50 hover:text-white">
          <X />
        </button>

        <div className="flex items-center gap-2 text-cyan-300 mb-4">
          <Sparkles size={18} />
          <span className="text-xs uppercase tracking-widest">Upgrade Required</span>
        </div>

        <h2 className="text-2xl font-black text-white mb-2">
          Unlock {tier}
        </h2>

        <p className="text-white/60 text-sm mb-6">
          Upgrade your system to access premium AI workflows, automation layers, and revenue tools.
        </p>

        <button
          onClick={onCheckout}
          className="w-full py-3 bg-cyan-400 text-black font-black rounded-xl hover:bg-cyan-300 transition"
        >
          Continue to Checkout
        </button>

      </div>
    </div>
  );
}