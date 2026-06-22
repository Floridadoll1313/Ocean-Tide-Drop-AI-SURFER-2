export function predictFutureMarkets(data: {
  searchTrends: number;
  revenueVelocity: number;
  userBehaviorShift: number;
}) {
  const score =
    data.searchTrends * 0.4 +
    data.revenueVelocity * 0.4 +
    data.userBehaviorShift * 0.2;

  let prediction = "stable_market";

  if (score > 80) prediction = "emerging_market";
  if (score > 90) prediction = "new_industry_birth";
  if (score > 95) prediction = "category_revolution_imminent";

  return {
    prediction,
    confidence: score,
    action:
      prediction === "new_industry_birth"
        ? "build_first_mover_product"
        : "observe_and_collect_data",
  };
}