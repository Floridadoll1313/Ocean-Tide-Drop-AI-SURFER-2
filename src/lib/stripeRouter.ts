type Tier = "bronze" | "wave" | "tsunami";

const STRIPE_CHECKOUT_MAP: Record<
  Tier,
  {
    priceId: string;
    label: string;
  }
> = {
  bronze: {
    priceId: "price_bronze_xxx",
    label: "Bronze Tide",
  },
  wave: {
    priceId: "price_wave_xxx",
    label: "Wave Tier ($99)",
  },
  tsunami: {
    priceId: "price_tsunami_xxx",
    label: "Tsunami Elite",
  },
};

/**
 * 🌊 CENTRAL CHECKOUT ROUTER
 * All upgrade buttons should use this
 */
export async function startCheckout({
  tier,
  userId,
  email,
}: {
  tier: Tier;
  userId?: string;
  email?: string;
}) {
  const plan = STRIPE_CHECKOUT_MAP[tier];

  const res = await fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tier,
      priceId: plan.priceId,
      userId,
      email,
    }),
  });

  const data = await res.json();

  if (data?.url) {
    window.location.href = data.url;
  } else {
    throw new Error("Checkout failed");
  }
}