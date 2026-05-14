import React from "react";

export default function Services() {
  return (
    <div className="min-h-screen bg-[#00111a] text-white flex flex-col items-center justify-center p-6 pt-24">
        <h1 className="text-4xl md:text-6xl font-black uppercase text-[#00eaff] mb-4 drop-shadow-[0_0_20px_#00eaff]">Our Services</h1>
        <p className="text-white/60 mb-8 max-w-xl text-center text-lg">Cinematic web design, automated pipelines, and intelligent AI agents designed for scale and momentum.</p>
        <div className="flex gap-4">
            <a href="/pricing" className="px-6 py-3 bg-[#00eaff] text-black transition-colors uppercase tracking-widest text-xs font-bold rounded-xl shadow-[0_0_15px_#00eaff]">View Pricing</a>
            <a href="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors uppercase tracking-widest text-xs font-bold rounded-xl">Go back</a>
        </div>
    </div>
  )
}
