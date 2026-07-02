import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [view, setView] = useState("control");

  const menu = [
    { id: "control", label: "🌊 Control Center" },
    { id: "agents", label: "🤖 AI Agents" },
    { id: "leads", label: "📈 Leads" },
    { id: "revenue", label: "💰 Revenue" },
    { id: "settings", label: "⚙️ Settings" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-4">
        <div className="font-bold mb-6">🌊 Ocean Tide OS</div>

        <div className="space-y-2">
          {menu.map((m) => (
            <button
              key={m.id}
              onClick={() => setView(m.id)}
              className={`w-full text-left px-3 py-2 rounded ${
                view === m.id ? "bg-cyan-500 text-black" : "hover:bg-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="border-b border-white/10 pb-4 mb-6">
          <h1 className="text-2xl font-bold">
            {view === "control" && "Control Center"}
            {view === "agents" && "AI Agent Fleet"}
            {view === "leads" && "Lead Flow System"}
            {view === "revenue" && "Revenue Engine"}
            {view === "settings" && "System Settings"}
          </h1>
        </div>

        {/* VIEW */}
        <div className="space-y-4">

          {view === "control" && (
            <div className="grid md:grid-cols-3 gap-4">
              <Card title="Active Agents" value="142" />
              <Card title="Leads Today" value="18" />
              <Card title="Revenue" value="$4,320" />
            </div>
          )}

          {view === "agents" && (
            <Panel text="🤖 AI Agents are running autonomous sales + optimization loops." />
          )}

          {view === "leads" && (
            <Panel text="📈 Lead scoring engine is actively qualifying traffic in real time." />
          )}

          {view === "revenue" && (
            <Panel text="💰 Revenue system optimizing pricing and conversion paths." />
          )}

          {view === "settings" && (
            <Panel text="⚙️ System configuration panel (AI behavior, pricing, funnels)." />
          )}

        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
      <div className="text-white/60 text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function Panel({ text }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
      {text}
    </div>
  );
}
