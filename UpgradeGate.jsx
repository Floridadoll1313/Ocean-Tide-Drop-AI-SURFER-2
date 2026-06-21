export default function UpgradeGate({
  currentTier,
  requiredTier,
  title = "Unlock this feature",
  description = "Upgrade to access deeper systems 🌊",
  upgradeTier = "wave",
}) {
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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="max-w-md w-full border border-white/10 rounded-xl p-6 space-y-4 text-center bg-white/5">

        <h1 className="text-2xl font-bold">
          🌊 {title}
        </h1>

        <p className="text-gray-400">
          {description}
        </p>

        {/* TIER INFO */}
        <div className="text-sm text-gray-500">
          Current: <b>{currentTier}</b> <br />
          Required: <b>{requiredTier}</b>
        </div>

        {/* TEASER */}
        <div className="p-4 border border-white/10 rounded bg-white/5 text-sm text-gray-400">
          ✨ Preview locked content is generating systems, automations, and AI workflows designed to scale income.
        </div>

        {/* UPGRADE BUTTON */}
        <button
          onClick={handleUpgrade}
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded"
        >
          Unlock {upgradeTier.toUpperCase()} 🌊
        </button>

        <p className="text-xs text-gray-500">
          Instant unlock after payment via Stripe
        </p>

      </div>
    </div>
  );
}