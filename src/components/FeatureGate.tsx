import React, { useState, useEffect, useRef } from "react";

import LockedPreview from "./LockedPreview";
import UpgradeModal from "./UpgradeModal";
import { PRICING } from "../config/pricing";
import { trackUpgradeIntent } from "../lib/upgradeSignals";

export default function FeatureGate({
  userTier = "free",
  requiredTier = "bronze",
  children,
}) {
  const [open, setOpen] = useState(false);

  /**
   * 🧠 prevent duplicate tracking spam
   */
  const trackedRef = useRef(false);

  const userLevel = PRICING[userTier]?.accessLevel ?? 0;
  const requiredLevel = PRICING[requiredTier]?.accessLevel ?? 1;

  const isLocked = userLevel < requiredLevel;

  /**
   * 📊 INTENT TRACKING (ONLY ON FIRST LOCK EVENT)
   */
  useEffect(() => {
    if (!isLocked) return;
    if (trackedRef.current) return;

    trackedRef.current = true;

    trackUpgradeIntent({
      userTier,
      requiredTier,
      path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }, [isLocked, userTier, requiredTier]);

  /**
   * 🔐 LOCKED STATE (NETFLIX EXPERIENCE)
   */
  if (isLocked) {
    return (
      <>
        {/* 🌊 Blurred preview layer */}
        <LockedPreview
          requiredTier={requiredTier}
          onUpgrade={() => setOpen(true)}
        >
          {children}
        </LockedPreview>

        {/* 💳 Upgrade modal */}
        <UpgradeModal
          open={open}
          tier={requiredTier}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  /**
   * ✅ UNLOCKED STATE
   */
  return <>{children}</>;
}