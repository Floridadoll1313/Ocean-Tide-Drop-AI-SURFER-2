import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export function useUserTier(userEmail?: string) {
  const [tier, setTier] = useState("free");

  useEffect(() => {
    if (!userEmail) return;

    // initial load
    const load = async () => {
      const { data } = await supabase
        .from("users")
        .select("tier")
        .eq("email", userEmail)
        .single();

      if (data?.tier) setTier(data.tier);
    };

    load();

    // real-time updates ⚡
    const channel = supabase
      .channel("tier-live")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users",
          filter: `email=eq.${userEmail}`,
        },
        (payload) => {
          setTier(payload.new.tier);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userEmail]);

  return tier;
}