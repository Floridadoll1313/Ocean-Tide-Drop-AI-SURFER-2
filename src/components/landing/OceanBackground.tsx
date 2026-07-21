import { motion } from "framer-motion";

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-sky-500/40
          via-cyan-900/60
          to-slate-950
        "
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-40
          left-1/2
          -translate-x-1/2
          h-96
          w-[120%]
          rounded-[50%]
          bg-cyan-400/20
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-20
          left-10
          h-72
          w-72
          rounded-full
          bg-blue-400/20
          blur-3xl
        "
      />

    </div>
  );
}