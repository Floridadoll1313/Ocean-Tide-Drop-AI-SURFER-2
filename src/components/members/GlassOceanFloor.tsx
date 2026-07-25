import { motion } from "framer-motion";

export default function GlassOceanFloor() {
  return (
    <div
      className="
        absolute
        bottom-0
        left-0
        right-0
        h-72
        overflow-hidden
        pointer-events-none
      "
    >

      {/* Water light rays */}

      <motion.div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-cyan-400/20
          via-blue-400/10
          to-transparent
          blur-2xl
        "
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity
        }}
      />


      {/* Dolphin silhouette */}

      <motion.div
        className="
          absolute
          bottom-16
          -left-32
          text-6xl
        "
        animate={{
          x: ["0vw", "120vw"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🐬
      </motion.div>


      {/* Sea turtle */}

      <motion.div
        className="
          absolute
          bottom-8
          right-[-80px]
          text-5xl
        "
        animate={{
          x: ["0vw", "-120vw"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🐢
      </motion.div>


      {/* Glass reflection */}

      <motion.div
        className="
          absolute
          inset-x-0
          bottom-0
          h-20
          bg-white/10
          backdrop-blur-sm
        "
        animate={{
          opacity:[0.2,0.5,0.2]
        }}
        transition={{
          duration:5,
          repeat:Infinity
        }}
      />

    </div>
  );
}