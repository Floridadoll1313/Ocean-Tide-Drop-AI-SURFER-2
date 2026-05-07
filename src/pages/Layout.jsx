import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import HUD from '../components/HUD';
import { Bot } from 'lucide-react';

export default function Layout() {
  const { isAdmin } = useAuth();
  
  const linkBase = "text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-cyan-400 transition-all";
  const activeClass = "text-cyan-400 border-b border-cyan-400/30 pb-1";

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-cyan-400 selection:text-black">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-8 w-8 md:h-10 md:w-10 bg-cyan-400/10 rounded-xl border border-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400/20 transition-all">
                <Bot className="text-cyan-400" size={20} />
              </div>
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-black italic text-white group-hover:text-cyan-400 transition-colors">
                AI Surfer Agency
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              Home
            </NavLink>
            <NavLink to="/services" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              Services
            </NavLink>
            <NavLink to="/pricing" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              Pricing
            </NavLink>
            <NavLink to="/members" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              Members
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
                Admin
              </NavLink>
            )}
            <NavLink to="/studio" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              Studio
            </NavLink>
            <NavLink to="/dashboard" className={({isActive}) => `${linkBase} ${isActive ? activeClass : ""}`}>
              Console
            </NavLink>
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
            {/* Small mobile menu or login could go here */}
            <Link to="/studio" className="p-2 bg-white/5 border border-white/10 rounded-lg text-cyan-400">
               <Bot size={18} />
            </Link>
          </div>
        </div>
      </header>

      <HUD />

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-24">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center px-12 py-12 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.3em] opacity-40 bg-black/20">
        <div className="mb-6 md:mb-0">Est. {new Date().getFullYear()} / Digital Sovereignty Index</div>
        <div className="flex gap-12 mb-6 md:mb-0">
          <span className="hover:text-white cursor-help transition-colors">Neural</span>
          <span className="hover:text-white cursor-help transition-colors">Web</span>
          <span className="hover:text-white cursor-help transition-colors">Stream</span>
        </div>
        <div className="text-right italic">Collective Mastery &copy; AI Surfer</div>
      </footer>
    </div>
  );
}
