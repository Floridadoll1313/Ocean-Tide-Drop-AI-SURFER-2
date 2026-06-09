case "checkout.session.completed": {
  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.client_reference_id || session.metadata?.userId;
  const tierId = session.metadata?.tierId;

  if (!userId) {
    console.warn("Missing userId in Stripe session");
    break;
  }

  let tier = "basic";
  if (tierId === "breakline" || tierId === "hatteras-island") tier = "premium";
  if (tierId === "cape-point") tier = "enterprise";

  console.log("🌊 Writing subscription to Supabase:", userId);

  // 1. UPSERT CLIENT
  await supabase.from("clients").upsert({
    uid: userId,
    email: session.customer_email,
    tier,
    status: "active",
    stripe_customer_id: session.customer,
    stripe_subscription_id: session.subscription,
    updated_at: new Date()
  });

  // 2. CREATE PAYMENT RECORD
  await supabase.from("payments").insert({
    user_id: userId,
    amount: session.amount_total || 0,
    currency: session.currency || "usd",
    status: "succeeded",
    stripe_session_id: session.id,
    tier_id: tierId
  });

  console.log("✅ Supabase onboarding complete");
  break;
}