import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Shield, Activity, Users, Database, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

interface Stats {
  totalUsers: number;
  activeAutomations: number;
  systemLoad: string;
}

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchAdminStats() {
    try {
      const { auth } = await import("../../utils/firebase");
      const idToken = await auth.currentUser?.getIdToken();

      const res = await fetch("/admin/stats", {
        headers: {
          "Authorization": `Bearer ${idToken}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Unauthorized access to core systems");
      }

      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetchAdminStats();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
        <Shield size={64} className="text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Access Denied</h1>
        <p className="text-white/40 max-w-md mx-auto mb-8">
          This terminal is restricted to Neural Architects. Your credentials lack the necessary authorization level.
        </p>
        <Link to="/" className="px-8 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-widest hover:bg-cyan-400 transition-all rounded-full">
          Return to Surface
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-400/20 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-400/30">
            <Shield size={24} />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Admin Control Center</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Authenticated: {user?.email}</p>
          </div>
        </div>
        <Link to="/studio" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
           <ArrowLeft size={14} /> Back to Studio
        </Link>
      </div>

      {error && !stats && (
        <div className="p-8 rounded-3xl bg-red-900/10 border border-red-500/20 mb-8 flex items-center gap-6">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 shrink-0">
             <Activity size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-red-500 font-bold uppercase text-sm mb-1">Neural Connection Interrupted</h3>
            <p className="text-red-400/60 text-xs">{error}. The system is refusing your request.</p>
          </div>
          <button onClick={fetchAdminStats} className="ml-auto px-4 py-2 bg-red-500 text-white text-[10px] font-bold uppercase rounded-lg">Retry Link</button>
        </div>
      )}

      {!stats && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
          <Database size={48} className="animate-spin mb-4" />
          <p className="font-black uppercase tracking-widest text-xs">Querying Sub-Systems...</p>
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-[2rem] text-left"
          >
            <Users className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-2">Total Collectives</h3>
            <p className="text-5xl font-black italic">{stats.totalUsers}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-[2rem] text-left"
          >
            <Activity className="text-neon-pink mb-4" size={32} />
            <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-2">Neural Threads</h3>
            <p className="text-5xl font-black italic">{stats.activeAutomations}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-[2rem] text-left"
          >
            <Database className="text-neon-green mb-4" size={32} />
            <h3 className="text-white/40 font-black uppercase text-[10px] tracking-widest mb-2">System Load</h3>
            <p className="text-5xl font-black italic">{stats.systemLoad}</p>
          </motion.div>
        </div>
      )}

      {/* Placeholder for more admin actions */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[2rem] border-white/5 text-left">
           <h3 className="text-xl font-bold italic mb-6 uppercase text-cyan-400">Security Logs</h3>
           <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_#39ff14]" />
                   <span className="text-xs text-white/60">Neural access authorized: Unit_{i*12}</span>
                 </div>
                 <span className="text-[10px] font-mono text-white/20">2026-05-06 23:22:0{i}</span>
               </div>
             ))}
           </div>
        </div>
        
        <div className="glass-card p-8 rounded-[2rem] border-white/5 text-left">
           <h3 className="text-xl font-bold italic mb-6 uppercase text-neon-pink">Recent Signups</h3>
           <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black">
                   U{i}
                 </div>
                 <div>
                    <span className="text-xs font-bold text-white block">explorer_{i*99}@gmail.com</span>
                    <span className="text-[10px] text-white/30 uppercase font-black">Tidal Member</span>
                 </div>
                 <span className="ml-auto text-[10px] font-mono text-white/20">{i}h ago</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
