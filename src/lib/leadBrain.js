import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// 🧠 Turns chat into lead intelligence
export async function scoreLead(messages) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a sales intelligence engine.

Analyze this conversation and return ONLY JSON:

{
  "score": 0-100,
  "status": "cold | warm | hot | ready_to_buy",
  "estimated_value": number,
  "intent": "learning | exploring | buying | urgent",
  "next_action": "email_followup | book_call | send_offer | nurture"
}

Conversation:
${JSON.stringify(messages)}
      `,
    });

    const text = response.text;
    return JSON.parse(text);
  } catch (e) {
    return {
      score: 10,
      status: "cold",
      estimated_value: 0,
      intent: "unknown",
      next_action: "nurture",
    };
  }
}