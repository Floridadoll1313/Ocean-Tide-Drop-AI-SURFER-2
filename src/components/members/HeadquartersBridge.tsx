import { motion } from "framer-motion";
import {
  Bot,
  BarChart3,
  Zap,
  Users,
  Waves
} from "lucide-react";

const stations = [
  {
    icon: Bot,
    title: "AI Command Center",
    text: "Launch your AI agents and manage your digital crew."
  },
  {
    icon: Zap,
    title: "Automation Engine",
    text: "Build systems that work while you focus on growth."
  },
  {
    icon: Users,
    title: "Lead Navigator",
    text: "Track customers, opportunities, and conversations."
  },
  {
    icon: BarChart3,
    title: "Growth Dashboard",
    text: "View your business intelligence and progress."
  }
];

export default function HeadquartersBridge() {
  return (
    <div
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-slate-950
        text-white
        px-6
        py-12
      "
    >

      {/* Living ocean ceiling glow */}

      <motion.div
        className="
          absolute
          top-0
          left-0
          right-0
          h-72
          bg-gradient-to-b
          from-cyan-400/20
          to-transparent
          blur-3xl
        "
        animate={{
          opacity:[0.4,0.8,0.4]
        }}
        transition={{
          duration:8,
          repeat:Infinity
        }}
      />


      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
        "
      >

        <div
          className="
            mb-12
            flex
            items-center
            gap-4
          "
        >

          <Waves
            size={50}
            className="text-cyan-300"
          />

          <div>
            <h1
              className="
                text-4xl
                font-black
              "
            >
              Ocean Tide Headquarters
            </h1>

            <p className="text-slate-300">
              Your AI command bridge is online.
            </p>
          </div>

        </div>



        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {stations.map((station)=>{

            const Icon = station.icon;

            return (

              <motion.div

                key={station.title}

                whileHover={{
                  y:-10,
                  scale:1.03
                }}

                className="
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-cyan-300/20
                  p-6
                  shadow-[0_0_40px_rgba(34,211,238,.15)]
                "
              >

                <Icon
                  size={40}
                  className="
                    text-cyan-300
                    mb-5
                  "
                />


                <h2
                  className="
                    text-xl
                    font-bold
                    mb-3
                  "
                >
                  {station.title}
                </h2>


                <p className="text-slate-300">
                  {station.text}
                </p>


              </motion.div>

            );

          })}

        </div>


      </div>

    </div>
  );
}