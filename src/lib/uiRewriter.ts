export function rewriteUI(context: {
  intentScore: number;
  tier: string;
}) {
  if (context.intentScore > 80) {
    return {
      headline: "Unlock full system control instantly",
      style: "high_intensity_sales",
    };
  }

  if (context.tier === "free") {
    return {
      headline: "Start building your AI system today",
      style: "friendly_onboarding",
    };
  }

  return {
    headline: "Scale your AI infrastructure",
    style: "professional_growth",
  };
}