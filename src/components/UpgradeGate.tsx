import UpgradeGate from "./UpgradeGate";
import { TIERS } from "../utils/tiers";

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
      />
    );
  }

  return children;
}