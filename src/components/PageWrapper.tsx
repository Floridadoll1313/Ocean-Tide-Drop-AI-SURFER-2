import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden flex flex-col">
      {/* NAVBAR */}
      <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 navbar-glow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 drop-shadow-[0_0_12px_#00eaff]"
            />
            <span className="text-xl font-semibold tracking-wide">
              Ocean Tide Drop <span className="text-[#ff5E00]">AI Surfer</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm items-center">
            <Link className="hover:text-[#00eaff] transition-all" to="/">Home</Link>
            <Link className="hover:text-[#00eaff] transition-all" to="/services">Services</Link>
            <Link className="hover:text-[#00eaff] transition-all" to="/members">Members</Link>
            <Link className="hover:text-[#00eaff] transition-all" to="/contact">Contact</Link>
            
            <div className="pl-4 border-l border-white/20 flex items-center gap-4">
              {loading ? (
                <div className="w-8 h-8 rounded-full border-2 border-[#00eaff] border-t-transparent animate-spin"></div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {user.photoURL ? (
                       <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full border border-[#00eaff]" />
                    ) : (
                       <div className="w-8 h-8 rounded-full bg-[#00eaff]/20 border border-[#00eaff] flex items-center justify-center text-sm">
                         {user.email?.[0].toUpperCase()}
                       </div>
                    )}
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-xs hover:text-[#ff5E00] transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={loginWithGoogle}
                  className="px-4 py-2 rounded-full bg-[#00eaff]/10 border border-[#00eaff]/50 text-[#00eaff] hover:bg-[#00eaff]/20 hover:shadow-[0_0_15px_#00eaff] transition-all text-sm font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 pt-32 pb-20 relative flex flex-col items-center justify-center fade-in">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <img
            src="/logo.png"
            alt="Ocean Tide Drop Logo"
            className="w-48 h-auto mx-auto mb-8 drop-shadow-[0_0_30px_#00eaff] hover:scale-105 transition-transform duration-500"
          />
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 text-center text-white/60 text-sm relative z-10 shrink-0 border-t border-white/5 mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <a href="mailto:oceantidedropaisurf@gmail.com" className="hover:text-[#00eaff] transition-colors flex items-center gap-2">
            <span>oceantidedropaisurf@gmail.com</span>
          </a>
          <div className="hidden md:block w-1 h-1 rounded-full bg-white/20"></div>
          <a href="tel:8542853282" className="hover:text-[#00eaff] transition-colors flex items-center gap-2">
            <span>(854) 285-3282</span>
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} Ocean Tide Drop AI Surfer — All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
