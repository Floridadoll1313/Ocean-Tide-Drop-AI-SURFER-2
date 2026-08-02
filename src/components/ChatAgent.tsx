import { useState } from "react";

type Message = { id: string; from: "user" | "agent"; text: string };

export default function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), from: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      const answer = data?.answer || "Sorry, I couldn't answer that right now.";

      const agentMsg: Message = { id: (Date.now() + 1).toString(), from: "agent", text: answer };
      setMessages((m) => [...m, agentMsg]);
    } catch (err) {
      const errMsg: Message = { id: (Date.now() + 2).toString(), from: "agent", text: "Network error. Try again later." };
      setMessages((m) => [...m, errMsg]);
      console.error("Agent error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 60 }}>
        {!open && (
          <button
            aria-label="Open AI assistant"
            onClick={() => setOpen(true)}
            style={{
              background: "#06b6d4",
              color: "#042027",
              borderRadius: 999,
              padding: "12px 16px",
              boxShadow: "0 8px 20px rgba(2,12,30,0.4)",
              fontWeight: 800,
            }}
          >
            dd Agent 💬
          </button>
        )}

        {open && (
          <div
            style={{
              width: 360,
              height: 480,
              background: "rgba(2,6,23,0.98)",
              color: "white",
              borderRadius: 12,
              boxShadow: "0 20px 60px rgba(2,12,30,0.6)",
              padding: 12,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <strong>dd Agent</strong>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setMessages([])} style={{ color: "rgba(255,255,255,0.65)" }}>
                  Clear
                </button>
                <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.65)" }}>
                  Close
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "6px 4px", gap: 8, display: "flex", flexDirection: "column" }}>
              {messages.length === 0 && (
                <div style={{ color: "#9CA3AF", fontSize: 13 }}>
                  Ask dd Agent anything about Ocean Tide Drop, AI agents, automations, or how to get started.
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                  <div
                    style={{
                      background: m.from === "user" ? "#06b6d4" : "rgba(255,255,255,0.06)",
                      color: m.from === "user" ? "#042027" : "#E6EEF3",
                      padding: "8px 10px",
                      borderRadius: 8,
                      fontSize: 13,
                      lineHeight: 1.3,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder="Type a question..."
                style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: "#061025", border: "1px solid rgba(255,255,255,0.04)", color: "white" }}
              />
              <button onClick={send} disabled={loading} style={{ background: "#10B981", padding: "8px 12px", borderRadius: 8 }}>
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
