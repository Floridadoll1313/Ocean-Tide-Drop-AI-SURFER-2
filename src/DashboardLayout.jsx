import { useEffect, useMemo, useState } from "react";

export default function DashboardLayout() {
  const [view, setView] = useState("core");

  // 🌊 SYSTEM METRICS (simulated but realistic)
  const [state, setState] = useState({
    revenue: 12840,
    mrrGrowth: 6.4,
    leads: 92,
    conversion: 3.8,
    agents: 14,
    uptime: 99.98,
    activeFlows: 7,
  });

  // 🌊 LIVE SYSTEM SIMULATION LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 140),
        leads: prev.leads + Math.floor(Math.random() * 2),
        conversion: +(prev.conversion + (Math.random() - 0.5) * 0.1).toFixed(2),
        mrrGrowth: +(prev.mrrGrowth + (Math.random() - 0.5) * 0.2).toFixed(2),
      }));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const panels = useMemo(
    () => ({
      core: {
        title: "Core Intelligence Layer",
        desc:
          "AI is continuously analyzing user behavior, pricing elasticity, and conversion probability across all funnels.",
        items: [
          "Intent scoring model: ACTIVE",
          "Revenue optimization engine: RUNNING",
          "Behavior prediction layer: LEARNING",
          "Autonomous pricing system: OPTIMIZING",
        ],
      },

      agents: {
        title: "Autonomous AI Swarm",
        desc:
          "Independent agents execute growth operations without human intervention.",
        items: [
          "LeadHunter Agent → scanning inbound traffic",
          "Closer Agent → optimizing checkout conversion",
          "Follow-up Agent → reactivating cold leads",
          "Pricing Agent → adjusting offer tiers dynamically",
        ],
      },

      revenue: {
        title: "Revenue Control Plane",
        desc:
          "Financial performance is being optimized through autonomous feedback loops.",
        items: [
          "Dynamic pricing engine: ACTIVE",
          "MRR stabilization logic: ENABLED",
          "Upsell triggers: RUNNING",
          "Revenue prediction model: TRAINING",
        ],
      },

      leads: {
        title: "Live Lead Stream",
        desc:
          "Incoming users are being scored and routed in real time.",
        items: [
          "High intent SaaS founder → score 94%",
          "Startup visitor → pricing page depth detected",
          "Organic traffic → engagement spike",
          "Returning user → upsell eligible",
        ],
      },
    }),
    []
  );

  const active = panels[view];

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* 🌊 SIDEBAR OS */}
      <div className="w-72 border-r border-white/10 p-5 bg-black/60 backdrop-blur">

        <div className="text-xs text-white/40 tracking-[0.25em] mb-6">
          OCEAN TIDE OS
        </div>

        <div className="space-y-2">
          {Object.keys(panels).map((key) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`w-full text-left px-3 py-2 rounded transition ${
                view === key
                  ? "bg-white/10 text-cyan-300"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {key === "core" && "🌊 Core Intelligence"}
              {key === "agents" && "🤖 AI Swarm"}
              {key === "revenue" && "💰 Revenue Engine"}
              {key === "leads" && "📡 Live Leads"}
            </button>
          ))}
        </div>

        {/* SYSTEM STATUS */}
        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-white/40 space-y-1">
          <div>Uptime: {state.uptime}%</div>
          <div>Active Flows: {state.activeFlows}</div>
          <div>Agents: {state.agents}</div>
        </div>
      </div>

      {/* 🌊 MAIN */}
      <div className="flex-1 p-8 relative">

        {/* ambient ocean glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] bg-cyan-500 blur-3xl rounded-full top-[-200px] left-[100px]" />
          <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-3xl rounded-full bottom-[-200px] right-[100px]" />
        </div>

        {/* TOP METRICS */}
        <div className="grid grid-cols-4 gap-4 mb-8">

          <Metric label="Revenue" value={`$${state.revenue.toLocaleString()}`} />
          <Metric label="MRR Growth" value={`+${state.mrrGrowth}%`} />
          <Metric label="Leads" value={state.leads} />
          <Metric label="Conversion" value={`${state.conversion}%`} />

        </div>

        {/* MAIN PANEL */}
        <div className="border border-white/10 bg-white/5 rounded-xl p-6 min-h-[420px]">

          <div className="mb-6">
            <h1 className="text-2xl font-bold">{active.title}</h1>
            <p className="text-white/60 mt-2">{active.desc}</p>
          </div>

          <div className="space-y-3">
            {active.items.map((item, i) => (
              <div
                key={i}
                className="bg-black/40 border border-white/10 p-3 rounded"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER SIGNAL */}
        <div className="mt-6 text-xs text-white/30">
          AI OS running continuous optimization loop • no manual intervention required
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="text-xs text-white/40">{label}</div>
      <div className="text-xl font-bold text-cyan-300">{value}</div>
    </div>
  );
}
