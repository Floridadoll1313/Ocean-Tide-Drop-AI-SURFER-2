import React from "react";
import { Link, NavLink } from "react-router-dom";
import { navigationLinks } from "../data/navigation";
import { motion } from "motion/react";
import { Rocket, Disc, Zap } from "lucide-react";

const linkBase =
  "text-[10px] md:text-xs uppercase tracking-[0.25em] font-black transition-all duration-300 relative group py-2";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[rgba(10,15,25,0.7)] backdrop-blur-2xl border border-white/10 rounded-2xl px-6 md:px-8 h-12 md:h-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full group-hover:bg-cyan-400/40 transition-colors"
            />
            <Disc className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 relative z-10 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-black tracking-[0.3em] uppercase text-white leading-none">
              Ocean Tide
            </span>
            <div className="flex flex-col text-[10px] font-black leading-tight mt-1 tracking-widest">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Surfer</span>
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {(navigationLinks || []).slice(1, 5).map((link, idx) => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={({ isActive }) => `
                ${linkBase} 
                ${isActive ? "text-cyan-400" : "text-slate-400 hover:text-white"}
              `}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                {link.name}
              </motion.span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full opacity-50" />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <NavLink 
            to="/studio" 
            className={({ isActive }) => `
              flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest transition-all duration-300
              ${isActive 
                ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5"}
            `}
          >
            <Zap className={`w-3 h-3 ${false ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">Studio</span>
          </NavLink>

          <Link 
            to="/dashboard" 
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white px-5 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Rocket className="w-3 h-3" />
            Console
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
