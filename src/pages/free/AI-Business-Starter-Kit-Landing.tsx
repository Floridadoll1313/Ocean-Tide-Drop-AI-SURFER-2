import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

/**
 * Stripe init (client-side)
 */
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

/**
 * TierGate system
 */
function TierGate({
  tier,
  minTier,
  children,
}: {
  tier: string;
  minTier: string;
  children: React.ReactNode;
}) {
  const levels = ["free", "bronze", "wave", "tsunami"];

  const hasAccess =
    levels.indexOf(tier) >= levels.indexOf(minTier);

  if (!hasAccess) {
    return (
      <div className="p-4 border border-white/10 opacity-40 rounded-lg">
        <p className="text-sm">
          Locked behind your current tide level 🌊
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * MAIN PAGE
 */
export default function AIBusinessStarterKit({
  tier = "free",
}: {
  tier: string;
}) {
  const [role, setRole] = useState<string | null>(null);

  /**
   * 🌊 STRIPE CHECKOUT (STEP 6 FULL IMPLEMENTATION)
   */
  async function handleUpgrade(tierToBuy: string = "wave") {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier: tierToBuy }),
      });

      const session = await res.json();

      const stripe = await stripePromise;

      if (!stripe) {
        alert("Stripe failed to load 🌊");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error(error);
        alert("Stripe redirect failed 🌊");
      }

    } catch (err) {
      console.error(err);
      alert("Payment failed to start 🌊");
    }
  }

  return (
    <div className="space-y-10 p-6 text-white">

      {/* 🟢 HEADER */}
      <header>
        <h1 className="text-3xl font-bold">
          AI Business Starter Kit
        </h1>
        <p className="opacity-70">
          Surf Edition — build your AI income wave 🌊
        </p>
      </header>

      {/* 🌊 PROGRESS BAR */}
      <div className="mb-6">
        <p className="text-sm opacity-70 mb-2">
          Your Tide Progress 🌊
        </p>

        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-700"
            style={{
              width:
                tier === "free"
                  ? "10%"
                  : tier === "bronze"
                  ? "35%"
                  : tier === "wave"
                  ? "70%"
                  : "100%",
            }}
          />
        </div>
      </div>

      {/* 🟤 STEP 1 */}
      <TierGate tier={tier} minTier="bronze">
        <section className="p-4 border border-blue-400/20 rounded-lg">

          <h2 className="text-xl font-semibold">
            Step 1: Pick Your AI Role
          </h2>

          <p className="opacity-70 mt-2">
            Choose your automation identity.
          </p>

          <ul className="mt-3 space-y-1 opacity-80">
            <li>• AI Content Builder</li>
            <li>• AI Lead Generator</li>
            <li>• AI Automation Assistant</li>
            <li>• AI Sales Closer System</li>
          </ul>

          {/* ROLE SELECTOR */}
          <div className="mt-4 space-y-2">
            <p className="text-sm opacity-70">
              Choose your AI identity:
            </p>

            {[
              "AI Content Builder",
              "AI Lead Generator",
              "AI Automation Assistant",
              "AI Sales Closer",
            ].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`block px-3 py-2 rounded border ${
                  role === r ? "bg-blue-500" : "border-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

        </section>
      </TierGate>

      {/* 🔵 STEP 2–4 (LOCKED + STRIPE READY) */}
      <TierGate tier={tier} minTier="wave">
        <section className="space-y-6">

          {/* STEP 2 */}
          <div className="relative p-4 border border-blue-400/20 rounded-lg">
            <div className="blur-sm opacity-40">
              <h2>Step 2: Copy Starter Prompts</h2>
              <p>AI prompt library for workflows...</p>
            </div>

            <button
              onClick={() => handleUpgrade("wave")}
              className="mt-3 px-3 py-1 bg-green-500 rounded"
            >
              Unlock Wave Tier 💳
            </button>
          </div>

          {/* STEP 3 */}
          <div className="relative p-4 border border-blue-400/20 rounded-lg">
            <div className="blur-sm opacity-40">
              <h2>Step 3: Automate One Task</h2>
              <p>First AI workflow activation...</p>
            </div>

            <button
              onClick={() => handleUpgrade("wave")}
              className="mt-3 px-3 py-1 bg-green-500 rounded"
            >
              Unlock Wave Tier 💳
            </button>
          </div>

          {/* STEP 4 */}
          <div className="relative p-4 border border-blue-400/20 rounded-lg">
            <div className="blur-sm opacity-40">
              <h2>Step 4: First Win System</h2>
              <p>Turn automation into income...</p>
            </div>

            <button
              onClick={() => handleUpgrade("wave")}
              className="mt-3 px-3 py-1 bg-green-500 rounded"
            >
              Unlock Wave Tier 💳
            </button>
          </div>

        </section>
      </TierGate>

    </div>
  );
}