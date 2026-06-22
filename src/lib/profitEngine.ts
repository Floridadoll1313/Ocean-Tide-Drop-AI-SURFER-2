export function calculateProfitSignals(event: {
  revenue: number;
  cost: number;
}) {
  const profit = event.revenue - event.cost;

  return {
    profit,
    margin: event.revenue > 0 ? profit / event.revenue : 0,
    health: profit > 0 ? "healthy" : "at_risk",
  };
}