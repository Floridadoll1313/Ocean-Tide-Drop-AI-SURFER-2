import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans items-center justify-center text-center">
      <h1 className="font-display text-7xl font-black uppercase tracking-tighter mb-6">404</h1>
      <p className="text-white/50 text-sm leading-relaxed mb-8">This island does not exist in our coordinates.</p>
      <Link to="/" className="px-8 py-4 bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors inline-block">
        Return Home
      </Link>
    </div>
  );
}
