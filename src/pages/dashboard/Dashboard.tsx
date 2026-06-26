export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        🌊 AI Surfer Command Center
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 rounded-xl">
          <h2 className="text-xl font-bold">Projects</h2>
          <p className="text-slate-400">0 Active</p>
        </div>

        <div className="p-6 bg-slate-900 rounded-xl">
          <h2 className="text-xl font-bold">AI Systems</h2>
          <p className="text-slate-400">Idle</p>
        </div>

        <div className="p-6 bg-slate-900 rounded-xl">
          <h2 className="text-xl font-bold">Revenue</h2>
          <p className="text-slate-400">$0.00</p>
        </div>
      </div>
    </div>
  );
}