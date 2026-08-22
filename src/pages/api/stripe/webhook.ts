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

const TIER_RANK: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
  enterprise: 4,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event: Stripe.Event;

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const tier = session.metadata?.tier;

    if (!userId || !tier || TIER_RANK[tier] === undefined) {
      console.warn("⚠️ Missing or invalid checkout identity/tier");
      return res.json({ ok: true });
    }

    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id;

    const email =
      session.customer_details?.email ??
      session.customer_email ??
      session.metadata?.userEmail ??
      undefined;

    const { data: existingUser, error: lookupError } = await supabase
      .from("users")
      .select("tier")
      .eq("id", userId)
      .maybeSingle();

    if (lookupError) {
      console.error("❌ Supabase user lookup failed:", lookupError);
      return res.status(500).json({ error: lookupError.message });
    }

    const currentRank = TIER_RANK[existingUser?.tier ?? "free"] ?? 0;
    const newRank = TIER_RANK[tier];

    if (newRank < currentRank) {
      console.log("⚠️ Ignoring downgrade attempt");
      return res.json({ received: true });
    }

    const update: Record<string, unknown> = {
      tier,
      subscription_status: "active",
      updated_at: new Date().toISOString(),
    };

    if (email) update.stripe_customer_email = email;
    if (customerId) update.stripe_customer_id = customerId;

    const { error } = await supabase
      .from("users")
      .update(update)
      .eq("id", userId);

    if (error) {
      console.error("❌ Supabase update failed:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ USER UPGRADED SUCCESSFULLY:", userId, tier);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer?.id;

    if (!customerId) return res.json({ received: true });

    const { error } = await supabase
      .from("users")
      .update({
        tier: "free",
        subscription_status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error("❌ Supabase cancellation update failed:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("💔 USER DOWNGRADED TO FREE:", customerId);
  }

  return res.json({ received: true });
}
