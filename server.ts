import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

/**
 * Handle Stripe Webhook Events
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  let body;
  try {
    // req.body is a buffer because of express.raw
    body = JSON.parse(req.body.toString('utf-8'));
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  // Immediately start the workflow
  // Emulating: const run = await env.WORKFLOW_ENGINE.start("surferPipeline", body);
  const runId = "run-mock-" + Math.random().toString(36).substring(7);
  console.log(`🌊 Started workflow 'surferPipeline': runId=${runId}`);

  return res.json({ status: "ok", runId: runId });
}

/**
 * Trigger the Surfer Pipeline Workflow
 * Note: Since we are in a custom Express environment, we emulate the workflow trigger.
 */
export async function startSurferPipeline(req: Request, res: Response) {
  try {
    const payload = req.body;
    console.log("🌊 Starting Surfer Pipeline for payload:", payload);
    
    // In a real Cloudflare Workflow environment, this would call wf.trigger()
    // Here we'll just acknowledge the start.
    
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

  // TODO: Replace with real D1 query
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

  // TODO: Replace with real D1 join
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

  // Replace with your actual admin stats logic
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

  // Use raw body for Stripe webhooks - Custom Stripe Webhook
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

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      
      if (userId) {
        // Here we would normally update Firestore
        // Since this is a server-side action and we don't have the Admin SDK set up by default 
        // in this step, we'll assume the client will handle it or we'll add admin sdk if needed.
        // For now, let's log it.
        console.log(`User ${userId} subscribed successfully.`);
      }
    }

    res.json({ received: true });
  });

  // Keep existing webhook route for completeness
  app.post("/api/webhooks/stripe", express.raw({ type: 'application/json' }), handleStripeWebhook);
  app.post("/stripe/webhook", express.raw({ type: 'application/json' }), handleStripeWebhook);

  app.use(express.json());

  // API Route to create checkout session
  app.post("/api/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe not configured" });
    }

    const { userId, email } = req.body;
    const priceId = process.env.VITE_STRIPE_PRICE_ID;

    if (!priceId) {
      return res.status(500).json({ error: "Price ID not configured" });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${process.env.VITE_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.VITE_BASE_URL}/join`,
        customer_email: email,
        client_reference_id: userId,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/me", handleMe);
  app.get("/api/steps", handleSteps);

  app.get("/api/admin/stats", getAdminStats);

  app.post("/api/workflow/surfer", startSurferPipeline);
  app.post("/workflow/start", startSurferPipeline);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    const excludedRoutes = ["/assets", "/favicon.ico", "/robots.txt"];
    
    app.get("*all", (req, res, next) => {
      // Exclude asset and strictly static routes from returning the SPA index.html
      if (excludedRoutes.some(route => req.path.startsWith(route) || req.path === route)) {
        return next();
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
