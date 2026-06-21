/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, Sparkles, X } from "lucide-react";

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
  const { user, userData, loginWithGoogle } = useAuth();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const [sandboxModal, setSandboxModal] = useState<{
    isOpen: boolean;
    tierName: string;
    tierSlug: string;
  }>({ isOpen: false, tierName: "", tierSlug: "" });

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
   * 🌊 CHECKOUT FLOW (STRIPE)
   */
  const handleCheckout = async (tier: { slug: string; name: string }) => {
    if (!user) {
      try {
        await loginWithGoogle();
      } catch (err) {
        alert("Please open in a new tab to continue checkout 🌊");
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
        setSandboxModal({
          isOpen: true,
          tierName: tier.name,
          tierSlug: tier.slug,
        });
      }
    } catch (err) {
      setSandboxModal({
        isOpen: true,
        tierName: tier.name,
        tierSlug: tier.slug,
      });
    } finally {
      setLoadingTier(null);
    }
  };

  /**
   * 🌊 SANDBOX (FALLBACK)
   */
  const activateSandbox = async () => {
    if (!user) return;

    let mappedTier: "basic" | "premium" | "enterprise" = "basic";

    if (sandboxModal.tierSlug.includes("premium")) {
      mappedTier = "premium";
    } else if (sandboxModal.tierSlug.includes("enterprise")) {
      mappedTier = "enterprise";
    }

    const userDocRef = doc(db, "users", user.uid);

    const updatedUser = {
      ...userData,
      uid: user.uid,
      email: user.email,
      subscriptionStatus: "active",
      tier: mappedTier,
    };

    await setDoc(userDocRef, updatedUser);

    alert(`Unlocked: ${sandboxModal.tierName} 🌊`);

    setSandboxModal({ isOpen: false, tierName: "", tierSlug: "" });

    window.location.assign("/members");
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      {/* 🌊 SANDBOX MODAL */}
      {sandboxModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-2xl z-50 p-6">
          <div className="max-w-md w-full bg-zinc-950 border border-cyan-500/30 rounded-2xl p-8 text-center space-y-5">

            <button
              onClick={() => setSandboxModal({ isOpen: false, tierName: "", tierSlug: "" })}
              className="absolute top-4 right-4 text-white/50"
            >
              <X />
            </button>

            <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center">
              <Sparkles className="text-cyan-400 animate-pulse" />
            </div>

            <h2 className="text-xl font-bold">Sandbox Mode</h2>

            <p className="text-sm text-white/60">
              Stripe not configured. Activate test upgrade instantly.
            </p>

            <button
              onClick={activateSandbox}
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition"
            >
              Activate {sandboxModal.tierName}
            </button>
          </div>
        </div>
      )}

      {/* 🌊 HEADER (SAAS POSITIONING) */}
      <div className="text-center py-10 space-y-3">
        <h1 className="text-5xl font-black text-cyan-400">
          Pricing
        </h1>

        <p className="text-white/60 max-w-xl mx-auto">
          Choose your system tier. Upgrade your AI infrastructure in minutes.
        </p>

        {/* 💎 ANCHOR PRICE STRATEGY */}
        <div className="text-xs text-white/40">
          Starter → $45 • Growth → <span className="text-cyan-300">$99 (recommended)</span> • Enterprise → $250+
        </div>
      </div>

      {/* ⚠️ IFRAME WARNING */}
      {isInIframe && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-4 rounded-lg mb-10 text-sm">
          Open in a new tab for full Stripe checkout experience 🌊
        </div>
      )}

      {/* 🌊 PRICING GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* 🧠 HARD-CODED $99 PREMIUM ANCHOR (IMPORTANT) */}
        <div className="border border-cyan-500/30 bg-white/5 rounded-2xl p-6 scale-[1.05] shadow-[0_0_40px_rgba(0,255,255,0.1)]">

          <div className="text-cyan-300 text-xs font-bold mb-2">
            MOST POPULAR
          </div>

          <h2 className="text-2xl font-bold">Growth Wave</h2>

          <div className="text-4xl font-black my-3">
            $99<span className="text-sm text-white/50">/mo</span>
          </div>

          <p className="text-white/60 text-sm mb-4">
            Full AI business system + automation engine + revenue tools
          </p>

          <button
            onClick={() => handleCheckout({ slug: "wave", name: "Growth Wave" })}
            className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400"
          >
            Upgrade Now
          </button>
        </div>

        {/* 🧊 LOWER TIER */}
        <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
          <h2 className="text-xl font-bold">Starter Wave</h2>

          <div className="text-3xl font-bold my-3">$29/mo</div>

          <p className="text-white/60 text-sm mb-4">
            Basic AI tools and workflows
          </p>

          <button
            onClick={() => handleCheckout({ slug: "bronze", name: "Starter Wave" })}
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
            Custom AI systems & full integration
          </p>

          <button
            onClick={() => handleCheckout({ slug: "enterprise", name: "Enterprise Tide" })}
            className="w-full py-2 bg-white/10 rounded-xl"
          >
            Contact / Upgrade
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}