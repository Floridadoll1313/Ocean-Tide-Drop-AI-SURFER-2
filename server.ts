import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";

/**
 * Handle Stripe Webhook Events
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return res.status(500).json({ error: "Stripe not configured on server." });
  }

  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    // If using Express raw body, req.body is the buffer
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`🌊 Processing Stripe Event: ${event.type}`);

  // Handle specific event types
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`✅ Checkout completed for user: ${session.client_reference_id}`);
  }

  res.json({ received: true });
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

  // Webhooks BEFORE express.json()
  app.post("/api/webhooks/stripe", express.raw({ type: 'application/json' }), handleStripeWebhook);

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/admin/stats", getAdminStats);

  app.post("/api/workflow/surfer", startSurferPipeline);

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
    
    app.get("*", (req, res, next) => {
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
