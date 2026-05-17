import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { Waves, Heart, MapPin, Anchor, Hammer, Ruler } from "lucide-react";

export default function Memorial() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6">
            <Hammer className="w-3 h-3" />
            Master Craftsmanship
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter drop-shadow-[0_0_15px_rgba(30,144,255,0.3)]">
            Bull's <span className="text-blue-500">Memorial</span>
          </h1>
          <p className="mt-6 text-white/60 text-sm md:text-base uppercase tracking-[0.2em] font-medium max-w-2xl leading-relaxed">
            Honoring the legacy of <span className="text-white">Johnny Burgess Hooper</span> — The Master Carpenter who built the skyline of Hatteras Island. He touched countless homes with his craft and left his mark in the very wood of our community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0">
               <img 
                 src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000" 
                 alt="Bull's Memorial" 
                 className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
               />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-blue-900/20">
               <Waves className="w-32 h-32 text-blue-500/20 animate-pulse" />
            </div>
            
            <div className="absolute bottom-12 left-12 z-20">
              <div className="flex items-center gap-3 text-blue-400 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-widest text-shadow-sm">Salvo, NC</span>
              </div>
              <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">Johnny Burgess Hooper</h2>
              <p className="text-white/60 text-sm font-black uppercase tracking-widest mt-2">"Bull" — Forever Fishing</p>
            </div>
          </motion.div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Hammer className="w-24 h-24" />
              </div>
              <Ruler className="w-8 h-8 text-blue-500 mb-6" />
              <h3 className="text-2xl font-black italic uppercase text-white mb-4 tracking-tighter">The Artisan's Touch</h3>
              <p className="text-white/60 text-lg leading-relaxed font-medium">
                Johnny "Bull" Burgess Hooper wasn't just a builder; he was a Master Carpenter whose hands shaped the homes and legacy of Hatteras Island. 
                His precision and vision are etched into the foundations of countless residences across the sound and shore. 
                He left his mark in wood, creating structures that stand strong against the Atlantic's fiercest storms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Anchor className="w-24 h-24" />
              </div>
              <Waves className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-2xl font-black italic uppercase text-white mb-4 tracking-tighter">Legacy in the Grain</h3>
              <p className="text-white/60 text-lg leading-relaxed font-medium">
                Beyond the sawdust and the shoreline, Bull's true masterpiece was the community he helped build. 
                His work was a testament to integrity—fair lines, strong joints, and a heart as vast as the Pamlico Sound. 
                As the Hatteras currents shift, his structural legacy remains a beacon for all who appreciate true craftsmanship.
              </p>
            </motion.div>

            <div className="pt-6 flex gap-6">
              <button className="flex-1 py-5 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
                Share a Memory
              </button>
              <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Gallery
              </button>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[1em] mb-10">Forever in the Swell</p>
          <div className="flex justify-center gap-10">
             <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
             <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping delay-100" />
             <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping delay-200" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
