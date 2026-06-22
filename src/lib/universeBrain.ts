export function UniverseBrain(state: {
  totalRevenue: number;
  activeProducts: number;
  churnRate: number;
}) {
  let mode = "stabilize";

  if (state.totalRevenue > 10000) mode = "expand_universe";
  if (state.churnRate > 0.15) mode = "repair_systems";
  if (state.activeProducts > 5) mode = "consolidate";

  return {
    mode,
    directives: {
      expand_universe: ["spawn new SaaS company", "clone winning product"],
      repair_systems: ["kill weak products", "fix onboarding flows"],
      consolidate: ["merge overlapping tools", "reduce complexity"],
    }[mode],
  };
}