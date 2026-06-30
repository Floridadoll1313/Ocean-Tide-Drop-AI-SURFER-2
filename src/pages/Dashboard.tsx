import { useState } from "react";
import AuthGate from "./AuthGate";
import FeatureGate from "./FeatureGate";

// 1. Sleek Upsell / Locked State Card
function VelocityDropUpsell() {
  return (
    <div className="p-8 rounded-xl border border-slate-800 bg-[#111625] text-center max-w-2xl mx-auto shadow-2xl">
      <h3 className="text-2xl font-bold mb-2 text-white">🔒 Velocity Drop Premium Exclusive 💧👄</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        Ready to paddle out into deep water? Unlock full interactive canvas access, advanced generation models, and real-time lead automation pipelines.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[#0A0E1A] border border-slate-800 hover:border-[#00F5FF]/40 transition">
          <h4 className="font-semibold text-white text-sm mb-1">Velocity Drop Tier 1</h4>
          <span className="text-xl font-bold text-[#00F5FF]">$249</span>
          <p className="text-xs text-slate-500 mt-1">Core automations & workspace tools</p>
        </div>
        <div className="p-4 rounded-lg bg-[#0A0E1A] border border-slate-800 hover:border-[#00F5FF]/40 transition">
          <h4 className="font-semibold text-white text-sm mb-1">Velocity Drop Tier 2</h4>
          <span className="text-xl font-bold text-[#00F5FF]">$349</span>
          <p className="text-xs text-slate-500 mt-1">Full pipeline automation + custom configuration</p>
        </div>
      </div>

      <button className="w-full bg-[#00F5FF] hover:bg-cyan-400 text-[#0A0E1A] font-bold py-3 px-6 rounded-lg transition shadow-[0_0_15px_rgba(0,245,255,0.2)]">
        Upgrade Membership Access
      </button>
    </div>
  );
}

// 2. Navigation Sidebar
function Sidebar({ setView, currentView }) {
  return (
    <div className="w-64 bg-[#0A0E1A] border-r border-slate-800 p-6 flex flex-column gap-2 text-white">
      <h2 className="text-xl font-extrabold tracking-tight text-white mb-6 flex items-center gap-2">
        🌊 AI Surfer
      </h2>

      <nav className="flex flex-col gap-2 w-full">
        <button 
          onClick={() => setView("home")} 
          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === "home" ? "bg-slate-800 text-[#00F5FF]" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setView("tools")} 
          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === "tools" ? "bg-slate-800 text-[#00F5FF]" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          AI Tools
        </button>
        <button 
          onClick={() => setView("billing")} 
          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === "billing" ? "bg-slate-800 text-[#00F5FF]" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          Billing
        </button>
        <button 
          onClick={() => setView("profile")} 
          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${currentView === "profile" ? "bg-slate-800 text-[#00F5FF]" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
        >
          Profile Settings
        </button>
      </nav>
    </div>
  );
}

// 3. Premium Interactive Canvas Grid
function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#111625] border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 p-6 rounded-xl shadow-lg transition group">
        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">🧠</div>
        <h4 className="text-white font-bold text-lg">Content Generator</h4>
        <p className="text-slate-400 text-sm mt-1">Generate strategic marketing collateral tailored to business niches.</p>
      </div>
      <div className="bg-[#111625] border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 p-6 rounded-xl shadow-lg transition group">
        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">📈</div>
        <h4 className="text-white font-bold text-lg">Lead Finder</h4>
        <p className="text-slate-400 text-sm mt-1">Parse regional parameters to locate high-value technical pipelines.</p>
      </div>
      <div className="bg-[#111625] border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 p-6 rounded-xl shadow-lg transition group">
        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">🌊</div>
        <h4 className="text-white font-bold text-lg">Automation Bot</h4>
        <p className="text-slate-400 text-sm mt-1">Deploy asynchronous operations straight to cloud instances.</p>
      </div>
      <div className="bg-[#111625] border border-[#00F5FF]/10 hover:border-[#00F5FF]/30 p-6 rounded-xl shadow-lg transition group">
        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">💬</div>
        <h4 className="text-white font-bold text-lg">AI Chat Assistant</h4>
        <p className="text-slate-400 text-sm mt-1">A direct conversational interface wired into standard workflow documentation.</p>
      </div>
    </div>
  );
}

// 4. Managed Router Context 
function MainView({ view }) {
  if (view === "tools") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-extrabold tracking-wide text-white">AI Tools Suite</h2>
        </div>
        {/* The FeatureGate wraps the premium canvas entirely */}
        <FeatureGate fallback={<VelocityDropUpsell />}>
          <ToolsGrid />
        </FeatureGate>
      </div>
    );
  }

  if (view === "billing") {
    return (
      <div className="bg-[#111625] border border-slate-800 p-6 rounded-xl max-w-xl">
        <h2 className="text-xl font-bold text-white mb-2">💳 Payment Setup</h2>
        <p className="text-slate-400 text-sm mb-4">Manage plans, retrieve invoices, or update structural recurring profiles via the secure portal interface.</p>
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
        <p className="text-slate-400 text-sm">Review your active deployment instances, developer access tokens, and administrative account identities.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-black text-white tracking-wide">Welcome to the Lineup</h2>
      <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
        This is your central control dashboard. Use the side navigation tree to coordinate developer components or optimize automation pipelines.
      </p>
    </div>
  );
}

// 5. Main Root View Container Wrapped in Global Auth
export default function DashboardLayout() {
  const [view, setView] = useState("home");

  return (
    <AuthGate>
      <div className="flex h-screen w-full bg-[#0A0E1A] font-sans antialiased select-none overflow-hidden">
        <Sidebar setView={setView} currentView={view} />
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-[#0A0E1A] to-[#121829]">
          <MainView view={view} />
        </div>
      </div>
    </AuthGate>
  );
}
