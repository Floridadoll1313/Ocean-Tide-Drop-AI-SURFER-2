import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TIERS: Record<string, { title: string; color: string; glow: string; description: string; }> = {
  "dawn-patrol": {
    title: "Dawn Patrol",
    color: "text-slate-300",
    glow: "shadow-[0_0_40px_rgba(200,200,255,0.3)]",
    description: "Initializing your cinematic entry point...",
  },
  "breakline": {
    title: "Breakline",
    color: "text-[#00eaff]",
    glow: "shadow-[0_0_40px_rgba(0,255,255,0.5)]",
    description: "Calibrating deeper automations...",
  },
  "hatteras-island": {
    title: "Hatteras Island",
    color: "text-pink-500",
    glow: "shadow-[0_0_40px_rgba(255,0,128,0.5)]",
    description: "Opening high-touch creative systems...",
  },
  "cape-point": {
    title: "Cape Point",
    color: "text-yellow-300",
    glow: "shadow-[0_0_40px_rgba(255,215,0,0.5)]",
    description: "Activating full-stack architecture...",
  },
};

export default function PricingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const tier = slug && TIERS[slug] ? TIERS[slug] : TIERS["dawn-patrol"];
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivated(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center p-4">
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-40 blur-[120px]" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.2), transparent 60%)" }} />

      {/* GLASS ACTIVATION CARD */}
      <div className={`relative max-w-2xl w-full glass-card p-12 rounded-[3xl] border border-white/10 bg-white/5 text-center backdrop-blur-xl ${tier.glow} transition-all duration-1000`}>
        <h1 className={`text-5xl font-black italic uppercase mb-4 drop-shadow-xl ${tier.color}`}>
          {tier.title}
        </h1>
        <p className="text-slate-500 mb-12 uppercase text-[10px] tracking-[0.4em]">Activation Sequence Online</p>
        <p className="text-slate-300 font-light mb-8">{tier.description}</p>

        {/* ACTIVATION LOADER */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-10 relative">
          <div className={`absolute top-0 bottom-0 left-0 w-1/2 ${tier.color.replace("text-", "bg-")} animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]`} />
        </div>

        <Link to="/pricing" className="inline-flex items-center gap-2 text-[#00eaff] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
          ← Back to Tiers
        </Link>
      </div>

      {/* ACTIVATION COMPLETE REVEAL OVERLAY */}
      {activated && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-1000">
          <div className="text-center">
            <div className={`text-5xl font-black uppercase tracking-widest mb-6 ${tier.color}`}>
              Activation Complete
            </div>
            <div className={`mx-auto w-32 h-32 rounded-full border-4 ${tier.color.replace('text-', 'border-')} ${tier.glow} animate-pulse`} />
            <p className="mt-8 text-slate-300 uppercase text-xs tracking-[0.3em]">
              Welcome to {tier.title}
            </p>
            <div className="mt-10">
              <Link to="/members" className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white uppercase tracking-widest text-xs hover:bg-white/20 transition">
                Enter Realm
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
