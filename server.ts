import express from "express";
import path from "path";
import fs from "fs";
import Stripe from "stripe";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import admin from "firebase-admin";

dotenv.config();

// Initialize Firebase Admin lazily/on start
if (admin.apps.length === 0) {
  admin.initializeApp();
}
const db = admin.firestore();

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
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an expert creative assistant for an agency called AI Surfer. Provide punchy, high-frequency, professional output.",
      },
    });

    res.json({ result: response.text });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("AI Error:", error);
    
    // Graceful fallback for rate limits so the app keeps working with a simulated response
    if ((error as { status?: number })?.status === 429 || err?.message?.toLowerCase().includes("rate") || err?.message?.toLowerCase().includes("quota") || err?.message?.toLowerCase().includes("exhausted")) {
       return res.json({ result: "⚠️ AI Core Rate Limit Exceeded.\n\nThe neural link is currently running at maximum capacity on the free tier. Please wait a moment for the frequency to cool down, or connect a paid Gemini API key for unlimited throughput.\n\nSimulated Output: [Action successful. Data processed.]" });
    }
    
    res.status(500).json({ error: (error as Error).message || "Failed to generate AI content" });
  }
}

async function startSurferPipeline(req: express.Request, res: express.Response) {
  try {
    const payload = req.body;
    console.log("🌊 Starting Surfer Pipeline for payload:", payload);
    res.json({ status: "TRIGGERED", workflow: "surferPipeline", timestamp: new Date().toISOString() });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
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
      model: "gemini-2.5-flash",
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
  } catch (error: unknown) {
    const err = error as Error;
    console.error("AI Stream Error:", error);
    
    if ((error as { status?: number })?.status === 429 || err?.message?.toLowerCase().includes("rate") || err?.message?.toLowerCase().includes("quota") || err?.message?.toLowerCase().includes("exhausted")) {
       res.write(`data: ${JSON.stringify({ text: "⚠️ AI Core Rate Limit Exceeded.\n\nThe neural link is currently running at maximum capacity on the free tier. Please wait a moment for the frequency to cool down, or connect a paid Gemini API key for unlimited throughput.\n\nSimulated Output: [Action successful. Data processed.]" })}\n\n`);
       res.write("data: [DONE]\n\n");
       res.end();
       return;
    }
    
    res.write(`data: ${JSON.stringify({ error: err.message || "Failed to generate AI content" })}\n\n`);
    res.end();
  }
}

async function seedTiersIfEmpty() {
  try {
    const tiersColl = db.collection("pricing_tiers");
    const snapshot = await tiersColl.limit(1).get();
    
    if (snapshot.empty) {
      console.log("🌱 Seeding default dynamic pricing tiers in Firestore...");
      const defaultTiers = [
        {
          id: "dawn-patrol",
          name: "Dawn Patrol",
          price: "$49",
          period: "/month",
          description: "For creators starting their high-frequency journey.",
          color: "border-cyan-500/20",
          features: [
            "Daily AI Trend Analysis",
            "Basic Workflow Automations",
            "Standard Cinematic Templates",
            "Community Access"
          ],
          popular: false,
          stripePriceId: process.env.STRIPE_PRICE_ID_DAWN_PATROL || ""
        },
        {
          id: "breakline",
          name: "Breakline",
          price: "$99",
          period: "/month",
          description: "Optimized for scaling digital structures.",
          color: "border-purple-500/30",
          features: [
            "Everything in Dawn Patrol",
            "Advanced AI Marketing Tools",
            "Unlimited Workflow Triggers",
            "Primary Support Frequency"
          ],
          popular: true,
          stripePriceId: process.env.STRIPE_PRICE_ID_BREAKLINE || ""
        },
        {
          id: "hatteras-island",
          name: "Surfer Elite",
          price: "$249",
          period: "/month",
          description: "The elite frequency for established brands.",
          color: "border-orange-500/20",
          features: [
            "Everything in Breakline",
            "Cinematic Brand Architecture",
            "Custom AI Personas",
            "High-Frequency Consultation"
          ],
          popular: false,
          stripePriceId: process.env.STRIPE_PRICE_ID_HATTERAS_ISLAND || ""
        },
        {
          id: "cape-point",
          name: "Cape Point",
          price: "$499",
          period: "/month",
          description: "Ultimate architectural mastery and custom growth.",
          color: "border-white/20",
          features: [
            "Full Private AI Ecosystem",
            "Dedicated Growth Architect",
            "White-Label Implementation",
            "Peak Priority 24/7"
          ],
          popular: false,
          stripePriceId: process.env.STRIPE_PRICE_ID_CAPE_POINT || ""
        }
      ];

      for (const tier of defaultTiers) {
        await tiersColl.doc(tier.id).set(tier);
      }
      console.log("✅ Seeding dynamic pricing tiers complete!");
    } else {
      console.log("📊 Non-empty pricing_tiers collection loaded.");
    }
  } catch {
    // Ignore seeding error in missing GCP environments
  }
}

async function startServer() {
  console.log("🚀 Initializing server...");
  await seedTiersIfEmpty();
  
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
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log("💰 checkout.session.completed event captured for:", session.id);
          
          const userId = session.client_reference_id || session.metadata?.userId;
          const tierId = session.metadata?.tierId;
          const stripeCustomerId = session.customer as string;
          const stripeSubscriptionId = session.subscription as string;

          if (!userId) {
            console.warn("⚠️ Missing client_reference_id or userId in session metadata.");
            break;
          }

          let mappedTier: "basic" | "premium" | "enterprise" = "basic";
          if (tierId === "breakline" || tierId === "hatteras-island") {
            mappedTier = "premium";
          } else if (tierId === "cape-point") {
            mappedTier = "enterprise";
          }

          console.log(`🔗 Webhook updating user ${userId} to active on tier ${mappedTier}`);
          
          // Write directly using admin SDK to update user status
          const userRef = db.collection("users").doc(userId);
          await userRef.set({
            subscriptionStatus: "active",
            tier: mappedTier,
            stripeCustomerId: stripeCustomerId || null,
            stripeSubscriptionId: stripeSubscriptionId || null,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });

          // Record payment transaction
          const paymentId = `pay_${Date.now()}_${userId.slice(0, 6)}`;
          await db.collection("payments").doc(paymentId).set({
            userId: userId,
            amount: session.amount_total || 0,
            currency: session.currency || "usd",
            status: "succeeded",
            stripeSessionId: session.id,
            tierId: tierId || "dawn-patrol",
            createdAt: admin.firestore.FieldValue.serverTimestamp()
          });

          console.log(`✅ Success logging checkout session to users & payments collections for user ${userId}.`);
          break;
        }

        case "customer.subscription.created":
        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          console.log(`🔔 customer.subscription.${event.type === "customer.subscription.created" ? "created" : "updated"} triggered:`, subscription.id);
          
          const userId = subscription.metadata?.userId;
          const tierId = subscription.metadata?.tierId;
          const stripeCustomerId = subscription.customer as string;

          if (userId) {
            let mappedTier: "basic" | "premium" | "enterprise" = "basic";
            if (tierId === "breakline" || tierId === "hatteras-island") {
              mappedTier = "premium";
            } else if (tierId === "cape-point") {
              mappedTier = "enterprise";
            }

            const userRef = db.collection("users").doc(userId);
            await userRef.set({
              subscriptionStatus: "active",
              tier: mappedTier,
              stripeCustomerId: stripeCustomerId,
              stripeSubscriptionId: subscription.id,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            console.log(`✅ Updated subscription for ${userId} to active.`);
          }
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          console.log("🔔 customer.subscription.deleted event captured:", subscription.id);

          const userId = subscription.metadata?.userId;
          if (userId) {
            const userRef = db.collection("users").doc(userId);
            await userRef.set({
              subscriptionStatus: "canceled",
              tier: "none",
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            console.log(`✅ Cancelled subscription statuses on user profile: ${userId}`);
          } else {
            // Safe fallback lookup
            const usersQuery = await db.collection("users").where("stripeSubscriptionId", "==", subscription.id).limit(1).get();
            if (!usersQuery.empty) {
              const userDoc = usersQuery.docs[0];
              await userDoc.ref.set({
                subscriptionStatus: "canceled",
                tier: "none",
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
              }, { merge: true });
              console.log(`✅ Found subscriber via back-search of subscriptionID & canceled profile.`);
            }
          }
          break;
        }

        default:
          console.log(`Unhandled webhook event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err: unknown) {
      console.error(`❌ Webhook Error: ${(err as Error).message}`);
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }
  });

  app.use(express.json());

  // Simple Logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => res.json({ status: "ok", env: process.env.NODE_ENV }));

  // New Test Endpoint to view your Firestore document
  app.get("/api/test-firebase", async (req, res) => {
    try {
      console.log("🌊 Attempting to read 'otd ai surfer' collection...");
      const snapshot = await db.collection("otd ai surfer").get();
      
      if (snapshot.empty) {
        return res.json({ message: "Connected, but no documents found in 'otd ai surfer'." });
      }

      const documents: any[] = [];
      snapshot.forEach(doc => {
        documents.push({
          id: doc.id,
          data: doc.data()
        });
      });

      res.json({ status: "Success", items: documents });
    } catch (error: unknown) {
      console.error("Firebase read error:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.post("/api/workflow/surfer", startSurferPipeline);
  app.post("/api/ai/generate", generateAIContent);
  app.post("/api/ai/generate-stream", generateAIContentStream);

  // Get Dynamic Pricing Tiers
  app.get("/api/pricing-tiers", async (req, res) => {
    try {
      const snapshot = await db.collection("pricing_tiers").get();
      const list: Record<string, unknown>[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Record<string, unknown>);
      });
      
      const order = ["dawn-patrol", "breakline", "hatteras-island", "cape-point"];
      list.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
      
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  // Stripe Checkout Session Dual Endpoint Handler
  const checkoutSessionHandler = async (req: express.Request, res: express.Response) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured" });
    }

    const { tierId, userId, email } = req.body;
    if (!tierId) {
      return res.status(400).json({ error: "tierId is required" });
    }

    let priceId: string | undefined;

    // Load Price ID from dynamic Firestore tier if configured
    try {
      const docSnap = await db.collection("pricing_tiers").doc(tierId).get();
      if (docSnap.exists) {
        priceId = docSnap.data()?.stripePriceId;
      }
    } catch (dbErr) {
      console.warn("DB dynamic pricetiers fetch warn:", dbErr);
    }

    // Direct fallback from system environment
    if (!priceId) {
      const priceMap: Record<string, string | undefined> = {
        "dawn-patrol": process.env.STRIPE_PRICE_ID_DAWN_PATROL,
        "breakline": process.env.STRIPE_PRICE_ID_BREAKLINE,
        "hatteras-island": process.env.STRIPE_PRICE_ID_HATTERAS_ISLAND,
        "cape-point": process.env.STRIPE_PRICE_ID_CAPE_POINT,
      };
      priceId = priceMap[tierId];
    }

    if (!priceId) {
      return res.status(400).json({ error: `Price ID not configured for tier: ${tierId}` });
    }

    try {
      const forwardedProtocol = req.headers["x-forwarded-proto"] as string;
      const forwardedHost = req.headers["x-forwarded-host"] as string;
      const protocol = forwardedProtocol || req.protocol;
      const host = forwardedHost || req.headers.host;
      
      const origin = req.headers.origin || `${protocol}://${host}`;
      
      console.log("💳 Creating checkout session for tier:", tierId, "user:", userId);

      const session = await stripe.checkout.sessions.create({
        client_reference_id: userId,
        customer_email: email || undefined,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId || "",
          tierId: tierId,
        },
        subscription_data: {
          metadata: {
            userId: userId || "",
            tierId: tierId,
          }
        },
        mode: "subscription",
        success_url: `${origin}/members?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/members/monetization?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error: unknown) {
      console.error("Stripe Session Error:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  };

  app.post("/api/stripe/create-checkout-session", checkoutSessionHandler);
  app.post("/api/create-checkout-session", checkoutSessionHandler);

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
      } catch (e: unknown) {
        vite.ssrFixStacktrace(e as Error);
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
