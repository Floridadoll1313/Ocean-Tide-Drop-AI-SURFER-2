import UpgradeGate from "./UpgradeGate";

const TIERS = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
};

export default function ProtectedRoute({
  children,
  userTier = "free",
  requiredTier = "bronze",
}) {
  const userLevel = TIERS[userTier] ?? 0;
  const requiredLevel = TIERS[requiredTier] ?? 1;

  if (userLevel < requiredLevel) {
    return (
      <UpgradeGate
        currentTier={userTier}
        requiredTier={requiredTier}
        upgradeTier={requiredTier}
        title="Premium Content Locked"
        description="Your current membership does not include access to this system."
      />
    );
  }

  return children;
}