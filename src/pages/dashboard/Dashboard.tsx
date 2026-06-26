export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        🌊 AI Surfer Command Center
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-slate-400 mt-2">0 Active Projects</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold">GitHub</h2>
          <p className="text-slate-400 mt-2">Waiting for sync...</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-slate-400 mt-2">$0.00</p>
        </div>
      </div>
    </div>
  );
}