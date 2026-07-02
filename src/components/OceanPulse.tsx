import { useEffect, useState } from "react";

export default function OceanPulse() {
  const [agents, setAgents] = useState(142);
  const [leads, setLeads] = useState(18);
  const [revenue, setRevenue] = useState(4320);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((a) => a + Math.floor(Math.random() * 3 - 1));
      setLeads((l) => l + Math.floor(Math.random() * 2));
      setRevenue((r) => r + Math.floor(Math.random() * 40));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card label="AI Agents Online" value={agents} pulse />
      <Card label="New Leads (Live)" value={leads} pulse />
      <Card label="Revenue Stream" value={`$${revenue}`} pulse />
    </div>
  );
}

function Card({ label, value, pulse }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-xl relative overflow-hidden">
      {pulse && (
        <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
      )}
      <div className="text-white/60 text-sm relative z-10">{label}</div>
      <div className="text-2xl font-bold relative z-10">{value}</div>
    </div>
  );
}
