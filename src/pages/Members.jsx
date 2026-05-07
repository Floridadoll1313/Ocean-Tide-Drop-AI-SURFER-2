import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Search } from 'lucide-react';

export default function Members() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen relative z-10 w-full text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
      >
        <div>
          <h1 className="font-display text-5xl font-black italic tracking-tighter uppercase text-white">Member Directory</h1>
          <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Velocity Drop Network</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-cyan-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH NEURAL IDS..." 
            className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white text-xs font-bold focus:outline-none focus:border-cyan-400/50 w-full md:w-80 transition-all uppercase tracking-widest"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Placeholder for member cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 rounded-[2rem] border border-white/10 bg-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 mb-6 flex items-center justify-center">
              <Users size={32} className="text-white/20" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase italic mb-1">Encrypted Node</h3>
            <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mb-6">Status: Synchronized</p>
            <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all group overflow-hidden relative">
              <span className="relative z-10">View Profile</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}