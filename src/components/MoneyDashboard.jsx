import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function MoneyDashboard() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    setLeads(data || []);
  };

  useEffect(() => {
    fetchLeads();

    const interval = setInterval(fetchLeads, 5000); // live refresh
    return () => clearInterval(interval);
  }, []);

  const totalLeads = leads.length;

  const hotLeads = leads.filter((l) => l.status === "hot").length;

  const revenue = leads.reduce((sum, l) => sum + (l.value || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold tracking-wide text-white">
          🌊 Ocean Money Dashboard
        </h2>
        <span className="text-xs text-[#00F5FF] bg-[#00F5FF]/10 px-3 py-1 rounded-full animate-pulse">
          • Live Refresh Active
        </span>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111625] border border-slate-800 p-6 rounded-xl text-center shadow-lg">
          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Leads
          </h3>
          <p className="text-3xl font-black text-white">{totalLeads}</p>
        </div>

        <div className="bg-[#111625] border border-slate-800 p-6 rounded-xl text-center shadow-lg">
          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Hot Leads
          </h3>
          <p className="text-3xl font-black text-[#00F5FF]">{hotLeads}</p>
        </div>

        <div className="bg-[#111625] border border-[#00F5FF]/20 shadow-[0_0_15px_rgba(0,245,255,0.05)] p-6 rounded-xl text-center">
          <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Pipeline Value
          </h3>
          <p className="text-3xl font-black text-emerald-400">
            ${revenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Lead Monitor Feed */}
      <div className="bg-[#111625] border border-slate-800 rounded-xl p-6 mt-6">
        <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
          Latest Activity Stream
        </h3>

        <div className="space-y-3">
          {leads.length === 0 ? (
            <p className="text-slate-500 text-sm italic">Waiting for incoming leads...</p>
          ) : (
            leads.slice(0, 10).map((lead, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 bg-[#0A0E1A]/60 border border-slate-800/80 rounded-lg hover:border-slate-700 transition"
              >
                <div className="font-medium text-slate-200 text-sm">
                  {lead.email}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase mr-3 ${
                      lead.status === "hot"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {lead.status || "new"}
                  </span>
                  <span className="text-sm font-semibold text-slate-300">
                    ${lead.value || 0}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
