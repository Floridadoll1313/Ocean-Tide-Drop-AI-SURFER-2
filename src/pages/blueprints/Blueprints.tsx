import React from 'react';
import { motion } from 'motion/react';
import { PenTool } from 'lucide-react';

export const Blueprints = () => {
  const blueprints = [
    { name: "Neural Funnel V1", type: "Automation", complexity: "Mid" },
    { name: "Velocity Storefront", type: "Web", complexity: "High" }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pt-24 text-left">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-4 mb-8">
          <PenTool className="text-cyan-400" size={32} />
          <h1 className="text-4xl font-black uppercase italic text-white tracking-tighter">System Blueprints</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((bp, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl border border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white mb-2">{bp.name}</h3>
              <div className="flex gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">{bp.type}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{bp.complexity} Complexity</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blueprints;
