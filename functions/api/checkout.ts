import Stripe from 'stripe';

interface Env {
  STRIPE_SECRET_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });

  try {
    const { email, tierName, basePrice, promoCode } = await context.request.json() as {
      email: string;
      tierName: string;
      basePrice: number;
      promoCode: string;
    };

    // Calculate dynamic amount in cents
    const isDiscounted = promoCode?.trim().toUpperCase() === 'OCEANTIDE20';
    const finalAmount = isDiscounted ? Math.round(basePrice * 0.80 * 100) : Math.round(basePrice * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Ocean Tide Drop AI - ${tierName}`,
              description: `Recurring access to ${tierName} services`,
            },
            unit_amount: finalAmount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${new URL(context.request.url).origin}/?session_id={CHECKOUT_SESSION_ID}&status=success`,
      cancel_url: `${new URL(context.request.url).origin}/?status=cancelled`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
