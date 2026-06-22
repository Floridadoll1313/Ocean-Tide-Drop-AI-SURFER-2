export function reactToMarket(data: {
  competitorPricingDrop: boolean;
  trendScore: number;
}) {
  if (data.competitorPricingDrop) {
    return {
      action: "introduce_value_bundle",
    };
  }

  if (data.trendScore > 80) {
    return {
      action: "build_feature_fast_track",
    };
  }

  return {
    action: "hold_position",
  };
}