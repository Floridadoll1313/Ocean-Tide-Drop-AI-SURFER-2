export function redistributeCapital(data: {
  products: { name: string; revenue: number }[];
}) {
  const topPerformers = data.products.filter(p => p.revenue > 1000);
  const weak = data.products.filter(p => p.revenue < 200);

  return {
    investIn: topPerformers.map(p => p.name),
    phaseOut: weak.map(p => p.name),
    action: "automatic_resource_reallocation",
  };
}