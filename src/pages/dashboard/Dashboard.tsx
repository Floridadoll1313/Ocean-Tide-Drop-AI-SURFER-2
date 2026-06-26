import RevenuePanel from "../../components/metrics/RevenuePanel";
import StripePanel from "../../components/metrics/StripePanel";
import AICommandTerminal from "../../components/ai/AICommandTerminal";
import WaveProgress from "../../components/WaveProgress";

export default function Dashboard({ userTier }: { userTier?: string }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        🌊 Ocean Command Deck
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenuePanel />
        <StripePanel />
      </div>

      <WaveProgress tier={userTier || "free"} />

      <AICommandTerminal />
    </div>
  );
}