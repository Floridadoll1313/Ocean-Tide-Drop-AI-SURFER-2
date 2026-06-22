export function analyzeSystem(data: {
  users: number;
  upgrades: number;
  churn: number;
}) {
  const conversionRate = data.upgrades / data.users;

  return {
    conversionRate,
    health:
      conversionRate > 0.2
        ? "thriving"
        : conversionRate > 0.1
        ? "stable"
        : "critical",
  };
}