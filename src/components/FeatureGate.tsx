import React, { useEffect, useRef, useState } from "react";

import LockedPreview from "./LockedPreview";
import UpgradeModal from "./UpgradeModal";
import { PRICING } from "../config/pricing";
import { trackUpgradeIntent } from "../lib/upgradeSignals";

export default function FeatureGate({
  userTier = "free",
  requiredTier = "bronze",
  children,
}: {
  userTier?: string;
  requiredTier?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const trackedRef = useRef(false);

  const userLevel = PRICING[userTier]?.accessLevel ?? 0;
  const requiredLevel = PRICING[requiredTier]?.accessLevel ?? 1;

  const isLocked = userLevel < requiredLevel;

  useEffect(() => {
    if (!isLocked || trackedRef.current) return;

    trackedRef.current = true;

    trackUpgradeIntent({
      userTier,
      requiredTier,
      path: window.location.pathname,
    });
  }, [isLocked, userTier, requiredTier]);

  if (isLocked) {
    return (
      <>
        <LockedPreview requiredTier={requiredTier} onUpgrade={() => setOpen(true)}>
          {children}
        </LockedPreview>

        <UpgradeModal open={open} tier={requiredTier} onClose={() => setOpen(false)} />
      </>
    );
  }

  return <>{children}</>;
}