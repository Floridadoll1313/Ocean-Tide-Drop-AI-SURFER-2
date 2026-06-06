import { useState } from "react"

export default function Dashboard() {
  const [active, setActive] = useState("overview")

  return (
    <div className="flex h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 p-4 space-y-4">
        <h1 className="text-xl font-bold">🌊 Ocean Console</h1>

        <button onClick={() => setActive("overview")}>Overview</button>
        <button onClick={() => setActive("projects")}>Projects</button>
        <button onClick={() => setActive("github")}>GitHub</button>
        <button onClick={() => setActive("stripe")}>Stripe</button>
        <button onClick={() => setActive("events")}>Events</button>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-6">

        {active === "overview" && (
          <div className="grid grid-cols-3 gap-4">
            <Card title="Projects" value="—" />
            <Card title="Active Repos" value="—" />
            <Card title="Revenue" value="$—" />
          </div>
        )}

        {active === "projects" && <Placeholder title="Projects Panel" />}
        {active === "github" && <Placeholder title="GitHub Sync Panel" />}
        {active === "stripe" && <Placeholder title="Stripe Panel" />}
        {active === "events" && <Placeholder title="Live Event Stream" />}

      </div>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl">{value}</h2>
    </div>
  )
}

function Placeholder({ title }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <h2 className="text-xl">{title}</h2>
      <p className="text-gray-400 mt-2">Waiting for backend connection...</p>
    </div>
  )
}