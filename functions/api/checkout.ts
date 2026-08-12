interface Env {
  STRIPE_SECRET_KEY: string;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function addParam(params: URLSearchParams, key: string, value: string | number) {
  params.append(key, String(value));
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const secretKey = context.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    return json({ error: "Stripe checkout is not configured yet." }, 503);
  }

  try {
    const body = await context.request.json() as {
      email?: string;
      tierName?: string;
      basePrice?: number;
      promoCode?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const tierName = body.tierName?.trim();
    const basePrice = Number(body.basePrice);
    const promoCode = body.promoCode?.trim().toUpperCase() ?? "";

    if (!email || !email.includes("@")) {
      return json({ error: "A valid email address is required." }, 400);
    }

    if (!tierName) {
      return json({ error: "A valid tier is required." }, 400);
    }

    if (!Number.isFinite(basePrice) || basePrice <= 0) {
      return json({ error: "A valid subscription price is required." }, 400);
    }

    const discounted = promoCode === "OCEANTIDE20";
    const finalAmount = discounted
      ? Math.round(basePrice * 0.8 * 100)
      : Math.round(basePrice * 100);

    const params = new URLSearchParams();
    addParam(params, "mode", "subscription");
    addParam(params, "customer_email", email);
    addParam(params, "line_items[0][quantity]", 1);
    addParam(params, "line_items[0][price_data][currency]", "usd");
    addParam(params, "line_items[0][price_data][unit_amount]", finalAmount);
    addParam(params, "line_items[0][price_data][product_data][name]", `Ocean Tide Drop AI - ${tierName}`);
    addParam(params, "line_items[0][price_data][product_data][description]", `Recurring access to ${tierName} services`);
    addParam(params, "line_items[0][price_data][recurring][interval]", "month");

    const origin = new URL(context.request.url).origin;
    addParam(params, "success_url", `${origin}/?session_id={CHECKOUT_SESSION_ID}&status=success`);
    addParam(params, "cancel_url", `${origin}/?status=cancelled`);

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const stripeBody = await response.json() as { url?: string; error?: { message?: string } };

    if (!response.ok || !stripeBody.url) {
      return json({ error: stripeBody.error?.message ?? "Unable to create Stripe checkout session." }, 400);
    }

    return json({ url: stripeBody.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start checkout.";
    return json({ error: message }, 400);
  }
};
