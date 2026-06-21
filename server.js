import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/**
 * Middleware
 */
app.use(cors({
  origin: "http://localhost:5173", // Vite dev server
}));

app.use(express.json());

/**
 * Stripe init
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create Checkout Session
 */
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Wave Tier Access 🌊",
              description: "Unlock Step 2–4 AI Business Systems",
            },
            unit_amount: 999, // $9.99
          },
          quantity: 1,
        },
      ],

      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });

  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("🌊 Stripe backend is running");
});

/**
 * Start server
 */
const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`🌊 Server running on port ${PORT}`);
});