export default function WaveProgress({ tier }: { tier: string }) {
  const levels = ["free", "bronze", "wave", "tsunami", "enterprise"];

  const index = levels.indexOf(tier);
  const percent = ((index + 1) / levels.length) * 100;

  return (
    <div className="glass mt-6">
      <h2 className="text-xl font-bold">🌊 Ocean Tier Progress</h2>

      <div className="w-full bg-slate-800 h-3 rounded mt-3 overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-cyan-400 to-purple-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-slate-400">
        Current Wave: {tier.toUpperCase()}
      </p>
    </div>
  );
}