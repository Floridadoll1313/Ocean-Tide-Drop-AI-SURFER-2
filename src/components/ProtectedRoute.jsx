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
        title="This area is locked"
        description="Upgrade your tide level to unlock full access to this system."
      />
    );
  }

  return children;
}