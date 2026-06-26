export default function Tools() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">🔵 AI Tools</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Prompt Engine</h2>
          <p className="text-slate-400">
            Build structured prompts for AI automation.
          </p>
        </div>

        <div className="p-6 bg-slate-900 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Automation Builder</h2>
          <p className="text-slate-400">
            Connect workflows into repeatable systems.
          </p>
        </div>

        <div className="p-6 bg-slate-900 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">AI Agents</h2>
          <p className="text-slate-400">
            Deploy task-based autonomous assistants.
          </p>
        </div>
      </div>
    </div>
  );
}