export function simulateMarket(data: {
  demand: number;
  competition: number;
}) {
  const pressure = data.competition / (data.demand + 1);

  return {
    marketState:
      pressure > 1
        ? "oversaturated"
        : pressure > 0.5
        ? "competitive"
        : "expansion_phase",
  };
}