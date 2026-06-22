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

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;

    const email = session.customer_email;
    const tier = session.metadata?.tier;

    if (!email || !tier) return res.json({ ok: true });

    // 🔥 REAL UPGRADE WRITE
    await supabase
      .from("users")
      .update({
        tier,
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      })
      .eq("email", email);
  }

  res.json({ received: true });
}