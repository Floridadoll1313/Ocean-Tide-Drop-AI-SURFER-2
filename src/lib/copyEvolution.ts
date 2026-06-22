export function generateCopy(context: {
  tier: string;
  intentScore: number;
}) {
  if (context.intentScore > 80) {
    return {
      headline: "Unlock full AI automation instantly",
      cta: "Activate Premium System",
    };
  }

  if (context.tier === "free") {
    return {
      headline: "Build your AI business engine today",
      cta: "Start Free",
    };
  }

  return {
    headline: "Scale your AI systems",
    cta: "Upgrade",
  };
}