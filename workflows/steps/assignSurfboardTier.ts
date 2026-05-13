export async function assignSurfboardTier(customer: any, env: any) {
  console.log("🏄 Assigning Surfboard Tier...");
  const price = customer.amount || customer.amount_total;

  let tier = "Unknown Tide";
  if (price === 97) tier = "Foam Board";
  else if (price === 197) tier = "Longboard";
  else if (price === 297) tier = "Fish Twin";
  else if (price === 497) tier = "Pro Carbon";

  return {
    ...customer,
    tier,
    accessLevel: price >= 297 ? "Sanctuary_Elite" : "Sanctuary_Member"
  };
}
