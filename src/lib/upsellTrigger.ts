export function shouldTriggerUpsell(intent: {
  score: number;
  label: string;
  lockedClicks: number;
}) {
  return (
    intent.label === "hot" ||
    intent.lockedClicks >= 3 ||
    intent.score > 80
  );
}