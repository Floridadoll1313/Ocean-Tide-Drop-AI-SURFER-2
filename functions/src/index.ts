import Stripe from "stripe";
import express from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { userId, email, tierId } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: tierId, // or map slug → Stripe priceId
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/members`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      metadata: {
        userId,
        tierId,
      },
    });

    res.json({ url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;