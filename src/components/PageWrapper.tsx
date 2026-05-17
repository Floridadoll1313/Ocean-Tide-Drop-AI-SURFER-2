import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X, LogOut, User as UserIcon, Globe, MapPin, Mail, Phone, Home as HomeIcon, Briefcase, Layers, MessageSquare, LayoutDashboard, Anchor, Users } from "lucide-react";

import mainHeroImage from "../assets/images/regenerated_image_1778855299759.png";

export default function PageWrapper({ 
  children, 
  maxWidth = "max-w-5xl", 
  showHero = true 
}: { 
  children: React.ReactNode, 
  maxWidth?: string,
  showHero?: boolean
}) {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col relative overflow-x-hidden">
      {/* NAVBAR */}
      <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 navbar-glow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 relative z-[60]">
            <div className="w-12 h-12 flex items-center justify-center rounded-sm">
              <img src="/logo.png" alt="Ocean Tide Drop AI Surfer Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              Ocean Tide Drop <span className="text-soul-gradient italic font-serif lowercase">AI Surfer</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.15em] items-center text-zinc-400">
            <Link className="hover:text-white transition-all flex items-center gap-2 group" to="/">
              <HomeIcon className="w-3.5 h-3.5 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            <Link className="hover:text-white transition-all flex items-center gap-2 group" to="/gallery">
              <Briefcase className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
              <span>Work</span>
            </Link>
            <Link className="hover:text-white transition-all flex items-center gap-2 group" to="/services">
              <Layers className="w-3.5 h-3.5 text-purple-500 group-hover:scale-110 transition-transform" />
              <span>Services</span>
            </Link>
            <Link className="hover:text-white transition-all flex items-center gap-2 group" to="/founders">
              <Users className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span>Founders</span>
            </Link>
            <Link className="hover:text-white transition-all flex items-center gap-2 group" to="/memorial">
              <Anchor className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
              <span>Bull's Memorial</span>
            </Link>
            <Link className="hover:text-white transition-all flex items-center gap-2 group" to="/contact">
              <MessageSquare className="w-3.5 h-3.5 text-green-500 group-hover:scale-110 transition-transform" />
              <span>Contact</span>
            </Link>
            
            <div className="pl-6 border-l border-white/10 flex items-center gap-6">
              {loading ? (
                <div className="w-4 h-4 rounded-full border border-white/20 border-t-white animate-spin"></div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <Link to="/members" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity px-4 py-2 bg-white/5 border border-white/10 rounded-sm group">
                    <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-2">
                    {user.photoURL ? (
                       <img src={user.photoURL} alt={user.displayName || "User"} className="w-6 h-6 rounded-full border border-white/20" />
                    ) : (
                       <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[8px] text-white">
                         {user.email?.[0].toUpperCase()}
                       </div>
                    )}
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-[8px] hover:text-white transition-colors"
                  >
                    Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={loginWithGoogle}
                  className="px-5 py-2 bg-white text-black hover:bg-zinc-200 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                  Join
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-white relative z-[60]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl md:hidden transition-all duration-700 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6 text-center">
          <nav className="flex flex-col gap-6">
            <Link onClick={toggleMenu} className="text-4xl font-black uppercase tracking-tighter hover:text-zinc-500 transition-all text-white flex items-center justify-center gap-4" to="/">
              <HomeIcon className="w-8 h-8 text-yellow-500" />
              Home
            </Link>
            <Link onClick={toggleMenu} className="text-4xl font-black uppercase tracking-tighter hover:text-zinc-500 transition-all text-white flex items-center justify-center gap-4" to="/gallery">
              <Briefcase className="w-8 h-8 text-blue-500" />
              Work
            </Link>
            <Link onClick={toggleMenu} className="text-4xl font-black uppercase tracking-tighter hover:text-zinc-500 transition-all text-white flex items-center justify-center gap-4" to="/services">
              <Layers className="w-8 h-8 text-purple-500" />
              Services
            </Link>
            <Link onClick={toggleMenu} className="text-4xl font-black uppercase tracking-tighter hover:text-zinc-500 transition-all text-white flex items-center justify-center gap-4" to="/founders">
              <Users className="w-8 h-8 text-emerald-500" />
              Founders
            </Link>
            <Link onClick={toggleMenu} className="text-4xl font-black uppercase tracking-tighter hover:text-zinc-500 transition-all text-white flex items-center justify-center gap-4" to="/memorial">
              <Anchor className="w-8 h-8 text-orange-500" />
              Bull's Memorial
            </Link>
            <Link onClick={toggleMenu} className="text-4xl font-black uppercase tracking-tighter hover:text-zinc-500 transition-all text-white flex items-center justify-center gap-4" to="/contact">
              <MessageSquare className="w-8 h-8 text-green-500" />
              Contact
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-xs flex flex-col gap-4">
            {user ? (
              <>
                <Link onClick={toggleMenu} to="/profile" className="flex items-center justify-center gap-3 text-white">
                  {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-white" />}
                  <span className="font-bold">{user.displayName || "View Profile"}</span>
                </Link>
                <button 
                  onClick={() => { logout(); toggleMenu(); }}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button 
                onClick={() => { loginWithGoogle(); toggleMenu(); }}
                className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest"
              >
                Sign In With Google
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="flex-1 pt-32 pb-20 relative flex flex-col items-center fade-in">
        <div className={`relative ${maxWidth} mx-auto px-6 z-10 w-full`}>
          {showHero && (
            <div className="text-center mb-12">
               <span className="text-zinc-600 font-bold uppercase tracking-[0.5em] text-[10px]">AI Surfer Growth Architecture</span>
            </div>
          )}
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-20 text-center text-zinc-500 text-sm relative z-10 shrink-0 border-t border-white/5 mt-auto bg-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-left mb-20">
           <div className="col-span-1 md:col-span-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-sm mb-6">
                <img src="/logo.png" alt="Ocean Tide Drop AI Surfer Logo" className="w-full h-full object-contain grayscale brightness-200" />
              </div>
              <p className="max-w-xs text-zinc-400 font-medium leading-relaxed">
                Ocean Tide Drop AI Surfer: A premium growth agency building digital architecture for tomorrow-focused brands.
              </p>
           </div>
           <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Capabilities</h4>
              <ul className="flex flex-col gap-4 text-xs font-bold">
                 <li><Link to="/services" className="hover:text-white transition-colors">Brand Identity</Link></li>
                 <li><Link to="/services" className="hover:text-white transition-colors">AI Integration</Link></li>
                 <li><Link to="/services" className="hover:text-white transition-colors">Growth Design</Link></li>
                 <li><Link to="/founders" className="hover:text-white transition-colors">Founders Society</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-xs font-bold">
                 <li className="flex items-center gap-2"><MapPin className="w-3 h-3 text-cyan-400" /> Charleston, SC</li>
                 <li><a href="mailto:oceantidedropaisurf@gmail.com" className="hover:text-white transition-colors">oceantidedropaisurf@gmail.com</a></li>
                 <li><Link to="/contact" className="text-zinc-600 underline">Get in Touch →</Link></li>
              </ul>
           </div>
        </div>
        <div className="pt-12 border-t border-white/5 font-black uppercase tracking-[0.2em] text-[10px]">
          © {new Date().getFullYear()} Ocean Tide Drop AI Surfer Marketing Agency — Peak Frequency.
        </div>
      </footer>
    </div>
  );
}
