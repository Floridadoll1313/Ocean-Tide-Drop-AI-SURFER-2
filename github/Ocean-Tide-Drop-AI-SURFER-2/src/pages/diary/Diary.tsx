import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { BookOpen, Calendar, ArrowRight, Layers, Radio } from "lucide-react";

const DIARY_ENTRIES = [
  {
    id: 1,
    date: "May 15, 2026",
    title: "The First Swell of Consciousness",
    excerpt: "The neural networks began to resonate with the cinematic RAW data. We didn't just see the wave; we felt the frequency of its birth.",
    tag: "Transmission",
    readTime: "4 min read"
  },
  {
    id: 2,
    date: "May 12, 2026",
    title: "Navigating the Glitch Tides",
    excerpt: "System stability was compromised during the latest deep-sea render. Error logs revealed a beautiful symmetry in the chaos.",
    tag: "Dev Log",
    readTime: "6 min read"
  },
  {
    id: 3,
    date: "May 08, 2026",
    title: "Aesthetics of the Void",
    excerpt: "Exploring the silence between model training sessions. There is a specific kind of noir aesthetic that can only be found in the downtime.",
    tag: "Philosophy",
    readTime: "3 min read"
  },
  {
    id: 4,
    date: "May 05, 2026",
    title: "Surfing the Edge of AGI",
    excerpt: "We are closer now to the autonomous creative engine. The surfboards of the future will be carved from pure light and logical loops.",
    tag: "Lore",
    readTime: "5 min read"
  }
];

export default function Diary() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 mb-6">
            <Radio className="w-3 h-3" />
            Live Temporal Log
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Surfer's <span className="text-pink-500">Log</span>
          </h1>
          <p className="mt-6 text-white/40 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-center max-w-2xl">
            Transmissions from the edge of creativity. Lore, development updates, and neural reflections.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {DIARY_ENTRIES.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 hover:border-pink-500/30 transition-all duration-500 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 text-[10px] font-black uppercase tracking-widest text-white/40">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-pink-500">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-3 h-3" />
                    {entry.tag}
                  </div>
                </div>
                <div className="text-white/20">{entry.readTime}</div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white mb-6 tracking-tighter leading-tight group-hover:text-pink-500 transition-colors">
                {entry.title}
              </h2>
              
              <p className="text-white/60 text-lg leading-relaxed mb-8 font-medium">
                {entry.excerpt}
              </p>

              <div className="flex items-center gap-3 text-pink-500 text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                Read Full Transmission 
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 border-t border-white/5 py-16 flex flex-col items-center">
           <h3 className="text-xl font-black italic uppercase text-white/20 mb-8 tracking-widest">End of Stream</h3>
           <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
             <BookOpen className="w-4 h-4" />
             Archived Transmissions
           </button>
        </div>
      </div>
    </PageWrapper>
  );
}
