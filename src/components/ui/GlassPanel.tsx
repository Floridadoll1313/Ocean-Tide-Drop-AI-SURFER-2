import React from "react";
import { motion } from "motion/react";

export default function GlassPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5 }}
      className="
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        p-6
        shadow-[0_0_40px_rgba(34,211,238,0.15)]
        hover:border-cyan-300/40
        transition-all
      "
    >
      {children}
    </motion.div>
  );
}
