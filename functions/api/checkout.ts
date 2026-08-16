interface Env {
  STRIPE_SECRET_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { email, tierName, basePrice, promoCode } = await context.request.json() as {
      email: string;
      tierName: string;
      basePrice: number;
      promoCode?: string;
    };

    if (!context.env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: 'Stripe is not configured.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email || !tierName || !Number.isFinite(basePrice) || basePrice <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid checkout details.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isDiscounted = promoCode?.trim().toUpperCase() === 'OCEANTIDE20';
    const finalAmount = isDiscounted
      ? Math.round(basePrice * 0.80 * 100)
      : Math.round(basePrice * 100);

    const origin = new URL(context.request.url).origin;
    const form = new URLSearchParams();

    form.set('mode', 'subscription');
    form.set('customer_email', email);
    form.set('line_items[0][price_data][currency]', 'usd');
    form.set('line_items[0][price_data][product_data][name]', `Ocean Tide Drop AI - ${tierName}`);
    form.set('line_items[0][price_data][product_data][description]', `Recurring access to ${tierName} services`);
    form.set('line_items[0][price_data][unit_amount]', String(finalAmount));
    form.set('line_items[0][price_data][recurring][interval]', 'month');
    form.set('line_items[0][quantity]', '1');
    form.set('success_url', `${origin}/?session_id={CHECKOUT_SESSION_ID}&status=success`);
    form.set('cancel_url', `${origin}/?status=cancelled`);

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });

    const stripeData = await stripeResponse.json() as {
      url?: string;
      error?: { message?: string };
    };

    if (!stripeResponse.ok || !stripeData.url) {
      return new Response(JSON.stringify({
        error: stripeData.error?.message || 'Unable to create Stripe checkout session.',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ url: stripeData.url }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected checkout error.';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
