import { useState } from "react";
import { runCommand } from "../core/commandEngine";

export default function AICommandTerminal() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    if (!input.trim()) return;

    setLog((prev) => [`> ${input}`, ...prev]);
    setLoading(true);

    const res = await runCommand(input);

    setLog((prev) => [`AI: ${res.output}`, ...prev]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="bg-black border border-slate-700 rounded-xl p-4">
      <div className="text-green-400 text-sm mb-3">
        Ocean AI Terminal
      </div>

      <div className="h-48 overflow-y-auto text-xs text-slate-300 mb-3 space-y-1">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 bg-slate-800 rounded text-white text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type command..."
        />

        <button
          onClick={execute}
          disabled={loading}
          className="px-3 py-2 bg-blue-600 rounded text-sm"
        >
          {loading ? "..." : "Run"}
        </button>
      </div>
    </div>
  );
}