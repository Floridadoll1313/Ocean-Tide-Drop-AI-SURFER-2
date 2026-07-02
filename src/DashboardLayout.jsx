import { useState } from "react";

export default function DashboardLayout() {
  const [view, setView] = useState("core");

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* 🌊 SIDEBAR OS MENU */}
      <div className="w-64 border-r border-white/10 p-4 space-y-3">

        <div className="text-xs text-white/40 mb-4">
          AI OPERATING SYSTEM
        </div>

        <button onClick={() => setView("core")} className="block text-left w-full hover:text-cyan-400">
          🌊 Core Intelligence
        </button>

        <button onClick={() => setView("agents")} className="block text-left w-full hover:text-cyan-400">
          🤖 AI Agents
        </button>

        <button onClick={() => setView("revenue")} className="block text-left w-full hover:text-cyan-400">
          💰 Revenue Engine
        </button>

        <button onClick={() => setView("leads")} className="block text-left w-full hover:text-cyan-400">
          📡 Lead Stream
        </button>

        <button onClick={() => setView("settings")} className="block text-left w-full hover:text-cyan-400">
          ⚙️ System Settings
        </button>
      </div>

      {/* 🌊 MAIN VIEW */}
      <div className="flex-1 p-8">

        {view === "core" && (
          <div>
            <h1 className="text-3xl font-bold">🌊 Core Intelligence</h1>
            <p className="text-white/60 mt-2">
              Your AI system is analyzing market signals and optimizing revenue paths in real time.
            </p>
          </div>
        )}

        {view === "agents" && (
          <div>
            <h1 className="text-3xl font-bold">🤖 Active AI Agents</h1>
            <p className="text-white/60 mt-2">
              12 agents running: sales, lead scoring, pricing optimization, follow-up automation.
            </p>
          </div>
        )}

        {view === "revenue" && (
          <div>
            <h1 className="text-3xl font-bold">💰 Revenue Engine</h1>
            <p className="text-white/60 mt-2">
              AI is currently optimizing conversion paths and pricing tiers.
            </p>
          </div>
        )}

        {view === "leads" && (
          <div>
            <h1 className="text-3xl font-bold">📡 Live Lead Stream</h1>
            <p className="text-white/60 mt-2">
              Incoming leads are being scored and routed automatically.
            </p>
          </div>
        )}

        {view === "settings" && (
          <div>
            <h1 className="text-3xl font-bold">⚙️ System Settings</h1>
            <p className="text-white/60 mt-2">
              Configure AI behavior, pricing logic, and automation rules.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
