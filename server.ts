import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// API routes
export async function startSurferPipeline(req: Request, res: Response) {
  try {
    const payload = req.body;
    console.log("🌊 Starting Surfer Pipeline for payload:", payload);
    res.json({ status: "TRIGGERED", workflow: "surferPipeline", timestamp: new Date().toISOString() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function main() {
  const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

  app.use(express.json());

  // Simple Logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  app.post("/api/workflow/surfer", startSurferPipeline);

  // Serve static assets from public folder
  app.use(express.static(path.join(process.cwd(), "public")));

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);

    // SPA Fallback for Development
    app.get("*all", async (req, res, next) => {
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
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*all", (req, res, next) => {
      if (req.url.startsWith("/api")) return next();
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

main().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
