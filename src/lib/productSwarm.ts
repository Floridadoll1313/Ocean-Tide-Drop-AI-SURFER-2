export function evolveSwarm(products: any[]) {
  return products.map((p) => {
    const mutationChance = Math.random();

    if (mutationChance > 0.8) {
      return {
        ...p,
        version: p.version + 1,
        features: [...p.features, "AI upgrade layer"],
      };
    }

    if (mutationChance < 0.2) {
      return {
        ...p,
        deprecated: true,
      };
    }

    return p;
  });
}