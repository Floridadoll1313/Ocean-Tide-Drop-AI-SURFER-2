import React from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Users, Box } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Neural Dashboard</h1>
        <p className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mt-2">System Overview</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'Neural Links', value: '1,024', icon: Activity, color: 'text-neon-cyan' },
          { title: 'Active Automations', value: '73', icon: Zap, color: 'text-neon-pink' },
          { title: 'Collective Members', value: '482', icon: Users, color: 'text-purple-400' },
          { title: 'Processed Waves', value: '8.4K', icon: Box, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <stat.icon size={48} className={stat.color} />
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">{stat.title}</p>
            <h3 className="text-4xl font-black italic text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
