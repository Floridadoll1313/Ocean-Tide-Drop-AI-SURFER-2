import { useState } from "react";

type Props = {
  userTier?: string;
};

export default function Dashboard({ userTier = "free" }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-2">🌊 Control Dashboard</h1>

      <p className="text-slate-400 mb-6">
        Tier: <span className="text-white font-semibold">{userTier}</span>
      </p>

      {/* NAV TABS */}
      <div className="flex gap-3 mb-6">
        {["overview", "ai", "analytics", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === tab
                ? "bg-blue-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-slate-900 rounded-xl p-6">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-slate-300">
              Welcome back. Your AI surfboard is synced and ready.
            </p>
          </div>
        )}

        {activeTab === "ai" && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">AI Tools</h2>
            <ul className="space-y-2 text-slate-300">
              <li>⚡ Prompt Engine</li>
              <li>🧠 AI Agent Builder</li>
              <li>🌊 Automation Flows</li>
            </ul>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Analytics</h2>
            <p className="text-slate-300">
              Usage stats, engagement, and AI activity will appear here.
            </p>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Settings</h2>
            <p className="text-slate-300">
              Manage account preferences and tier upgrades.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}