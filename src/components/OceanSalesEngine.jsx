import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function OceanSalesEngine() {
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "🌊 Welcome to Ocean Tide Drop AI Surfer. I help you automate, scale, and sell with AI. What are you building?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const saveLead = async (emailValue) => {
    await supabase.from("leads").insert([
      {
        email: emailValue,
        messages: messages,
      },
    ]);
  };

  const captureEmail = async () => {
    if (!email.includes("@")) return;

    setEmailCaptured(true);
    await saveLead(email);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          "🌊 You’re locked in. Now I can help you build, automate, or sell anything with AI. Want strategy, setup, or sales?",
      },
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim() || !emailCaptured) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are Ocean Tide Drop AI Surfer — a high-conversion AI sales assistant.

Your job:
- Help users build AI systems, automation, and online businesses
- Subtly guide toward:
  1. Booking a call (Calendly)
  2. Buying AI automation services
  3. Choosing 4-tier packages (Basic, Pro, WaveMaker, Tsunami Takeover)

Tone:
- Friendly, confident, not pushy
- Think ocean guide + business strategist

User message:
${input}
        `,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: response.text },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "🌊 Wave interference. Try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const openCalendly = () => {
    window.open(
      "https://calendly.com/oceantidedrop/new-meeting",
      "_blank"
    );
  };

  const openStripe = () => {
    // Replace with your real Stripe payment link
    window.open(
      "https://buy.stripe.com/test_123456",
      "_blank"
    );
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>🌊 Ocean Sales Engine</div>

      {!emailCaptured ? (
        <div style={styles.gate}>
          <p style={{ color: "#fff" }}>
            Enter email to unlock AI sales assistant:
          </p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={styles.input}
          />

          <button onClick={captureEmail} style={styles.button}>
            Enter Wave 🌊
          </button>
        </div>
      ) : (
        <>
          <div style={styles.chat}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.msg,
                  alignSelf:
                    m.role === "user"
                      ? "flex-end"
                      : "flex-start",
                  background:
                    m.role === "user"
                      ? "#13dadf"
                      : "#1b1f2a",
                  color: m.role === "user" ? "#000" : "#fff",
                }}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div style={styles.typing}>🌊 analyzing wave...</div>
            )}
          </div>

          <div style={styles.actions}>
            <button onClick={openCalendly} style={styles.cal}>
              📅 Book Strategy Call
            </button>

            <button onClick={openStripe} style={styles.stripe}>
              💸 Get AI Setup
            </button>
          </div>

          <div style={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI, automation, business..."
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
    width: "360px",
    height: "520px",
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
  chat: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflowY: "auto",
  },
  msg: {
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
    fontWeight: "bold",
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    gap: "6px",
    padding: "8px",
    borderTop: "1px solid #222",
  },
  cal: {
    flex: 1,
    padding: "8px",
    background: "#101319",
    color: "#13dadf",
    border: "1px solid #13dadf",
    cursor: "pointer",
  },
  stripe: {
    flex: 1,
    padding: "8px",
    background: "#13dadf",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  typing: {
    fontSize: "12px",
    color: "#888",
  },
};