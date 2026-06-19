import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export default function AISurfChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "🌊 Hey! I’m your AI Surf Guide. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
      });

      const aiMessage = {
        role: "assistant",
        text: response.text || "No response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "🌊 Something went sideways in the wave. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>🌊 AI Surf Assistant</div>

      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#13dadf" : "#1b1f2a",
              color: m.role === "user" ? "#000" : "#fff",
            }}
          >
            {m.text}
          </div>
        ))}

        {loading && <div style={styles.typing}>🌊 thinking…</div>}
      </div>

      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI surf guide..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "320px",
    height: "420px",
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
    padding: "10px 12px",
    background: "#13dadf",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  typing: {
    fontSize: "12px",
    color: "#888",
  },
};