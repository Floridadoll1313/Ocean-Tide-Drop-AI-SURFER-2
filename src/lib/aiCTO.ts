export function AICTO(system: {
  revenue: number;
  churn: number;
  growthRate: number;
}) {
  let decision = "observe";

  if (system.revenue < 1000) decision = "aggressive_growth";
  if (system.churn > 0.1) decision = "stabilize_product";
  if (system.growthRate > 0.2) decision = "scale_features";

  return {
    decision,
    priorities: {
      aggressive_growth: ["increase upsells", "launch new features"],
      stabilize_product: ["fix UX friction", "reduce pricing complexity"],
      scale_features: ["expand toolset", "add premium tiers"],
    }[decision],
  };
}