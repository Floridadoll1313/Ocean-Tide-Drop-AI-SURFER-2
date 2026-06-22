import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string // IMPORTANT: server key only
);

/**
 * 🌊 STRIPE WEBHOOK = PAYMENT → UNLOCK TIER
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
    console.error("Webhook signature error:", err.message);
    return res.status(400).send("Webhook Error");
  }

  /**
   * 💳 SUCCESSFUL PAYMENT
   */
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const email = session.customer_details?.email;
    const tier = session.metadata?.tier;

    console.log("🌊 PAYMENT SUCCESS");
    console.log("Email:", email);
    console.log("Tier:", tier);

    if (!email || !tier) {
      return res.status(400).json({ error: "Missing email or tier" });
    }

    /**
     * 🔓 UPDATE USER IN SUPABASE
     */
    const { error } = await supabase
      .from("users")
      .update({
        tier,
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ error });
    }

    console.log("✅ USER UNLOCKED:", email);
  }

  return res.json({ received: true });
}