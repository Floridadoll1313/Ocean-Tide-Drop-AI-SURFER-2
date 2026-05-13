import { Request, Response } from 'express';
import Stripe from 'stripe';

/**
 * Handle Stripe Webhook Events
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return res.status(500).json({ error: "Stripe not configured on server." });
  }

  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    // If using Express raw body, req.body is the buffer
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`🌊 Processing Stripe Event: ${event.type}`);

  // Handle specific event types
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`✅ Checkout completed for user: ${session.client_reference_id}`);
  }

  res.json({ received: true });
}
