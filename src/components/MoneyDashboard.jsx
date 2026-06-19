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

  const hotLeads = leads.filter(
    (l) => l.status === "hot"
  ).length;

  const revenue = leads.reduce(
    (sum, l) => sum + (l.value || 0),
    0
  );

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.header}>🌊 Ocean Money Dashboard</h2>

      <div style={styles.stats}>
        <div style={styles.card}>
          <h3>Leads</h3>
          <p>{totalLeads}</p>
        </div>

        <div style={styles.card}>
          <h3>Hot Leads</h3>
          <p>{hotLeads}</p>
        </div>

        <div style={styles.card}>
          <h3>Pipeline Value</h3>
          <p>${revenue}</p>
        </div>
      </div>

      <div style={styles.list}>
        <h3>Latest Leads</h3>

        {leads.slice(0, 10).map((lead, i) => (
          <div key={i} style={styles.lead}>
            <div>{lead.email}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {lead.status || "new"} • $
              {lead.value || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: 20,
    background: "#0f1115",
    color: "#fff",
    minHeight: "100vh",
  },
  header: {
    color: "#13dadf",
  },
  stats: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  card: {
    flex: 1,
    padding: 15,
    background: "#1b1f2a",
    borderRadius: 10,
    textAlign: "center",
  },
  list: {
    marginTop: 20,
  },
  lead: {
    padding: 10,
    background: "#101319",
    marginTop: 8,
    borderRadius: 8,
  },
};