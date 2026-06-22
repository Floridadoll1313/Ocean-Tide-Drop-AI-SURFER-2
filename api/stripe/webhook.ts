import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";

export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send("Webhook Error");
  }

  // 🧠 1. DEDUPE GUARD (CRITICAL)
  const { data: existingEvent } = await supabase
    .from("stripe_events")
    .select("stripe_event_id")
    .eq("stripe_event_id", event.id)
    .maybeSingle();

  if (existingEvent) {
    return res.json({ received: true, deduped: true });
  }

  await supabase.from("stripe_events").insert({
    stripe_event_id: event.id,
    type: event.type,
  });

  // 💳 2. MAIN LOGIC
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const email =
      session.customer_details?.email ||
      session.metadata?.userEmail;

    const tier = session.metadata?.tier;

    const subscriptionId = session.subscription;
    const customerId = session.customer;

    if (!email || !tier) {
      return res.json({ ok: true });
    }

    // 🧾 UPSERT SUBSCRIPTION (SOURCE OF TRUTH)
    await supabase.from("stripe_subscriptions").upsert(
      {
        user_email: email,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        status: "active",
        tier,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "stripe_subscription_id",
      }
    );

    // 👤 SYNC USER (FAST UI LAYER)
    await supabase
      .from("users")
      .update({
        tier,
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);
  }

  // 💥 3. HANDLE FAILED PAYMENTS
  if (event.type === "invoice.payment_failed") {
    const invoice: any = event.data.object;

    await supabase
      .from("stripe_subscriptions")
      .update({
        status: "past_due",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_customer_id", invoice.customer);
  }

  // 💳 4. HANDLE CANCELLATION
  if (event.type === "customer.subscription.deleted") {
    const sub: any = event.data.object;

    await supabase
      .from("stripe_subscriptions")
      .update({
        status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_subscription_id", sub.id);
  }

  return res.json({ received: true });
}