import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { GoogleGenAI } from "@google/genai";

/**
 * 🌊 SAFE ENV ACCESS
 * Prevents crash if env is missing
 */
const aiKey = import.meta.env.VITE_GEMINI_API_KEY || null;

/**
 * 🤖 SAFE AI INITIALIZATION
 * App will NOT crash if key is missing
 */
const ai = aiKey ? new GoogleGenAI({ apiKey: aiKey }) : null;

/**
 * 🌊 OPTIONAL BOOT TEST (non-blocking)
 */
async function bootAI() {
  if (!ai) {
    console.warn("⚠️ Gemini AI disabled (missing API key)");
    return;
  }

  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say: Ocean systems online"
    });

    console.log("🌊 AI ONLINE:", res.text);
  } catch (e) {
    console.warn("AI boot test failed (non-blocking):", e);
  }
}

// run safely after startup
bootAI();

/**
 * 🚀 APP BOOTSTRAP
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
