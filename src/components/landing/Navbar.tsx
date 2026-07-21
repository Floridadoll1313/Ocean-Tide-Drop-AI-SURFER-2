import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="
        fixed
        top-6
        left-1/2
        -translate-x-1/2
        z-50
        w-[90%]
        max-w-6xl
        rounded-full
        border
        border-white/20
        bg-white/10
        backdrop-blur-xl
        px-6
        py-4
        shadow-2xl
      "
    >

      <div className="flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <img
            src="/ocean_tide_logo.png"
            alt="Ocean Tide Drop AI SURFER"
            className="h-12 w-auto"
          />

          <span className="hidden md:block font-bold text-lg">
            AI SURFER
          </span>

        </div>


        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          <a
            href="#crew"
            className="text-white/90 hover:text-cyan-300 transition"
          >
            AI Crew
          </a>

          <a
            href="#solutions"
            className="text-white/90 hover:text-cyan-300 transition"
          >
            Solutions
          </a>

          <a
            href="#membership"
            className="text-white/90 hover:text-cyan-300 transition"
          >
            Membership
          </a>

          <a
            href="/login"
            className="
              rounded-full
              bg-cyan-400
              px-5
              py-2
              text-slate-950
              font-bold
              hover:scale-105
              transition
            "
          >
            Enter Harbor
          </a>

        </div>

      </div>

    </motion.nav>
  );
}
