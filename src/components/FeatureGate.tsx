import React from "react";
import UpgradeGate from "./UpgradeGate";
import { PRICING } from "../config/pricing";

export default function FeatureGate({
  userTier = "free",
  requiredTier = "bronze",
  children,
}) {
  const userLevel = PRICING[userTier]?.accessLevel ?? 0;
  const requiredLevel = PRICING[requiredTier]?.accessLevel ?? 1;

  if (userLevel < requiredLevel) {
    return (
      <UpgradeGate
        requiredTier={requiredTier}
        title="Premium Feature Locked"
        description="This feature is part of a higher-tier system."
      />
    );
  }

  return children;
}