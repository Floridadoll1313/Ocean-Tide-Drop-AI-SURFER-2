export function calculateIntentScore(events: {
  pageViews: number;
  lockedClicks: number;
  timeOnLockedContent: number;
  tier: string;
}) {
  let score = 0;

  score += events.pageViews * 5;
  score += events.lockedClicks * 25;
  score += events.timeOnLockedContent * 10;

  if (events.tier === "free") score += 10;
  if (events.tier === "bronze") score += 5;

  let label = "cold";

  if (score > 40) label = "warm";
  if (score > 80) label = "hot";

  return { score, label };
}