import React from "react";
import PageWrapper from "../../components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="mb-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-[#ff5E00] tracking-tight drop-shadow-[0_0_24px_rgba(0,234,255,0.4)]">
          Ocean Tide Drop
          <span className="block text-3xl md:text-4xl mt-2 text-white/90 drop-shadow-md">AI SURFER</span>
        </h1>
      </div>
      <p className="text-xl md:text-2xl text-cyan-200 mt-6 font-medium italic mb-12">
        "Pick Your Tools As You Do"
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="glass-card p-6 rounded-2xl border border-[#00eaff]/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00eaff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-xl font-bold mb-3 text-white">Digital Architecture</h3>
          <p className="text-sm text-cyan-100/70">Crafting robust, scalable infrastructures where your ideas flow like the tide.</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-[#ff5E00]/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff5E00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-xl font-bold mb-3 text-white">Automated Workflows</h3>
          <p className="text-sm text-cyan-100/70">Seamless integrations that ride the edge of efficiency—saving you time.</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-xl font-bold mb-3 text-white">AI-Driven Creations</h3>
          <p className="text-sm text-cyan-100/70">Unleash intelligent solutions tailored for dynamic, creative environments.</p>
        </div>
      </div>
    </PageWrapper>
  );
}
