import { useEffect, useState } from "react";

export default function UpgradeGate({
  currentTier,
  requiredTier,
  title = "Unlock Premium Access",
  description = "This system is part of the advanced AI business engine.",
  upgradeTier = "wave",
}) {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setGlow((g) => !g), 1400);
    return () => clearInterval(t);
  }, []);

  async function handleUpgrade() {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: upgradeTier }),
    });

    const session = await res.json();

    const stripe = await window.Stripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    stripe.redirectToCheckout({ sessionId: session.id });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B14] text-white relative overflow-hidden">

      {/* 🌌 premium ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

      {/* soft “lux glow” orbs */}
      <div className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full" />

      {/* main card */}
      <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,150,255,0.15)] space-y-6">

        {/* header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-wide">
            {title}
          </h1>

          <p className="text-sm text-white/60 leading-relaxed">
            {description}
          </p>
        </div>

        {/* tier stack (SaaS framing) */}
        <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm space-y-1">
          <div className="flex justify-between text-white/70">
            <span>Current Tier</span>
            <span className="text-white">{currentTier}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Required Tier</span>
            <span className="text-white">{requiredTier}</span>
          </div>
        </div>

        {/* value stack (THIS is what makes it $99 feel) */}
        <div className="space-y-2 text-sm text-white/70">
          <p>✔ AI workflow automation system</p>
          <p>✔ Revenue pipeline builder</p>
          <p>✔ Prompt + tool library access</p>
          <p>✔ Scalable SaaS architecture layer</p>
        </div>

        {/* preview window */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/50 backdrop-blur-md">
          “Inside this tier: automated systems that convert ideas into structured AI income workflows.”
        </div>

        {/* CTA */}
        <button
          onClick={handleUpgrade}
          className={`
            w-full py-3 rounded-xl font-medium tracking-wide transition-all duration-300
            ${
              glow
                ? "bg-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.6)] scale-[1.01]"
                : "bg-blue-600 hover:bg-blue-500"
            }
          `}
        >
          Upgrade to {upgradeTier.toUpperCase()} Access
        </button>

        {/* micro trust line */}
        <p className="text-center text-xs text-white/40">
          Secure checkout via Stripe • Instant unlock after payment
        </p>
      </div>
    </div>
  );
}