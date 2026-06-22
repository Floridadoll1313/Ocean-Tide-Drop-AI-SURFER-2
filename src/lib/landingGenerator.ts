export function generateLanding(user: {
  tier: string;
  intentScore: number;
}) {
  if (user.intentScore > 80) {
    return {
      headline: "Unlock full AI automation in minutes",
      cta: "Start Premium Access",
    };
  }

  if (user.tier === "free") {
    return {
      headline: "Build your AI business system today",
      cta: "Get Started Free",
    };
  }

  return {
    headline: "Scale your AI workflows",
    cta: "Upgrade System",
  };
}