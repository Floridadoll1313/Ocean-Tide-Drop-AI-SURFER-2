import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { getTierPrompt } from "../../ai/tierPrompt";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AICommandTerminal({
  userTier = "free",
}: {
  userTier?: string;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "🌊 Ocean Terminal online. Awaiting command...",
    },
  ]);

  async function runAI() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const context = updatedMessages
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n");

      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
${getTierPrompt(userTier)}

You are inside a command terminal. Respond concisely.

Conversation log:
${context}
        `,
      });

      const aiMessage: Message = {
        role: "ai",
        content: res.text || "No response from deep current 🌊",
      };

      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          role: "ai",
          content: "⚠️ Signal lost in the wave field. Try again.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="glass mt-6 p-4">
      <h2 className="text-xl font-bold mb-3">🤖 AI Command Terminal</h2>

      {/* LOG WINDOW */}
      <div className="h-64 overflow-y-auto bg-black/40 p-3 rounded border border-slate-700 mb-3">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <span
              className={
                msg.role === "user"
                  ? "text-cyan-300"
                  : "text-purple-300"
              }
            >
              {msg.role === "user" ? "YOU" : "AI"}
            </span>
            :{" "}
            <span className="text-slate-200 whitespace-pre-wrap">
              {msg.content}
            </span>
          </div>
        ))}

        {loading && (
          <div className="text-slate-400 animate-pulse">
            AI is thinking in deep currents...
          </div>
        )}
      </div>

      {/* INPUT */}
      <textarea
        className="w-full p-2 bg-black border border-slate-700 rounded"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a command into the ocean..."
      />

      <button
        onClick={runAI}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded disabled:opacity-50"
      >
        {loading ? "Running Wave..." : "Send Command"}
      </button>
    </div>
  );
}