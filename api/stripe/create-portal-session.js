import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({
        error: "Missing Stripe customerId",
      });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.STRIPE_RETURN_URL || "http://localhost:5173/billing",
    });

    return res.status(200).json({
      url: session.url,
    });

  } catch (err) {
    console.error("Stripe portal error:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
}
