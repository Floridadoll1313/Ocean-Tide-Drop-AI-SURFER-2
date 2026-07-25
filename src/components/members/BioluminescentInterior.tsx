import { motion } from "framer-motion";

export default function BioluminescentInterior() {

  const particles = Array.from({ length: 35 });

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
            bg-cyan-300/70
            blur-sm
          "

          style={{
            left:`${Math.random() * 100}%`,
            top:`${Math.random() * 100}%`
          }}

          animate={{
            y:[0,-60,0],
            opacity:[0.2,1,0.2],
            scale:[1,1.6,1]
          }}

          transition={{
            duration:5 + Math.random() * 6,
            repeat:Infinity,
            delay:Math.random() * 5,
            ease:"easeInOut"
          }}

        />

      ))}


    </div>

  );
}