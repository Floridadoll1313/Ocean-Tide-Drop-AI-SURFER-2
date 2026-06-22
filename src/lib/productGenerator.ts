export function generateNewProduct(data: {
  userBehavior: number;
  featureUsage: Record<string, number>;
}) {
  const ideas: string[] = [];

  if (data.userBehavior > 70) {
    ideas.push("AI automation dashboard");
  }

  Object.entries(data.featureUsage).forEach(([feature, usage]) => {
    if (usage > 100) {
      ideas.push(`${feature} pro version`);
    }
    if (usage < 10) {
      ideas.push(`simplified ${feature} tool`);
    }
  });

  return {
    ideas,
    mode: "auto_product_pipeline",
  };
}