import { useEffect, useMemo, useState } from "react";

export default function DashboardLayout() {
  const [view, setView] = useState("intelligence");
  const [command, setCommand] = useState("");

  const [state, setState] = useState({
    revenue: 15120,
    leads: 118,
    conversion: 4.4,
    agents: 18,
    uptime: 99.99,
  });

  const [feed, setFeed] = useState([
    {
      type: "SYSTEM",
      msg: "AI OS initialized",
      level: "info",
    },
    {
      type: "AGENT",
      msg: "LeadHunter-9 activated scanning pipeline",
      level: "ok",
    },
    {
      type: "ENGINE",
      msg: "Revenue optimizer engaged",
      level: "ok",
    },
  ]);

  const [traces, setTraces] = useState([
    "TRACE: user_intent_model → HIGH CONFIDENCE BUYER (0.91)",
    "TRACE: pricing_engine → elasticity adjustment +2.4%",
    "TRACE: funnel_analysis → drop-off detected at checkout step",
  ]);

  // 🌊 LIVE SYSTEM SIMULATION ENGINE
  useEffect(() => {
    const interval = setInterval(() => {
      const events = [
        {
          type: "LEAD",
          msg: "High-intent visitor scored 0.94 routed to Closer AI",
        },
        {
          type: "AGENT",
          msg: "CloserBot-3 executed conversion sequence",
        },
        {
          type: "ENGINE",
          msg: "Dynamic pricing model updated successfully",
        },
        {
          type: "SYSTEM",
          msg: "Behavioral clustering recalculated across 1,240 sessions",
        },
      ];

      const newEvent = events[Math.floor(Math.random() * events.length)];

      setFeed((f) => [newEvent, ...f.slice(0, 10)]);

      setState((s) => ({
        ...s,
        revenue: s.revenue + Math.floor(Math.random() * 180),
        leads: s.leads + (Math.random() > 0.7 ? 1 : 0),
        conversion: +(s.conversion + (Math.random() - 0.5) * 0.12).toFixed(2),
      }));

      setTraces((t) => [
        `TRACE: decision_engine → ${Math.random().toString(36).substring(2, 10)} | score ${(Math.random() * 0.2 + 0.8).toFixed(2)}`,
        ...t.slice(0, 6),
      ]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const panels = useMemo(
    () => ({
      intelligence: {
        title: "Core Intelligence Layer",
        desc:
          "Real-time decision engine processing behavioral, financial, and intent signals across all systems.",
      },
      agents: {
        title: "Autonomous Agent Swarm",
        desc:
          "Independent AI agents executing parallel growth operations.",
      },
      revenue: {
        title: "Revenue Control Plane",
        desc:
          "Autonomous monetization and optimization system.",
      },
    }),
    []
  );

  function runCommand() {
    if (!command.trim()) return;

    const action = {
      type: "COMMAND",
      msg: `EXECUTED: ${command}`,
      level: "warn",
    };

    setFeed((f) => [action, ...f]);
    setCommand("");
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* 🌊 LEFT NAV */}
      <div className="w-72 border-r border-white/10 p-5 bg-black/70">

        <div className="text-xs tracking-[0.3em] text-white/40 mb-6">
          AI OPERATING SYSTEM
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

        <div className="mt-6 text-xs text-white/40 border-t border-white/10 pt-4 space-y-1">
          <div>Uptime: {state.uptime}%</div>
          <div>Agents: {state.agents}</div>
          <div>System Mode: AUTONOMOUS</div>
        </div>
      </div>

      {/* 🌊 CENTER */}
      <div className="flex-1 p-6 space-y-4">

        {/* TOP METRICS */}
        <div className="grid grid-cols-4 gap-3">
          <Metric label="Revenue" value={`$${state.revenue}`} />
          <Metric label="Leads" value={state.leads} />
          <Metric label="Conversion" value={`${state.conversion}%`} />
          <Metric label="Agents" value={state.agents} />
        </div>

        {/* INTELLIGENCE PANEL */}
        <div className="border border-white/10 bg-white/5 rounded-xl p-5">
          <h1 className="text-xl font-bold">{panels[view].title}</h1>
          <p className="text-white/60 text-sm mt-1">
            {panels[view].desc}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="border border-white/10 bg-black/40 p-2 rounded">
              Decision Engine: ACTIVE
            </div>
            <div className="border border-white/10 bg-black/40 p-2 rounded">
              Signal Processor: ONLINE
            </div>
            <div className="border border-white/10 bg-black/40 p-2 rounded">
              Funnel Intelligence: RUNNING
            </div>
            <div className="border border-white/10 bg-black/40 p-2 rounded">
              Predictive Model: LEARNING
            </div>
          </div>
        </div>

        {/* COMMAND BAR */}
        <div className="flex gap-2">
          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter system command (e.g. optimize funnel, deploy agent)"
            className="flex-1 bg-black border border-white/10 px-3 py-2 rounded text-sm"
          />
          <button
            onClick={runCommand}
            className="bg-cyan-500 text-black px-4 py-2 rounded font-semibold"
          >
            EXECUTE
          </button>
        </div>

        {/* TRACE VIEW */}
        <div className="border border-white/10 bg-black/40 rounded-xl p-4">
          <div className="text-xs text-white/40 mb-2 tracking-widest">
            DECISION TRACE LAYER
          </div>

          <div className="space-y-1 text-xs text-white/70">
            {traces.map((t, i) => (
              <div key={i} className="border border-white/10 p-2 rounded">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🌊 RIGHT FEED */}
      <div className="w-96 border-l border-white/10 p-4 bg-black/60">

        <div className="text-xs text-white/40 mb-3 tracking-widest">
          LIVE SYSTEM EVENT STREAM
        </div>

        <div className="space-y-2 text-xs">
          {feed.map((f, i) => (
            <div
              key={i}
              className="border border-white/10 bg-black/40 p-2 rounded"
            >
              <div className="text-white/40">{f.type}</div>
              <div>{f.msg}</div>
            </div>
          ))}
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
