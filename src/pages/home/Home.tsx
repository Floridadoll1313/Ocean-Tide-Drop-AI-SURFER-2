import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { Waves, Zap, Cpu, Palette, Command, MousePointer2 } from "lucide-react";

export default function Home() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={true}>
      <div className="flex flex-col items-center">
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-[0.3em] text-white/60 mb-4">
            Navigating the AI Creative Wave
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#00eaff] to-transparent mx-auto mb-10"></div>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {/* AI SURFER PERSONA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-[2.5rem] border border-[#00eaff]/20 bg-[#00eaff]/5 relative overflow-hidden group hover:border-[#00eaff]/50 transition-all duration-500"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00eaff]/10 blur-3xl rounded-full"></div>
            <Waves className="w-10 h-10 text-[#00eaff] mb-6 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">The 'AI Surfer' Persona</h3>
            <p className="text-sm leading-relaxed text-white/60 font-medium">
              A digital explorer blending technical skill with the fluid intuition of a surfer. Riding the edge of the unknown.
            </p>
          </motion.div>

          {/* PSYCHEDELIC AESTHETIC */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-[2.5rem] border border-pink-500/20 bg-pink-500/5 relative overflow-hidden group hover:border-pink-500/50 transition-all duration-500"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 blur-3xl rounded-full"></div>
            <Palette className="w-10 h-10 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">Nature-Infused Aesthetic</h3>
            <p className="text-sm leading-relaxed text-white/60 font-medium">
              Vibrant, high-contrast imagery featuring mandalas, ocean waves, and celestial motifs. The organic meets the digital.
            </p>
          </motion.div>

          {/* CHOOSE YOUR TOOLS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8 rounded-[2.5rem] border border-[#ff5E00]/20 bg-[#ff5E00]/5 relative overflow-hidden group hover:border-[#ff5E00]/50 transition-all duration-500"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#ff5E00]/10 blur-3xl rounded-full"></div>
            <Command className="w-10 h-10 text-[#ff5E00] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">Choose Your Tools</h3>
            <p className="text-sm leading-relaxed text-white/60 font-medium">
              A directive emphasizing that tool selection should be as personal as one's art. Your workflow is your signature.
            </p>
          </motion.div>

          {/* EMPOWERMENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 rounded-[2.5rem] border border-violet-500/20 bg-violet-500/5 relative overflow-hidden group hover:border-violet-500/50 transition-all duration-500"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/10 blur-3xl rounded-full"></div>
            <Zap className="w-10 h-10 text-violet-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">Empowerment</h3>
            <p className="text-sm leading-relaxed text-white/60 font-medium">
              Prioritizing individual choice over standardized workflows. Autonomy is the core of the high-frequency creator.
            </p>
          </motion.div>
        </div>

        {/* BOTTOM CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-32 pt-20 border-t border-white/5 w-full text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-[#00eaff] mb-10 hover:bg-[#00eaff]/10 transition-colors cursor-pointer">
            <MousePointer2 className="w-3 h-3" />
            Initiate Sequence
          </div>
          <div className="flex justify-center gap-10">
             <div className="w-1 h-1 rounded-full bg-[#00eaff] animate-ping" />
             <div className="w-1 h-1 rounded-full bg-[#ff5E00] animate-ping delay-100" />
             <div className="w-1 h-1 rounded-full bg-pink-500 animate-ping delay-200" />
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
