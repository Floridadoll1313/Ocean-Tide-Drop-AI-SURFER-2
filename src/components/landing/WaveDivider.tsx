import { motion } from "framer-motion";

export default function WaveDivider() {
  return (
    <div className="relative h-32 overflow-hidden">

      <motion.svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full h-full"
        animate={{
          x: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

        <path
          fill="rgba(8,47,73,0.85)"
          d="
          M0,160
          C240,260 480,60 720,140
          C960,220 1200,80 1440,160
          L1440,320
          L0,320
          Z
          "
        />

      </motion.svg>


      <motion.svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 w-full h-full opacity-40"
        animate={{
          x: [-50, 0, -50],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

        <path
          fill="rgba(34,211,238,0.35)"
          d="
          M0,200
          C260,120 500,260 760,160
          C1050,40 1200,220 1440,120
          L1440,320
          L0,320
          Z
          "
        />

      </motion.svg>

    </div>
  );
}
