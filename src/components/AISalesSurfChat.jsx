import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default function AISalesSurfChat() {
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "🌊 Welcome to Ocean Tide Drop AI SURFER. I can help you grow, automate, and scale with AI. Drop a question or ride the wave.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!emailCaptured) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are Ocean Tide Drop AI Surfer assistant.
You help users with AI automation, business growth, and digital tools.
Be helpful but gently guide users toward booking a call or learning more.

User question: ${input}
        `,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: response.text },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "🌊 Wave broke. Try again." },
      ]);
    }

    setLoading(false);
  };

  const captureEmail = () => {
    if (!email.includes("@")) return;
    setEmailCaptured(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          "🌊 You’re in. Now ask me anything—or book a free AI strategy session below.",
      },
    ]);
  };

  const openCalendly = () => {
    window.open(
      "https://calendly.com/oceantidedrop/new-meeting",
      "_blank"
    );
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>🌊 AI Sales Surf Assistant</div>

      {!emailCaptured ? (
        <div style={styles.gate}>
          <p style={{ color: "#fff" }}>
            Enter email to ride the AI wave:
          </p>

          <input
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button onClick={captureEmail} style={styles.button}>
            Enter the Wave 🌊
          </button>
        </div>
      ) : (
        <>
          <div style={styles.chatBox}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf:
                    m.role === "user" ? "flex-end" : "flex-start",
                  background:
                    m.role === "user" ? "#13dadf" : "#1b1f2a",
                  color: m.role === "user" ? "#000" : "#fff",
                }}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div style={styles.typing}>🌊 thinking…</div>
            )}
          </div>

          <div style={styles.actions}>
            <button onClick={openCalendly} style={styles.calBtn}>
              📅 Book Free Strategy Call
            </button>
          </div>

          <div style={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI surf assistant..."
              style={styles.input}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
            />

            <button onClick={sendMessage} style={styles.button}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "340px",
    height: "460px",
    background: "#0f1115",
    border: "1px solid #222",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9999,
  },
  header: {
    padding: "10px",
    background: "#101319",
    color: "#13dadf",
    fontWeight: "bold",
    textAlign: "center",
  },
  gate: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  chatBox: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflowY: "auto",
  },
  message: {
    padding: "8px 10px",
    borderRadius: "10px",
    maxWidth: "80%",
    fontSize: "14px",
  },
  inputRow: {
    display: "flex",
    borderTop: "1px solid #222",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    background: "#0b0d10",
    color: "#fff",
  },
  button: {
    padding: "10px",
    background: "#13dadf",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  typing: {
    fontSize: "12px",
    color: "#888",
  },
  actions: {
    padding: "8px",
    borderTop: "1px solid #222",
  },
  calBtn: {
    width: "100%",
    padding: "10px",
    background: "#101319",
    color: "#13dadf",
    border: "1px solid #13dadf",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "8px",
  },
};