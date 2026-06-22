export function trackUpgradeIntent(data: {
  userTier: string;
  requiredTier: string;
  path: string;
}) {
  const event = {
    type: "upgrade_intent",
    ...data,
    timestamp: Date.now(),
  };

  console.log("📊 INTENT SIGNAL:", event);

  // later: send to Supabase or analytics engine
  // supabase.from("analytics").insert(event)
}