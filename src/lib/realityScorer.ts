export function scoreReality(options: {
  revenue: number;
  scalability: number;
  userSatisfaction: number;
}) {
  const score =
    options.revenue * 0.4 +
    options.scalability * 0.3 +
    options.userSatisfaction * 0.3;

  return {
    realityScore: score,
    status:
      score > 85
        ? "dominant_timeline"
        : score > 60
        ? "viable_timeline"
        : "abandon_timeline",
  };
}