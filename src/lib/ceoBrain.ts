export function CEOBrain(user: {
  intentScore: number;
  tier: string;
  lockedClicks: number;
  daysInactive: number;
}) {
  const signals = {
    highIntent: user.intentScore > 70,
    churnRisk: user.daysInactive > 5,
    powerUser: user.lockedClicks > 5,
  };

  let decision = "do_nothing";

  if (signals.highIntent && user.tier === "free") {
    decision = "push_upgrade_now";
  }

  if (signals.churnRisk) {
    decision = "reactivation_campaign";
  }

  if (signals.powerUser) {
    decision = "offer_premium_bundle";
  }

  return {
    decision,
    signals,
  };
}