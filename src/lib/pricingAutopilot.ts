export function calculateOptimalPrice(user: {
  intentScore: number;
  tier: string;
  usage: number;
}) {
  let base = 99;

  if (user.tier === "bronze") base = 29;
  if (user.tier === "wave") base = 99;

  // 🔥 demand-based adjustment
  if (user.intentScore > 80) base *= 0.9;
  if (user.intentScore < 30) base *= 1.1;

  // ⚡ usage pressure pricing
  if (user.usage > 70) base *= 1.2;

  return {
    price: Math.round(base),
    label:
      user.intentScore > 80
        ? "🔥 Limited demand pricing"
        : "Standard pricing",
  };
}