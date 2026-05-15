import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Menu, X, LogOut, User as UserIcon, Globe, MapPin, Mail, Phone } from "lucide-react";

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
            <img
              src={mainHeroImage}
              alt="Logo"
              className="h-10 w-10 drop-shadow-[0_0_12px_#00eaff] object-contain"
            />
            <span className="text-xl font-black italic tracking-tighter uppercase">
              Ocean Tide <span className="text-[#00eaff]">Drop</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 lg:gap-6 text-[10px] font-black uppercase tracking-[0.2em] items-center">
            <Link className="hover:text-[#00eaff] transition-all whitespace-nowrap" to="/">Home</Link>
            <Link className="hover:text-[#00eaff] transition-all whitespace-nowrap" to="/gallery">Gallery</Link>
            <Link className="hover:text-[#00eaff] transition-all whitespace-nowrap" to="/forecast">Forecast</Link>
            <Link className="hover:text-[#00eaff] transition-all whitespace-nowrap" to="/shop">Shop</Link>
            <Link className="hover:text-[#00eaff] transition-all whitespace-nowrap" to="/diary">Diary</Link>
            <Link className="hover:text-[#00eaff] transition-all whitespace-nowrap" to="/memorial">Memorial</Link>
            <Link className="hover:text-[#00eaff] transition-all whitespace-nowrap text-[#00eaff]" to="/members">Members</Link>
            
            <div className="pl-4 border-l border-white/20 flex items-center gap-4">
              {loading ? (
                <div className="w-6 h-6 rounded-full border-2 border-[#00eaff] border-t-transparent animate-spin"></div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user.photoURL ? (
                       <img src={user.photoURL} alt={user.displayName || "User"} className="w-6 h-6 rounded-full border border-[#00eaff]" />
                    ) : (
                       <div className="w-6 h-6 rounded-full bg-[#00eaff]/20 border border-[#00eaff] flex items-center justify-center text-[8px]">
                         {user.email?.[0].toUpperCase()}
                       </div>
                    )}
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-[8px] hover:text-[#ff5E00] transition-colors"
                  >
                    Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={loginWithGoogle}
                  className="px-4 py-1.5 rounded-lg bg-[#00eaff]/10 border border-[#00eaff]/30 text-[#00eaff] hover:bg-[#00eaff]/20 transition-all text-[8px] font-black uppercase tracking-widest"
                >
                  Join
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#00eaff] relative z-[60]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl md:hidden transition-all duration-700 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6 text-center">
          <nav className="flex flex-col gap-6">
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/">Home</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/services">Services</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/gallery">Gallery</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/forecast">Forecast</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/shop">Shop</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/diary">Diary</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/memorial">Memorial</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/members">Members</Link>
            <Link onClick={toggleMenu} className="text-3xl font-black italic uppercase tracking-tighter hover:text-[#00eaff] transition-all" to="/contact">Contact</Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-xs flex flex-col gap-4">
            {user ? (
              <>
                <Link onClick={toggleMenu} to="/profile" className="flex items-center justify-center gap-3 text-white">
                  {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-[#00eaff]" />}
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
                className="w-full py-4 rounded-2xl bg-[#00eaff] text-black font-black uppercase text-xs tracking-widest"
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
              <img
                src={mainHeroImage}
                alt="Ocean Tide Drop Logo"
                className="w-48 h-auto mx-auto mb-4 drop-shadow-[0_0_30px_#00eaff] hover:scale-105 transition-transform duration-500"
              />
              <div className="text-[#00eaff] text-[10px] md:text-sm font-black uppercase tracking-[0.5em] drop-shadow-[0_0_10px_rgba(0,234,255,0.5)] animate-pulse">
                CHOOSE YOUR TOOLS AS YOU DO.
              </div>
            </div>
          )}
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 text-center text-white/60 text-sm relative z-10 shrink-0 border-t border-white/5 mt-auto">
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          <img
            src={mainHeroImage}
            alt="Ocean Tide Drop Footer Logo"
            className="w-12 h-auto mb-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="mailto:oceantidedropaisurf@gmail.com" className="hover:text-[#00eaff] transition-colors flex items-center gap-2">
              <span>oceantidedropaisurf@gmail.com</span>
            </a>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/20"></div>
            <a href="tel:8542853282" className="hover:text-[#00eaff] transition-colors flex items-center gap-2">
              <span>(854) 285-3282</span>
            </a>
          </div>
        </div>
        <div>
          © {new Date().getFullYear()} Ocean Tide Drop AI Surfer — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
