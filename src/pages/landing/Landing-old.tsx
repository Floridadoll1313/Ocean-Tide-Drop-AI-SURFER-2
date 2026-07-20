import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle,
  Globe,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Workflow,
  Waves,
  Zap,
  BarChart3,
  MessageSquare,
} from "lucide-react";

import heroImage from "../../assets/images/otd-ai-surfer-homepage-concept.png";


export default function Landing() {


  const benefits = [
    "AI assistants built for your business",
    "Automated customer communication",
    "Lead tracking and organization",
    "Business growth analytics",
    "Secure member workspace",
    "Future-ready AI technology",
  ];


  const stats = [
    {
      number: "24/7",
      label: "AI Support",
    },
    {
      number: "∞",
      label: "Automation Possibilities",
    },
    {
      number: "1",
      label: "AI Command Center",
    },
    {
      number: "100%",
      label: "Built For Growth",
    },
  ];


  return (

    <div
      className="
        min-h-screen
        bg-slate-950
        text-white
        overflow-hidden
        bg-cover
        bg-center
        bg-fixed
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(2,8,23,0.78),
            rgba(2,8,23,0.96)
          ),
          url(${heroImage})
        `,
      }}
    >


      {/* HERO */}


      <section className="relative min-h-screen flex items-center">


        <div className="
          absolute
          inset-0
          bg-gradient-to-br
          from-cyan-500/20
          via-transparent
          to-blue-900/40
        " />



        <div className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          py-20
          w-full
        ">



          {/* NAVIGATION */}


          <nav className="
            flex
            items-center
            justify-between
            mb-20
          ">


            <div className="
              flex
              items-center
              gap-3
            ">


              <div className="
                p-3
                rounded-2xl
                bg-cyan-400/10
                border
                border-cyan-400/30
                backdrop-blur-xl
              ">

                <Waves
                  className="
                    w-8
                    h-8
                    text-cyan-400
                  "
                />

              </div>



              <div>

                <h2 className="
                  text-xl
                  font-black
                ">
                  Ocean Tide Drop
                </h2>


                <p className="
                  text-xs
                  tracking-[0.35em]
                  text-cyan-400
                ">
                  AI SURFER
                </p>


              </div>


            </div>





            <div className="
              hidden
              md:flex
              gap-8
              text-white/70
            ">


              <Link
                to="/pricing"
                className="
                  hover:text-cyan-400
                  transition
                "
              >
                Pricing
              </Link>



              <Link
                to="/login"
                className="
                  hover:text-cyan-400
                  transition
                "
              >
                Login
              </Link>


            </div>


          </nav>





          <div className="
            grid
            lg:grid-cols-2
            gap-12
            items-center
          ">




            {/* LEFT SIDE */}


            <div>


              <div className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-cyan-400/10
                border
                border-cyan-400/30
                mb-6
                backdrop-blur-xl
              ">


                <Sparkles
                  className="
                    w-5
                    h-5
                    text-cyan-400
                  "
                />


                <span className="
                  text-cyan-300
                  text-sm
                  font-semibold
                ">
                  
                  AI Tools For Modern Businesses
                </span>


              </div>





              <h1 className="
                text-5xl
                md:text-7xl
                font-black
                leading-tight
              ">

                Ride The Next Wave Of


                <span className="
                  block
                  text-cyan-400
                ">
                  AI Business Growth
                </span>


              </h1>





              <p className="
                mt-6
                text-xl
                text-white/70
                max-w-xl
                leading-relaxed
              ">

                Ocean Tide Drop AI SURFER helps entrepreneurs
                automate, organize, and grow with powerful AI
                systems built for the future.

              </p>





              <div className="
                mt-10
                flex
                flex-wrap
                gap-4
              ">


                <Link
                  to="/pricing"
                  className="
                    flex
                    items-center
                    gap-2
                    px-8
                    py-4
                    rounded-full
                    bg-cyan-400
                    text-black
                    font-bold
                    hover:bg-cyan-300
                    transition
                  "
                >

                  Start Your AI Journey

                  <ArrowRight />

                </Link>




                <Link
                  to="/login"
                  className="
                    px-8
                    py-4
                    rounded-full
                    border
                    border-white/30
                    bg-white/5
                    backdrop-blur-xl
                    hover:bg-white/10
                    transition
                  "
                >

                  Member Login

                </Link>


              </div>


            </div>            {/* AI SURFBOARD CARD */}


            <div
              className="
                rounded-3xl
                border
                border-white/20
                bg-white/10
                backdrop-blur-xl
                p-8
                shadow-2xl
              "
            >

              <div className="
                flex
                items-center
                gap-3
                mb-6
              ">

                <Rocket
                  className="
                    w-10
                    h-10
                    text-cyan-400
                  "
                />

                <h2 className="
                  text-3xl
                  font-black
                ">
                  Your AI Surfboard
                </h2>

              </div>



              <p className="
                text-white/70
                mb-8
              ">

                One powerful workspace connecting your AI
                assistants, automation systems, and business tools.

              </p>




              <div className="
                space-y-4
              ">


                {benefits.map((item) => (

                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <CheckCircle
                      className="
                        w-5
                        h-5
                        text-cyan-400
                      "
                    />


                    <span>
                      {item}
                    </span>


                  </div>

                ))}


              </div>


            </div>


          </div>


        </div>


      </section>





      {/* STATS */}


      <section className="
        relative
        py-20
      ">


        <div className="
          max-w-7xl
          mx-auto
          px-6
        ">


          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
          ">


            {stats.map((stat) => (

              <div
                key={stat.label}
                className="
                  rounded-3xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-xl
                  p-6
                  text-center
                "
              >


                <h3 className="
                  text-4xl
                  font-black
                  text-cyan-400
                ">
                  {stat.number}
                </h3>


                <p className="
                  mt-2
                  text-white/60
                ">
                  {stat.label}
                </p>


              </div>


            ))}


          </div>


        </div>


      </section>







      {/* SERVICES */}



      <section className="
        relative
        py-24
      ">


        <div className="
          max-w-7xl
          mx-auto
          px-6
        ">


          <div className="
            text-center
            max-w-3xl
            mx-auto
            mb-14
          ">


            <Brain
              className="
                mx-auto
                w-12
                h-12
                text-cyan-400
                mb-5
              "
            />


            <h2 className="
              text-4xl
              md:text-5xl
              font-black
            ">
              Build Your AI Business Crew
            </h2>


            <p className="
              mt-5
              text-lg
              text-white/60
            ">

              Powerful AI systems designed to help
              entrepreneurs save time and grow faster.

            </p>


          </div>





          <div className="
            grid
            md:grid-cols-3
            gap-8
          ">




            {[
              {
                icon: Bot,
                title: "AI Agents",
                description:
                "Custom AI assistants that support customers and daily business tasks.",
              },

              {
                icon: Workflow,
                title: "Automation Hub",
                description:
                "Connect tools and create workflows that remove repetitive work.",
              },

              {
                icon: TrendingUp,
                title: "Growth Command Center",
                description:
                "Track leads, customers, revenue, and opportunities.",
              },

            ].map((service) => {


              const Icon = service.icon;


              return (

                <div
                  key={service.title}
                  className="
                    rounded-3xl
                    border
                    border-white/20
                    bg-white/10
                    backdrop-blur-xl
                    p-8
                    hover:border-cyan-400/50
                    transition
                  "
                >


                  <Icon
                    className="
                      w-12
                      h-12
                      text-cyan-400
                      mb-6
                    "
                  />


                  <h3 className="
                    text-2xl
                    font-black
                  ">
                    {service.title}
                  </h3>



                  <p className="
                    mt-4
                    text-white/60
                    leading-relaxed
                  ">
                    {service.description}
                  </p>



                                   <div className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-cyan-400
                    font-bold
                  ">

                    Learn More

                    <ArrowRight
                      className="
                        w-4
                        h-4
                      "
                    />

                  </div>


                </div>

              );


            })}

          </div>

        </div>

      </section>

    </div>
  );
}
