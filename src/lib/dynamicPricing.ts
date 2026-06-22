export function getPersonalizedPrice(user: {
  tier: string;
  intentScore: number;
}) {
  if (user.intentScore > 80) {
    return { price: 79, label: "Limited-time unlock" };
  }

  if (user.intentScore > 40) {
    return { price: 89, label: "Recommended upgrade" };
  }

  return { price: 99, label: "Standard pricing" };
}