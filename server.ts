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

async function startServer() {
  console.log("🚀 Initializing server...");
  
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const stripe = stripeSecret ? new Stripe(stripeSecret) : null;
  if (!stripe) {
    console.warn("⚠️ STRIPE_SECRET_KEY not found. Stripe integration disabled.");
  }

  app.use(express.json());

  // Simple Logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => res.json({ status: "ok", env: process.env.NODE_ENV }));
  app.post("/api/workflow/surfer", startSurferPipeline);
  app.post("/api/ai/generate", generateAIContent);

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
