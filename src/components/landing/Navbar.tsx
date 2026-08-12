import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed left-1/2 top-5 z-50 w-[92%] max-w-6xl -translate-x-1/2 rounded-full border border-white/15 bg-slate-950/55 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6"
    >
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src="/ocean_tide_logo.png" alt="Ocean Tide Drop AI SURFER" className="h-11 w-auto shrink-0" />
          <span className="hidden truncate text-sm font-black tracking-wide text-white sm:block">AI SURFER</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/pricing" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/5 hover:text-cyan-200 md:block">Pricing</Link>
          <Link to="/wave-audit" className="rounded-full bg-gradient-to-r from-cyan-300 to-teal-300 px-4 py-2 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:from-cyan-200 hover:to-teal-200 md:px-5">Start Free Audit</Link>
        </div>
      </div>
    </motion.nav>
  );
}
