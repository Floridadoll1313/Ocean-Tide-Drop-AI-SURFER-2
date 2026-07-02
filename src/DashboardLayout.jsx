import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const [view, setView] = useState("core");
  const [events, setEvents] = useState([]);
  const [metrics, setMetrics] = useState({
    agents: 142,
    leads: 18,
    revenue: 4821,
    uptime: 99.98,
  });

  // 🌊 LIVE SYSTEM SIMULATION LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      const samples = [
        "🤖 Agent WaveCloser-7 optimized conversion path",
        "🌊 New high-intent lead detected from pricing page",
        "⚡ Revenue engine recalibrated pricing tier",
        "📈 Lead score increased via behavioral tracking",
        "🧠 AI cluster redistributed workload across agents",
        "💳 Stripe event simulated: checkout progression detected",
      ];

      const newEvent = samples[Math.floor(Math.random() * samples.length)];

      setEvents((prev) => [newEvent, ...prev.slice(0, 8)]);

      setMetrics((prev) => ({
        ...prev,
        leads: prev.leads + (Math.random() > 0.7 ? 1 : 0),
        revenue: prev.revenue + Math.floor(Math.random() * 12),
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden relative">

      {/* 🌊 OCEAN BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 blur-3xl rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-3xl rounded-full bottom-[-200px] right-[-200px]" />
      </div>

      {/* 🧭 SIDEBAR OS CONTROL */}
      <div className="w-64 border-r border-white/10 p-4 relative z-10 backdrop-blur">

        <div className="text-cyan-400 font-bold text-lg mb-4">
          🌊 OCEAN OS
        </div>

        {[
          ["core", "🧠 Core System"],
          ["agents", "🤖 AI Agents"],
          ["stream", "🌊 Event Stream"],
          ["metrics", "📈 Telemetry"],
          ["terminal", "⚡ Command Layer"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`block w-full text-left px-3 py-2 rounded mb-1 transition ${
              view === id
                ? "bg-cyan-500 text-black"
                : "hover:bg-white/10 text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 🧠 MAIN OS PANEL */}
      <div className="flex-1 p-6 relative z-10 overflow-auto">

        {/* 📊 SYSTEM METRICS BAR */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">AI Agents</div>
            <div className="text-2xl text-cyan-400 font-bold">
              {metrics.agents}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">Leads</div>
            <div className="text-2xl font-bold">{metrics.leads}</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">Revenue</div>
            <div className="text-2xl text-green-400 font-bold">
              ${metrics.revenue}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/50">Uptime</div>
            <div className="text-2xl text-blue-400 font-bold">
              {metrics.uptime}%
            </div>
          </div>
        </div>

        {/* 🧠 CORE SYSTEM VIEW */}
        {view === "core" && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">🧠 AI Operating Core</h1>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
              🌊 Ocean OS is actively orchestrating AI agents, revenue flows, and lead intelligence in real time.
            </div>

            <div className="text-sm text-white/50">
              System status: ACTIVE • Neural mesh: ONLINE • Optimization loop: RUNNING
            </div>
          </div>
        )}

        {/* 🤖 AGENTS VIEW */}
        {view === "agents" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">🤖 AI Agent Swarm</h1>

            <div className="space-y-2">
              {[
                "WaveCloser-7",
                "LeadHunter-3",
                "Optimizer-X",
                "RevenueBot-12",
                "BehaviorMapper-2"
              ].map((a) => (
                <div
                  key={a}
                  className="bg-white/5 border border-white/10 p-3 rounded"
                >
                  ⚡ {a} — ACTIVE — learning & optimizing
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🌊 EVENT STREAM */}
        {view === "stream" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">🌊 Live Event Stream</h1>

            <div className="space-y-2 font-mono text-sm">
              {events.map((e, i) => (
                <div
                  key={i}
                  className="bg-black border border-white/10 p-3 rounded"
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 📈 TELEMETRY */}
        {view === "metrics" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">📈 System Telemetry</h1>

            <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2">
              <div>📊 Conversion flow: OPTIMIZING</div>
              <div>⚡ Pricing engine: ACTIVE</div>
              <div>🌊 Lead velocity: INCREASING</div>
              <div>🧠 AI decision layer: ADAPTING</div>
            </div>
          </div>
        )}

        {/* ⚡ TERMINAL */}
        {view === "terminal" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">⚡ Command Terminal</h1>

            <div className="bg-black border border-cyan-500 p-4 rounded font-mono text-sm">
              &gt; system.boot: true<br />
              &gt; ai.swarm: 142 nodes active<br />
              &gt; revenue.loop: optimizing<br />
              &gt; lead.stream: live<br />
              &gt; memory.core: stable<br />
              &gt; ocean.os: running<br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
