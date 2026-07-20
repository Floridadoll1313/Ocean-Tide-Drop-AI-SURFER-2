import { motion } from "framer-motion";

import oceanImage from "../../assets/images/otd-ai-surfer-homepage-concept.png";
import cyberWave from "../../assets/images/cyber_surfer_wave_1779220118634.png";

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,15,35,.45),
              rgba(0,20,50,.85)
            ),
            url(${oceanImage})
          `,
        }}
      />

      <motion.img
        src={cyberWave}
        alt=""
        className="absolute bottom-0 right-0 w-[850px] opacity-30"
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/70" />

    </div>
  );
}
