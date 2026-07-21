import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        px-6
        pt-32
      "
    >

      <div className="max-w-6xl mx-auto w-full">

        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          className="max-w-3xl"
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-300/30
              bg-white/10
              backdrop-blur-xl
              px-5
              py-2
              text-cyan-200
              mb-8
            "
          >
            <Sparkles size={18} />
            AI Solutions For Growing Businesses
          </div>


          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              text-white
            "
          >

            Helping Small Businesses

            <span className="block text-cyan-300">
              Catch The AI Wave
            </span>

          </h1>


          <p
            className="
              mt-8
              text-xl
              text-slate-200
              leading-relaxed
              max-w-2xl
            "
          >
            Ocean Tide Drop AI SURFER creates AI agents,
            automation systems, and intelligent tools that
            help businesses save time, capture leads, and grow.
          </p>


          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-5
            "
          >

            <a
              href="#wave-check"
              className="
                flex
                items-center
                gap-3
                rounded-full
                bg-cyan-400
                px-8
                py-4
                font-bold
                text-slate-950
                hover:scale-105
                transition
              "
            >

              Get My Free AI Wave Check™

              <ArrowRight size={20}/>

            </a>


            <a
              href="#solutions"
              className="
                rounded-full
                border
                border-white/30
                bg-white/10
                backdrop-blur-xl
                px-8
                py-4
                font-bold
                text-white
                hover:bg-white/20
                transition
              "
            >

              Explore AI Solutions

            </a>

          </div>


        </motion.div>

      </div>

    </section>
  );
}