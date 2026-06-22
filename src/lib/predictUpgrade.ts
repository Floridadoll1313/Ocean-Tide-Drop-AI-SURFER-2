export function predictUpgradeTime(user: {
  intentScore: number;
  daysActive: number;
  lockedClicks: number;
}) {
  const velocity =
    user.intentScore * 0.6 +
    user.lockedClicks * 20 +
    user.daysActive * 2;

  let prediction = "unknown";

  if (velocity > 120) prediction = "within 24 hours";
  else if (velocity > 80) prediction = "within 3 days";
  else if (velocity > 40) prediction = "within 7 days";

  return {
    prediction,
    confidence: Math.min(100, velocity),
  };
}