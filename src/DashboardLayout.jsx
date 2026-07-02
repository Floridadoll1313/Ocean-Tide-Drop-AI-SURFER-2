import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {
  const [view, setView] = useState("home");
  const [time, setTime] = useState(new Date());

  // 🌊 live clock tick (gives “live system” feel)
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const stats = {
    agents: 142,
    leads: 18,
    revenue: 4821,
    uptime: "99.98%"
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden relative">

      {/* 🌊 BACKGROUND GLOW + GRID */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 blur-3xl rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-3xl rounded-full bottom-[-200px] right-[-200px]" />
      </div>

      {/* 🧭 SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-5 space-y-4 relative z-10 backdrop-blur">

        <div className="text-cyan-400 font-bold text-lg">
          🌊 Ocean Control
        </div>

        <div className="text-xs text-white/40">
          {time.toLocaleTimeString()}
        </div>

        <div className="space-y-2 mt-4">

          {[
            ["home", "🏠 Overview"],
            ["agents", "🤖 AI Agents"],
            ["leads", "🌊 Leads Stream"],
            ["revenue", "💰 Revenue Engine"],
            ["terminal", "⚡ Command Terminal"]
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`block w-full text-left px-3 py-2 rounded transition ${
                view === id
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-white/10 text-white/70"
              }`}
            >
              {label}
            </button>
          ))}

        </div>
      </div>

      {/* 🧠 MAIN PANEL */}
      <div className="flex-1 p-6 relative z-10 overflow-auto">

        {/* 📊 TOP STATS BAR */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">AI Agents</div>
            <div className="text-2xl font-bold text-cyan-400">{stats.agents}</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">New Leads</div>
            <div className="text-2xl font-bold">{stats.leads}</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">Revenue</div>
            <div className="text-2xl font-bold text-green-400">
              ${stats.revenue}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">Uptime</div>
            <div className="text-2xl font-bold text-blue-400">
              {stats.uptime}
            </div>
          </div>

        </div>

        {/* 🌊 VIEW ROUTER */}
        {view === "home" && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">
              🌊 System Overview
            </h1>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              🚀 AI systems are actively optimizing revenue flow in real time.
            </div>
          </div>
        )}

        {view === "agents" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">🤖 Live AI Agents</h1>

            <div className="space-y-2">
              {["WaveCloser-7", "LeadHunter-3", "Optimizer-X", "RevenueBot-12"].map(a => (
                <div key={a} className="bg-white/5 p-3 rounded border border-white/10">
                  ⚡ {a} — ACTIVE — processing flows
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "leads" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">🌊 Live Lead Stream</h1>

            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded">🔥 High intent visitor from pricing page</div>
              <div className="bg-white/5 p-3 rounded">🌊 New email captured: founder@startup.com</div>
              <div className="bg-white/5 p-3 rounded">⚡ Lead score increased: 87 → 92</div>
            </div>
          </div>
        )}

        {view === "revenue" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">💰 Revenue Engine</h1>

            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              📈 Monthly growth trending upward +12.4%  
              <br />
              🤖 AI pricing optimization active  
              <br />
              💳 Stripe pipeline connected (simulated UI layer)
            </div>
          </div>
        )}

        {view === "terminal" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">⚡ Command Terminal</h1>

            <div className="bg-black border border-cyan-500 p-4 rounded font-mono text-sm">
              &gt; system.status: active<br />
              &gt; ai.agents: running 142<br />
              &gt; revenue.loop: optimizing<br />
              &gt; leads.stream: live<br />
              &gt; security: stable<br />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
