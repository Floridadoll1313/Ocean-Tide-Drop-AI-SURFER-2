import { useEffect, useState } from "react";

export default function AITerminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // 🌊 boot sequence (makes it feel "alive")
  useEffect(() => {
    const boot = [
      "🌊 Booting Ocean Tide AI OS...",
      "🧠 Initializing agent swarm...",
      "🤖 142 AI agents online",
      "📡 Connecting revenue engine...",
      "⚡ System ready",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < boot.length) {
        setLogs((prev) => [...prev, boot[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // 🌊 fake AI command brain
  const runCommand = (cmd: string) => {
    const c = cmd.toLowerCase();

    let response = "Unknown command. Try: status, agents, revenue, scale";

    if (c === "status") response = "🟢 All systems operational. Ocean OS stable.";
    if (c === "agents") response = "🤖 142 agents active across funnel + sales + optimization.";
    if (c === "revenue") response = "💰 Revenue engine compounding at +3.4% hourly.";
    if (c === "scale") response = "⚡ Scaling protocols engaged. Expanding conversion loops.";
    if (c === "help") response = "Commands: status | agents | revenue | scale";

    setLogs((prev) => [...prev, `> ${cmd}`, response]);
  };

  const submit = () => {
    if (!input.trim()) return;
    runCommand(input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* 🌊 HEADER */}
      <div className="border-b border-white/10 p-4 flex justify-between items-center">
        <div className="font-bold">
          🌊 Ocean Tide AI Terminal
        </div>

        <div className="text-xs text-white/40">
          LIVE SYSTEM INTERFACE
        </div>
      </div>

      {/* 🌊 MAIN TERMINAL */}
      <div className="flex-1 p-6 overflow-auto font-mono text-sm space-y-2">

        {logs.map((log, i) => (
          <div
            key={i}
            className="text-white/70 animate-pulse"
          >
            {log}
          </div>
        ))}

        {/* blinking cursor feel */}
        <div className="text-cyan-400 animate-pulse">
          ▌
        </div>
      </div>

      {/* 🌊 COMMAND BAR */}
      <div className="border-t border-white/10 p-4 flex gap-2">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Enter command... (status / agents / revenue / scale)"
          className="flex-1 bg-black border border-white/20 px-3 py-2 rounded text-sm text-white"
        />

        <button
          onClick={submit}
          className="bg-cyan-500 text-black px-4 py-2 rounded font-semibold"
        >
          Run
        </button>
      </div>

      {/* 🌊 QUICK COMMANDS */}
      <div className="p-3 border-t border-white/10 flex gap-2 flex-wrap">

        {["status", "agents", "revenue", "scale", "help"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => runCommand(cmd)}
            className="text-xs px-3 py-1 bg-white/10 hover:bg-cyan-500/30 rounded"
          >
            {cmd}
          </button>
        ))}

      </div>
    </div>
  );
}
