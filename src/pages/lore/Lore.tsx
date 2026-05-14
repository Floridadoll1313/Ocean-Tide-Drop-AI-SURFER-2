import React from 'react';

export default function Lore() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-black tracking-tight text-[#00eaff] drop-shadow-[0_0_15px_#00eaff]">Lore</h1>
        <p className="text-slate-400">
          This is where the myth lives: Sailor, Stormy, Sky Marlin, Hatteras
          currents, and the founders who ride them.
        </p>
        <div className="pt-8">
             <a href="/" className="uppercase tracking-widest text-xs font-bold text-white/50 hover:text-white transition">← Return</a>
        </div>
      </div>
    </main>
  );
}
