import { motion } from "framer-motion";
import { Waves, ArrowRight } from "lucide-react";

interface CaptainsLogProps {
  onEnter?: () => void;
}

export default function CaptainsLog({
  onEnter
}: CaptainsLogProps) {

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        bg-slate-950
        text-white
        relative
        overflow-hidden
      "
    >

      {/* Ocean glow */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-cyan-950/40
          via-slate-950
          to-black
        "
      />


      <motion.div
        initial={{
          opacity:0,
          y:40
        }}

        animate={{
          opacity:1,
          y:0
        }}

        transition={{
          duration:1
        }}

        className="
          relative
          z-10
          max-w-xl
          text-center
          rounded-3xl
          bg-white/10
          backdrop-blur-xl
          border
          border-cyan-300/20
          p-10
          shadow-[0_0_60px_rgba(34,211,238,.20)]
        "
      >

        <Waves
          size={55}
          className="
            mx-auto
            mb-6
            text-cyan-300
          "
        />


        <h1
          className="
            text-4xl
            font-black
            mb-5
          "
        >
          🌊 Captain's Log
        </h1>


        <p
          className="
            text-xl
            text-slate-200
            mb-8
          "
        >
          Welcome aboard, Captain.
        </p>


        <p
          className="
            text-slate-300
            leading-relaxed
            mb-8
          "
        >
          Your AI vessel is ready.
          Your mission is to build, automate,
          and grow your business with the power
          of intelligent technology.
        </p>


        <button
          onClick={onEnter}

          className="
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-cyan-400
            px-8
            py-4
            text-slate-950
            font-bold
            hover:scale-105
            transition
          "
        >

          Enter Headquarters

          <ArrowRight size={20}/>

        </button>


      </motion.div>


    </div>
  );
}