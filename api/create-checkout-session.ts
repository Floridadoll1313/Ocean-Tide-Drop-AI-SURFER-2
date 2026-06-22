import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

import { PRICING } from "../../../src/config/pricing";

export default async function handler(req, res) {
  const { tierId, email, userId } = req.body;

  const tier = PRICING[tierId];

  if (!tier || !tier.stripePriceId) {
    return res.status(400).json({ error: "Invalid tier" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [
      {
        price: tier.stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      tier: tierId,
      userId,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  });

  res.json({ url: session.url });
}