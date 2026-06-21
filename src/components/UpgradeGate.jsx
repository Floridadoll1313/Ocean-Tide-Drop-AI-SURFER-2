import { useEffect, useState } from "react";

export default function UpgradeGate({
  currentTier,
  requiredTier,
  title = "Unlock this feature",
  description = "Upgrade to access deeper systems 🌊",
  upgradeTier = "wave",
}) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  async function handleUpgrade() {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tier: upgradeTier }),
    });

    const session = await res.json();

    const stripe = await window.Stripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden">

      {/* 🌊 animated background waves */}
      <div className="absolute inset-0 opacity-20 animate-pulse bg-gradient-to-b from-blue-500 via-cyan-500 to-slate-900 blur-3xl" />

      {/* floating glow orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

      {/* main card */}
      <div className="relative z-10 max-w-md w-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl space-y-5">

        {/* title */}
        <h1 className="text-2xl font-bold text-center">
          🌊 {title}
        </h1>

        {/* description */}
        <p className="text-gray-300 text-center">
          {description}
        </p>

        {/* tier info */}
        <div className="text-xs text-gray-400 text-center space-y-1">
          <div>Current Tide: <b className="text-white">{currentTier}</b></div>
          <div>Required Tide: <b className="text-white">{requiredTier}</b></div>
        </div>

        {/* preview glass box */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-sm text-gray-300 backdrop-blur-md">
          ✨ Inside this layer: AI workflows, automation systems, and revenue engines designed to scale your digital ocean business.
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={handleUpgrade}
          className={`
            w-full py-3 rounded-xl font-semibold transition-all duration-300
            ${pulse
              ? "bg-blue-400 shadow-lg shadow-blue-500/40 scale-[1.02]"
              : "bg-blue-600 hover:bg-blue-500"}
          `}
        >
          Unlock {upgradeTier.toUpperCase()} 🌊
        </button>

        {/* microtext */}
        <p className="text-center text-xs text-gray-500">
          Instant unlock after Stripe payment ⚡
        </p>

      </div>
    </div>
  );
}