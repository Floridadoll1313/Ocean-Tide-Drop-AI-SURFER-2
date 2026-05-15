import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';

export default function Lore() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full space-y-6 text-left py-10">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">Lore</h1>
        <p className="text-slate-400">
          This is where the myth lives: Sailor, Stormy, Sky Marlin, Hatteras
          currents, and the founders who ride them.
        </p>
        <div className="pt-8">
             <Link to="/" className="uppercase tracking-widest text-xs font-bold text-white/50 hover:text-white transition">← Return</Link>
        </div>
      </div>
    </PageWrapper>
  );
}
