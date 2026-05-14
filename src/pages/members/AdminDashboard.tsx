import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Database, Terminal, Settings } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Admin Core</h1>
        <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Restricted Access</p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl border border-red-500/20 bg-red-500/5">
          <div className="flex items-center gap-4 mb-6">
            <ShieldAlert className="text-red-500" size={32} />
            <h2 className="text-2xl font-black italic uppercase text-white">Security Logs</h2>
          </div>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="p-4 bg-black/40 rounded-xl border border-red-500/10 font-mono text-xs text-red-200">
                [AUTH] Unauthorized access attempt blocked at node {i}x49A
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5">
          <div className="flex items-center gap-4 mb-6">
            <Database className="text-neon-cyan" size={32} />
            <h2 className="text-2xl font-black italic uppercase text-white">System Config</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-between text-sm font-bold uppercase tracking-widest text-white transition-colors">
              <span className="flex items-center gap-3"><Terminal size={18} /> Restart Neural Engine</span>
            </button>
            <button className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-between text-sm font-bold uppercase tracking-widest text-white transition-colors">
              <span className="flex items-center gap-3"><Settings size={18} /> Global Parameters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
