export function createExperiment() {
  const experiments = [
    {
      id: "pricing_test",
      A: { price: 99 },
      B: { price: 79 },
    },
    {
      id: "cta_test",
      A: "Upgrade Now",
      B: "Unlock AI Power",
    },
  ];

  return experiments[Math.floor(Math.random() * experiments.length)];
}