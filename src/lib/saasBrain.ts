export function SaaSBrain(user: any) {
  return {
    pricing: "auto",
    upsellMode: user.intentScore > 60,
    churnRisk: user.daysInactive > 5,
    predictedUpgrade: user.intentScore > 70,
    revenueSignal: user.lockedClicks * 10,
  };
}