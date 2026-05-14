import React from "react";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00111a] via-[#002b3d] to-[#00070a] text-white overflow-hidden">
      {/* NAVBAR */}
      <header className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 drop-shadow-[0_0_12px_#00eaff]"
            />
            <span className="text-xl font-semibold tracking-wide">
              Ocean Tide Drop
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

      {/* HERO SECTION */}
      <section className="pt-40 pb-32 relative flex flex-col items-center justify-center min-h-[80vh]">
        {/* Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#00eaff]/20 blur-[180px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0077ff]/20 blur-[160px] rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-[0_0_25px_#00eaff] mb-8"
          >
            🌀⛵Ocean Tide Drop 🌺 AI Surfer 🏄💦
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
          >
            A cinematic, ocean‑infused creative agency blending automation,
            storytelling, and technical mastery.  
            Build your brand with the force of the tide.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-6"
          >
            <a
              href="/services"
              className="px-8 py-4 bg-[#00eaff] text-black font-semibold rounded-xl shadow-[0_0_20px_#00eaff] hover:shadow-[0_0_35px_#00eaff] transition-all"
            >
              Explore Services
            </a>

            <a
              href="/contact"
              className="px-8 py-4 border border-[#00eaff] text-[#00eaff] font-semibold rounded-xl hover:bg-[#00eaff]/10 transition-all"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="py-24 bg-black/20 backdrop-blur-xl border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-2xl font-bold text-[#00eaff]">Cinematic Branding</h3>
            <p className="mt-3 text-white/70">
              Neon‑ocean visuals and immersive storytelling that make your brand unforgettable.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#00eaff]">AI Automation</h3>
            <p className="mt-3 text-white/70">
              Smart workflows that save time, boost output, and scale your business.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#00eaff]">Technical Mastery</h3>
            <p className="mt-3 text-white/70">
              Clean architecture, fast deployments, and seamless integrations.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-white/60 text-sm relative z-10">
        © {new Date().getFullYear()} Ocean Tide Drop AI Surfer — All Rights Reserved.
      </footer>
    </div>
  );
}
