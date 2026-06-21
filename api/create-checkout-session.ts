import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Wave Tier Access 🌊",
              description: "Unlock AI Business Starter Kit",
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],

      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.status(200).json({ id: session.id });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
}