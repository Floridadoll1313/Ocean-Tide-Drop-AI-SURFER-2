import UpgradeGate from "./UpgradeGate";

/**
 * 🌊 Tier hierarchy (single source of truth)
 * Higher number = more access
 */
const TIERS: Record<string, number> = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
};

type TierKey = keyof typeof TIERS;

interface ProtectedRouteProps {
  children: React.ReactNode;
  userTier?: string;
  requiredTier?: TierKey;
}

export default function ProtectedRoute({
  children,
  userTier = "free",
  requiredTier = "bronze",
}: ProtectedRouteProps) {
  /**
   * 🧠 Normalize tiers safely
   * prevents crashes from bad DB values
   */
  const normalizedUserTier = TIERS[userTier] ?? 0;
  const normalizedRequiredTier = TIERS[requiredTier] ?? 1;

  const hasAccess = normalizedUserTier >= normalizedRequiredTier;

  /**
   * 🔒 BLOCK ACCESS → Upgrade UI
   */
  if (!hasAccess) {
    return (
      <UpgradeGate
        currentTier={userTier}
        requiredTier={requiredTier}
        upgradeTier={requiredTier}
        title="Locked Behind Your Tide Level"
        description="Upgrade your plan to unlock this area of your AI system. Higher tiers unlock deeper automation, tools, and revenue systems."
      />
    );
  }

  /**
   * 🌊 ALLOW ACCESS
   */
  return <>{children}</>;
}