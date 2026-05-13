import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import NeonDock from '../components/NeonDock';
import HUD from './HUD';
import { Soundscape } from '../components/Soundscape';

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col font-sans selection:bg-neon-cyan selection:text-black">
      <Header />
      <Soundscape />
      
      <HUD />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-24">
        <Outlet />
      </main>

      <NeonDock />

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
            Est. {new Date().getFullYear()} / Digital Sovereignty Index
          </div>
          
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
            <span className="hover:text-neon-cyan cursor-pointer transition-colors">Neural</span>
            <span className="hover:text-neon-cyan cursor-pointer transition-colors">Web</span>
            <span className="hover:text-neon-cyan cursor-pointer transition-colors">Stream</span>
          </div>
          
          <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 italic">
            Collective Mastery &copy; AI Surfer Agency
          </div>
        </div>
      </footer>
    </div>
  );
}
