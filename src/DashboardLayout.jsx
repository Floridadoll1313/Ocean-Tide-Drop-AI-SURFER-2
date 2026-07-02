import { useState } from "react";

// 🔧 Toggle this when debugging
const DEBUG_OVERRIDE = false;

export default function DashboardLayout({ children }) {
  const [view, setView] = useState("home");

  // 🚨 DEBUG MODE (safe + reversible)
  if (DEBUG_OVERRIDE) {
    return (
      <div className="min-h-screen bg-red-600 text-white flex items-center justify-center text-3xl font-bold">
        🚨 DASHBOARD OVERRIDE ACTIVE
      </div>
    );
  }

  // 🌊 REAL SAAS DASHBOARD SHELL
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-4 space-y-4">
        <div className="font-bold text-cyan-400">
          🌊 Ocean Command
        </div>

        <button onClick={() => setView("home")} className="block text-left w-full hover:text-cyan-300">
          Home
        </button>

        <button onClick={() => setView("ai")} className="block text-left w-full hover:text-cyan-300">
          AI Agents
        </button>

        <button onClick={() => setView("leads")} className="block text-left w-full hover:text-cyan-300">
          Leads
        </button>

        <button onClick={() => setView("revenue")} className="block text-left w-full hover:text-cyan-300">
          Revenue
        </button>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 p-6">

        {view === "home" && (
          <div>
            <h1 className="text-3xl font-bold">🌊 Dashboard Overview</h1>
            <p className="text-white/60 mt-2">
              Your AI systems are actively running growth operations.
            </p>
          </div>
        )}

        {view === "ai" && (
          <div>
            <h1 className="text-2xl font-bold">🤖 AI Agents</h1>
            <p className="text-white/60 mt-2">
              142 agents currently active and optimizing conversions.
            </p>
          </div>
        )}

        {view === "leads" && (
          <div>
            <h1 className="text-2xl font-bold">🌊 Leads</h1>
            <p className="text-white/60 mt-2">
              Real-time lead flow monitoring system.
            </p>
          </div>
        )}

        {view === "revenue" && (
          <div>
            <h1 className="text-2xl font-bold">💰 Revenue</h1>
            <p className="text-white/60 mt-2">
              AI-driven revenue tracking and forecasting.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
