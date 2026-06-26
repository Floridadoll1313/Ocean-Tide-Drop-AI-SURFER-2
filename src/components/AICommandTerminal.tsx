import { useState } from "react";

export default function AICommandTerminal() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const runCommand = () => {
    if (!input.trim()) return;

    setLog((prev) => [
      `> ${input}`,
      `AI: Executed mock command → ${input}`,
      ...prev,
    ]);

    setInput("");
  };

  return (
    <div className="bg-black border border-slate-700 rounded-xl p-4">
      <div className="text-green-400 text-sm mb-3">
        AI Terminal (Prompt Engine)
      </div>

      <div className="h-40 overflow-y-auto text-xs text-slate-300 mb-3 space-y-1">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 bg-slate-800 rounded text-white text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="run prompt / generate / build / analyze..."
        />
        <button
          onClick={runCommand}
          className="px-3 py-2 bg-blue-600 rounded text-sm"
        >
          Run
        </button>
      </div>
    </div>
  );
}