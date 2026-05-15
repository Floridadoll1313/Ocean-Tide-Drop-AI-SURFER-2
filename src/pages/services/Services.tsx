import React from "react";
import PageWrapper from "../../components/PageWrapper";

export default function Services() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full py-10">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">Services</h1>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-[#00eaff]/50 transition-all duration-500 group flex flex-col">
            <div className="mb-6 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">🌊</div>
            <h3 className="text-2xl font-black italic uppercase mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Cinematic Branding</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8 flex-grow">We craft mythic brand identities that resonate with the frequency of the future. From deep-sea aesthetics to neon synthwave visuals.</p>
            <a href="/pricing" className="inline-flex items-center gap-2 text-[#00eaff] text-[10px] font-black uppercase tracking-[0.3em] hover:gap-4 transition-all">
              Initiate Session <span className="text-lg">→</span>
            </a>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-[#ff5E00]/50 transition-all duration-500 group flex flex-col">
            <div className="mb-6 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">⚡</div>
            <h3 className="text-2xl font-black italic uppercase mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">AI Automation</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8 flex-grow">Streamline your workflow with intelligent agents and automated pipelines. Ride the edge of efficiency without losing the human touch.</p>
            <a href="/pricing" className="inline-flex items-center gap-2 text-[#ff5E00] text-[10px] font-black uppercase tracking-[0.3em] hover:gap-4 transition-all">
              Initialize Pipeline <span className="text-lg">→</span>
            </a>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-pink-500/50 transition-all duration-500 group flex flex-col">
            <div className="mb-6 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">🏛️</div>
            <h3 className="text-2xl font-black italic uppercase mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Digital Architecture</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8 flex-grow">Robust infrastructures built to weather any storm. We design systems that are as scalable as the open ocean.</p>
            <a href="/pricing" className="inline-flex items-center gap-2 text-pink-500 text-[10px] font-black uppercase tracking-[0.3em] hover:gap-4 transition-all">
              Build Foundation <span className="text-lg">→</span>
            </a>
          </div>
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-yellow-400/50 transition-all duration-500 group flex flex-col">
            <div className="mb-6 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">🔥</div>
            <h3 className="text-2xl font-black italic uppercase mb-4 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Content Engines</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8 flex-grow">AI-assisted content generation that moves with your brand. Maintain consistency across all channels with mythic precision.</p>
            <a href="/pricing" className="inline-flex items-center gap-2 text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em] hover:gap-4 transition-all">
              Ignite Content <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
