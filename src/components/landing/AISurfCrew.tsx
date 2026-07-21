import { motion } from "framer-motion";
import { Bot, Zap, Users, BarChart3 } from "lucide-react";

const crew = [
  {
    icon: Bot,
    title: "AI Agents",
    text: "Your digital crew members that help answer, organize, and support your business."
  },
  {
    icon: Zap,
    title: "Automation Waves",
    text: "Connect your tools and remove repetitive tasks so your business moves faster."
  },
  {
    icon: Users,
    title: "Lead Catcher",
    text: "Capture conversations, nurture prospects, and keep opportunities from drifting away."
  },
  {
    icon: BarChart3,
    title: "Growth Navigator",
    text: "Use intelligent insights to guide better business decisions."
  }
];

export default function AISurfCrew() {
  return (
    <section
      id="crew"
      className="
        relative
        py-32
        px-6
      "
    >

      <div className="max-w-6xl mx-auto">


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="text-cyan-300 uppercase tracking-widest mb-4">
            Your AI Crew
          </p>

          <h2 className="text-4xl md:text-5xl font-black">
            Meet The Team
            <span className="block text-cyan-300">
              Riding The AI Wave
            </span>
          </h2>

          <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg">
            Powerful AI tools working together to help your business
            navigate the digital ocean.
          </p>

        </motion.div>



        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {crew.map((member, index) => {

            const Icon = member.icon;

            return (

              <motion.div
                key={member.title}
                initial={{
                  opacity: 0,
                  y: 60
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * .15
                }}
                viewport={{
                  once: true
                }}
                whileHover={{
                  y: -12,
                  rotate: 1
                }}
                className="
                  rounded-3xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  p-7
                  shadow-2xl
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-cyan-400/20
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                >

                  <Icon
                    size={30}
                    className="text-cyan-300"
                  />

                </div>


                <h3 className="text-xl font-bold mb-3">
                  {member.title}
                </h3>


                <p className="text-slate-300 leading-relaxed">
                  {member.text}
                </p>


              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}
