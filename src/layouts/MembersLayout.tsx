import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import HUD from './HUD';
import { Soundscape } from '../components/Soundscape';

export default function MembersLayout() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col font-sans selection:bg-neon-cyan selection:text-black">
      <Header />
      <Soundscape />
      <HUD />
      <Sidebar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 lg:pl-72">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 bg-black/50 lg:pl-64">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
            Est. {new Date().getFullYear()} / Digital Sovereignty Index
          </div>
          
          <div className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 italic">
            Collective Mastery &copy; AI Surfer Agency
          </div>
        </div>
      </footer>
    </div>
  );
}
