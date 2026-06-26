import { useState } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const runCommand = () => {
    if (!input) return;

    setLog((prev) => [...prev, `> ${input}`]);

    let response = "Command not recognized 🌊";

    if (input.includes("status")) response = "All systems online 🌊";
    if (input.includes("help")) response = "Commands: status, help, dashboard, tools";

    setLog((prev) => [...prev, response]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 font-mono">
      <h1 className="text-white text-2xl mb-4">
        🌊 AI SURFER TERMINAL
      </h1>

      <div className="h-[60vh] overflow-y-auto border border-green-500 p-4 mb-4">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <input
        className="w-full p-3 bg-black border border-green-500 text-green-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="type command..."
        onKeyDown={(e) => e.key === "Enter" && runCommand()}
      />
    </div>
  );
}