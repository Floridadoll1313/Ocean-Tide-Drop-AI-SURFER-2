// 1. Clean Premium Subscription Wall
function PremiumSubscriptionLock() {
  return (
    <div className="p-8 rounded-xl border border-slate-800 bg-[#111625] text-center max-w-2xl mx-auto shadow-2xl">
      <div className="text-3xl mb-3">🌊</div>
      <h3 className="text-2xl font-bold mb-2 text-white">Unlock Full AI Surfer Access</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
        Ready to paddle out into deep water? Gain full access to the interactive canvas, advanced generation modules, and real-time automation streams.
      </p>
      
      <div className="p-5 rounded-lg bg-[#0A0E1A] border border-[#00F5FF]/20 shadow-[0_0_15px_rgba(0,245,255,0.02)] max-w-sm mx-auto mb-6">
        <h4 className="font-bold text-white text-base mb-1">Premium Membership</h4>
        <div className="flex items-baseline justify-center gap-1 text-white">
          <span className="text-3xl font-black text-[#00F5FF]">$17</span>
          <span className="text-xs text-slate-500 font-medium">/ month</span>
        </div>
        <p className="text-xs text-slate-400 mt-2">Cancel anytime • Includes all active dashboard tools</p>
      </div>

      <button className="w-full max-w-sm bg-[#00F5FF] hover:bg-cyan-400 text-[#0A0E1A] font-bold py-3 px-6 rounded-lg transition shadow-[0_0_15px_rgba(0,245,255,0.2)]">
        Subscribe for $17/mo
      </button>
    </div>
  );
}

// 2. Updated Router View
function MainView({ view }) {
  if (view === "tools") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold tracking-wide text-white">AI Tools Suite</h2>
        </div>
        
        {/* FeatureGate now falls back directly to the clean monthly subscription lock */}
        <FeatureGate fallback={<PremiumSubscriptionLock />}>
          <ToolsGrid />
        </FeatureGate>
      </div>
    );
  }

  if (view === "billing") {
    return (
      <div className="bg-[#111625] border border-slate-800 p-6 rounded-xl max-w-xl">
        <h2 className="text-xl font-bold text-white mb-2">💳 Membership & Billing</h2>
        <p className="text-slate-400 text-sm mb-4">
          Manage your recurring subscription plan, update credit card profiles, or review past workspace invoices securely.
        </p>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-4 py-2 rounded-lg text-sm transition">
          Launch Stripe Billing Portal
        </button>
      </div>
    );
  }

  if (view === "profile") {
    return (
      <div className="bg-[#111625] border border-slate-800 p-6 rounded-xl max-w-xl">
        <h2 className="text-xl font-bold text-white mb-2">👤 Profile Configurations</h2>
        <p className="text-slate-400 text-sm">Review your live deployment settings, metadata sync states, and user access parameters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-black text-white tracking-wide">Welcome to the Lineup</h2>
      <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
        This is your central control dashboard. Use the side navigation tree to coordinate developer components or track your database configurations.
      </p>
    </div>
  );
}
