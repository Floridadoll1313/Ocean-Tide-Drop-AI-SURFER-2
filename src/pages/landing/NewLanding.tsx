import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Zap, Users, BarChart3, Waves, Rocket, BadgeCheck, Mail, Terminal, CircleDollarSign, Download, X, Play, CheckCircle, Sparkles } from "lucide-react";
import { supabase } from "../../lib/supabase";
import homepageConcept from "../../assets/images/ocean_ai_yacht.png";
import cyberWave from "../../assets/images/cyber_surfer_wave_1779220118634.png";
import OceanBackground from "../../components/landing/OceanBackground";
import SunriseGlow from "../../components/landing/SunriseGlow";
import BioluminescentParticles from "../../components/landing/BioluminescentParticles";
import Navbar from "../../components/landing/Navbar";
import ChatAgent from "../../components/ChatAgent";

function useCountdown() {
  const calc = () => {
    const target = new Date("2026-08-10T20:00:00-04:00").getTime();
    const diff = Math.max(0, target - Date.now());
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    if (diff <= 0) return { h: 0, m: 0, s: 0, done: true };
    return { h, m, s, done: false };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function NewLanding() {
  const countdown = useCountdown();

  // ── Founding member email form ─────────────────────────────────────────────
  const [fmName, setFmName] = useState("");
  const [fmEmail, setFmEmail] = useState("");
  const [fmState, setFmState] = useState<"idle" | "loading" | "done" | "error">("idle");

  // ── Integrated Ocean Tide Drop Interactive State ───────────────────────────
  const [activeTab, setActiveTab] = useState<"ai-tech" | "digital-assets">("ai-tech");
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showQrPanel, setShowQrPanel] = useState<boolean>(false);
  const [goalAmount, setGoalAmount] = useState<number>(450);

  // VIP Pass state
  const [passEmail, setPassEmail] = useState<string>("");
  const [passStatus, setPassStatus] = useState<"idle" | "sequencing" | "claimed">("idle");
  const [sequenceLogs, setSequenceLogs] = useState<string[]>([]);
  const [badgeData, setBadgeData] = useState<{ email: string; serial: string; timestamp: string } | null>(null);

  // Terminal Live Feed state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[CONNECT] Surfer node stabilized at 128kbps",
    "[SECURE] Tide protocols active...",
    "[DATA] Synced with global ocean currents",
    "[SYSTEM] Core temperature: 42°C",
  ]);

  // Modal State
  const [modalConfig, setModalConfig] = useState<{ title: string; freq: number; amp: number } | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Live Terminal Log Interval
  useEffect(() => {
    const rawLogs = [
      "[CONNECT] Surfer node stabilized at 128kbps",
      "[SECURE] Tide protocols active...",
      "[DATA] Synced with global ocean currents",
      "[SYSTEM] Core temperature: 42°C",
      "[NEURAL] Swell prediction model loaded",
      "[NETWORK] Pacific sector ping: 24ms",
      "[SECURITY] Quantum handshake verified",
      "[AUDIO] Synth resonance calibrated to 100%",
    ];
    let idx = 4;
    const interval = setInterval(() => {
      setTerminalLogs((prev) => {
        const next = [...prev, rawLogs[idx % rawLogs.length]];
        if (next.length > 5) next.shift();
        return next;
      });
      idx++;
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Chirp Feedback
  const playChirp = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(587.33, now);
      osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.15);

      osc2.frequency.setValueAtTime(880, now);
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(now + 0.2);
      osc2.stop(now + 0.2);
    } catch {
      console.log("Audio playback not allowed or restricted");
    }
  };

  // Web Audio Synth Player
  const playSynth = (type: "high-tide" | "deep-swell" | "coral-reef") => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (type === "high-tide") {
        const freqs = [261.63, 329.63, 392.0, 523.25];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, now);
        filter.connect(ctx.destination);

        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 1.6);
        });
      } else if (type === "deep-swell") {
        const freqs = [65.41, 98.0];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.15);
        filter.frequency.exponentialRampToValueAtTime(120, now + 0.8);
        filter.connect(ctx.destination);

        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 1.1);
        });
      } else if (type === "coral-reef") {
        const freqs = [523.25, 659.25, 783.99, 1046.5];
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1500, now);
        filter.connect(ctx.destination);

        freqs.forEach((f, index) => {
          const noteTime = now + index * 0.12;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, noteTime);
          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);
          osc.connect(gain);
          gain.connect(filter);
          osc.start(noteTime);
          osc.stop(noteTime + 0.3);
        });
      }
    } catch {
      console.log("Audio synth disabled");
    }
  };

  // Payment Simulation Handler
  const handleSimulatePayment = () => {
    const finalVal = parseFloat(customAmount) || tipAmount || 5;
    playChirp();
    setGoalAmount((prev) => prev + finalVal);
    setSuccessMsg(`Transmitted $${finalVal.toFixed(2)} via Ocean Tide Drop!`);
    setShowQrPanel(false);
    setCustomAmount("");
    setTipAmount(0);
  };

  // VIP Pass Claim Handler
  const handleClaimPass = () => {
    if (!passEmail.trim() || !passEmail.includes("@")) return;
    setPassStatus("sequencing");
    setSequenceLogs([]);

    const logs = [
      "> Locating surfer node...",
      "> Injecting credential layer...",
      "> Signing cryptographic signature...",
      "> VIP Pass Minted Successfully!",
    ];

    logs.forEach((log, i) => {
      setTimeout(() => {
        setSequenceLogs((prev) => [...prev, log]);
      }, i * 600);
    });

    setTimeout(() => {
      const serial = "VIP-SURF-" + Math.random().toString(16).substring(2, 6).toUpperCase();
      const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, ".");
      setBadgeData({ email: passEmail, serial, timestamp });
      setPassStatus("claimed");
      playChirp();
    }, 2500);
  };

  const handleFoundingSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fmEmail.trim() || !fmName.trim()) return;
    setFmState("loading");
    const { error } = await supabase
      .from("founding_members")
      .insert({ name: fmName.trim(), email: fmEmail.trim().toLowerCase() });
    setFmState(error ? "error" : "done");
  };

  const aiCrew = [
    {
      icon: Bot,
      title: "AI Agent Crew",
      text: "Smart assistants that help your business answer customers, organize work, and automate daily tasks.",
    },
    {
      icon: Zap,
      title: "Automation Waves",
      text: "Connect your systems and remove repetitive work with intelligent automation.",
    },
    {
      icon: Users,
      title: "Lead Catcher",
      text: "Capture opportunities, follow up faster, and keep customers moving forward.",
    },
    {
      icon: BarChart3,
      title: "Growth Navigator",
      text: "Turn your business information into smarter decisions.",
    },
  ];

  const waves = [
    {
      name: "Free Wave",
      text: "Explore AI tools and start your journey.",
    },
    {
      name: "Bronze Wave",
      text: "Build your first automation systems.",
    },
    {
      name: "Big Kahuna",
      text: "Advanced AI solutions for growing businesses.",
    },
    {
      name: "Tsunami Takeover",
      text: "Complete AI transformation for serious growth.",
    },
  ];

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-slate-950
        text-white
      "
      style={{
        backgroundImage: 'linear-gradient(rgba(2,12,30,0.9), rgba(2,12,30,0.95)), url("/images/Members-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white font-sans selection:bg-teal-400 selection:text-slate-950">
      <OceanBackground />
      <SunriseGlow />
      <BioluminescentParticles />
      <Navbar />

      {/* ── LAUNCH DAY COUNTDOWN BANNER ─────────────────────────────── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-50 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-300 text-slate-950 shadow-[0_4px_25px_rgba(45,212,191,0.3)]"
      >
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-widest">
            <Rocket size={16} className="animate-bounce text-slate-950" />
            {countdown.done
              ? "🎉 We Are LIVE — Welcome to Ocean Tide Drop AI SURFER!"
              : "🚀 WE LAUNCH TONIGHT — Founding Member spots are limited!"}
          </div>
          {!countdown.done && (
            <div className="flex items-center gap-1 font-black text-lg tabular-nums">
              <span className="bg-slate-950/20 backdrop-blur-md rounded-lg px-2.5 py-0.5 border border-slate-950/10">{pad(countdown.h)}h</span>
              <span className="opacity-60">:</span>
              <span className="bg-slate-950/20 backdrop-blur-md rounded-lg px-2.5 py-0.5 border border-slate-950/10">{pad(countdown.m)}m</span>
              <span className="opacity-60">:</span>
              <span className="bg-slate-950/20 backdrop-blur-md rounded-lg px-2.5 py-0.5 border border-slate-950/10">{pad(countdown.s)}s</span>
            </div>
          )}
          <a
            href="#founding-member"
            className="text-xs font-black uppercase tracking-widest bg-slate-950 text-teal-300 px-3.5 py-1.5 rounded-full hover:bg-slate-900 hover:scale-105 transition duration-200 shadow-md"
          >
            Claim Your Spot →
          </a>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(2,12,30,.65),
              rgba(2,12,30,.95)
            ),
            url(${homepageConcept})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-6 py-32"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-400/30 bg-teal-400/10 backdrop-blur-md mb-6">
            <Sparkles size={14} className="text-teal-300" />
            <span className="text-xs font-mono tracking-widest text-teal-300 uppercase">Velocity Drop AI Suite</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            Helping Businesses
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200 drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              Catch The AI Wave
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-slate-300 leading-relaxed font-light">
            Ocean Tide Drop AI SURFER builds bespoke AI agents, intelligent web consoles, and automated systems designed to propel modern operations forward.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/wave-check"
              className="rounded-full bg-teal-400 text-slate-950 font-bold px-8 py-4 flex items-center gap-2 hover:bg-teal-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] hover:scale-105 transition duration-300"
            >
              Get My Free AI Wave Check™
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/members"
              className="rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-400/40 px-8 py-4 text-teal-200 font-bold flex items-center gap-2 hover:border-teal-300 hover:bg-teal-400/10 hover:scale-105 transition duration-300"
            >
              🌊 Members Area
              <ArrowRight size={20} />
            </Link>

            <a
              href="#interactive-console"
              className="rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 py-4 font-bold hover:bg-white/10 hover:border-white/40 transition duration-300"
            >
              Explore AI Console
            </a>
          </div>
        </motion.div>

        <motion.img
          src={cyberWave}
          alt="AI ocean wave"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[500px] opacity-35 pointer-events-none drop-shadow-[0_0_35px_rgba(45,212,191,0.2)]"
        />
      </section>

      {/* ── OCEAN TIDE DROP INTERACTIVE CONSOLE SECTION ────────────────── */}
      <section id="interactive-console" className="relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* HEADER CONSOLE STRIP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch mb-6">
          <div className="p-6 rounded-2xl border border-teal-400/30 bg-slate-900/80 backdrop-blur-xl flex flex-col justify-center shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400"></span>
              </span>
              <span className="text-xs font-mono tracking-widest text-teal-300 uppercase">System Operational</span>
            </div>
            <h2 className="text-3xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-100">
              AI SURFER
            </h2>
            <p className="text-xs font-mono tracking-widest text-teal-400/80 mt-1">// VELOCITY DROP CORE v2.6</p>
          </div>

          <div className="p-4 rounded-2xl border border-teal-400/20 bg-slate-950/90 backdrop-blur-xl flex flex-col justify-between h-36 lg:h-auto shadow-lg">
            <div className="flex justify-between items-center border-b border-teal-400/20 pb-2 mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal size={14} className="text-teal-400" /> Network Activity
              </span>
              <span className="text-[10px] font-mono text-teal-300 bg-teal-400/10 border border-teal-400/20 px-2 py-0.5 rounded-full">LIVE FEED</span>
            </div>
            <div className="font-mono text-xs text-teal-300 space-y-1 overflow-y-auto flex-grow pr-2">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="transition-opacity duration-500 opacity-90 hover:opacity-100">
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl border border-teal-400/20 bg-slate-900/60 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Global Surfers</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span className="text-lg font-bold font-mono text-white">1,482</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl border border-teal-400/20 bg-slate-900/60 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Waves Scaled</span>
              <span className="text-lg font-bold font-mono text-teal-300 mt-1">98,241</span>
            </div>
            <div className="p-3 rounded-2xl border border-teal-400/20 bg-slate-900/60 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Resonance</span>
              <span className="text-lg font-bold font-mono text-teal-200 mt-1">100.0%</span>
            </div>
          </div>
        </div>

        {/* MAIN CONSOLE CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* PANEL A & B (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* PANEL A: TRIBUTE JAR */}
            <div className="p-6 rounded-2xl border border-teal-400/30 bg-slate-900/80 backdrop-blur-xl flex flex-col gap-4 shadow-xl">
              <div>
                <h3 className="text-lg font-bold font-mono text-white tracking-wide flex items-center gap-2">
                  <CircleDollarSign className="text-teal-400" size={20} /> TRIBUTE JAR
                </h3>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Scan. Pay. Go. Support the Tide.</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[5, 15, 50].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setTipAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-2 px-1 rounded-xl font-mono text-xs transition-all duration-300 border ${
                      tipAmount === amt
                        ? "border-teal-400 bg-teal-400/20 text-white shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                        : "border-teal-400/20 bg-teal-400/5 text-slate-300 hover:bg-teal-400/15"
                    }`}
                  >
                    ${amt}
                    <span className="block text-[9px] text-slate-400">
                      {amt === 5 ? "Surf Splash" : amt === 15 ? "Tide Swell" : "Tidal Wave"}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-teal-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setTipAmount(0);
                  }}
                  placeholder="Enter Custom Amount"
                  className="w-full bg-slate-950/70 border border-teal-400/30 focus:border-teal-400 rounded-xl py-2 pl-7 pr-3 text-sm font-mono text-white outline-none transition-all"
                />
              </div>

              <button
                onClick={() => {
                  if (tipAmount > 0 || parseFloat(customAmount) > 0) setShowQrPanel(true);
                }}
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-black font-mono py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
              >
                Generate Scan Code
              </button>

              {showQrPanel && (
                <div className="border border-teal-400/30 p-4 rounded-xl bg-slate-950/90 flex flex-col items-center gap-3">
                  <div className="relative w-36 h-36 bg-white p-2 rounded-xl overflow-hidden shadow-inner">
                    <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M0 0h30v30H0zm10 10h10v10H10zm60-10h30v30H70zm10 10h10v10H80zM0 70h30v30H0zm10 10h10v10H10zm35-45h10v10H45zm10 15h10v10H55zm-10 15h10v10H45zm25-15h10v10H70zm10 15h10v10H80zm-10 15h10v10H70zm-15 0h10v10H55z" />
                    </svg>
                    <div className="absolute left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-pulse"></div>
                  </div>
                  <p className="text-[10px] font-mono text-teal-300 text-center tracking-wider">SCAN QR WITH PAYPAL OR CLICK BELOW TO SIMULATE</p>
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-mono py-2 rounded-xl text-xs tracking-wider uppercase transition-all"
                  >
                    Simulate Payment
                  </button>
                </div>
              )}

              <div className="border-t border-teal-400/20 pt-4 mt-2">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400 uppercase tracking-wider">Server Expansion & Cleanup</span>
                  <span className="text-teal-300 font-bold">${goalAmount} / $1000</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-teal-400/20">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-cyan-400 h-full transition-all duration-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                    style={{ width: `${Math.min((goalAmount / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* PANEL B: VIP TIDE PASS */}
            <div className="p-6 rounded-2xl border border-teal-400/30 bg-slate-900/80 backdrop-blur-xl flex flex-col gap-4 shadow-xl">
              <div>
                <h3 className="text-lg font-bold font-mono text-white tracking-wide flex items-center gap-2">
                  <BadgeCheck className="text-teal-400" size={20} /> VIP TIDE PASS
                </h3>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">Claim permanent digital surfer clearance.</p>
              </div>

              {passStatus === "idle" && (
                <div className="space-y-3">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      value={passEmail}
                      onChange={(e) => setPassEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-slate-950/70 border border-teal-400/30 focus:border-teal-400 rounded-xl py-2 pl-9 pr-3 text-sm font-mono text-white outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={handleClaimPass}
                    className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-black font-mono py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                  >
                    Claim Pass
                  </button>
                </div>
              )}

              {passStatus === "sequencing" && (
                <div className="border border-teal-400/30 p-4 rounded-xl bg-slate-950/90 font-mono text-xs text-teal-300 space-y-1.5 h-32 overflow-y-auto">
                  {sequenceLogs.map((log, idx) => (
                    <div key={idx}>{log}</div>
                  ))}
                </div>
              )}

              {passStatus === "claimed" && badgeData && (
                <div>
                  <div className="p-5 rounded-2xl border border-teal-400/60 bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950/50 shadow-2xl relative flex flex-col justify-between h-48 overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-teal-300 tracking-widest uppercase">VIP ACCESS GRANTED</span>
                        <h4 className="text-base font-black font-mono text-white tracking-tight mt-0.5">OCEAN TIDE DROP</h4>
                      </div>
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
                      </span>
                    </div>

                    <div className="space-y-1 my-3">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Surfer Node</div>
                      <div className="text-xs font-mono text-white truncate">{badgeData.email}</div>
                    </div>

                    <div className="flex justify-between items-end border-t border-teal-400/20 pt-2">
                      <div>
                        <div className="text-[8px] font-mono text-slate-400 uppercase">Credential ID</div>
                        <div className="text-xs font-mono text-teal-300">{badgeData.serial}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] font-mono text-slate-400 uppercase">Timestamp</div>
                        <div className="text-[10px] font-mono text-white">{badgeData.timestamp}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPassStatus("idle");
                      setBadgeData(null);
                      setPassEmail("");
                    }}
                    className="w-full mt-3 border border-red-500/30 hover:border-red-500 bg-red-500/5 hover:bg-red-500/20 text-red-400 font-bold font-mono py-1.5 rounded-xl text-[10px] tracking-wider uppercase transition-all"
                  >
                    Revoke / Reset Pass
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* COLUMN 2: SERVICES & SYNTH SOUNDBOARD (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="border border-teal-400/30 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-xl flex gap-2 shadow-xl">
              <button
                onClick={() => setActiveTab("ai-tech")}
                className={`flex-1 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeTab === "ai-tech"
                    ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                AI Tech Solutions
              </button>
              <button
                onClick={() => setActiveTab("digital-assets")}
                className={`flex-1 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeTab === "digital-assets"
                    ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Digital Asset Drops
              </button>
            </div>

            {activeTab === "ai-tech" && (
              <div className="space-y-4">
                {[
                  {
                    title: "SurferCore Neural Engine",
                    desc: "Deep-coastal neural networks optimized for real-time wave pattern analysis and marine telemetry processing.",
                    color: "text-teal-300",
                    border: "hover:border-teal-400/50",
                    freq: 85,
                    amp: 45,
                  },
                  {
                    title: "Tide Predictor ML Pro",
                    desc: "Algorithmic machine learning models predicting oceanic swells, tidal shifts, and coastal weather anomalies with high accuracy.",
                    color: "text-teal-300",
                    border: "hover:border-teal-400/50",
                    freq: 94,
                    amp: 60,
                  },
                  {
                    title: "WaveScribe Audio",
                    desc: "AI-driven transcription and acoustic translation system calibrated specifically for high-noise marine environments.",
                    color: "text-teal-300",
                    border: "hover:border-teal-400/50",
                    freq: 72,
                    amp: 30,
                  },
                ].map((srv) => (
                  <div
                    key={srv.title}
                    className={`border border-teal-400/20 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${srv.border} transition-all duration-300 shadow-lg`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-teal-400"></span>
                        <h4 className="text-base font-bold font-mono text-white">{srv.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 max-w-md">{srv.desc}</p>
                    </div>
                    <button
                      onClick={() => setModalConfig({ title: srv.title, freq: srv.freq, amp: srv.amp })}
                      className="w-full md:w-auto border border-teal-400/40 hover:border-teal-300 bg-teal-400/10 hover:bg-teal-400/20 text-teal-300 font-bold font-mono py-2 px-4 rounded-xl text-xs tracking-wider uppercase transition-all"
                    >
                      Examine Core Specs
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "digital-assets" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-teal-400/20 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl flex flex-col justify-between gap-3 shadow-lg">
                    <div>
                      <span className="text-[9px] font-mono text-teal-300 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-400/20 uppercase tracking-wider">
                        Visual Toolkit
                      </span>
                      <h4 className="text-base font-bold font-mono text-white mt-2">Cyber Ocean Icons</h4>
                      <p className="text-xs text-slate-400 mt-1">150+ electric teal vector icons tailored for ocean tech UI applications.</p>
                    </div>
                    <button
                      onClick={() => {
                        playChirp();
                        setSuccessMsg("Unlocked Cyber Ocean Icons!");
                      }}
                      className="w-full bg-slate-950/60 hover:bg-slate-950 border border-teal-400/30 text-teal-300 font-mono py-2 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                    >
                      <Download size={14} /> Access Assets
                    </button>
                  </div>

                  <div className="border border-teal-400/20 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl flex flex-col justify-between gap-3 shadow-lg">
                    <div>
                      <span className="text-[9px] font-mono text-teal-300 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-400/20 uppercase tracking-wider">
                        Desktop Art
                      </span>
                      <h4 className="text-base font-bold font-mono text-white mt-2">Electric Coast Wallpapers</h4>
                      <p className="text-xs text-slate-400 mt-1">High-resolution 4K electric teal and midnight backdrops.</p>
                    </div>
                    <button
                      onClick={() => {
                        playChirp();
                        setSuccessMsg("Unlocked Electric Coast Wallpapers!");
                      }}
                      className="w-full bg-slate-950/60 hover:bg-slate-950 border border-teal-400/30 text-teal-300 font-mono py-2 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                    >
                      <Download size={14} /> Access Assets
                    </button>
                  </div>
                </div>

                {/* SURFER SYNTH SOUNDBOARD */}
                <div className="border border-teal-400/30 p-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl flex flex-col gap-4 shadow-xl">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-bold font-mono text-white tracking-wide flex items-center gap-2">
                      <Waves className="text-teal-400" size={18} /> SURFER SYNTH SOUNDBOARD
                    </h4>
                    <span className="text-[10px] font-mono text-teal-300 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-400/20">WEB AUDIO API</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                    Play real synthesizer notes directly inside your browser console.
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => playSynth("high-tide")}
                      className="border border-teal-400/30 hover:border-teal-400 bg-teal-400/5 hover:bg-teal-400/15 text-white py-4 rounded-xl font-mono text-xs tracking-wider uppercase transition-all flex flex-col items-center gap-2"
                    >
                      <Play className="text-teal-400" size={18} />
                      <span>High Tide</span>
                      <span className="text-[8px] text-slate-400">Chord</span>
                    </button>

                    <button
                      onClick={() => playSynth("deep-swell")}
                      className="border border-teal-400/30 hover:border-teal-400 bg-teal-400/5 hover:bg-teal-400/15 text-white py-4 rounded-xl font-mono text-xs tracking-wider uppercase transition-all flex flex-col items-center gap-2"
                    >
                      <Play className="text-teal-400" size={18} />
                      <span>Deep Swell</span>
                      <span className="text-[8px] text-slate-400">Bass</span>
                    </button>

                    <button
                      onClick={() => playSynth("coral-reef")}
                      className="border border-teal-400/30 hover:border-teal-400 bg-teal-400/5 hover:bg-teal-400/15 text-white py-4 rounded-xl font-mono text-xs tracking-wider uppercase transition-all flex flex-col items-center gap-2"
                    >
                      <Play className="text-teal-400" size={18} />
                      <span>Coral Reef</span>
                      <span className="text-[8px] text-slate-400">Arp</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SPECS DIAGNOSTICS MODAL */}
      {modalConfig && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="border border-teal-400/40 p-6 rounded-2xl bg-slate-900 max-w-md w-full flex flex-col gap-4 relative shadow-2xl">
            <button onClick={() => setModalConfig(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <div>
              <span className="text-[10px] font-mono text-teal-300 tracking-widest uppercase">CORE DIAGNOSTICS</span>
              <h3 className="text-xl font-bold font-mono text-white mt-1">{modalConfig.title}</h3>
            </div>
            <div className="space-y-2 border-y border-teal-400/20 py-4">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase">Optimize Core Load</span>
                <span className="text-teal-300 font-bold">{modalConfig.freq}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={modalConfig.freq}
                onChange={(e) => setModalConfig({ ...modalConfig, freq: parseInt(e.target.value) })}
                className="w-full accent-teal-400 bg-slate-950 h-2 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <button
              onClick={() => setModalConfig(null)}
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-mono py-2 rounded-xl text-xs tracking-wider uppercase"
            >
              Close Diagnostics
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS OVERLAY MODAL */}
      {successMsg && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="border border-teal-400/40 p-8 rounded-2xl bg-slate-900 max-w-sm w-full flex flex-col items-center text-center gap-4 shadow-2xl">
            <CheckCircle className="text-teal-400" size={50} />
            <div>
              <h3 className="text-2xl font-bold font-mono text-white">Surf's Up!</h3>
              <p className="text-sm text-slate-300 mt-2">{successMsg}</p>
            </div>
            <button
              onClick={() => setSuccessMsg(null)}
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold font-mono py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all"
            >
              Ride On
            </button>
          </div>
        </div>
      )}

      {/* AI CREW */}
      <section id="solutions" className="relative z-10 py-24 px-6 bg-slate-900/90">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Waves className="mx-auto mb-4 text-teal-300" size={45} />
            <h2 className="text-4xl font-bold">Meet Your AI Surf Crew</h2>
            <p className="mt-4 text-slate-300">Powerful AI systems designed to help your business move faster.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCrew.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-3xl bg-slate-950/60 backdrop-blur-xl p-6 border border-teal-400/20 hover:border-teal-400/50 transition-all duration-500 shadow-xl"
                >
                  <Icon className="text-teal-300 mb-5" size={38} />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-14">Choose Your Wave</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {waves.map((wave) => (
              <motion.div
                key={wave.name}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-slate-900/80 backdrop-blur-xl p-7 border border-teal-400/20 hover:border-teal-400/50 transition shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold text-teal-300">{wave.name}</h3>
                  <p className="mt-4 text-slate-300 text-sm">{wave.text}</p>
                </div>
                <Link to="/members" className="inline-block mt-6 text-teal-300 font-bold hover:text-teal-200">
                  Ride this wave →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold">Ready To Ride The Next Wave?</h2>
          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Join Ocean Tide Drop AI SURFER and bring AI power to your business.
          </p>
          
          <Link
            to="/members"
            className="inline-flex mt-10 rounded-full bg-teal-400 text-slate-950 font-bold px-10 py-5 hover:bg-teal-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] hover:scale-105 transition duration-300"
          >
            Enter Members Area 🌊
          </Link>
        </motion.div>
      </section>

      <ChatAgent />
    </div>
  );
}

