export function assignSurfboardTier(customer: any) {
  const price = customer.amount_total;

  if (price === 97) return "Foam Board";
  if (price === 197) return "Longboard";
  if (price === 297) return "Fish Twin";
  if (price === 497) return "Pro Carbon";

  return "Unknown Tide";
}
