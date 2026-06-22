export function MetaAI(universes: any[]) {
  const best = universes.reduce((a, b) =>
    a.multiplier > b.multiplier ? a : b
  );

  return {
    selectedUniverse: best.id,
    reason: "highest growth potential",
    instruction: "collapse all timelines into best version",
  };
}