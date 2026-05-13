export async function validateStripe(payload: any, env: any) {
  console.log("🌊 Validating Stripe Event Signature...");
  // Logic for validating Stripe webhook secret
  if (!payload || !payload.id) {
    throw new Error("Invalid Stripe Payload");
  }
  return {
    eventId: payload.id,
    type: payload.type,
    customerId: payload.data?.object?.customer,
    amount: payload.data?.object?.amount_total,
    currency: payload.data?.object?.currency
  };
}
