import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, Users, BarChart3, Waves } from "lucide-react";

import homepageConcept from "../../assets/images/otd-ai-surfer-homepage-concept.png";
import cyberWave from "../../assets/images/cyber_surfer_wave_1779220118634.png";

export default function NewLanding() {
  const aiCrew = [
    {
      icon: Bot,
      title: "AI Agent Crew",
      text: "Smart assistants that help your business answer, organize, and automate."
    },
    {
      icon: Zap,
      title: "Automation Waves",
      text: "Connect your workflow and remove repetitive tasks."
    },
    {
      icon: Users,
      title: "Lead Catcher",
      text: "Capture opportunities and keep your customers moving forward."
    },
    {
      icon: BarChart3,
      title: "Growth Navigator",
      text: "Turn business information into smarter decisions."
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
      text: "Complete AI transformation."
    }
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(
            rgba(2,12,30,.55),
            rgba(2,12,30,.85)
          ), url(${homepageConcept})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-6 py-24"
        >

          <img
            src="/ocean_tide_logo.png"
            alt="Ocean Tide Drop AI SURFER"
            className="w-40 mb-8"
          />

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Catch The
            <span className="block text-cyan-300">
              AI Wave
            </span>
            For Your Business
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-slate-200">
            Ocean Tide Drop AI SURFER helps businesses ride the next
            technology wave with AI agents, automation, and intelligent tools.
          </p>


          <div className="mt-10 flex flex-wrap gap-5">

            <button className="rounded-full bg-cyan-400 px-8 py-4 text-slate-950 font-bold flex items-center gap-2 hover:scale-105 transition">
              Start Surfing Free
              <ArrowRight size={20}/>
            </button>


            <button className="rounded-full border border-white/40 px-8 py-4 font-bold hover:bg-white/10 transition">
              Explore AI Solutions
            </button>

          </div>

        </motion.div>


        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity
          }}
          className="absolute bottom-0 right-0 opacity-40"
        >
          <img
            src={cyberWave}
            alt="AI ocean wave"
            className="w-[500px]"
          />
        </motion.div>


      </section>


      {/* AI CREW */}
      <section className="py-24 px-6 bg-slate-900">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">

            <Waves className="mx-auto mb-4 text-cyan-300" size={45}/>

            <h2 className="text-4xl font-bold">
              Meet Your AI Surf Crew
            </h2>

            <p className="mt-4 text-slate-300">
              Powerful AI systems designed to help your business move faster.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {aiCrew.map((item) => {

              const Icon = item.icon;

              return (
                <motion.div
                  whileHover={{ y:-8 }}
                  key={item.title}
                  className="rounded-3xl bg-white/10 backdrop-blur p-6 border border-white/10"
                >

                  <Icon className="text-cyan-300 mb-5"/>

                  <h3 className="text-xl font-bold mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-300">
                    {item.text}
                  </p>

                </motion.div>
              );

            })}

          </div>

        </div>

      </section>



      {/* MEMBERSHIP WAVES */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-900 to-cyan-950">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-4xl font-bold mb-14">
            Choose Your Wave
          </h2>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {waves.map((wave)=>(
              <div
                key={wave.name}
                className="rounded-3xl bg-white/10 p-7 border border-white/10"
              >

                <h3 className="text-2xl font-bold text-cyan-300">
                  {wave.name}
                </h3>

                <p className="mt-4 text-slate-200">
                  {wave.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>



      {/* FINAL CTA */}
      <section className="py-24 text-center px-6">

        <h2 className="text-5xl font-bold">
          Ready To Ride The Next Wave?
        </h2>

        <p className="mt-6 text-xl text-slate-300">
          Join Ocean Tide Drop AI SURFER and bring AI power to your business.
        </p>


        <button className="mt-10 rounded-full bg-cyan-400 px-10 py-5 text-slate-950 font-bold">
          Launch My AI Journey
        </button>

      </section>


    </main>
  );
}
