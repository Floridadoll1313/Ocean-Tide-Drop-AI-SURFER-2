import { useState } from "react";
import LockedFeature from "../components/LockedFeature";
import AICommandTerminal from "../components/AICommandTerminal";

type Props = {
  userTier?: string;
};

const tierRank: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
  enterprise: 4,
};

export default function Dashboard({ userTier = "free" }: Props) {
  const [tab, setTab] = useState("overview");

  const level = tierRank[userTier] ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-2">🌊 AI Control Center</h1>

      <p className="text-slate-400 mb-6">
        Active Tier:{" "}
        <span className="text-white font-semibold">{userTier}</span>
      </p>

      {/* NAV */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["overview", "ai", "automation", "analytics", "settings"].map(
          (t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm ${
                tab === t ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              {t.toUpperCase()}
            </button>
          )
        )}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-slate-900 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">System Status</h2>
            <p className="text-slate-400">
              All AI systems online. Ocean routing stable 🌊
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Tier Engine</h2>
            <p className="text-slate-400">
              Access level: {level}/4
            </p>
          </div>
        </div>
      )}

      {/* AI TAB */}
      {tab === "ai" && (
        <div className="grid md:grid-cols-2 gap-4">
          <LockedFeature
            unlocked={level >= 1}
            title="Prompt Engine"
          >
            <AICommandTerminal />
          </LockedFeature>

          <LockedFeature
            unlocked={level >= 2}
            title="AI Agents"
          >
            <p className="text-slate-300">
              Autonomous agent builder (coming online)
            </p>
          </LockedFeature>
        </div>
      )}

      {/* AUTOMATION */}
      {tab === "automation" && (
        <LockedFeature
          unlocked={level >= 2}
          title="Automation Builder"
        >
          <p className="text-slate-300">
            Visual workflow system for AI tasks.
          </p>
        </LockedFeature>
      )}

      {/* ANALYTICS */}
      {tab === "analytics" && (
        <LockedFeature
          unlocked={level >= 1}
          title="Analytics Engine"
        >
          <p className="text-slate-300">
            Usage tracking, AI performance, conversions.
          </p>
        </LockedFeature>
      )}

      {/* SETTINGS */}
      {tab === "settings" && (
        <div className="p-6 bg-slate-900 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-slate-400">
            Account + tier configuration panel
          </p>
        </div>
      )}
    </div>
  );
}