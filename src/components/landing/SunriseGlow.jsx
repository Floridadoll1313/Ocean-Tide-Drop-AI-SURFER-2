
import { motion } from "framer-motion";

export default function SunriseGlow() {
  return (
    <div
      className="
        absolute
        inset-0
        pointer-events-none
        overflow-hidden
        z-0
      "
    >
      <motion.div
        className="
          absolute
          left-1/2
          top-20
          -translate-x-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-orange-300/20
          blur-3xl
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-64
          bg-gradient-to-t
          from-cyan-400/20
          via-orange-300/10
          to-transparent
          blur-2xl
        "
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}