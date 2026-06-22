import React, { useState } from "react";
import UpgradeGate from "./UpgradeGate";
import LockedPreview from "./LockedPreview";

import { PRICING } from "../config/pricing";

export default function FeatureGate({
  userTier = "free",
  requiredTier = "bronze",
  children,
}) {
  const [open, setOpen] = useState(false);

  const userLevel = PRICING[userTier]?.accessLevel ?? 0;
  const requiredLevel = PRICING[requiredTier]?.accessLevel ?? 1;

  if (userLevel < requiredLevel) {
    return (
      <>
        <LockedPreview
          requiredTier={requiredTier}
          onUpgrade={() => setOpen(true)}
        >
          {children}
        </LockedPreview>

        <UpgradeModal
          open={open}
          tier={requiredTier}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  return children;
}