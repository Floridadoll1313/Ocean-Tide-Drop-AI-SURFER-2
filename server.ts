import express from "express";
import path from "path";
import fs from "fs";
import Stripe from "stripe";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API routes
async function generateAIContent(req: express.Request, res: express.Response) {
  try {
    const { prompt, systemInstruction } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ error: "Gemini API key is not configured. Please add it in Settings > Secrets." });
    }

    console.log("🤖 Generating AI content for prompt:", prompt);
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an expert creative assistant for an agency called AI Surfer. Provide punchy, high-frequency, professional output.",
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error("AI Error:", error);
    
    // Graceful fallback for rate limits so the app keeps working with a simulated response
    if (error?.status === 429 || error?.message?.toLowerCase().includes("rate") || error?.message?.toLowerCase().includes("quota") || error?.message?.toLowerCase().includes("exhausted")) {
       return res.json({ result: "⚠️ AI Core Rate Limit Exceeded.\n\nThe neural link is currently running at maximum capacity on the free tier. Please wait a moment for the frequency to cool down, or connect a paid Gemini API key for unlimited throughput.\n\nSimulated Output: [Action successful. Data processed.]" });
    }
    
    res.status(500).json({ error: error.message || "Failed to generate AI content" });
  }
}

async function startSurferPipeline(req: express.Request, res: express.Response) {
  try {
    const payload = req.body;
    console.log("🌊 Starting Surfer Pipeline for payload:", payload);
    res.json({ status: "TRIGGERED", workflow: "surferPipeline", timestamp: new Date().toISOString() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function generateAIContentStream(req: express.Request, res: express.Response) {
  try {
    const { prompt, systemInstruction } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
       res.status(400).json({ error: "Gemini API key is not configured. Please add it in Settings > Secrets." });
       return;
    }

    console.log("🌊 Streaming AI content for prompt:", prompt);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an expert creative assistant for an agency called AI Surfer. Provide punchy, high-frequency, professional output.",
      },
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
      }
    }
    
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error: any) {
    console.error("AI Stream Error:", error);
    
    if (error?.status === 429 || error?.message?.toLowerCase().includes("rate") || error?.message?.toLowerCase().includes("quota") || error?.message?.toLowerCase().includes("exhausted")) {
       res.write(`data: ${JSON.stringify({ text: "⚠️ AI Core Rate Limit Exceeded.\n\nThe neural link is currently running at maximum capacity on the free tier. Please wait a moment for the frequency to cool down, or connect a paid Gemini API key for unlimited throughput.\n\nSimulated Output: [Action successful. Data processed.]" })}\n\n`);
       res.write("data: [DONE]\n\n");
       res.end();
       return;
    }
    
    res.write(`data: ${JSON.stringify({ error: error.message || "Failed to generate AI content" })}\n\n`);
    res.end();
  }
}

async function startServer() {
  console.log("🚀 Initializing server...");
  
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const stripe = (stripeSecret && stripeSecret.trim() !== "") ? new Stripe(stripeSecret) : null;
  if (!stripe) {
    console.warn("⚠️ STRIPE_SECRET_KEY not found or empty. Stripe integration disabled.");
  }

  // Stripe Webhook needs raw body
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripe || !sig || !webhookSecret) {
      return res.status(400).send("Webhook Error: Stripe not configured or missing signature");
    }

    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      console.log("🔔 Stripe Webhook received:", event.type);

      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object as Stripe.Checkout.Session;
          console.log("💰 Payment successful for session:", session.id);
          // TODO: Handle post-payment logic (e.g. fulfill order, update user tier)
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error(`❌ Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  app.use(express.json());

  // Simple Logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => res.json({ status: "ok", env: process.env.NODE_ENV }));
  app.post("/api/workflow/surfer", startSurferPipeline);
  app.post("/api/ai/generate", generateAIContent);
  app.post("/api/ai/generate-stream", generateAIContentStream);

  // Stripe Checkout Session
  app.post("/api/stripe/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured" });
    }

    const { tierId } = req.body;
    if (!tierId) {
      return res.status(400).json({ error: "tierId is required" });
    }

    const priceMap: Record<string, string | undefined> = {
      "dawn-patrol": process.env.STRIPE_PRICE_ID_DAWN_PATROL,
      "breakline": process.env.STRIPE_PRICE_ID_BREAKLINE,
      "hatteras-island": process.env.STRIPE_PRICE_ID_HATTERAS_ISLAND,
      "cape-point": process.env.STRIPE_PRICE_ID_CAPE_POINT,
    };

    const priceId = priceMap[tierId];

    if (!priceId) {
      return res.status(400).json({ error: `Price ID not configured for tier: ${tierId}` });
    }

    try {
      const forwardedProtocol = req.headers["x-forwarded-proto"] as string;
      const forwardedHost = req.headers["x-forwarded-host"] as string;
      const protocol = forwardedProtocol || req.protocol;
      const host = forwardedHost || req.headers.host;
      
      const origin = req.headers.origin || `${protocol}://${host}`;
      
      console.log("💳 Creating checkout session for tier:", tierId);
      console.log("📍 Origin Details:", { origin, protocol, host, forwardedProtocol, forwardedHost });

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${origin}/members?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/members/monetization?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe Session Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    console.log("🛠️ Starting in DEVELOPMENT mode with Vite...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);

    app.use(async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api")) return next();
      
      try {
        const templatePath = path.resolve(process.cwd(), "index.html");
        let template = fs.readFileSync(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).send(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        console.error("Vite Transform Error:", e);
        next(e);
      }
    });
  } else {
    console.log("🌐 Starting in PRODUCTION mode...");
    const distPath = path.resolve(process.cwd(), "dist");
    
    // Serve static assets
    app.use(express.static(distPath));
    
    // SPA fallback
    app.use((req, res, next) => {
      if (req.path.startsWith("/api")) return next();
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not built correctly. dist/index.html missing.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on http://0.0.0.0:${PORT} [${isProduction ? 'PROD' : 'DEV'}]`);
  });
}

startServer().catch(err => {
  console.error("❌ CRITICAL: Failed to start server:", err);
  process.exit(1);
});
