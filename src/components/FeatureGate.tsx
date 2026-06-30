import React, { useEffect, useState } from "react";
// Import your database instance (e.g., if you check status in Firestore or an API)
// import { db } from "./firebase"; 
// import { doc, getDoc } from "firebase/firestore";

export default function FeatureGate({ children, fallback }) {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFeatureAccess() {
      try {
        // 1. Fetch the subscription status for the current user from your database
        // Example Firestore fetch:
        // const userDoc = await getDoc(doc(db, "subscriptions", auth.currentUser.uid));
        // if (userDoc.exists() && userDoc.data().status === "active") { setIsPremium(true); }
        
        // Mocking an active check for now:
        const hasActiveSubscription = false; // Toggle to true when Stripe webhook updates DB
        setIsPremium(hasActiveSubscription);
      } catch (error) {
        console.error("Error checking subscription status:", error);
      } finally {
        setLoading(false);
      }
    }

    checkFeatureAccess();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, color: "#00F5FF", backgroundColor: "#0A0E1A" }}>
        🌊 Checking lineup access...
      </div>
    );
  }

  // If they aren't premium, show the upsell/lock message instead of the tools
  if (!isPremium) {
    return fallback ? fallback : (
      <div style={{ padding: 40, border: "1px solid #1e293b", borderRadius: 12, backgroundColor: "#111625" }}>
        <h2 style={{ color: "#cbd5e1" }}>🔒 Velocity Drop Exclusive</h2>
        <p style={{ color: "#94a3b8" }}>This advanced tool requires an active premium membership.</p>
        <button style={{ backgroundColor: "#00F5FF", color: "#0A0E1A", fontWeight: "bold", padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer" }}>
          Upgrade to Premium
        </button>
      </div>
    );
  }

  // If they are premium, render the tools cleanly
  return children;
}import React, { useEffect, useRef, useState } from "react";

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
