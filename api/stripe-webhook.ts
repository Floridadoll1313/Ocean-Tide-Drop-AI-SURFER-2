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
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(req: any, res: any) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Stripe signature error:", err.message);
    return res.status(400).send("Webhook Error");
  }

  // 💳 SUCCESSFUL PAYMENT EVENT
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const tier = session.metadata?.tier || "free";
    const userId = session.metadata?.user_id; // ⭐ IMPORTANT (BEST PRACTICE)

    console.log("🌊 PAYMENT SUCCESS");
    console.log("User:", userId);
    console.log("Tier:", tier);

    if (!userId) {
      console.error("Missing user_id in metadata");
      return res.status(400).json({ error: "Missing user_id" });
    }

    const { error } = await supabase
      .from("users")
      .update({
        tier,
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ error });
    }

    console.log("✅ USER UNLOCKED:", userId);
  }

  return res.json({ received: true });
}