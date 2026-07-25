import { motion } from "framer-motion";
import {
  Bot,
  BarChart3,
  Zap,
  Users,
  Waves
} from "lucide-react";

import GlassOceanFloor from "./GlassOceanFloor";
import BioluminescentInterior from "./BioluminescentInterior";


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

      {/* Bioluminescent AI atmosphere */}

      <BioluminescentInterior />


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
          via-blue-400/10
          to-transparent
          blur-3xl
        "
        animate={{
          opacity:[0.4,0.8,0.4]
        }}
        transition={{
          duration:8,
          repeat:Infinity,
          ease:"easeInOut"
        }}
      />


      {/* Underwater glass floor */}

      <GlassOceanFloor />


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
                  scale:1.04
                }}

                transition={{
                  duration:0.35
                }}

                className="
                  group
                  rounded-3xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-cyan-300/20
                  p-6
                  shadow-[0_0_40px_rgba(34,211,238,.15)]
                  hover:border-cyan-300/50
                  hover:shadow-[0_0_60px_rgba(34,211,238,.30)]
                  transition-all
                  duration-500
                "
              >

                <Icon
                  size={40}
                  className="
                    text-cyan-300
                    mb-5
                    transition-transform
                    duration-500
                    group-hover:scale-110
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


                <div
                  className="
                    mt-6
                    h-1
                    w-0
                    rounded-full
                    bg-cyan-300
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />


              </motion.div>

            );

          })}

        </div>


      </div>

    </div>

  );
}