import React from "react";
import Logo from "../../components/Logo";

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <h1 className="text-6xl font-black italic tracking-tighter text-center mb-4">
          Services
        </h1>
        <p className="text-slate-400 text-center max-w-2xl mx-auto">
          High‑impact branding, AI‑powered systems, and cinematic digital experiences.
        </p>

        {/* LOGO BELOW HERO */}
        <div className="mt-8 mb-16">
          <Logo />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-2">Brand Architecture</h3>
            <p className="text-slate-400">
              Identity systems, visual language, and narrative cohesion.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-2">AI Content Engines</h3>
            <p className="text-slate-400">
              Automated content pipelines and intelligent creative workflows.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
