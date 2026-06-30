import { GoogleGenAI } from "@google/genai";

/**
 * 🌊 Safe Gemini AI Service
 * - never crashes app
 * - loads only when key exists
 */

const key = import.meta.env.VITE_GEMINI_API_KEY || null;

let ai: GoogleGenAI | null = null;

if (key) {
  ai = new GoogleGenAI({ apiKey: key });
} else {
  console.warn("⚠️ Gemini API key missing — AI disabled");
}

export async function bootAI() {
  if (!ai) return;

  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say: Ocean systems online"
    });

    console.log("🌊 AI ONLINE:", res.text);
  } catch (err) {
    console.warn("AI boot failed (safe mode):", err);
  }
}

export function getAI() {
  return ai;
}
