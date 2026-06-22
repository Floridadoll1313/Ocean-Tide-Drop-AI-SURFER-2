export function generatePrice(user: {
  intentScore: number;
  tier: string;
  usage: number;
  churnRisk: number;
}) {
  let base = 99;

  if (user.tier === "bronze") base = 29;
  if (user.tier === "wave") base = 79;

  // behavioral modifiers
  base -= user.intentScore > 80 ? 10 : 0;
  base += user.usage > 70 ? 15 : 0;
  base -= user.churnRisk ? 5 : 0;

  return {
    price: Math.max(19, Math.round(base)),
    reasoning: {
      intent: user.intentScore,
      usage: user.usage,
      churnRisk: user.churnRisk,
    },
  };
}