import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// 🌊 Supabase ADMIN client (bypasses RLS)
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * 🌊 Stripe Webhook Handler
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
   * 💳 SUCCESSFUL PAYMENT
   */
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const tier = session.metadata?.tier || "wave";
    const email = session.customer_details?.email;

    console.log("🌊 PAYMENT SUCCESS");
    console.log("Email:", email);
    console.log("Tier:", tier);

    if (!email) {
      console.error("No email found in Stripe session");
      return res.status(400).json({ error: "No email" });
    }

    /**
     * 🔓 UPSERT USER + UPDATE TIER
     */
    const { error } = await supabase
      .from("users")
      .upsert(
        {
          email,
          tier,
          stripe_session_id: session.id,
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "DB update failed" });
    }

    console.log("🌊 USER UNLOCKED:", email);
  }

  res.json({ received: true });
}