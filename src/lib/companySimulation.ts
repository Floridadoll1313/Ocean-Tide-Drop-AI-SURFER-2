export function simulateCompany(state: {
  users: number;
  revenue: number;
  churn: number;
}) {
  const health =
    state.revenue > 1000 && state.churn < 0.1
      ? "expanding"
      : state.revenue > 500
      ? "stable"
      : "critical";

  return {
    health,
    recommendation:
      health === "expanding"
        ? "scale aggressively"
        : health === "stable"
        ? "optimize conversions"
        : "fix retention first",
  };
}