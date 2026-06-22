export function mergeBestFeatures(universes: any[]) {
  const features: string[] = [];

  universes.forEach((u) => {
    if (u.strategy === "product_quality") {
      features.push("smooth onboarding UX");
    }
    if (u.strategy === "aggressive_growth") {
      features.push("high-conversion pricing funnels");
    }
    if (u.strategy === "monetization_first") {
      features.push("premium gating system");
    }
  });

  return {
    mergedFeatures: [...new Set(features)],
    mode: "cross_reality_synthesis",
  };
}