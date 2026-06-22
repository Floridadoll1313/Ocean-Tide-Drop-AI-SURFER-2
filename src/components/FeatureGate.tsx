import React, { useState, useEffect } from "react";

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

  const userLevel = PRICING[userTier]?.accessLevel ?? 0;
  const requiredLevel = PRICING[requiredTier]?.accessLevel ?? 1;

  const isLocked = userLevel < requiredLevel;

  /**
   * 📊 TRACK INTENT (ONLY WHEN LOCKED)
   */
  useEffect(() => {
    if (!isLocked) return;

    trackUpgradeIntent({
      userTier,
      requiredTier,
      path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }, [isLocked, userTier, requiredTier]);

  /**
   * 🔐 LOCKED STATE (NETFLIX STYLE)
   */
  if (isLocked) {
    return (
      <>
        {/* 🌊 Blurred preview + CTA */}
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