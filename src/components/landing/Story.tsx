import { motion } from "framer-motion";
import { Anchor, Compass, Lighthouse } from "lucide-react";

export default function Story() {
  return (
    <section
      id="story"
      className="relative py-36 px-6"
    >
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="
            rounded-[40px]
            border
            border-white/20
            bg-white/10
            backdrop-blur-2xl
            p-12
            shadow-2xl
          "
        >

          <div className="flex justify-center mb-8">

            <div className="
              h-24
              w-24
              rounded-full
              bg-cyan-400/20
              flex
              items-center
              justify-center
            ">
              <Anchor
                size={42}
                className="text-cyan-300"
              />
            </div>

          </div>

          <p className="text-cyan-300 uppercase tracking-[0.35em] text-center mb-4">
            Our Journey
          </p>

          <h2 className="text-center text-5xl font-black mb-8">
            Every Great Voyage
            <span className="block text-cyan-300">
              Begins With One Wave
            </span>
          </h2>

          <div className="space-y-6 text-lg leading-9 text-slate-200">

            <p>
              Ocean Tide Drop AI SURFER was created to help business owners
              navigate the rapidly changing world of artificial intelligence
              without feeling overwhelmed.
            </p>

            <p>
              Technology should feel empowering, not intimidating. Whether
              you're launching your first AI assistant or automating an entire
              business, our mission is to make the journey simple, exciting,
              and rewarding.
            </p>

            <p>
              Like every great captain, success isn't about avoiding storms.
              It's about having the right crew, the right tools, and the
              confidence to keep moving toward the horizon.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <div className="rounded-3xl bg-white/10 p-6 text-center">
              <Compass className="mx-auto mb-4 text-cyan-300" size={34} />
              <h3 className="font-bold text-xl mb-2">
                Navigate
              </h3>
              <p className="text-slate-300">
                Clear direction with practical AI guidance.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 text-center">
              <Anchor className="mx-auto mb-4 text-cyan-300" size={34} />
              <h3 className="font-bold text-xl mb-2">
                Build
              </h3>
              <p className="text-slate-300">
                Strong AI systems that support real businesses.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 text-center">
              <Lighthouse className="mx-auto mb-4 text-cyan-300" size={34} />
              <h3 className="font-bold text-xl mb-2">
                Grow
              </h3>
              <p className="text-slate-300">
                Stay focused on the next opportunity beyond the horizon.
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
