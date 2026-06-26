import RevenuePanel from "../../components/metrics/RevenuePanel";
import StripePanel from "../../components/metrics/StripePanel";
import AICommandTerminal from "../../components/ai/AICommandTerminal";
import WaveProgress from "../../components/WaveProgress";
import OceanHUD from "../../components/OceanHUD";

export default function Dashboard({ userTier }: { userTier?: string }) {
  const tier = userTier || "free";

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 space-y-6">
      <h1 className="text-4xl font-bold">
        🌊 Ocean OS Command Deck
      </h1>

      <OceanHUD userTier={tier} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenuePanel />
        <StripePanel />
      </div>

      <WaveProgress tier={tier} />

      <AICommandTerminal />
    </div>
  );
}