type Props = {
  userTier?: string;
};

export default function Tools({ userTier = "free" }: Props) {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">🔵 AI Tools</h1>

      <p className="text-slate-400 mb-6">
        Access Level: {userTier}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 rounded-xl">Prompt Engine</div>
        <div className="p-6 bg-slate-900 rounded-xl">Automation Builder</div>
        <div className="p-6 bg-slate-900 rounded-xl">AI Agents</div>
      </div>
    </div>
  );
}