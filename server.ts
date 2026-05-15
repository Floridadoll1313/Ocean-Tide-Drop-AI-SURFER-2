import express, { Request, Response } from "express";
import path from "path";
import * as fs from "fs";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

/**
 * Handle Stripe Webhook Events
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  let body;
  try {
    body = JSON.parse(req.body.toString('utf-8'));
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const runId = "run-mock-" + Math.random().toString(36).substring(7);
  console.log(`🌊 Started workflow 'surferPipeline': runId=${runId}`);

  return res.json({ status: "ok", runId: runId });
}

/**
 * Trigger the Surfer Pipeline Workflow
 */
export async function startSurferPipeline(req: Request, res: Response) {
  try {
    const payload = req.body;
    console.log("🌊 Starting Surfer Pipeline for payload:", payload);
    
    res.json({
      status: "TRIGGERED",
      workflow: "surferPipeline",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function handleMe(req: Request, res: Response) {
  const email = req.headers["x-user-email"];

  if (!email) {
    return res.json({ isMember: false, tier: null });
  }

  const member: any = null; // TEMP

  if (!member || member.status !== "active") {
    return res.json({ isMember: false, tier: null });
  }

  return res.json({ isMember: true, tier: member.tier });
}

export async function handleSteps(req: Request, res: Response) {
  const email = req.headers["x-user-email"];

  if (!email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const row = {
    streak_days: 7,
    waves_ridden: 42,
    badges: JSON.stringify(["first-wave", "seven-day-streak"]),
  }; // TEMP

  return res.json({
    streakDays: row.streak_days,
    wavesRidden: row.waves_ridden,
    badges: JSON.parse(row.badges),
  });
}

export async function getAdminStats(req: Request, res: Response) {
  const adminKey = req.headers["x-admin-key"];
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminKey || !adminSecret || adminKey !== adminSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({
    status: "operational",
    timestamp: new Date().toISOString(),
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  const stripe = process.env.STRIPE_SECRET_KEY 
    ? new Stripe(process.env.STRIPE_SECRET_KEY) 
    : null;

  // Use raw body for Stripe webhooks
  app.post("/api/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.warn("Stripe logic skipped: Missing keys");
      return res.status(200).json({ received: true });
    }

    const sig = req.headers["stripe-signature"] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      if (userId) {
        console.log(`User ${userId} subscribed successfully.`);
      }
    }

    res.json({ received: true });
  });

  app.post("/api/webhooks/stripe", express.raw({ type: 'application/json' }), handleStripeWebhook);
  app.post("/stripe/webhook", express.raw({ type: 'application/json' }), handleStripeWebhook);

  app.use(express.json());

  app.post("/api/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe not configured. Please add STRIPE_SECRET_KEY to .env" });
    }

    const { userId, email, tierId } = req.body;
    const priceEnvKey = `STRIPE_PRICE_ID_${tierId?.replace(/-/g, '_')?.toUpperCase()}`;
    const priceId = process.env[priceEnvKey] || process.env.VITE_STRIPE_PRICE_ID;

    if (!priceId) {
      return res.status(500).json({ error: `Stripe Price ID not configured. Please add ${priceEnvKey} or VITE_STRIPE_PRICE_ID to .env` });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: `${process.env.VITE_BASE_URL || 'http://localhost:3000'}/profile?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.VITE_BASE_URL || 'http://localhost:3000'}/pricing/${tierId}`,
        customer_email: email,
        client_reference_id: userId,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/me", handleMe);
  app.get("/api/steps", handleSteps);
  app.get("/api/admin/stats", getAdminStats);
  app.post("/api/workflow/surfer", startSurferPipeline);
  app.post("/workflow/start", startSurferPipeline);

  // Serve static assets from public folder
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite or Static handling
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    app.get("*all", async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith("/api")) return next();
      
      try {
        const templatePath = path.join(process.cwd(), "index.html");
        let template = fs.readFileSync(templatePath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).send(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
