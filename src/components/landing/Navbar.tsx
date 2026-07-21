import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
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
        py-3
        shadow-2xl
      "
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <img
            src="/ocean_tide_logo.png"
            alt="Ocean Tide Drop AI SURFER"
            className="h-12 w-auto"
          />

          <span className="font-bold text-white hidden sm:block">
            AI SURFER
          </span>

        </div>


        <div className="flex items-center gap-4">

          <a
            href="/pricing"
            className="
              hidden
              md:block
              text-white/90
              hover:text-cyan-300
              transition
            "
          >
            Pricing
          </a>


          <a
            href="/login"
            className="
              rounded-full
              bg-cyan-400
              px-5
              py-2
              font-bold
              text-slate-950
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