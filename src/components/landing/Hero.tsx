import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        px-6
      "
    >

      <div className="max-w-6xl mx-auto w-full pt-24">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .4 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-300/30
              bg-white/10
              backdrop-blur
              px-5
              py-2
              text-cyan-200
              mb-8
            "
          >
            <Sparkles size={18}/>
            The Future of Business AI
          </motion.div>


          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
            "
          >

            Ride The Future.

            <span className="block text-cyan-300">
              Catch The AI Wave.
            </span>

          </h1>


          <p
            className="
              mt-8
              text-xl
              text-slate-200
              max-w-2xl
              leading-relaxed
            "
          >
            Ocean Tide Drop AI SURFER helps businesses harness
            AI agents, automation, and intelligent systems to
            save time, capture opportunities, and grow.
          </p>


          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-5
            "
          >

            <button
              className="
                group
                rounded-full
                bg-cyan-400
                px-8
                py-4
                text-slate-950
                font-bold
                flex
                items-center
                gap-3
                hover:scale-105
                transition
              "
            >
              Start Surfing Free

              <ArrowRight
                className="
                  group-hover:translate-x-1
                  transition
                "
              />

            </button>


            <button
              className="
                rounded-full
                border
                border-white/30
                bg-white/10
                backdrop-blur
                px-8
                py-4
                font-bold
                hover:bg-white/20
                transition
              "
            >
              Explore AI Solutions
            </button>


          </div>


        </motion.div>


      </div>


      {/* Floating glow */}

      <motion.div
        animate={{
          y: [0, -20, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity
        }}
        className="
          absolute
          right-10
          bottom-32
          hidden
          lg:block
          w-80
          h-80
          rounded-full
          bg-cyan-400/20
          blur-3xl
        "
      />

    </section>
  );
}
