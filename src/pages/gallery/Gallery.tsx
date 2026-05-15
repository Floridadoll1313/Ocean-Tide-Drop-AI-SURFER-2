import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { Image as ImageIcon, Maximize2, Zap } from "lucide-react";

const GALLERY_ITEMS = [
  { id: 1, title: "Neon Swell", category: "Cinematic", size: "large", color: "#00eaff" },
  { id: 2, title: "Neural Drift", category: "Abstract", size: "medium", color: "#ff5E00" },
  { id: 3, title: "Synth Tide", category: "Mythic", size: "small", color: "#ec4899" },
  { id: 4, title: "Glitch Wave", category: "Technical", size: "medium", color: "#8b5cf6" },
  { id: 5, title: "Digital Horizon", category: "Cinematic", size: "small", color: "#10b981" },
  { id: 6, title: "Cyber Shore", category: "Mythic", size: "large", color: "#f59e0b" },
];

export default function Gallery() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00eaff]/10 border border-[#00eaff]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#00eaff] mb-6">
            <Zap className="w-3 h-3 fill-[#00eaff]" />
            Visual Frequency Output
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Mythic <span className="text-[#00eaff]">Gallery</span>
          </h1>
          <p className="mt-6 text-white/40 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-center max-w-2xl">
            A curated stream of AI-generated cinematic waves and surfer archetypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: item.id * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 cursor-pointer
                ${item.size === 'large' ? 'md:row-span-2' : ''}
                ${item.size === 'medium' ? 'md:col-span-2' : ''}
              `}
            >
              {/* Overlay with details */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-white/20 text-white/80">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">
                  {item.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    <ImageIcon className="w-3 h-3" />
                    4K RAW GEN-3
                  </div>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-[#00eaff] hover:text-black transition-all">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Placeholder image representation */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110 flex items-center justify-center"
                style={{ background: `linear-gradient(45deg, ${item.color}22, rgba(0,0,0,0.8))` }}
              >
                <div 
                  className="w-1/2 h-1/2 rounded-full blur-[100px] opacity-20"
                  style={{ backgroundColor: item.color }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity">
                   <div className="font-black text-4xl italic uppercase tracking-tighter text-white -rotate-12">
                     OS-WAVE-{item.id}
                   </div>
                </div>
              </div>
              
              {/* Scanline effect */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:border-[#00eaff]/50 hover:bg-[#00eaff]/5 transition-all text-sm font-black uppercase tracking-[0.3em] flex items-center gap-4 group">
            Load More Transmissions
            <span className="text-[#00eaff] group-hover:px-2 transition-all">→</span>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
