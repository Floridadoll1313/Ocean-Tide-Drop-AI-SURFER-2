import { motion } from "framer-motion";

export default function BioluminescentParticles() {
  const particles = Array.from({ length: 25 });

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
        z-0
      "
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="
            absolute
            w-2
            h-2
            rounded-full
            bg-cyan-300/60
            blur-sm
          "
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}