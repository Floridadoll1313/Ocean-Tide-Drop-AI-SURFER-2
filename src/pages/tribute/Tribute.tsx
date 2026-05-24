import React, { useState, useEffect, useRef } from "react";
import PageWrapper from "../../components/PageWrapper";
import { 
  Coins, Terminal, Download, Music, Award, CheckCircle2, 
  X, Send, Mail, RefreshCw 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Local storage helper
const safeStorage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, val: string) {
    try {
      localStorage.setItem(key, val);
    } catch {
      // ignore
    }
  },
  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
};

const terminalLogs = [
  "[CONNECT] Surfer node stabilized at 128kbps",
  "[SECURE] Tide protocols active...",
  "[DATA] Synced with global ocean currents",
  "[SYSTEM] Core temperature: 42.1°C",
  "[NEURAL] Swell prediction model loaded",
  "[NETWORK] Pacific sector ping: 24ms",
  "[SECURITY] Quantum handshake verified",
  "[AUDIO] Synth resonance calibrated to 100%"
];

interface Particle {
  id: number;
  color: string;
  tx: number;
  ty: number;
  rot: number;
}

interface PassData {
  email: string;
  serial: string;
  timestamp: string;
}

function generateConfettiParticles(nextId: number): Particle[] {
  const colors = ["#ff007f", "#8a2be2", "#00f0ff", "#ff9f00", "#10b981"];
  const newConfetti: Particle[] = [];
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 200;
    newConfetti.push({
      id: nextId + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      tx: Math.cos(angle) * velocity,
      ty: Math.sin(angle) * velocity - 120, // push upwards
      rot: Math.random() * 360
    });
  }
  return newConfetti;
}

function generateSerialId(): string {
  return "VIP-SURF-" + Math.random().toString(16).substring(2, 6).toUpperCase();
}

function generateEqualizerBounces(): number[] {
  return Array.from({ length: 9 }).map(() => Math.floor(Math.random() * 85) + 15);
}

export default function Tribute() {
  // Sound system init
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // 1. TERMINAL ACTIVITY FEED
  const [logs, setLogs] = useState<string[]>(() => terminalLogs.slice(0, 4));
  const logsSelectorIndex = useRef(4);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextLog = terminalLogs[logsSelectorIndex.current];
      setLogs(prev => {
        const updated = [...prev, nextLog];
        if (updated.length > 6) {
          updated.shift();
        }
        return updated;
      });
      logsSelectorIndex.current = (logsSelectorIndex.current + 1) % terminalLogs.length;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 2. TRIBUTE JAR STATE
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [goalAmount, setGoalAmount] = useState<number>(450);
  const [successModal, setSuccessModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ""
  });

  // Confetti particles state
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const nextParticleId = useRef(0);

  const triggerConfetti = () => {
    const nextId = nextParticleId.current;
    nextParticleId.current += 40;
    const newConfetti = generateConfettiParticles(nextId);
    setConfetti(prev => [...prev, ...newConfetti]);
    // Cleanup particles after 1.5s
    setTimeout(() => {
      setConfetti(prev => prev.filter(p => !newConfetti.some(n => n.id === p.id)));
    }, 1500);
  };

  const playChirp = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.type = "sine";
      osc2.type = "triangle";
      
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.15); // D6
      
      osc2.frequency.setValueAtTime(880, now); // A5
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.15); // A6
      
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(now + 0.2);
      osc2.stop(now + 0.2);
    } catch {
      console.log("Audio blocked or not supported on this device/sandboxed iframe config.");
    }
  };

  const handleGenerateScan = () => {
    const baseAmount = parseFloat(customAmount) || selectedPreset;
    if (!baseAmount || baseAmount <= 0) {
      alert("Please choose a valid wave pledge amount.");
      return;
    }
    setShowQR(true);
  };

  const handleSimulatePayment = () => {
    const baseAmount = parseFloat(customAmount) || selectedPreset || 5;
    
    playChirp();
    triggerConfetti();

    // Increment Goal
    setGoalAmount(prev => Math.min(prev + baseAmount, 1000));

    // Show Dialog
    setSuccessModal({
      open: true,
      message: `Transmitted $${baseAmount.toFixed(2)} tribute successfully to the OceanTideDrop project!`
    });

    // Reset fields
    setShowQR(false);
    setSelectedPreset(null);
    setCustomAmount("");
  };

  // 3. VIP TIDE PASS STATE
  const [emailInput, setEmailInput] = useState<string>("");
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintLogs, setMintLogs] = useState<string[]>([]);
  const [savedPass, setSavedPass] = useState<PassData | null>(() => {
    const raw = safeStorage.getItem("vip_pass");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  });

  const handleClaimPass = () => {
    const trimmed = emailInput.trim();
    if (!trimmed || !trimmed.includes("@") || trimmed.length < 5) {
      alert("Please provide a valid surfer network address.");
      return;
    }

    setIsMinting(true);
    setMintLogs([]);

    const logSequence = [
      { text: "> Locating active surfer node...", delay: 0 },
      { text: "> Injecting credential layer to security framework...", delay: 500 },
      { text: "> Signing cryptographic keypair signature...", delay: 1000 },
      { text: "> Synchronization completed! Core VIP pass minted.", delay: 1500 }
    ];

    logSequence.forEach(step => {
      setTimeout(() => {
        setMintLogs(prev => [...prev, step.text]);
      }, step.delay);
    });

    setTimeout(() => {
      const serial = generateSerialId();
      const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, ".");
      const passObj = { email: trimmed, serial, timestamp: dateStr };
      
      safeStorage.setItem("vip_pass", JSON.stringify(passObj));
      setSavedPass(passObj);
      setIsMinting(false);
      
      playChirp();
      triggerConfetti();
    }, 2000);
  };

  const handleRevokePass = () => {
    safeStorage.removeItem("vip_pass");
    setSavedPass(null);
    setEmailInput("");
    setMintLogs([]);
  };

  // 4. SPECS MODAL & SVG WAVE WAVEFORM STATE
  const [activeTab, setActiveTab] = useState<"ai-tech" | "digital-assets">("ai-tech");
  const [specsModalOpen, setSpecsModalOpen] = useState(false);
  const [specsTitle, setSpecsTitle] = useState("");
  const [specsFreq, setSpecsFreq] = useState(85);
  const [specsAmp, setSpecsAmp] = useState(45);

  const openSpecs = (title: string, freq: number, amp: number) => {
    setSpecsTitle(title);
    setSpecsFreq(freq);
    setSpecsAmp(amp);
    setSpecsModalOpen(true);
  };

  const generateWavePath = () => {
    const points: string[] = [];
    const step = 5;
    const width = 300;
    const height = 150;
    const midY = height / 2;
    for (let x = 0; x <= width; x += step) {
      const angle = (x / width) * Math.PI * 2 * (specsFreq / 10);
      const y = midY + Math.sin(angle) * (specsAmp * 0.8);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  // 5. SOUNDBOARD AUDIO pads
  const [visualMultiplier, setVisualMultiplier] = useState<number[]>([15, 40, 20, 60, 30, 80, 45, 25, 10]);

  const soundboardSynth = (type: string) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Trigger visual equalizer bounces
      const bounces = generateEqualizerBounces();
      setVisualMultiplier(bounces);
      setTimeout(() => {
        setVisualMultiplier([15, 25, 20, 30, 20, 25, 30, 15, 10]);
      }, 400);

      if (type === "high-tide") {
        // High Tide Major chord (C4, E4, G4, C5)
        const freqs = [261.63, 329.63, 392.00, 523.25];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, now);
        filter.connect(ctx.destination);

        freqs.forEach(f => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, now);
          
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          
          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 1.4);
        });
      } else if (type === "deep-swell") {
        // Low Bass chord sequence
        const freqs = [65.41, 98.00];
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 0.15);
        filter.frequency.exponentialRampToValueAtTime(120, now + 0.8);
        filter.connect(ctx.destination);

        freqs.forEach(f => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(f, now);
          
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
          
          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 1.0);
        });
      } else if (type === "coral-reef") {
        // Arpeggiated high chime
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1500, now);
        filter.connect(ctx.destination);

        freqs.forEach((f, idx) => {
          const noteTime = now + (idx * 0.11);
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(f, noteTime);
          
          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.1, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.22);
          
          osc.connect(gain);
          gain.connect(filter);
          osc.start(noteTime);
          osc.stop(noteTime + 0.25);
        });
      }
    } catch {
      console.log("Acoustics blocked by sandbox frame rules.");
    }
  };

  const handleDigitalDownload = (name: string) => {
    playChirp();
    triggerConfetti();
    setSuccessModal({
      open: true,
      message: `Access granted! Successfully unlocked retro drop '${name}' for your terminal workspace.`
    });
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      {/* CRT SCANLINE OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-screen w-screen z-[5] pointer-events-none mix-blend-overlay opacity-30" />
      
      {/* Confetti Absolute Canvas */}
      <div className="fixed inset-0 pointer-events-none z-[120] overflow-hidden">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="absolute w-2.5 h-2.5 rounded-sm animate-ping duration-[1.5s]"
            style={{
              backgroundColor: p.color,
              left: "50%",
              top: "50%",
              transform: `translate(${p.tx}px, ${p.ty}px) rotate(${p.rot}deg)`,
              transition: "all 1.5s cubic-bezier(0.1, 0.8, 0.3, 1)"
            }}
          />
        ))}
      </div>

      <div className="w-full py-10">
        
        {/* CONSOLE HEADER */}
        <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-10">
          
          {/* Status block */}
          <div className="rounded-2xl p-6 bg-zinc-950/60 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.05)] flex flex-col justify-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 blur-3xl rounded-full" />
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-pink-500 uppercase font-black">SYSTEM CORES OPERATIONAL</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              TRIBUTE CONSOLE
            </h1>
            <p className="text-xs font-mono tracking-widest text-cyan-400 mt-1 uppercase">// OCEAN TIDE PROTOCOLS</p>
          </div>

          {/* Terminal Network logs */}
          <div className="rounded-2xl border border-white/5 p-5 bg-black/80 backdrop-blur-md flex flex-col justify-between h-44 lg:h-auto overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Terminal Activity Network</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded font-black tracking-wider uppercase">LIVE DECK</span>
            </div>
            <div className="font-mono text-[11px] text-cyan-400/90 space-y-1.5 overflow-y-auto flex-1 select-none leading-relaxed">
              {logs.map((log, idx) => (
                <div key={idx} className="animate-in fade-in duration-500 truncate">
                  <span className="text-zinc-600 mr-2">&gt;&gt;</span>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Core Metrics Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/5 p-4 bg-zinc-950/40 flex flex-col justify-center items-center text-center backdrop-blur-sm group hover:border-cyan-400/20 transition-colors">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider font-bold">Surfers Active</span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xl font-black text-white">1,482</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 p-4 bg-zinc-950/40 flex flex-col justify-center items-center text-center backdrop-blur-sm group hover:border-pink-500/20 transition-colors">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider font-bold">Swells Measured</span>
              <span className="text-xl font-black text-pink-500 mt-2">98,241</span>
            </div>
            <div className="rounded-2xl border border-white/5 p-4 bg-zinc-950/40 flex flex-col justify-center items-center text-center backdrop-blur-sm group hover:border-purple-500/20 transition-colors">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider font-bold">Resonance</span>
              <span className="text-xl font-black text-purple-400 mt-2">100%</span>
            </div>
          </div>

        </header>

        {/* WORKSPACE PANELS GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* UTILITIES: PLEDGE & BADGE (5 Cols) */}
          <section className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            {/* TRIBUTE PLEDGE SECTION */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.05)] backdrop-blur-md flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black uppercase text-white flex items-center gap-2.5">
                  <Coins className="w-5 h-5 text-pink-500" />
                  <span>Interactive Tribute</span>
                </h2>
                <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mt-1">SUPPORT NETWORK OPERATIONS</p>
              </div>

              {/* Amount Quick Presets */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { val: 5, label: "Splash" },
                  { val: 15, label: "Tide Swell" },
                  { val: 50, label: "Flood Wave" }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => {
                      setSelectedPreset(item.val);
                      setCustomAmount("");
                    }}
                    className={`p-3 rounded-xl border font-mono text-left transition-all relative ${selectedPreset === item.val ? "bg-pink-500/10 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]" : "bg-white/5 border-white/5 hover:border-white/10 text-zinc-400 hover:text-white"}`}
                  >
                    <span className="text-sm font-bold block">${item.val}</span>
                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-wider block mt-1">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-sm font-bold">$</span>
                <input
                  type="number"
                  value={customAmount}
                  placeholder="Insert custom ocean tide drop value..."
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedPreset(null);
                  }}
                  className="w-full bg-black/60 border border-white/10 focus:border-cyan-400/50 rounded-xl py-3.5 pl-9 pr-4 text-xs font-mono text-white placeholder-zinc-600 outline-none transition-colors"
                />
              </div>

              {/* Generate Toggle */}
              <button
                onClick={handleGenerateScan}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-black font-black uppercase text-xs tracking-widest py-3.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-[0.99] cursor-pointer"
              >
                Generate Scan Frame &rarr;
              </button>

              {/* QR Code Segment */}
              <AnimatePresence>
                {showQR && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border border-white/5 rounded-xl bg-black/80 p-5 flex flex-col items-center gap-4 relative">
                      <div className="absolute top-2 right-2">
                        <button onClick={() => setShowQR(false)} className="p-1 text-zinc-600 hover:text-white transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="relative w-40 h-40 bg-white p-3 rounded-2xl shadow-xl overflow-hidden self-center flex items-center justify-center">
                        <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M0 0h30v30H0zm10 10h10v10H10zm60-10h30v30H70zm10 10h10v10H80zM0 70h30v30H0zm10 10h10v10H10zm35-45h10v10H45zm10 15h10v10H55zm-10 15h10v10H45zm25-15h10v10H70zm10 15h10v10H80zm-10 15h10v10H70zm-15 0h10v10H55z" />
                          <rect x="40" y="0" width="10" height="10" />
                          <rect x="40" y="20" width="10" height="10" />
                          <rect x="0" y="40" width="10" height="10" />
                          <rect x="20" y="40" width="10" height="10" />
                          <rect x="90" y="40" width="10" height="10" />
                          <rect x="90" y="60" width="10" height="10" />
                        </svg>
                        {/* Laser scan horizontal beam */}
                        <div className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_#00f0ff] animate-bounce w-full" />
                      </div>

                      <p className="text-[10px] font-mono text-cyan-400 text-center tracking-wider max-w-[240px] leading-normal uppercase">
                        Scan with your device or click below to trigger payment flow
                      </p>

                      <button
                        onClick={handleSimulatePayment}
                        className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-wider text-[10px] rounded-lg transition-transform hover:scale-[1.01]"
                      >
                        Simulate Wave-Tribute Payment
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* GOAL COMPASS TRACKER progress */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-widest font-bold">Workspace Maintenance</span>
                  <span className="text-cyan-400 font-bold font-mono">${goalAmount} / $1000</span>
                </div>
                <div className="w-full bg-black/50 border border-white/5 h-3 rounded-full overflow-hidden relative">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-full transition-all duration-700 rounded-full"
                    style={{ width: `${(goalAmount / 1000) * 100}%` }}
                  />
                </div>
              </div>

            </div>

            {/* VIP TIDE PASS MINTING FRAME */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 backdrop-blur-md flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-black uppercase text-white flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>VIP Tide Pass Badge</span>
                </h2>
                <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mt-1">SECURE DIGITALLY ASSIGNED PROFILE</p>
              </div>

              {!savedPass ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Input active network email..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={isMinting}
                      className="w-full bg-black/60 border border-white/10 focus:border-cyan-400/50 rounded-xl py-3.5 pl-11 pr-4 text-xs font-mono text-white placeholder-zinc-600 outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleClaimPass}
                    disabled={isMinting}
                    className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-black font-black uppercase text-xs tracking-widest py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isMinting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-black" />
                        <span>MINT SECURE ID</span>
                      </>
                    )}
                  </button>

                  {/* Terminal generation line list */}
                  {mintLogs.length > 0 && (
                    <div className="p-4 bg-black/80 rounded-xl border border-white/5 font-mono text-[10px] text-cyan-400 space-y-1.5 select-none animate-in fade-in">
                      {mintLogs.map((log, i) => (
                        <div key={i} className="leading-relaxed">
                          <span className="text-zinc-600 mr-2">&gt;&gt;</span>
                          {log}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-5 animate-in fade-in zoom-in duration-500">
                  
                  {/* Glowing Digital Badge Artifact */}
                  <div className="relative p-5 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-950/40 border border-purple-500/30 overflow-hidden shadow-2xl group hover:border-cyan-400/40 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 blur-3xl rounded-full" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full" />
                    
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[8px] font-mono text-cyan-400 tracking-widest uppercase font-black px-2 py-0.5 bg-cyan-950/50 border border-cyan-800/30 rounded inline-block">VIP SECURE ENTRY</span>
                        <h3 className="text-lg font-black tracking-tight mt-2 text-white uppercase leading-none">OCEAN TIDE DROP</h3>
                      </div>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 mr-1" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    </div>

                    <div className="mb-6 space-y-1 py-1">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-black block">Active Cyber Node</span>
                      <span className="text-xs font-mono text-zinc-200 truncate block max-w-xs">{savedPass.email}</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-3">
                      <div>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase block font-black">Credential ID</span>
                        <span className="text-xs font-mono text-cyan-400 font-bold">{savedPass.serial}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase block font-black">Issue Timestamp</span>
                        <span className="text-[10px] font-mono text-white leading-none block mt-0.5">{savedPass.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleRevokePass}
                    className="w-full text-center border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-widest py-2 rounded-xl transition-all cursor-pointer"
                  >
                    RESET SURFER IDENTITY
                  </button>

                </div>
              )}

            </div>

          </section>

          {/* ASSETS & SOLUTIONS BOARD (7 Cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* TABS SELECTOR */}
            <div className="flex border border-white/5 p-1.5 rounded-2xl bg-zinc-950/60 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("ai-tech")}
                className={`flex-1 py-3 px-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all cursor-pointer ${activeTab === "ai-tech" ? "bg-gradient-to-r from-pink-500 to-purple-500 text-black shadow-[0_0_15px_rgba(236,72,153,0.15)]" : "text-zinc-500 hover:text-white"}`}
              >
                AI Technology Cores
              </button>
              <button
                onClick={() => setActiveTab("digital-assets")}
                className={`flex-1 py-3 px-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all cursor-pointer ${activeTab === "digital-assets" ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-black shadow-[0_0_15px_rgba(138,43,226,0.15)]" : "text-zinc-500 hover:text-white"}`}
              >
                Retro Assets & Sound board
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="w-full">
              {activeTab === "ai-tech" ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  
                  {[
                    {
                      title: "SurferCore Neural Engine",
                      desc: "Unified marine AI arrays designed for real-time telemetry calculation and wave density parameters.",
                      freq: 82,
                      amp: 35,
                      border: "group-hover:border-cyan-400/30"
                    },
                    {
                      title: "Tide Predictor ML Pro",
                      desc: "Aggregated algorithmic training loops modeling coastline swells with rigorous high-precision telemetry.",
                      freq: 98,
                      amp: 55,
                      border: "group-hover:border-pink-500/30"
                    },
                    {
                      title: "WaveScribe Acoustic Synthesis",
                      desc: "Specialized neural acoustic filters calibrated for high-volume audio capture in ocean environments.",
                      freq: 70,
                      amp: 25,
                      border: "group-hover:border-purple-500/30"
                    }
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-white/5 bg-zinc-950/40 relative overflow-hidden backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-5 group transition-all hover:bg-black/80 hover:border-white/10"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full bg-cyan-400 animate-pulse`} />
                          <h3 className="text-base font-black uppercase tracking-tight text-white">{srv.title}</h3>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed max-w-md font-medium">{srv.desc}</p>
                      </div>

                      <button
                        onClick={() => openSpecs(srv.title, srv.freq, srv.amp)}
                        className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-[10px] font-black uppercase tracking-wider transition-colors inline-block md:shrink-0 text-center"
                      >
                        DIAGNOSE COMPLIANCE
                      </button>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* DROPS GRID */}
                  <div className="grid md:grid-cols-2 gap-4">
                    
                    {/* Visual icons bundle */}
                    <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex flex-col justify-between gap-4 backdrop-blur-md hover:border-purple-500/20 transition-all">
                      <div>
                        <span className="text-[8px] font-mono text-pink-500 bg-pink-950/40 border border-pink-900/40 px-2 py-0.5 rounded font-black tracking-widest uppercase">Visual Toolkit</span>
                        <h3 className="text-base font-black uppercase text-white tracking-tight mt-3">Cyber Ocean Vectors</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed mt-1 font-medium">Beautiful retro cyberpunk visual graphics custom made for design layout portfolios.</p>
                      </div>
                      <button
                        onClick={() => handleDigitalDownload("Cyber Ocean Vectors")}
                        className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs tracking-wider uppercase transition-colors hover:bg-white/10 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" /> ACCESS DROP FILE
                      </button>
                    </div>

                    {/* Wallpaper bundle */}
                    <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex flex-col justify-between gap-4 backdrop-blur-md hover:border-cyan-400/20 transition-all">
                      <div>
                        <span className="text-[8px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/40 px-2 py-0.5 rounded font-black tracking-widest uppercase font-bold">Art assets</span>
                        <h3 className="text-base font-black uppercase text-white tracking-tight mt-3">Neon Surf Boards</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed mt-1 font-medium">4K ultra‑definition scenic backgrounds featuring glowing vector tides and ocean scenery.</p>
                      </div>
                      <button
                        onClick={() => handleDigitalDownload("Neon Surf Boards")}
                        className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs tracking-wider uppercase transition-colors hover:bg-white/10 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" /> ACCESS DROP FILE
                      </button>
                    </div>

                  </div>

                  {/* CUSTOM SYNTH AUDIO KEYBOARD */}
                  <div className="p-5 bg-zinc-950/60 border border-purple-500/20 rounded-2xl flex flex-col gap-4 relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full" />
                    <div>
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <h3 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                          <Music className="w-4.5 h-4.5 text-pink-500 animate-bounce" />
                          <span>Waves Oscillator Soundboard</span>
                        </h3>
                        <span className="text-[8px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/30 px-2.5 py-1 rounded font-black uppercase">WEB CLIENT SYNTHESIS</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mt-1">Play live synthesizer resonance chords directly inside your environment</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "high-tide", title: "High Tide", tag: "Chord", color: "hover:border-cyan-400/40 hover:bg-cyan-950/10 hover:text-cyan-400 text-cyan-500" },
                        { id: "deep-swell", title: "Deep Swell", tag: "Bass", color: "hover:border-pink-500/40 hover:bg-pink-950/10 hover:text-pink-400 text-pink-500" },
                        { id: "coral-reef", title: "Coral Reef", tag: "Arp Chime", color: "hover:border-purple-500/40 hover:bg-purple-950/10 hover:text-purple-400 text-purple-500" }
                      ].map((btn) => (
                        <button
                          key={btn.id}
                          onClick={() => soundboardSynth(btn.id)}
                          className={`p-4 rounded-xl border border-white/5 bg-white/5 text-zinc-300 font-black uppercase transition-all flex flex-col items-center justify-center text-center gap-1.5 duration-150 cursor-pointer ${btn.color}`}
                        >
                          <Music className="w-4 h-4" />
                          <span className="text-xs">{btn.title}</span>
                          <span className="text-[8px] font-mono text-zinc-600 block">{btn.tag}</span>
                        </button>
                      ))}
                    </div>

                    {/* Graphic Audio Wave Equalizer visual blocks */}
                    <div className="h-10 bg-black/60 border border-white/5 rounded-xl flex items-center justify-center gap-1 px-4 overflow-hidden relative">
                      {visualMultiplier.map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>

                  </div>

                </div>
              )}
            </div>

          </section>

        </main>

      </div>

      {/* CORE SPEC COMPARATOR DIALOG (MODAL) */}
      <AnimatePresence>
        {specsModalOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-zinc-950 border border-white/10 rounded-2xl flex flex-col gap-5 shadow-[0_0_50px_rgba(0,0,0,0.85)] relative"
            >
              <button 
                onClick={() => setSpecsModalOpen(false)} 
                className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[8px] font-mono text-cyan-400 tracking-widest uppercase font-black px-2 py-0.5 bg-cyan-950/40 border border-cyan-800/20 rounded inline-block">Active Diagnostics</span>
                <h3 className="text-lg font-black uppercase text-white mt-2 leading-none">{specsTitle}</h3>
              </div>

              {/* Slider Controller */}
              <div className="space-y-2.5 py-4 border-y border-white/10">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-widest font-black">Wave frequency ratio</span>
                  <span className="text-pink-400 font-bold font-mono">{specsFreq}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={specsFreq}
                  onChange={(e) => setSpecsFreq(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-black/80 appearance-none accent-pink-500 cursor-pointer"
                />
              </div>

              {/* Generated Dynamic SVG Wave */}
              <div className="p-4 bg-black/60 rounded-xl border border-white/5 flex flex-col gap-2">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-black">Live oscillation curve</span>
                <svg className="w-full h-20 text-cyan-400" viewBox="0 0 300 150">
                  <path d={generateWavePath()} fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </div>

              <button
                onClick={() => setSpecsModalOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-black font-black uppercase text-xs tracking-widest rounded-xl transition-all"
              >
                CLOSE ACTIVE DIAGNOSTICS
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS POPUP COMPONENT (MODAL) */}
      <AnimatePresence>
        {successModal.open && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[160] flex items-center justify-center p-6 animate-in fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-zinc-950 border border-cyan-400/30 rounded-2xl flex flex-col items-center text-center gap-5 shadow-[0_0_50px_rgba(0,0,0,0.85)] relative"
            >
              <div className="w-14 h-14 bg-cyan-950/50 border border-cyan-400/30 rounded-full flex items-center justify-center text-cyan-400 text-2xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">Waves Stabilized!</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-semibold mt-2">{successModal.message}</p>
              </div>

              <button
                onClick={() => setSuccessModal({ open: false, message: "" })}
                className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase text-xs tracking-widest rounded-xl transition-transform hover:scale-[1.01] cursor-pointer"
              >
                Ride On
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </PageWrapper>
  );
}
