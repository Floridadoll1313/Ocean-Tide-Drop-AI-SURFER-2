import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, email, tierId } = req.body;

    if (!tierId) {
      return res.status(400).json({ error: "Missing tierId" });
    }

    // 🌊 MAP TIERS → STRIPE PRICE IDs (replace with your real ones)
    const PRICE_MAP: Record<string, string> = {
      bronze: "price_bronze_replace",
      wave: "price_wave_replace",
      tsunami: "price_tsunami_replace",
    };

    const priceId = PRICE_MAP[tierId];

    if (!priceId) {
      return res.status(400).json({ error: "Invalid tier" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      payment_method_types: ["card"],

      customer_email: email,

      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,

      // 🌊 CRITICAL: THIS CONNECTS TO YOUR WEBHOOK
      metadata: {
        user_id: userId,
        tier: tierId,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return res.status(500).json({ error: "Checkout failed" });
  }
}