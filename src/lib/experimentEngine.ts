export function runExperiment() {
  const experiments = [
    {
      name: "pricing_test",
      variantA: 99,
      variantB: 79,
    },
    {
      name: "cta_test",
      variantA: "Upgrade Now",
      variantB: "Unlock AI Power",
    },
  ];

  return experiments[Math.floor(Math.random() * experiments.length)];
}