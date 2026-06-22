export function shouldShowUpgrade(user: {
  tier: string;
  clicks: number;
  timeOnPage: number;
  lockedAttempts: number;
}) {
  const score =
    user.clicks * 10 +
    user.lockedAttempts * 25 +
    user.timeOnPage * 2;

  const isFreeUser = user.tier === "free";

  return isFreeUser && score > 60;
}