import { useEffect, useMemo, useState } from "react";

export default function DashboardLayout() {
  const [view, setView] = useState("core");
  const [command, setCommand] = useState("");

  const [state, setState] = useState({
    revenue: 14290,
    leads: 104,
    conversion: 4.1,
    uptime: 99.99,
    agents: 16,
  });

  const [logs, setLogs] = useState([
    "SYSTEM INIT → Ocean Tide AI OS booted",
    "AGENT SWARM → 16 agents online",
    "LEAD ENGINE → listening on funnel stream",
  ]);

  // 🌊 LIVE SYSTEM SIMULATION LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      setState((s) => ({
        ...s,
        revenue: s.revenue + Math.floor(Math.random() * 160),
        leads: s.leads + (Math.random() > 0.6 ? 1 : 0),
        conversion: +(s.conversion + (Math.random() - 0.5) * 0.1).toFixed(2),
      }));

      const events = [
        "Lead scored HIGH INTENT → routing to conversion agent",
        "Pricing engine adjusted tier elasticity",
        "Agent Closer-3 engaged checkout user",
        "New inbound session detected → analyzing behavior",
        "Upsell trigger fired → email sequence deployed",
      ];

      setLogs((l) => [
        events[Math.floor(Math.random() * events.length)],
        ...l.slice(0, 8),
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const panels = useMemo(
    () => ({
      core: {
        title: "Core Intelligence Layer",
        desc: "Real-time inference engine analyzing behavioral + revenue signals.",
        items: [
          "Intent model: ACTIVE",
          "Revenue optimizer: RUNNING",
          "Behavior prediction: STREAMING",
          "Autonomous decision engine: ONLINE",
        ],
      },
      agents: {
        title: "AI Agent Swarm",
        desc: "Independent agents executing growth tasks in parallel.",
        items: [
          "LeadHunter → scanning traffic",
          "CloserBot → optimizing conversions",
          "FollowUp Engine → reactivating users",
          "Pricing AI → adjusting tiers dynamically",
        ],
      },
      revenue: {
        title: "Revenue Control System",
        desc: "Autonomous financial optimization layer.",
        items: [
          "Dynamic pricing: ENABLED",
          "Upsell automation: ACTIVE",
          "Revenue forecasting: RUNNING",
          "Conversion optimization loop: CLOSED",
        ],
      },
      leads: {
        title: "Live Lead Stream",
        desc: "Every visitor is scored, tracked, and routed automatically.",
        items: [
          "Founder traffic → score 94%",
          "Startup visitor → high engagement",
          "Organic user → pricing page view",
          "Returning user → upsell eligible",
        ],
      },
    }),
    []
  );

  const active = panels[view];

  function runCommand() {
    if (!command.trim()) return;

    const newLog = `COMMAND EXECUTED → ${command}`;
    setLogs((l) => [newLog, ...l]);

    setCommand("");
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* 🌊 SIDEBAR */}
      <div className="w-72 border-r border-white/10 p-5 bg-black/60 backdrop-blur">

        <div className="text-xs text-white/40 tracking-[0.25em] mb-6">
          OCEAN TIDE AI OS
        </div>

        {Object.keys(panels).map((key) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`block w-full text-left px-3 py-2 rounded mb-1 ${
              view === key
                ? "bg-white/10 text-cyan-300"
                : "text-white/60 hover:text-white"
            }`}
          >
            {key.toUpperCase()}
          </button>
        ))}

        {/* SYSTEM STATS */}
        <div className="mt-8 text-xs text-white/40 space-y-1 border-t border-white/10 pt-4">
          <div>Uptime: {state.uptime}%</div>
          <div>Agents: {state.agents}</div>
        </div>
      </div>

      {/* 🌊 MAIN */}
      <div className="flex-1 p-6 grid grid-cols-3 gap-4">

        {/* LEFT MAIN PANEL */}
        <div className="col-span-2 space-y-4">

          {/* METRICS */}
          <div className="grid grid-cols-4 gap-3">
            <Metric label="Revenue" value={`$${state.revenue}`} />
            <Metric label="Leads" value={state.leads} />
            <Metric label="Conv" value={`${state.conversion}%`} />
            <Metric label="Agents" value={state.agents} />
          </div>

          {/* CORE VIEW */}
          <div className="border border-white/10 bg-white/5 rounded-xl p-5 min-h-[340px]">
            <h1 className="text-xl font-bold">{active.title}</h1>
            <p className="text-white/60 text-sm mt-1">{active.desc}</p>

            <div className="mt-4 space-y-2">
              {active.items.map((i, idx) => (
                <div key={idx} className="bg-black/40 border border-white/10 p-2 rounded text-sm">
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* COMMAND BAR */}
          <div className="border border-white/10 bg-black/40 rounded-xl p-3 flex gap-2">
            <input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter system command… (e.g. optimize pricing)"
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button
              onClick={runCommand}
              className="bg-cyan-500 text-black px-4 py-2 rounded text-sm font-semibold"
            >
              RUN
            </button>
          </div>
        </div>

        {/* RIGHT LIVE SYSTEM FEED */}
        <div className="border border-white/10 bg-white/5 rounded-xl p-4 h-[600px] overflow-hidden">

          <div className="text-xs text-white/40 mb-3 tracking-widest">
            LIVE SYSTEM FEED
          </div>

          <div className="space-y-2 text-xs">
            {logs.map((log, i) => (
              <div
                key={i}
                className="border border-white/10 bg-black/40 p-2 rounded"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3">
      <div className="text-xs text-white/40">{label}</div>
      <div className="text-lg font-bold text-cyan-300">{value}</div>
    </div>
  );
}
