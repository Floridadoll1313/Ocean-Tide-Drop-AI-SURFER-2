import { motion } from "framer-motion";
import {
  Globe,
  MessageCircle,
  Workflow,
  LineChart
} from "lucide-react";


const features = [
  {
    icon: Globe,
    title: "AI Websites",
    text: "Modern websites designed with AI-powered experiences that help businesses attract and convert customers."
  },
  {
    icon: MessageCircle,
    title: "Smart Conversations",
    text: "AI chat assistants that help answer questions, capture leads, and support customers around the clock."
  },
  {
    icon: Workflow,
    title: "Business Automation",
    text: "Connect your systems and automate repetitive tasks so your team can focus on growth."
  },
  {
    icon: LineChart,
    title: "Growth Intelligence",
    text: "Turn business data into insights that help you make smarter decisions."
  }
];


export default function Features() {
  return (
    <section
      id="solutions"
      className="
        py-32
        px-6
        relative
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
            AI Solutions
          </p>


          <h2 className="
            text-4xl
            md:text-5xl
            font-black
          ">
            Tools That Help Your Business
            <span className="block text-cyan-300">
              Catch Bigger Waves
            </span>
          </h2>


        </motion.div>



        <div
          className="
            grid
            md:grid-cols-2
            gap-8
          "
        >

          {features.map((item,index)=>{

            const Icon = item.icon;

            return (

              <motion.div

                key={item.title}

                initial={{
                  opacity:0,
                  x:index % 2 === 0 ? -40 : 40
                }}

                whileInView={{
                  opacity:1,
                  x:0
                }}

                viewport={{
                  once:true
                }}

                className="
                  flex
                  gap-6
                  rounded-3xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  p-8
                "

              >

                <div
                  className="
                    flex-shrink-0
                    h-14
                    w-14
                    rounded-2xl
                    bg-cyan-400/20
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Icon
                    className="text-cyan-300"
                    size={30}
                  />

                </div>


                <div>

                  <h3 className="
                    text-2xl
                    font-bold
                    mb-3
                  ">
                    {item.title}
                  </h3>


                  <p className="
                    text-slate-300
                    leading-relaxed
                  ">
                    {item.text}
                  </p>

                </div>


              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}
