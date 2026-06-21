import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function useUserTier(email) {
  const [tier, setTier] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    setLoading(true);

    // initial fetch
    async function load() {
      const { data, error } = await supabase
        .from("users")
        .select("tier")
        .eq("email", email)
        .single();

      if (data?.tier) {
        setTier(data.tier);
      }

      setLoading(false);
    }

    load();

    // 🔥 REAL TIME AUTO-UNLOCK LISTENER
    const channel = supabase
      .channel("tier-updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `email=eq.${email}`,
        },
        (payload) => {
          const newTier = payload.new?.tier;
          if (newTier) {
            console.log("🌊 Tier updated live:", newTier);
            setTier(newTier);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email]);

  return { tier, loading };
}