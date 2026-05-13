import React from 'react';
import { motion } from 'motion/react';
import './hud.css';

export default function HUD() {
  return (
    <div className="hud">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hud-item flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Neural Link: Optimal</span>
      </motion.div>
    </div>
  );
}
