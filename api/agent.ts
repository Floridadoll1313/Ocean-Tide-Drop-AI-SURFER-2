import type { NextApiRequest, NextApiResponse } from "next";

// Basic in-memory rate limiter (per-process). For production use Redis or another shared store.
const RATE_LIMIT = Number(process.env.DD_RATE_LIMIT) || 60; // requests
const WINDOW_SECONDS = Number(process.env.DD_RATE_WINDOW) || 60; // seconds

type LimitEntry = { count: number; resetAt: number };
const limits = new Map<string, LimitEntry>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const key = ip;
  const entry = limits.get(key);
  if (!entry || now > entry.resetAt) {
    limits.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    return { ok: true, remaining: RATE_LIMIT - 1, resetAt: Date.now() + WINDOW_SECONDS * 1000 };
  }
  if (entry.count >= RATE_LIMIT) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }
  entry.count++;
  limits.set(key, entry);
  return { ok: true, remaining: RATE_LIMIT - entry.count, resetAt: entry.resetAt };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST" });
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Missing question" });

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")?.[0] ?? req.socket.remoteAddress ?? "unknown";
  const rate = checkRateLimit(ip);
  if (!rate.ok) {
    return res.status(429).json({ error: "Rate limit exceeded", retryAfter: Math.ceil((rate.resetAt - Date.now()) / 1000) });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  const MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
  if (!OPENAI_KEY) return res.status(500).json({ error: "Missing OpenAI key" });

  try {
    const payload = {
      model: MODEL,
      messages: [
        { role: "system", content: "You are dd Agent — helpful assistant for Ocean Tide Drop. Keep answers concise and actionable." },
        { role: "user", content: question },
      ],
      max_tokens: 600,
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
      return res.status(500).json({ error: "LLM request failed", detail: txt });
    }

    const json = await r.json();
    const answer = json?.choices?.[0]?.message?.content ?? "No answer";
    return res.status(200).json({ answer, rateLimit: { remaining: rate.remaining, resetAt: rate.resetAt } });
  } catch (err) {
    console.error("agent handler error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
