case "checkout.session.completed": {
  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.client_reference_id || session.metadata?.userId;
  const tierId = session.metadata?.tierId;

  if (!userId) {
    console.warn("Missing userId in Stripe session");
    break;
  }

  // Map tier safely
  let tier: "basic" | "premium" | "enterprise" = "basic";

  if (tierId === "breakline" || tierId === "hatteras-island") {
    tier = "premium";
  }

  if (tierId === "cape-point") {
    tier = "enterprise";
  }

  const email =
    session.customer_details?.email ||
    session.customer_email ||
    "";

  console.log("🌊 Triggering full onboarding pipeline:", {
    userId,
    tier,
    email,
  });

  try {
    await onboardClient({
      userId,
      email,
      tier,
    });

    console.log("⚡ FULL AUTOMATED ONBOARDING COMPLETE");
  } catch (err) {
    console.error("❌ Onboarding failed:", err);
  }

  break;
}