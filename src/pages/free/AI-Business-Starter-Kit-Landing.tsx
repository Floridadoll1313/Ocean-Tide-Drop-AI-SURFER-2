async function handleUpgrade(tier: string = "wave") {
  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tier }),
    });

    const session = await res.json();

    const stripe = await (
      await import("@stripe/stripe-js")
    ).loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
    );

    if (!stripe) {
      alert("Stripe failed to load 🌊");
      return;
    }

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });

  } catch (err) {
    console.error(err);
    alert("Payment start failed 🌊");
  }
}