import { useState } from "react";

export default function AITerminal() {
  const [log, setLog] = useState<string[]>([
    "🧠 Ocean OS initialized...",
    "🤖 142 agents online",
    "📡 Revenue engine active",
  ]);

  const runCommand = (cmd: string) => {
    const responses: any = {
      "status": "All systems operational 🌊",
      "agents": "142 AI agents actively optimizing funnels",
      "revenue": "Revenue engine compounding at +3.2%/hr",
      "scale": "Launching autonomous scaling sequence ⚡",
    };

    setLog((l) => [...l, `> ${cmd}`, responses[cmd] || "Unknown command"]);
  };

  return (
    <div className="bg-black border border-white/10 rounded-xl p-4 font-mono text-sm">
      <div className="text-cyan-400 mb-3">Ocean AI Terminal</div>

      <div className="space-y-1 max-h-60 overflow-auto">
        {log.map((l, i) => (
          <div key={i} className="text-white/70">{l}</div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        {["status", "agents", "revenue", "scale"].map((c) => (
          <button
            key={c}
            onClick={() => runCommand(c)}
            className="px-2 py-1 bg-white/10 hover:bg-cyan-500/30 rounded text-xs"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
