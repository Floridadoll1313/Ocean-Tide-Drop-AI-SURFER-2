import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default function AICommandTerminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function runAI() {
    if (!input) return;

    setLoading(true);

    try {
      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
      });

      setOutput(res.text || "No response");
    } catch (err) {
      setOutput("AI drift detected 🌊");
    }

    setLoading(false);
  }

  return (
    <div className="glass mt-6">
      <h2 className="text-xl font-bold">🤖 AI Command Terminal</h2>

      <textarea
        className="w-full mt-3 p-2 bg-black border border-slate-700 rounded"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask the ocean..."
      />

      <button
        onClick={runAI}
        className="mt-3 px-4 py-2 bg-cyan-600 rounded"
      >
        Run Wave
      </button>

      {loading ? (
        <p className="mt-3 text-slate-400">Thinking in currents...</p>
      ) : (
        <p className="mt-3 text-slate-200 whitespace-pre-wrap">{output}</p>
      )}
    </div>
  );
}