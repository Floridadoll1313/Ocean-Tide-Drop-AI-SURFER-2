import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabase';

export default function RevenuePanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const { data } = await supabase
        .from("users")
        .select("email, tier, created_at");

      setUsers(data || []);
      setLoading(false);
    }

    load();
  }, []);

  const revenueEstimate = users.reduce((acc, u) => {
    const map: Record<string, number> = {
      free: 0,
      bronze: 9,
      wave: 29,
      tsunami: 79,
      enterprise: 199,
    };
    return acc + (map[u.tier] || 0);
  }, 0);

  return (
    <div className="glass">
      <h2 className="text-xl font-bold">ðŸ’° Revenue Pulse</h2>

      {loading ? (
        <p className="text-slate-400 mt-2">Reading tides...</p>
      ) : (
        <>
          <p className="mt-2">Users: {users.length}</p>
          <p>Estimated MRR: ${revenueEstimate}</p>
        </>
      )}
    </div>
  );
}
