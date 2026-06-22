export function evolveRevenueModel(data: {
  conversionRate: number;
  avgRevenue: number;
}) {
  if (data.conversionRate < 0.1) {
    return {
      change: "lower_price_increase_volume",
    };
  }

  if (data.avgRevenue > 1000) {
    return {
      change: "increase_premium_tier",
    };
  }

  return {
    change: "stable_pricing",
  };
}