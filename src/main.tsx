import { GoogleGenAI } from "@google/genai";

function createAI() {
  const key = import.meta.env.VITE_GEMINI_API_KEY;

  if (!key) {
    console.warn("⚠️ Missing VITE_GEMINI_API_KEY — AI disabled");
    return null;
  }

  return new GoogleGenAI({ apiKey: key });
}

const ai = createAI();
