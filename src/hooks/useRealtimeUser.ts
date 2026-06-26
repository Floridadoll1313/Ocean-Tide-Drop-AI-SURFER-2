import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function useRealtimeUsers(email: string | null) {
  const [tier, setTier] = useState("free");

  useEffect(() => {
    if (!email) return;

    const channel = supabase
      .channel("tier-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
          filter: `email=eq.${email}`,
        },
        (payload) => {
          const newTier = payload.new?.tier;
          if (newTier) setTier(newTier);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email]);

  return tier;
}