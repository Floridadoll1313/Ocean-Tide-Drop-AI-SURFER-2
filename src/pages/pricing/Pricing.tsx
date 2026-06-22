/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

/**
 * Stripe JSX typing
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "pricing-table-id": string;
        "publishable-key": string;
      };
    }
  }
}

export default function Pricing() {
  const { user, loginWithGoogle } = useAuth();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const [isInIframe] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    }
    return false;
  });

  /**
   * 🌊 STRIPE CHECKOUT (REAL ONLY)
   */
  const handleCheckout = async (tier: { slug: string; name: string }) => {
    if (!user) {
      try {
        await loginWithGoogle();
      } catch (err) {
        alert("Open in a new tab to continue checkout 🌊");
        return;
      }
    }

    setLoadingTier(tier.slug);

    try {
      const resp = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.uid,
          email: user?.email,
          tierId: tier.slug,
        }),
      });

      const data = await resp.json();

      if (resp.ok && data.url) {
        window.location.assign(data.url);
      } else {
        alert("Stripe not configured. Please set up backend checkout endpoint.");
      }
    } catch (err) {
      alert("Checkout failed. Check server connection.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      {/* 🌊 HEADER */}
      <div className="text-center py-10 space-y-3">
        <h1 className="text-5xl font-black text-cyan-400">
          Pricing
        </h1>

        <p className="text-white/60 max-w-xl mx-auto">
          Upgrade your AI system. Unlock automation, workflows, and revenue engines.
        </p>

        <div className="text-xs text-white/40">
          Starter → $29 • Growth → <span className="text-cyan-300">$99 (core plan)</span> • Enterprise → $250+
        </div>
      </div>

      {/* ⚠️ IFRAME WARNING */}
      {isInIframe && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-4 rounded-lg mb-10 text-sm">
          Open in a new tab for full Stripe checkout 🌊
        </div>
      )}

      {/* 🌊 PRICING GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* 🧠 $99 CORE PLAN */}
        <div className="border border-cyan-500/30 bg-white/5 rounded-2xl p-6 scale-[1.05] shadow-[0_0_40px_rgba(0,255,255,0.1)]">
          <div className="text-cyan-300 text-xs font-bold mb-2">
            MOST POPULAR
          </div>

          <h2 className="text-2xl font-bold">Growth Wave</h2>

          <div className="text-4xl font-black my-3">
            $99<span className="text-sm text-white/50">/mo</span>
          </div>

          <p className="text-white/60 text-sm mb-4">
            Full AI system, automation engine, and business workflows.
          </p>

          <button
            onClick={() => handleCheckout({ slug: "wave", name: "Growth Wave" })}
            disabled={loadingTier !== null}
            className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400"
          >
            {loadingTier === "wave" ? "Processing..." : "Upgrade Now"}
          </button>
        </div>

        {/* 🧊 STARTER */}
        <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold">Starter Wave</h2>

          <div className="text-3xl font-bold my-3">$29/mo</div>

          <p className="text-white/60 text-sm mb-4">
            Basic AI tools and entry-level workflows.
          </p>

          <button
            onClick={() => handleCheckout({ slug: "bronze", name: "Starter Wave" })}
            disabled={loadingTier !== null}
            className="w-full py-2 bg-white/10 rounded-xl"
          >
            Start Here
          </button>
        </div>

        {/* 🧊 ENTERPRISE */}
        <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold">Enterprise Tide</h2>

          <div className="text-3xl font-bold my-3">$250/mo</div>

          <p className="text-white/60 text-sm mb-4">
            Custom AI systems & full-scale integrations.
          </p>

          <button
            onClick={() => handleCheckout({ slug: "enterprise", name: "Enterprise Tide" })}
            disabled={loadingTier !== null}
            className="w-full py-2 bg-white/10 rounded-xl"
          >
            Contact / Upgrade
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}