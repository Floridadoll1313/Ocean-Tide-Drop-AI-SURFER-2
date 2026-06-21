import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * 🌊 Webhook = payment success listener
 */
export default async function handler(req: any, res: any) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return res.status(400).send("Webhook Error");
  }

  /**
   * 💳 PAYMENT SUCCESS → THIS IS WHERE YOU UNLOCK USERS
   */
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const tier = session.metadata?.tier;

    console.log("🌊 PAYMENT SUCCESS");
    console.log("Unlocked Tier:", tier);

    // 🔓 NEXT STEP (we will wire this next):
    // - save user in DB
    // - update tier = wave / tsunami
  }

  res.json({ received: true });
}