import { useState } from "react";
import AICommandTerminal from "../components/AICommandTerminal";
import WidgetCard from "../components/WidgetCard";

type Props = {
  userTier?: string;
};

const tierLevel: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
  enterprise: 4,
};

export default function Dashboard({ userTier = "free" }: Props) {
  const [tab, setTab] = useState("control");

  const level = tierLevel[userTier] ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-2">
        🌊 Ocean OS Control Center
      </h1>

      <p className="text-slate-400 mb-6">
        System Tier: <span className="text-white">{userTier}</span>
      </p>

      {/* NAV */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["control", "ai", "systems", "analytics"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm ${
              tab === t ? "bg-blue-600" : "bg-slate-800"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTROL ROOM */}
      {tab === "control" && (
        <div className="grid md:grid-cols-2 gap-4">
          <WidgetCard
            title="System Status"
            desc="All AI systems running stable 🌊"
          />

          <WidgetCard
            title="User Tier Engine"
            desc={`Access level: ${level}/4`}
          />
        </div>
      )}

      {/* AI TERMINAL */}
      {tab === "ai" && (
        <div className="grid md:grid-cols-2 gap-4">
          <WidgetCard
            title="AI Command Core"
            desc="Run commands, generate outputs, control systems"
          />

          <AICommandTerminal />
        </div>
      )}

      {/* SYSTEMS */}
      {tab === "systems" && (
        <div className="grid md:grid-cols-2 gap-4">
          <WidgetCard
            title="Automation Layer"
            desc="Workflow engine (coming online)"
            locked={level < 2}
          />

          <WidgetCard
            title="AI Agents"
            desc="Autonomous task execution layer"
            locked={level < 3}
          />
        </div>
      )}

      {/* ANALYTICS */}
      {tab === "analytics" && (
        <div className="grid md:grid-cols-2 gap-4">
          <WidgetCard
            title="Performance Metrics"
            desc="Usage + AI activity tracking"
          />

          <WidgetCard
            title="Revenue Insights"
            desc="Tier conversions + monetization tracking"
            locked={level < 1}
          />
        </div>
      )}
    </div>
  );
}