import React from 'react';
import { motion } from 'motion/react';
import { LayoutTemplate, Download, Eye } from 'lucide-react';

export const Blueprints = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">System Blueprints</h1>
        <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Architectural Foundations</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: 'SaaS Platform v2', cat: 'Fullstack', tag: 'Stable' },
          { name: 'AI Chat Interface', cat: 'Frontend', tag: 'Beta' },
          { name: 'Neural API Gateway', cat: 'Backend', tag: 'Stable' },
        ].map((bp, i) => (
          <div key={i} className="glass-card flex flex-col rounded-3xl border border-white/10 bg-white/5 overflow-hidden group">
            <div className="h-40 bg-black/50 border-b border-white/10 flex items-center justify-center relative overflow-hidden">
               <LayoutTemplate size={48} className="text-white/10 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-4 right-4 bg-white/10 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                 {bp.tag}
               </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] text-purple-400 font-black uppercase tracking-widest mb-1">{bp.cat}</p>
              <h3 className="text-xl font-bold text-white uppercase italic mb-6">{bp.name}</h3>
              <div className="flex items-center gap-3 mt-auto">
                <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-white transition-colors">
                  <Eye size={14} /> Preview
                </button>
                <button className="flex-1 py-3 bg-purple-500 hover:bg-purple-400 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-white transition-colors">
                  <Download size={14} /> Deploy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
