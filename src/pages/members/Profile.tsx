import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Save } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Identity Matrix</h1>
        <p className="text-neon-pink text-[10px] font-black uppercase tracking-[0.3em] mt-2">Node Configuration</p>
      </motion.div>
      <div className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5 space-y-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-pink/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
            <User size={40} className="text-white/40" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white italic uppercase">Encrypted User</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">ID: VDN-0X89F</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Comms Link (Email)</label>
            <div className="flex items-center relative">
              <Mail className="absolute left-4 text-slate-500" size={18} />
              <input type="email" disabled value="oceantidedrop@gmail.com" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm font-medium focus:outline-none opacity-50 cursor-not-allowed" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Security Tier</label>
            <div className="flex items-center relative">
              <Shield className="absolute left-4 text-neon-cyan" size={18} />
              <input type="text" disabled value="Level 4 - Architect" className="w-full bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl py-4 pl-12 pr-4 text-neon-cyan text-sm font-bold uppercase tracking-widest focus:outline-none cursor-not-allowed" />
            </div>
          </div>
          <button className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
            <Save size={18} /> Commit Changes
          </button>
        </div>
      </div>
    </div>
  );
};
