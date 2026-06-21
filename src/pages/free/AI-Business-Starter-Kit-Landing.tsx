// 🌊 AI-Business-Starter-Kit.tsx

import React, { useState } from "react";

/**
 * TierGate (simple version)
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

export default function AIBusinessStarterKit({
  tier = "free",
  rank = 0,
}: {
  tier: string;
  rank?: number;
}) {
  const [role, setRole] = useState<string | null>(null);

  return (
    <div className="space-y-10 p-6 text-white">

      {/* 🟢 HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          AI Business Starter Kit
        </h1>
        <p className="opacity-70">
          Surf Edition — start building your AI income wave 🌊
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

      {/* 🔵 STEP 2–4 (PREMIUM LOCKED UI) */}
      <TierGate tier={tier} minTier="wave">
        <section className="space-y-6">

          {/* STEP 2 */}
          <div className="relative p-4 border border-blue-400/20 rounded-lg">
            <div className="blur-sm opacity-40">
              <h2>Step 2: Copy Starter Prompts</h2>
              <p>AI prompt library for instant workflows...</p>
            </div>

            <div className="absolute top-3 right-3 text-xs opacity-60">
              Locked 🌊
            </div>

            <button
              className="mt-3 px-3 py-1 bg-blue-500 rounded"
              onClick={() => alert("Upgrade to Wave Tier 🌊")}
            >
              Unlock Wave Tier
            </button>
          </div>

          {/* STEP 3 */}
          <div className="relative p-4 border border-blue-400/20 rounded-lg">
            <div className="blur-sm opacity-40">
              <h2>Step 3: Automate One Task</h2>
              <p>Your first AI workflow activation...</p>
            </div>

            <div className="absolute top-3 right-3 text-xs opacity-60">
              Locked 🌊
            </div>

            <button
              className="mt-3 px-3 py-1 bg-blue-500 rounded"
              onClick={() => alert("Upgrade to Wave Tier 🌊")}
            >
              Unlock Wave Tier
            </button>
          </div>

          {/* STEP 4 */}
          <div className="relative p-4 border border-blue-400/20 rounded-lg">
            <div className="blur-sm opacity-40">
              <h2>Step 4: First Win System</h2>
              <p>Turn automation into measurable results...</p>
            </div>

            <div className="absolute top-3 right-3 text-xs opacity-60">
              Locked 🌊
            </div>

            <button
              className="mt-3 px-3 py-1 bg-blue-500 rounded"
              onClick={() => alert("Upgrade to Wave Tier 🌊")}
            >
              Unlock Wave Tier
            </button>
          </div>

        </section>
      </TierGate>

    </div>
  );
}