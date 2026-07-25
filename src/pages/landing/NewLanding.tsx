import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Zap,
  Users,
  BarChart3,
  Waves
} from "lucide-react";

import homepageConcept from "../../assets/images/ocean_ai_yacht.png";
import cyberWave from "../../assets/images/cyber_surfer_wave_1779220118634.png";

import OceanBackground from "../../components/landing/OceanBackground";
import Navbar from "../../components/landing/Navbar";
import SunriseGlow from "../../components/landing/SunriseGlow";

export default function NewLanding() {

  const aiCrew = [
    {
      icon: Bot,
      title: "AI Agent Crew",
      text: "Smart assistants that help your business answer customers, organize work, and automate daily tasks."
    },
    {
      icon: Zap,
      title: "Automation Waves",
      text: "Connect your systems and remove repetitive work with intelligent automation."
    },
    {
      icon: Users,
      title: "Lead Catcher",
      text: "Capture opportunities, follow up faster, and keep customers moving forward."
    },
    {
      icon: BarChart3,
      title: "Growth Navigator",
      text: "Turn your business information into smarter decisions."
    }
  ];

  const waves = [
    {
      name: "Free Wave",
      text: "Explore AI tools and start your journey."
    },
    {
      name: "Bronze Wave",
      text: "Build your first automation systems."
    },
    {
      name: "Big Kahuna",
      text: "Advanced AI solutions for growing businesses."
    },
    {
      name: "Tsunami Takeover",
      text: "Complete AI transformation for serious growth."
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">

      <OceanBackground />

      <SunriseGlow />

      <Navbar />

      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          overflow-hidden
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(2,12,30,.55),
              rgba(2,12,30,.90)
            ),
            url(${homepageConcept})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

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
          className="
            relative
            z-10
            max-w-6xl
            mx-auto
            px-6
            py-32
          "
        >

          <img
            src="/ocean_tide_logo.png"
            alt="Ocean Tide Drop AI SURFER"
            className="w-44 mb-8"
          />

          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
            "
          >
            Helping Businesses

            <span className="block text-cyan-300">
              Catch The AI Wave
            </span>

          </h1>

          <p
            className="
              mt-8
              max-w-2xl
              text-xl
              text-slate-200
            "
          >
            Ocean Tide Drop AI SURFER builds AI agents,
            automation systems, and intelligent tools that
            help businesses save time, capture leads, and grow.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <a
              href="/wave-check"
              className="
                rounded-full
                bg-cyan-400
                px-8
                py-4
                text-slate-950
                font-bold
                flex
                items-center
                gap-2
                hover:scale-105
                transition
              "
            >
              Get My Free AI Wave Check™

              <ArrowRight size={20} />

            </a>

            <a
              href="#solutions"
              className="
                rounded-full
                border
                border-white/40
                px-8
                py-4
                font-bold
                hover:bg-white/10
                transition
              "
            >
              Explore AI Solutions

            </a>

          </div>

        </motion.div>


        <motion.img
          src={cyberWave}
          alt="AI ocean wave"
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity
          }}
          className="
            absolute
            bottom-0
            right-0
            w-[500px]
            opacity-40
            pointer-events-none
          "
        />

      </section>

      {/* KEEP YOUR AI CREW, MEMBERSHIP, AND CTA SECTIONS BELOW EXACTLY AS THEY ARE */}

    </div>
  );
}