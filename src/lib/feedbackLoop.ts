export function updateSystemLearning(data: {
  conversionRate: number;
  churnRate: number;
  avgIntentScore: number;
}) {
  const learning = {
    increaseAggression: data.conversionRate < 0.15,
    increaseUpsellFrequency: data.avgIntentScore > 60,
    reducePricing: data.churnRate > 0.1,
  };

  return learning;
}