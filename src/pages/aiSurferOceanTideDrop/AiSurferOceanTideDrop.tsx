import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Cpu,
  Crown,
  HeartHandshake,
  QrCode,
  Server,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";

const paypalTipJarQrImage = "https://gw-tk.tanka.ai/npc/v2/file/8b0980ac-1b1d-4e0d-8fde-c2ba03c2a0ea";
const oceanTideLogoImage = "https://gw-tk.tanka.ai/npc/v2/file/df2c3bd0-9421-4c40-910a-6a62f3cdf44f";
const paddleboardFounderImage = "https://gw-tk.tanka.ai/npc/v2/file/615b8793-aca4-47c7-94ce-0fb6c49e1590";

const stats = [
  { label: "Global Surfers", value: "1,482", icon: Activity, color: "text-cyan-300" },
  { label: "Waves Scaled", value: "98,241", icon: Waves, color: "text-blue-300" },
  { label: "Resonance", value: "100.0%", icon: Sparkles, color: "text-emerald-300" },
];

const tributeLevels = [
  { amount: "$5", title: "Surf Splash", tone: "from-cyan-400 to-blue-500" },
  { amount: "$15", title: "Tide Swell", tone: "from-pink-400 to-purple-500" },
  { amount: "$50", title: "Tidal Wave", tone: "from-emerald-300 to-cyan-400" },
];

const aiSolutions = [
  {
    title: "SurferCore Neural Engine",
    description: "Deep-coastal AI systems for automation, customer support, creative workflows, and business growth.",
    icon: Cpu,
  },
  {
    title: "Tide Predictor ML Pro",
    description: "Planning tools for launches, content, outreach, digital products, and service offers.",
    icon: Waves,
  },
  {
    title: "WaveScribe Audio",
    description: "AI-assisted writing, transcription, summaries, and brand messaging for noisy real-world workdays.",
    icon: Activity,
  },
];

const assetDrops = [
  {
    type: "Visual Toolkit",
    title: "Cyber Ocean Icons",
    description: "Synthwave styled design elements for Ocean Tide Drop AI Surfer pages, offers, and promos.",
  },
  {
    type: "Desktop Art",
    title: "Neo-Coastal Wallpapers",
    description: "Neon coastline creative direction for the island-tech brand experience.",
  },
];

export default function AiSurferOceanTideDrop() {
  const [vipClaimed, setVipClaimed] = useState(false);

  return (
    <PageWrapper maxWidth="max-w-screen-2xl" showHero={false}>
      <section className="relative overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-black/75 p-6 shadow-[0_0_90px_rgba(34,211,238,0.15)] md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.16),transparent_38%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
              System Operational
            </div>
            <div className="mb-7 flex items-center gap-4">
              <img src={oceanTideLogoImage} alt="Ocean Tide Drop AI Surfer logo" className="h-20 w-20 rounded-2xl border border-white/10 object-cover shadow-[0_0_35px_rgba(34,211,238,0.25)]" referrerPolicy="no-referrer" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-300">Ocean Tide Drop v2.6</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.25em] text-white/60">PayPal Tribute Flow Active</p>
              </div>
            </div>
            <h1 className="font-orbitron text-[clamp(2.7rem,7vw,6.4rem)] font-black uppercase leading-[0.9] tracking-tighter text-white">
              AI Surfer
              <span className="mt-3 block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-pink-400">
                Ocean Tide Drop
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-relaxed text-cyan-100 md:text-xl">
              A live cyber-coastal command page for tribute support, VIP Tide Pass access, AI tech solutions, digital asset drops, and Ocean Tide Drop network energy.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/tip-jar" className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition-all hover:bg-white hover:shadow-[0_0_35px_rgba(34,211,238,0.55)]">
                <QrCode className="h-4 w-4" /> Open PayPal Tip Jar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white transition-all hover:border-pink-300 hover:bg-pink-400/10 hover:text-pink-100">
                <ShieldCheck className="h-4 w-4" /> Start A Project
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15 }} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-300">Network Activity</p>
                <h2 className="mt-2 text-2xl font-black uppercase text-white">Live Feed</h2>
              </div>
              <Activity className="h-8 w-8 text-emerald-300" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-black/50 p-5">
                  <stat.icon className={`mb-4 h-6 w-6 ${stat.color}`} />
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10">
              <img src={paddleboardFounderImage} alt="Founder paddleboarding in a calm tropical setting" className="h-72 w-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="glass-card p-6 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-400/15 text-pink-200">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-pink-300">Tribute Jar</p>
              <h2 className="text-2xl font-black uppercase text-white">Scan. Pay. Go. Support the Tide.</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {tributeLevels.map((level) => (
              <Link key={level.title} to="/tip-jar" className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:-translate-y-1 hover:border-cyan-300/60">
                <div className={`mb-4 inline-flex rounded-full bg-gradient-to-r ${level.tone} px-4 py-2 text-2xl font-black text-black`}>
                  {level.amount}
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">{level.title}</h3>
                <p className="mt-2 text-xs font-bold text-cyan-100/80">Send through PayPal</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <div className="grid gap-5 md:grid-cols-[170px_1fr] md:items-center">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-3">
                <img src={paypalTipJarQrImage} alt="Ocean Tide Drop AI Surfer PayPal tip jar QR code" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">PayPal QR Code</p>
                <h3 className="mt-3 text-3xl font-black uppercase text-white">Goes to PayPal, not Stripe.</h3>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-cyan-50/80">
                  This page sends visitors to the existing Ocean Tide Drop AI Surfer PayPal Tip Jar flow. Stripe is intentionally not used here.
                </p>
                <Link to="/tip-jar" className="mt-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/50 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all hover:bg-cyan-300 hover:text-black">
                  Open PayPal Tip Jar <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">Server Expansion & Cleanup</p>
                <h3 className="mt-2 text-xl font-black text-white">$450 / $1000</h3>
              </div>
              <Server className="h-8 w-8 text-emerald-300" />
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 shadow-[0_0_20px_rgba(45,212,191,0.6)]" />
            </div>
          </div>
        </section>

        <section className="grid gap-8">
          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-300">VIP Tide Pass</p>
                <h2 className="mt-2 text-3xl font-black uppercase text-white">Claim permanent digital surfer clearance.</h2>
              </div>
              <button onClick={() => setVipClaimed(true)} className="inline-flex items-center justify-center gap-3 rounded-full bg-yellow-300 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition-all hover:bg-white">
                <Crown className="h-4 w-4" /> Claim Pass
              </button>
            </div>

            {vipClaimed && (
              <div className="mt-6 rounded-[2rem] border border-emerald-300/30 bg-emerald-300/10 p-6">
                <div className="mb-5 flex items-center gap-3 text-emerald-200">
                  <BadgeCheck className="h-6 w-6" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">VIP Access Granted</span>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    ["Ocean Tide Drop", "Surfer Node"],
                    ["PayPal Tribute", "Payment Flow"],
                    ["VIP-SURF-883A", "Credential ID"],
                    ["2026.04.12", "Timestamp"],
                  ].map(([value, label]) => (
                    <div key={value} className="rounded-2xl border border-white/10 bg-black/35 p-4">
                      <p className="text-lg font-black text-white">{value}</p>
                      <p className="mt-1 text-[9px] font-black uppercase tracking-[0.25em] text-white/50">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {aiSolutions.map((solution) => (
              <div key={solution.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-cyan-300/50">
                <solution.icon className="mb-5 h-8 w-8 text-cyan-300" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">AI Tech Solutions</p>
                <h3 className="mt-3 text-xl font-black text-white">{solution.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-cyan-50/80">{solution.description}</p>
                <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-300 hover:text-white">
                  Examine Core Specs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
        <section className="glass-card p-6 md:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-purple-300">Digital Asset Drops</p>
          <h2 className="mt-2 text-3xl font-black uppercase text-white">Visual Toolkit</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {assetDrops.map((asset) => (
              <div key={asset.title} className="rounded-[2rem] border border-white/10 bg-black/45 p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-200">{asset.type}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{asset.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-white/75">{asset.description}</p>
                <Link to="/gallery" className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-purple-200 hover:text-white">
                  Access Assets <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-300">Surfer Synth Soundboard</p>
              <h2 className="mt-2 text-3xl font-black uppercase text-white">Web Audio API</h2>
            </div>
            <Zap className="h-8 w-8 text-yellow-300" />
          </div>
          <p className="text-sm font-semibold leading-relaxed text-cyan-50/80">Retro synth energy for the Ocean Tide Drop AI Surfer experience.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {["High Tide", "Deep Swell", "Coral Reef"].map((sound) => (
              <div key={sound} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left">
                <Zap className="mb-5 h-6 w-6 text-yellow-300" />
                <h3 className="text-lg font-black text-white">{sound}</h3>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-yellow-200">Soundboard Node</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-10 overflow-hidden rounded-full border border-cyan-400/20 bg-black/70 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-cyan-200">
        <div className="flex min-w-max gap-10 px-6">
          <span>/// Network Status: Stable ///</span>
          <span>Cores Running: 12 ///</span>
          <span>Latency: 24ms ///</span>
          <span>Pacific Sector Detected ///</span>
          <span>Surf Safely ///</span>
          <span>AI Surfer Copyright 2026 ///</span>
        </div>
      </div>
    </PageWrapper>
  );
}
