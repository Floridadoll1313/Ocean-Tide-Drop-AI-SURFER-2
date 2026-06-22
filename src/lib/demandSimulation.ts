export function simulateFutureDemand(current: {
  users: number;
  engagement: number;
}) {
  const projectedDemand = current.users * current.engagement * 1.7;

  return {
    projectedDemand,
    nextWaveProduct:
      projectedDemand > 10000
        ? "AI Business Autopilot Suite"
        : "workflow enhancer tools",
  };
}