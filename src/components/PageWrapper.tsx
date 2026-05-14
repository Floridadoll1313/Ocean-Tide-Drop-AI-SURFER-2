import React from "react";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden flex flex-col">
      {/* NAVBAR */}
      <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 navbar-glow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 drop-shadow-[0_0_12px_#00eaff]"
            />
            <span className="text-xl font-semibold tracking-wide">
              Ocean Tide Drop <span className="text-[#ff5E00]">AI Surfer</span>
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm">
            <a className="hover:text-[#00eaff] transition-all" href="/">Home</a>
            <a className="hover:text-[#00eaff] transition-all" href="/services">Services</a>
            <a className="hover:text-[#00eaff] transition-all" href="/members">Members</a>
            <a className="hover:text-[#00eaff] transition-all" href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 pt-32 pb-20 relative flex flex-col items-center justify-center fade-in">
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 text-center text-white/60 text-sm relative z-10 shrink-0">
        © {new Date().getFullYear()} Ocean Tide Drop AI Surfer — All Rights Reserved.
      </footer>
    </div>
  );
}
