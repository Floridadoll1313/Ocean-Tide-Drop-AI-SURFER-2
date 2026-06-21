import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PageWrapper from '../../components/PageWrapper';

const TIERS: Record<string, {
  title: string;
  color: string;
  glow: string;
  description: string;
  value?: string[];
}> = {
  "dawn-patrol": {
    title: "Dawn Patrol",
    color: "text-slate-300",
    glow: "shadow-[0_0_40px_rgba(200,200,255,0.3)]",
    description: "Entry-level access to your AI system.",
    value: ["Basic tools", "Starter workflows", "Community access"]
  },
  "breakline": {
    title: "Breakline",
    color: "text-[#00eaff]",
    glow: "shadow-[0_0_40px_rgba(0,255,255,0.5)]",
    description: "Expanded automation and workflow control.",
    value: ["Automation systems", "AI prompt library", "Growth tools"]
  },
  "hatteras-island": {
    title: "Surfer Elite",
    color: "text-pink-500",
    glow: "shadow-[0_0_40px_rgba(255,0,128,0.5)]",
    description: "Advanced creative + business AI systems.",
    value: ["Revenue systems", "Advanced AI workflows", "Priority access"]
  },
  "cape-point": {
    title: "Cape Point",
    color: "text-yellow-300",
    glow: "shadow-[0_0_40px_rgba(255,215,0,0.5)]",
    description: "Full-stack AI business architecture.",
    value: ["Full SaaS system", "Unlimited workflows", "Enterprise tools"]
  },
};

export default function PricingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const tierId = slug || "dawn-patrol";
  const tier = TIERS[tierId] || TIERS["dawn-patrol"];

  const [activated, setActivated] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { user, loginWithGoogle } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setActivated(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      try {
        await loginWithGoogle();
      } catch {
        alert("Please open in a new tab to continue checkout 🌊");
      }
      return;
    }

    setLoadingCheckout(true);

    try {
      const resp = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          tierId,
        }),
      });

      const data = await resp.json();

      if (resp.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe not configured. Please set up pricing products.");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Check console.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="relative flex items-center justify-center py-12 w-full min-h-[70vh] bg-black">

        {/* 🌊 BACKGROUND */}
        <div className="absolute inset-0 opacity-30 blur-[120px]"
          style={{
            background: "radial-gradient(circle at 50% 40%, rgba(0,255,255,0.25), transparent 60%)"
          }}
        />

        {/* 💳 MAIN CARD */}
        <div className={`relative max-w-2xl w-full p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl text-center transition-all duration-700 ${tier.glow}`}>

          <h1 className={`text-4xl font-black uppercase mb-3 ${tier.color}`}>
            {tier.title}
          </h1>

          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            Subscription Tier
          </p>

          <p className="text-white/70 mb-8">
            {tier.description}
          </p>

          {/* 🌊 VALUE STACK */}
          <div className="mb-8 space-y-2 text-sm text-white/60">
            {tier.value?.map((v, i) => (
              <div key={i}>✔ {v}</div>
            ))}
          </div>

          {/* 💡 SaaS framing line */}
          <div className="text-xs text-white/40 mb-8">
            Cancel anytime • Instant unlock after payment • Secure Stripe checkout
          </div>

          {/* 💳 CTA */}
          <button
            onClick={handleSubscribe}
            disabled={loadingCheckout}
            className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest transition-all ${
              loadingCheckout
                ? "opacity-50"
                : "bg-white text-black hover:bg-cyan-400"
            }`}
          >
            {loadingCheckout
              ? "Processing..."
              : user
              ? "Subscribe & Unlock"
              : "Sign In to Continue"}
          </button>

          {/* BACK */}
          <Link
            to="/pricing"
            className="inline-block mt-6 text-xs text-white/40 hover:text-white uppercase tracking-widest"
          >
            ← Back to Pricing
          </Link>
        </div>

        {/* ⚡ AUTO REVEAL OVERLAY */}
        {activated && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl z-50">
            <div className="text-center space-y-6">

              <div className={`text-3xl font-black uppercase ${tier.color}`}>
                Ready to Upgrade
              </div>

              <p className="text-white/60 text-sm max-w-sm mx-auto">
                This tier unlocks a complete AI system layer designed for scaling digital income workflows.
              </p>

              <button
                onClick={handleSubscribe}
                className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-cyan-400 transition"
              >
                Enter {tier.title}
              </button>

              <Link to="/pricing" className="block text-xs text-white/40 mt-4">
                Cancel
              </Link>

            </div>
          </div>
        )}

      </div>
    </PageWrapper>
  );
}