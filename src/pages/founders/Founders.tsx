import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { Users, Sparkles, Heart, Shield, Zap, Compass } from "lucide-react";

const victoriaImage = "https://gw-tk.tanka.ai/npc/v2/file/8af5f275-6fed-4cf5-a80b-318b4c5343c6";
// Stormy solo in the woods
const stormyImage = "https://gw-tk.tanka.ai/npc/v2/file/62bde013-1f7c-427e-aa9a-c635f3c44225";
// All three dogs together — used for Sailor Girl & Sky Marlin
const allDogsImage = "https://gw-tk.tanka.ai/npc/v2/file/2c702688-f589-42df-bb15-37ca0c447a2c";

export default function Founders() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-emerald-500/30"></div>
            <Users className="w-6 h-6 text-emerald-400" />
            <div className="h-px w-12 bg-emerald-500/30"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
            Founders <span className="text-soul-gradient italic font-serif lowercase">Sanctuary.</span>
          </h1>
          <p className="text-xl text-cyan-200 max-w-2xl mx-auto leading-relaxed font-bold">
            AI Surfer is a sanctuary built by two women and three dogs who walk between worlds.
          </p>
        </motion.div>

        {/* HUMAN FOUNDERS */}
        <div className="grid md:grid-cols-2 gap-20 mb-40">

          {/* SHANNON */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="space-y-8"
          >
            <div className="relative aspect-[4/5] bg-white/5 border border-white/10 rounded-sm overflow-hidden group accent-glow-cyan">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-2 block">Founder & Architect</span>
                <h2 className="text-4xl font-black uppercase text-white tracking-tighter">Shannon Cahoon Foster</h2>
              </div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: -2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Sparkles className="w-32 h-32 text-white/5 group-hover:text-emerald-500/10 transition-colors duration-1000" />
              </motion.div>
            </div>
            <div className="space-y-6 text-cyan-100 leading-relaxed font-semibold">
              <p>Shannon is the pulse of AI Surfer — the architect who blends mythic storytelling, cinematic UI, and technical mastery into a single living ecosystem. She builds worlds the way some people breathe: instinctively, vividly, and with a sense of destiny.</p>
              <p>Her work is shaped by resilience, ritual, and a fierce devotion to turning adversity into art. Shannon is the one who stands at the edge of the neon ocean, reading the currents of technology and imagination, translating them into experiences that feel alive.</p>
              <p>She is the visionary who sees the brand not as a website, but as a realm — a place where clients, creators, and wanderers find belonging, clarity, and momentum.</p>
              <p className="text-white italic">"Her leadership style is warm, expressive, and electric. She celebrates every win, transforms every setback into a story, and builds with the precision of an engineer and the heart of a mythmaker."</p>
            </div>
          </motion.div>

          {/* VICTORIA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="space-y-8 md:mt-32"
          >
            <div className="relative aspect-[4/5] bg-white/5 border border-white/10 rounded-sm overflow-hidden group accent-glow-purple">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img src={victoriaImage} alt="Victoria — Co-Founder" className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 mb-2 block">Co-Founder & Strategist</span>
                <h2 className="text-4xl font-black uppercase text-white tracking-tighter">Victoria</h2>
              </div>
            </div>
            <div className="space-y-6 text-cyan-100 leading-relaxed font-semibold">
              <p>Victoria is the grounding force of AI Surfer — the quiet strategist whose presence brings balance, clarity, and emotional intelligence to the entire realm.</p>
              <p>Where Shannon conjures worlds, Victoria ensures they stand strong. She is the stabilizer, the organizer, the one who sees the long arc of the journey and keeps the ship aligned with its true north.</p>
              <p>Her energy is steady, thoughtful, and deeply intuitive. She protects the vision, nurtures the culture, and ensures that every decision honors the integrity of the brand and the wellbeing of the people behind it.</p>
              <div className="p-8 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-zinc-300 italic font-serif">"Together, Shannon and Victoria form a dual-current leadership: one wave of creative fire, one wave of grounded wisdom — the perfect tide."</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* DOG SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-600 block mb-6">Lore & Spirit</span>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-white">The Founding Dogs.</h2>
          <p className="text-zinc-500 mt-4 uppercase text-[10px] font-black tracking-widest">Guardians of the Tide Realm</p>
        </motion.div>

        {/* DOGS GRID */}
        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-40 overflow-hidden">

          {/* SAILOR GIRL — black lab, left side of group photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-black group transition-colors duration-500 overflow-hidden"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={allDogsImage}
                alt="Sailor Girl — The Black Lab Navigator"
                className="w-full h-full object-cover object-[60%_20%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">The Black Lab Navigator</span>
              </div>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center rounded-full group-hover:bg-blue-500/20 transition-colors">
                  <Compass className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">Sailor Girl</h3>
              </div>
              <p className="text-cyan-100 text-sm leading-relaxed font-semibold">Sailor Girl is the heart-forward adventurer. A sleek black lab embodying loyalty, curiosity, and the spirit of exploration. She represents Navigation, Courage, and the joy of discovery.</p>
              <div className="flex flex-wrap gap-2">
                {["Navigation", "Courage", "Discovery"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-zinc-400">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* STORMY — solo woods photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-black group transition-colors duration-500 overflow-hidden"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={stormyImage}
                alt="Stormy — The Guardian"
                className="w-full h-full object-cover object-[50%_30%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">The Guardian</span>
              </div>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-500/10 flex items-center justify-center rounded-full group-hover:bg-zinc-500/20 transition-colors">
                  <Shield className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">Stormy</h3>
              </div>
              <p className="text-cyan-100 text-sm leading-relaxed font-semibold">The protector. Striking black and white markings like storm clouds breaking. He carries a calm, watchful presence — aware and steady. He represents Protection, Stability, and Emotional Intuition.</p>
              <div className="flex flex-wrap gap-2">
                {["Protection", "Stability", "Intuition"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-zinc-400">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SKY MARLIN — little tan one in the wagon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-black group transition-colors duration-500 overflow-hidden"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={allDogsImage}
                alt="Sky Marlin — The Tan Spark of Light"
                className="w-full h-full object-cover object-[85%_75%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400">The Tan Spark of Light</span>
              </div>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/10 flex items-center justify-center rounded-full group-hover:bg-yellow-500/20 transition-colors">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">Sky Marlin</h3>
              </div>
              <p className="text-cyan-100 text-sm leading-relaxed font-semibold">The spark. A small tan girl with bright energy and a mischievous spirit. She rides in her wagon like royalty and brings levity, play, and inspiration to the realm. She represents Playfulness, Inspiration, and Spontaneity.</p>
              <div className="flex flex-wrap gap-2">
                {["Playfulness", "Inspiration", "Spontaneity"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-zinc-400">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FINAL MANIFESTO */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto p-20 bg-white/5 border border-white/10 rounded-sm relative overflow-hidden text-center accent-glow-cyan"
        >
          <Heart className="w-12 h-12 text-white/10 absolute top-10 left-10" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-8">The Founding <span className="text-soul-gradient italic font-serif">Family.</span></h2>
            <p className="text-lg text-cyan-200 leading-relaxed font-semibold mb-12">Together, they form a founder constellation — a living ecosystem of creativity, loyalty, intuition, and magic. This is not just a team. This is a tribe, a story, a realm.</p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">AI Surfer</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Peak Frequency Leadership</span>
            </div>
          </div>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
