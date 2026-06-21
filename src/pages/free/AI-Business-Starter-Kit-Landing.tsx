// 🌊 AI-Business-Starter-Kit.tsx (Step 1 - Bronze Version)

import React from "react";

/**
 * TierGate (simple version)
 * Controls access by tier level
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
{/* 🔵 STEP 2–4 (WAVE TIER) */}
<TierGate tier={tier} minTier="wave" rank={rank}>
  <section className="space-y-6">

    {/* STEP 2 */}
    <div className="p-4 border border-blue-400/20 rounded-lg">
      <h2 className="text-xl font-semibold">
        Step 2: Copy Starter Prompts
      </h2>
      <p className="opacity-70 mt-2">
        Full prompt library unlocked — build your first AI workflows.
      </p>
    </div>

    {/* STEP 3 */}
    <div className="p-4 border border-blue-400/20 rounded-lg">
      <h2 className="text-xl font-semibold">
        Step 3: Automate One Task
      </h2>
      <p className="opacity-70 mt-2">
        Connect AI to a real business action (content, leads, or sales).
      </p>
    </div>

    {/* STEP 4 */}
    <div className="p-4 border border-blue-400/20 rounded-lg">
      <h2 className="text-xl font-semibold">
        Step 4: First Win System
      </h2>
      <p className="opacity-70 mt-2">
        Turn your first automated output into measurable income flow.
      </p>
    </div>

  </section>
</TierGate>
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
  rank = 0,
}: {
  tier: string;
  rank?: number;
}) {
  return (
    <div className="space-y-10 p-6 text-white">

      {/* 🟢 PUBLIC SURFACE */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          AI Business Starter Kit
        </h1>
        <p className="opacity-70">
          Surf Edition — start building your AI income wave 🌊
        </p>
      </header>

      <section className="p-4 border border-white/10 rounded-lg">
        <h2 className="text-xl font-semibold">
          What you’ll build
        </h2>
        <p className="opacity-70">
          A step-by-step system that turns ideas into automated AI income streams.
        </p>
      </section>

      {/* 🟤 STEP 1 (BRONZE ONLY) */}
      <TierGate tier={tier} minTier="bronze" rank={rank}>
        <section className="p-4 border border-blue-400/20 rounded-lg">
          <h2 className="text-xl font-semibold">
            Step 1: Pick Your AI Role
          </h2>

          <p className="opacity-70 mt-2">
            This is your foundation layer. Choose how your AI earns for you:
          </p>

          <ul className="mt-3 space-y-1 opacity-80">
            <li>• AI Content Builder</li>
            <li>• AI Lead Generator</li>
            <li>• AI Automation Assistant</li>
            <li>• AI Sales Closer System</li>
          </ul>

          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded">
            <p className="text-sm">
              💡 Locked behind your current tide level — upgrade to unlock deeper systems
            </p>
          </div>

          <button className="mt-4 px-4 py-2 bg-blue-500 rounded">
            Continue Journey 🌊
          </button>
        </section>
      </TierGate>

    </div>
  );
}