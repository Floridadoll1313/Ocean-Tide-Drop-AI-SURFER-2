import Stripe from "stripe";
import { PRICING } from "../../../src/config/pricing";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { tierId, email, userId } = req.body;

    const tier = PRICING[tierId];

    if (!tier?.stripePriceId) {
      return res.status(400).json({ error: "Invalid tier" });
    }

    if (!email || !userId) {
      return res.status(400).json({ error: "Missing email or userId" });
    }

    // 🧠 Idempotency key (prevents duplicate checkout sessions)
    const idempotencyKey = `checkout:${userId}:${tierId}`;

    // 🔎 Get latest Stripe customer (if exists)
    const { data: existingSub } = await supabase
      .from("stripe_subscriptions")
      .select("stripe_customer_id")
      .eq("user_email", email)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let customerId = existingSub?.stripe_customer_id ?? null;

    // 👤 Create Stripe customer if missing
    if (!customerId) {
      const customer = await stripe.customers.create(
        {
          email,
          metadata: {
            userId,
            userEmail: email,
          },
        },
        {
          idempotencyKey: `stripe-customer:${userId}`,
        }
      );

      customerId = customer.id;
    }

    // 💳 Create Checkout Session
    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",

        customer: customerId,

        line_items: [
          {
            price: tier.stripePriceId,
            quantity: 1,
          },
        ],

        // 🌊 Core identity binding for webhook
        metadata: {
          tier: tierId,
          userId,
          userEmail: email,
          source: "ocean-tide-drop",
        },

        subscription_data: {
          metadata: {
            tier: tierId,
            userId,
            userEmail: email,
          },
        },

        success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=1`,

        client_reference_id: userId,
      },
      {
        idempotencyKey,
      }
    );

    return res.json({ url: session.url });
  } catch (err: any) {
    console.error("create-checkout-session error:", err);
    return res.status(500).json({
      error: err?.message ?? "Checkout creation failed",
    });
  }
}