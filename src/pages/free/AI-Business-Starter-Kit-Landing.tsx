// 🌊 AI-Business-Starter-Kit.tsx

import React from "react";

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
  return (
    <div className="space-y-10 p-6 text-white">

      {/* 🟢 PUBLIC */}
      <header>
        <h1 className="text-3xl font-bold">
          AI Business Starter Kit
        </h1>
        <p className="opacity-70">
          Surf Edition — start building your AI income wave 🌊
        </p>
      </header>

      {/* 🟤 STEP 1 */}
      <TierGate tier={tier} minTier="bronze">
        <section className="p-4 border border-blue-400/20 rounded-lg">
          <h2>Step 1: Pick Your AI Role</h2>
          <p className="opacity-70 mt-2">
            Choose your automation identity.
          </p>

          <ul className="mt-3 space-y-1">
            <li>• AI Content Builder</li>
            <li>• AI Lead Generator</li>
            <li>• AI Automation Assistant</li>
            <li>• AI Sales Closer System</li>
          </ul>
        </section>
      </TierGate>

      {/* 🔵 STEP 2–4 */}
      <TierGate tier={tier} minTier="wave">
        <section className="space-y-6">

          <div>
            <h2>Step 2: Copy Starter Prompts</h2>
            <p className="opacity-70">
              Prompt library unlocked.
            </p>
          </div>

          <div>
            <h2>Step 3: Automate One Task</h2>
            <p className="opacity-70">
              Build your first workflow.
            </p>
          </div>

          <div>
            <h2>Step 4: First Win System</h2>
            <p className="opacity-70">
              Turn automation into income.
            </p>
          </div>

        </section>
      </TierGate>

    </div>
  );
}