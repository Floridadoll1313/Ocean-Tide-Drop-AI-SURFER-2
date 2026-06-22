export function generateOnboarding(user: {
  tier: string;
  intentScore: number;
}) {
  if (user.intentScore > 80) {
    return [
      "Connect Stripe",
      "Launch AI system",
      "Start monetizing",
    ];
  }

  return [
    "Explore tools",
    "Try templates",
    "Upgrade when ready",
  ];
}