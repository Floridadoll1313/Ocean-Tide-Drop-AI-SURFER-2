import React from "react";
import { motion } from "motion/react";

export default function HologramCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}

      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-400/20
        bg-cyan-400/5
        backdrop-blur-2xl
        p-6
        shadow-[0_0_50px_rgba(34,211,238,0.15)]
      "
    >

      {/* Moving hologram scan line */}
      <motion.div
        className="
          absolute
          left-0
          right-0
          h-24
          bg-gradient-to-b
          from-transparent
          via-cyan-300/20
          to-transparent
        "
        animate={{
          y: [-100, 300],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      {/* Rotating energy ring */}
      <motion.div
        className="
          absolute
          -right-12
          -top-12
          w-40
          h-40
          rounded-full
          border
          border-cyan-400/20
        "
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </motion.div>
  );
}
