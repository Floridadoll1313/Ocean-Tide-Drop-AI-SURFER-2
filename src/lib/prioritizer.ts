export function prioritizeFeatures(features: any[]) {
  return features
    .map((f) => ({
      ...f,
      score: f.usage * 0.6 + f.revenueImpact * 0.4,
    }))
    .sort((a, b) => b.score - a.score);
}