import { motion } from "framer-motion";
import { Waves, Crown, Zap, Rocket } from "lucide-react";

const plans = [
  {
    icon: Waves,
    name: "Free Wave",
    description: "Start exploring AI tools and discover what's possible.",
    features: [
      "AI learning resources",
      "Starter tools",
      "Community access"
    ]
  },
  {
    icon: Zap,
    name: "Bronze Wave",
    description: "Build your first AI-powered business systems.",
    features: [
      "Automation tools",
      "AI assistants",
      "Business templates"
    ]
  },
  {
    icon: Crown,
    name: "Big Kahuna",
    description: "Advanced AI solutions for businesses ready to grow.",
    features: [
      "Premium AI agents",
      "Advanced workflows",
      "Growth systems"
    ]
  },
  {
    icon: Rocket,
    name: "Tsunami Takeover",
    description: "Full AI transformation for ambitious businesses.",
    features: [
      "Custom AI solutions",
      "Complete automation",
      "Priority support"
    ]
  }
];


export default function Membership() {
  return (
    <section
      id="membership"
      className="
        py-32
        px-6
      "
    >

      <div className="max-w-6xl mx-auto">


        <motion.div
          initial={{
            opacity:0,
            y:40
          }}
          whileInView={{
            opacity:1,
            y:0
          }}
          viewport={{
            once:true
          }}
          className="text-center mb-16"
        >

          <p className="text-cyan-300 uppercase tracking-[0.3em] mb-4">
            Choose Your Wave
          </p>


          <h2 className="
            text-4xl
            md:text-5xl
            font-black
          ">
            Select Your
            <span className="block text-cyan-300">
              AI Journey
            </span>
          </h2>

        </motion.div>



        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {plans.map((plan,index)=>{

            const Icon = plan.icon;

            return (

              <motion.div

                key={plan.name}

                initial={{
                  opacity:0,
                  y:50
                }}

                whileInView={{
                  opacity:1,
                  y:0
                }}

                transition={{
                  delay:index * .15
                }}

                viewport={{
                  once:true
                }}

                whileHover={{
                  y:-10
                }}

                className="
                  rounded-3xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  p-7
                "
              >

                <div
                  className="
                    h-14
                    w-14
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


                <h3 className="
                  text-2xl
                  font-bold
                  mb-3
                ">
                  {plan.name}
                </h3>


                <p className="
                  text-slate-300
                  mb-6
                ">
                  {plan.description}
                </p>


                <ul className="space-y-3">

                  {plan.features.map(feature => (

                    <li
                      key={feature}
                      className="text-sm text-slate-200"
                    >
                      🌊 {feature}
                    </li>

                  ))}

                </ul>


              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}
