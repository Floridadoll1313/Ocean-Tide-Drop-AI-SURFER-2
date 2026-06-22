export function mutateRules(metrics: {
  conversionRate: number;
  churnRate: number;
}) {
  const rules = {
    priceIncrease: false,
    triggerUpsellEarlier: false,
  };

  if (metrics.conversionRate > 0.2) {
    rules.priceIncrease = true;
  }

  if (metrics.churnRate > 0.1) {
    rules.triggerUpsellEarlier = true;
  }

  return rules;
}