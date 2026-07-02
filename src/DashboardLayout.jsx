import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const [view, setView] = useState("core");
  const [revenue, setRevenue] = useState(12480);
  const [leads, setLeads] = useState(87);
  const [agents, setAgents] = useState(12);

  // 🌊 fake live system pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue((r) => r + Math.floor(Math.random() * 120));
      setLeads((l) => l + Math.floor(Math.random() * 2));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* 🌊 SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-5 space-y-4 bg-black/60 backdrop-blur">

        <div className="text-xs text-white/40 tracking-widest">
          OCEAN TIDE AI OS
        </div>

        {[
          ["core", "🌊 Core Intelligence"],
          ["agents", "🤖 AI Agents"],
          ["revenue", "💰 Revenue Flow"],
          ["leads", "📡 Live Leads"],
          ["signals", "📊 Market Signals"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`block text-left w-full px-2 py-2 rounded hover:text-cyan-300 ${
              view === key ? "text-cyan-400 bg-white/5" : "text-white/70"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 🌊 MAIN */}
      <div className="flex-1 p-8 relative">

        {/* ambient glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] bg-cyan-500 blur-3xl rounded-full top-[-200px] left-[100px]" />
          <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-3xl rounded-full bottom-[-200px] right-[100px]" />
        </div>

        {/* HEADER STATS BAR */}
        <div className="grid grid-cols-3 gap-4 mb-8">

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/40">Monthly Revenue</div>
            <div className="text-2xl font-bold text-cyan-300">
              ${revenue.toLocaleString()}
            </div>
            <div className="text-xs text-white/30">AI optimized flow active</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/40">Active Leads</div>
            <div className="text-2xl font-bold text-white">
              {leads}
            </div>
            <div className="text-xs text-white/30">scoring in real time</div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-xs text-white/40">AI Agents</div>
            <div className="text-2xl font-bold text-cyan-400">
              {agents}
            </div>
            <div className="text-xs text-white/30">autonomous systems running</div>
          </div>

        </div>

        {/* VIEW SWITCH */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl min-h-[400px]">

          {view === "core" && (
            <div>
              <h1 className="text-3xl font-bold">🌊 Core Intelligence Layer</h1>
              <p className="text-white/60 mt-3">
                The system is analyzing conversion behavior, pricing elasticity, and user intent signals.
              </p>

              <div className="mt-6 space-y-2 text-sm text-white/70">
                <div>• Funnel optimization engine: ACTIVE</div>
                <div>• Pricing autopilot: LEARNING</div>
                <div>• Behavioral prediction model: RUNNING</div>
              </div>
            </div>
          )}

          {view === "agents" && (
            <div>
              <h1 className="text-3xl font-bold">🤖 AI Agent Swarm</h1>

              <div className="mt-6 space-y-3">
                {[
                  "LeadHunter-7 scanning inbound traffic",
                  "CloserBot-3 optimizing checkout flow",
                  "PricingAI adjusting conversion thresholds",
                  "FollowUp Engine engaging warm leads"
                ].map((a, i) => (
                  <div key={i} className="bg-black/40 border border-white/10 p-3 rounded">
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "revenue" && (
            <div>
              <h1 className="text-3xl font-bold">💰 Revenue Autopilot</h1>
              <p className="text-white/60 mt-3">
                AI is actively adjusting pricing tiers based on user behavior patterns.
              </p>

              <div className="mt-6 h-40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-white/10 flex items-center justify-center text-white/40">
                simulated revenue waveform 📈
              </div>
            </div>
          )}

          {view === "leads" && (
            <div>
              <h1 className="text-3xl font-bold">📡 Live Lead Stream</h1>

              <div className="mt-6 space-y-2 text-sm">
                <div className="text-white/80">High Intent Lead → SaaS Founder (score 91%)</div>
                <div className="text-white/60">Startup Visitor → Pricing page view</div>
                <div className="text-white/60">Organic Traffic → Landing page bounce analyzed</div>
              </div>
            </div>
          )}

          {view === "signals" && (
            <div>
              <h1 className="text-3xl font-bold">📊 Market Signals</h1>

              <div className="mt-6 space-y-2 text-sm text-white/70">
                <div>• Conversion rate trending +12%</div>
                <div>• Pricing sensitivity decreasing</div>
                <div>• Demand spike detected in AI automation niche</div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
