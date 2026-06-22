export function paradoxRevenue(universes: any[]) {
  const total = universes.reduce(
    (sum, u) => sum + u.multiplier * 1000,
    0
  );

  return {
    theoreticalRevenue: total,
    paradoxNote:
      "Revenue exists across all timelines simultaneously",
  };
}