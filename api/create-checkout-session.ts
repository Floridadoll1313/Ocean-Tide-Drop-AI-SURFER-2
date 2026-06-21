import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { tier = "wave" } = req.body;

    const prices: any = {
      wave: 999,
      tsunami: 1999,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      metadata: {
        tier,
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tier.toUpperCase()} Tier Access 🌊`,
              description: "Unlock your AI Business Starter Kit levels",
            },
            unit_amount: prices[tier] || 999,
          },
          quantity: 1,
        },
      ],

      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ id: session.id });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
}