export default function OceanHUD({ userTier }: { userTier: string }) {
  return (
    <div className="glass p-6">
      <h2 className="text-2xl font-bold">🌊 Ocean Control HUD</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-slate-400">System Status</p>
          <p className="text-green-400">ONLINE</p>
        </div>

        <div>
          <p className="text-slate-400">Tier</p>
          <p className="text-cyan-300">{userTier.toUpperCase()}</p>
        </div>

        <div>
          <p className="text-slate-400">AI Engine</p>
          <p className="text-purple-300">GEMINI ACTIVE</p>
        </div>

        <div>
          <p className="text-slate-400">Wave Stability</p>
          <p className="text-blue-300">STABLE 🌊</p>
        </div>
      </div>
    </div>
  );
}