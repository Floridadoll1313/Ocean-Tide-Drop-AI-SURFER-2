import React from 'react';
import { motion } from 'motion/react';

export default function HUD() {
  return (
    <div className="fixed bottom-8 left-8 z-50 flex gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_#39ff14] animate-pulse" />
        <span className="text-white/60">System Stable</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 text-cyan-400"
      >
        <span className="text-white/30 text-[8px]">🌙</span> Deep Ocean Index: 92%
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 text-neon-pink"
      >
        <span className="animate-pulse">⚡</span> AI Sync Active
      </motion.div>
    </div>
  );
}
