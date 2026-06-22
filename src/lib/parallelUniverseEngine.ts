export function createUniverses(baseState: any) {
  return [
    {
      id: "alpha",
      strategy: "aggressive_growth",
      multiplier: 1.8,
      churn: baseState.churn * 1.2,
    },
    {
      id: "beta",
      strategy: "product_quality",
      multiplier: 1.2,
      churn: baseState.churn * 0.7,
    },
    {
      id: "gamma",
      strategy: "monetization_first",
      multiplier: 2.2,
      churn: baseState.churn * 1.5,
    },
  ];
}