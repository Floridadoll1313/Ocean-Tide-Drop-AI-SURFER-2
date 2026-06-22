import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = {
  api: { bodyParser: false },
};

/**
 * 🌊 STRIPE WEBHOOK → REALTIME UPGRADE ENGINE
 */
export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event: Stripe.Event;

  // 🔐 VERIFY STRIPE SIGNATURE
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send("Webhook Error");
  }

  console.log("🌊 Stripe event:", event.type);

  /**
   * 💳 SUCCESSFUL CHECKOUT
   */
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const email = session.customer_email;
    const tier = session.metadata?.tier;

    if (!email || !tier) {
      console.warn("⚠️ Missing email or tier in session");
      return res.json({ ok: true });
    }

    console.log("💰 PAYMENT CONFIRMED");
    console.log("📧 Email:", email);
    console.log("🌊 Tier:", tier);

    /**
     * 🔒 OPTIONAL: prevent downgrade overwrite
     */
    const { data: existingUser } = await supabase
      .from("users")
      .select("tier")
      .eq("email", email)
      .single();

    const TIER_RANK: Record<string, number> = {
      free: 0,
      bronze: 1,
      wave: 2,
      tsunami: 3,
      enterprise: 4,
    };

    const currentRank = TIER_RANK[existingUser?.tier ?? "free"] ?? 0;
    const newRank = TIER_RANK[tier] ?? 0;

    // 🚫 prevent accidental downgrade
    if (newRank < currentRank) {
      console.log("⚠️ Ignoring downgrade attempt");
      return res.json({ ok: true });
    }

    /**
     * 🔥 UPSERT USER TIER
     */
    const { error } = await supabase
      .from("users")
      .update({
        tier,
        subscription_status: "active",
        stripe_customer_email: email,
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (error) {
      console.error("❌ Supabase update failed:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ USER UPGRADED SUCCESSFULLY:", email);
  }

  /**
   * 💔 OPTIONAL: HANDLE CANCELLATIONS (FUTURE SAFE)
   */
  if (event.type === "customer.subscription.deleted") {
    const session: any = event.data.object;

    const email = session.customer_email;

    if (email) {
      await supabase
        .from("users")
        .update({
          tier: "free",
          subscription_status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("email", email);

      console.log("💔 USER DOWNGRADED TO FREE:", email);
    }
  }

  return res.json({ received: true });
}