import React from "react";
import { motion } from "motion/react";

interface HologramCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HologramCard({
  children,
  className = "",
}: HologramCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-300/20
        bg-white/10
        backdrop-blur-2xl
        p-6
        shadow-[0_0_50px_rgba(34,211,238,0.15)]
        hover:border-cyan-300/50
        transition-all
        ${className}
      `}
    >

      {/* Moving hologram light */}
      <motion.div
        className="
          absolute
          left-0
          right-0
          h-20
          bg-gradient-to-b
          from-transparent
          via-cyan-300/20
          to-transparent
          pointer-events-none
        "
        animate={{
          y: [-120, 320],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Rotating energy ring */}
      <motion.div
        className="
          absolute
          -right-16
          -top-16
          w-48
          h-48
          rounded-full
          border
          border-cyan-400/20
          pointer-events-none
        "
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner glow */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-cyan-400/10
          via-transparent
          to-blue-500/10
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </motion.div>
  );
}
