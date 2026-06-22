export function evolveProduct(metrics: {
  featureUsage: Record<string, number>;
  churnRate: number;
  conversionRate: number;
}) {
  const suggestions: string[] = [];

  if (metrics.churnRate > 0.1) {
    suggestions.push("simplify onboarding flow");
  }

  if (metrics.conversionRate < 0.15) {
    suggestions.push("add stronger upgrade prompts");
  }

  Object.entries(metrics.featureUsage).forEach(([feature, usage]) => {
    if (usage < 10) {
      suggestions.push(`consider removing or improving ${feature}`);
    }
    if (usage > 100) {
      suggestions.push(`expand ${feature} into premium tier`);
    }
  });

  return {
    suggestions,
    mode: "auto-evolution-ready",
  };
}