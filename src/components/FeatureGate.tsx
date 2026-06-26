import React, { useState, useEffect, useRef } from "react";

import LockedPreview from "./LockedPreview";
import UpgradeModal from "./UpgradeModal";
import { PRICING } from "../config/pricing";
import { trackUpgradeIntent } from "../lib/upgradeSignals";

type Tier = keyof typeof PRICING;

export default function FeatureGate({
  userTier = "free",
  requiredTier = "bronze",
  children,
}: {
  userTier?: Tier | string;
  requiredTier?: Tier | string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const trackedRef = useRef(false);

  const safeUserTier = (userTier in PRICING ? userTier : "free") as Tier;
  const safeRequiredTier = (requiredTier in PRICING
    ? requiredTier
    : "bronze") as Tier;

  const userLevel = PRICING[safeUserTier]?.accessLevel ?? 0;
  const requiredLevel = PRICING[safeRequiredTier]?.accessLevel ?? 1;

  const isLocked = userLevel < requiredLevel;

  useEffect(() => {
    if (!isLocked) return;
    if (trackedRef.current) return;

    trackedRef.current = true;

    trackUpgradeIntent({
      userTier: safeUserTier,
      requiredTier: safeRequiredTier,
      path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }, [isLocked, safeUserTier, safeRequiredTier]);

  if (isLocked) {
    return (
      <>
        <LockedPreview
          requiredTier={safeRequiredTier}
          onUpgrade={() => setOpen(true)}
        >
          {children}
        </LockedPreview>

        <UpgradeModal
          open={open}
          tier={safeRequiredTier}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  return <>{children}</>;
}