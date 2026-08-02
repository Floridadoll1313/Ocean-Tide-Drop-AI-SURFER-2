import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST" });
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Missing question" });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.status(500).json({ error: "Missing OpenAI key" });

  try {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are dd Agent — helpful assistant for Ocean Tide Drop." },
        { role: "user", content: question },
      ],
      max_tokens: 400,
      temperature: 0.3,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("OpenAI error:", r.status, txt);
      return res.status(500).json({ error: "LLM request failed" });
    }

    const json = await r.json();
    const answer = json?.choices?.[0]?.message?.content ?? "No answer";
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("agent handler error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
