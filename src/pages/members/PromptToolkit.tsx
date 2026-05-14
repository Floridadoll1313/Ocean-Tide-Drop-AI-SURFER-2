import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Copy, ArrowRight } from 'lucide-react';

export const PromptToolkit = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Prompt Toolkit</h1>
        <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Linguistic Weaponry</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'The Architect', desc: 'Design large-scale systemic structures and database schemas.', color: 'text-emerald-400', border: 'border-emerald-400/20' },
          { title: 'The Visionary', desc: 'Generate avant-garde copy and out-of-the-box conceptual ideas.', color: 'text-neon-pink', border: 'border-neon-pink/20' },
          { title: 'The Specialist', desc: 'Debug complex errors and output highly optimized refactored code.', color: 'text-neon-cyan', border: 'border-neon-cyan/20' },
          { title: 'The Surfer', desc: 'Translate dry corporate text into cinematic, oceanic metaphors.', color: 'text-purple-400', border: 'border-purple-400/20' },
        ].map((prompt, i) => (
          <div key={i} className={`glass-card p-8 rounded-3xl border ${prompt.border} bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles size={24} className={prompt.color} />
                <h3 className="text-xl font-black italic uppercase text-white">{prompt.title}</h3>
              </div>
              <Copy size={18} className="text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <p className="text-sm text-slate-400 mb-6">{prompt.desc}</p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
              Load Payload <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
