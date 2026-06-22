export function GrowthAgent(data: {
  revenue: number;
  churn: number;
  intentScoreAvg: number;
}) {
  let strategy = "stabilize";

  if (data.revenue < 1000) strategy = "aggressive_growth";
  if (data.churn > 0.1) strategy = "retention_focus";
  if (data.intentScoreAvg > 70) strategy = "monetization_boost";

  return {
    strategy,
    actions: {
      aggressive_growth: ["increase upsells", "reduce friction"],
      retention_focus: ["reactivation campaigns", "feature simplification"],
      monetization_boost: ["raise prices", "add premium tier"],
    }[strategy],
  };
}