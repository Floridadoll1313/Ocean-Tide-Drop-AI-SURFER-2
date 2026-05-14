import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Search } from 'lucide-react';

export const Members = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
      >
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Member Directory</h1>
          <p className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mt-2">Velocity Drop Network</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-neon-cyan transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH NEURAL IDS..." 
            className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold focus:outline-none focus:border-neon-cyan/50 w-full md:w-80 transition-all uppercase tracking-widest"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Placeholder for member cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/10 bg-white/5 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 border border-white/10 mb-6 flex items-center justify-center">
              <Users size={32} className="text-white/20" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase italic mb-1">Encrypted Node</h3>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-6">Status: Synchronized</p>
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
