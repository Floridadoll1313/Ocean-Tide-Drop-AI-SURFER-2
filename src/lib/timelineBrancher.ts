export function simulateTimelines(options: {
  aggressive: number;
  stable: number;
  experimental: number;
}) {
  const best =
    options.aggressive > options.stable
      ? "aggressive_growth_timeline"
      : options.experimental > 80
      ? "innovation_dominant_timeline"
      : "stable_profit_timeline";

  return {
    selectedTimeline: best,
    discardedTimelines: Object.keys(options).filter(
      k => k !== best
    ),
  };
}