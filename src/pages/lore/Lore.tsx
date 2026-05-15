import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';

export default function Lore() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <h1 className="text-4xl font-black tracking-tight text-[#00eaff] drop-shadow-[0_0_15px_#00eaff]">Lore</h1>
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
