export function acquisitionEngine(candidates: {
  revenue: number;
  synergyScore: number;
}[]) {
  const targets = candidates.filter(
    c => c.revenue > 500 && c.synergyScore > 0.7
  );

  return {
    acquisitions: targets,
    action: "merge_or_absorb_into_ecosystem",
  };
}