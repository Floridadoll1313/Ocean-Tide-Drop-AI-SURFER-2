import { Link } from "react-router-dom";
import {
  Bot,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Users,
  ArrowRight,
  Waves,
  CheckCircle,
  Globe,
  Rocket,
  Brain,
  Workflow,
  BarChart3,
  MessageSquare,
  Star,
} from "lucide-react";


export default function Landing() {


  const services = [
    {
      icon: Bot,
      title: "AI Agents",
      description:
        "Custom AI assistants that help answer questions, manage tasks, and support your business 24/7.",
    },
    {
      icon: Workflow,
      title: "Automation Hub",
      description:
        "Connect your tools and create workflows that save time and remove repetitive work.",
    },
    {
      icon: TrendingUp,
      title: "Growth Command Center",
      description:
        "Track customers, leads, revenue, and opportunities from one AI-powered dashboard.",
    },
  ];


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

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">


      {/* HERO SECTION */}

      <section className="relative min-h-screen flex items-center">


        {/* Ocean Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-950 to-blue-950" />


        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[140px]" />



        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">



          {/* Navigation */}


          <nav className="flex items-center justify-between mb-20">


            <div className="flex items-center gap-3">

              <div className="p-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/20">

                <Waves className="text-cyan-400 w-8 h-8" />

              </div>


              <div>

                <h2 className="font-black text-xl">
                  Ocean Tide Drop
                </h2>

                <p className="text-cyan-400 text-xs tracking-[0.3em]">
                  AI SURFER
                </p>

              </div>

            </div>



            <div className="hidden md:flex items-center gap-8 text-white/70">

              <Link
                to="/pricing"
                className="hover:text-cyan-400 transition"
              >
                Pricing
              </Link>


              <Link
                to="/login"
                className="hover:text-cyan-400 transition"
              >
                Login
              </Link>


            </div>


          </nav>





          {/* Hero Content */}


          <div className="grid lg:grid-cols-2 gap-12 items-center">



            <div>



              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-6">

                <Sparkles className="w-5 h-5 text-cyan-400" />

                <span className="text-cyan-300 text-sm font-semibold">
                  AI Tools For Modern Businesses
                </span>

              </div>





              <h1 className="text-5xl md:text-7xl font-black leading-tight">

                Ride The Next Wave Of

                <span className="block text-cyan-400">
                  AI Business Growth
                </span>

              </h1>





              <p className="mt-6 text-xl text-white/60 max-w-xl leading-relaxed">

                Ocean Tide Drop AI SURFER helps entrepreneurs automate,
                organize, and grow using powerful artificial intelligence
                systems built for the future.

              </p>





              <div className="mt-10 flex flex-wrap gap-4">


                <Link

                  to="/pricing"

                  className="flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition"

                >

                  Start Your AI Journey

                  <ArrowRight />

                </Link>




                <Link

                  to="/login"

                  className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition"

                >

                  Member Login

                </Link>


              </div>


            </div>





            {/* AI SURFER CARD */}


            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">


              <div className="flex items-center gap-3 mb-6">

                <Rocket className="text-cyan-400 w-10 h-10" />

                <h2 className="text-3xl font-black">

                  Your AI Surfboard

                </h2>

              </div>


              <p className="text-white/60 mb-8">

                One powerful workspace connecting your AI assistants,
                automation systems, and business tools.

              </p>



              <div className="space-y-4">


                {benefits.map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <CheckCircle className="text-cyan-400 w-5 h-5" />

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
            {/* STATS SECTION */}

      <section className="relative py-20">

        <div className="max-w-7xl mx-auto px-6">


          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">


            {stats.map((stat) => (

              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center"
              >

                <h3 className="text-4xl font-black text-cyan-400">
                  {stat.number}
                </h3>


                <p className="mt-2 text-white/60">
                  {stat.label}
                </p>


              </div>

            ))}


          </div>


        </div>


      </section>





      {/* SERVICES SECTION */}


      <section className="relative py-24">


        <div className="max-w-7xl mx-auto px-6">


          <div className="text-center max-w-3xl mx-auto mb-14">


            <div className="flex justify-center mb-5">

              <Brain className="text-cyan-400 w-12 h-12" />

            </div>


            <h2 className="text-4xl md:text-5xl font-black">

              Build Your AI Business Crew

            </h2>


            <p className="mt-5 text-white/60 text-lg">

              Powerful AI systems designed to help entrepreneurs
              save time, serve customers, and scale faster.

            </p>


          </div>





          <div className="grid md:grid-cols-3 gap-8">


            {services.map((service) => {


              const Icon = service.icon;


              return (

                <div

                  key={service.title}

                  className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-400/40 transition"

                >


                  <div className="mb-6">

                    <Icon className="w-12 h-12 text-cyan-400" />

                  </div>



                  <h3 className="text-2xl font-black">

                    {service.title}

                  </h3>


                  <p className="mt-4 text-white/60 leading-relaxed">

                    {service.description}

                  </p>



                  <div className="mt-6 flex items-center gap-2 text-cyan-400 font-semibold">


                    Learn More

                    <ArrowRight className="w-4 h-4" />


                  </div>


                </div>


              );


            })}


          </div>


        </div>


      </section>








      {/* WHY OCEAN TIDE DROP */}



      <section className="relative py-24 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">


        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">



          <div>


            <div className="flex items-center gap-3 mb-6">

              <ShieldCheck className="text-cyan-400 w-10 h-10" />

              <span className="text-cyan-400 font-bold tracking-widest">

                WHY CHOOSE AI SURFER

              </span>

            </div>



            <h2 className="text-4xl md:text-5xl font-black">


              Your Business Deserves A Smarter Wave


            </h2>



            <p className="mt-6 text-white/60 text-lg leading-relaxed">


              Most businesses are drowning in repetitive tasks.
              Ocean Tide Drop AI SURFER gives you the tools to
              create systems that work with you.

            </p>



          </div>





          <div className="grid gap-5">



            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">


              <div className="flex gap-4 items-center">


                <Zap className="text-cyan-400" />


                <div>

                  <h3 className="font-bold text-xl">

                    Work Smarter

                  </h3>


                  <p className="text-white/60">

                    Automate tasks and reclaim your time.

                  </p>

                </div>


              </div>


            </div>





            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">


              <div className="flex gap-4 items-center">


                <Users className="text-cyan-400" />


                <div>


                  <h3 className="font-bold text-xl">

                    Grow Faster

                  </h3>


                  <p className="text-white/60">

                    Build stronger customer relationships.

                  </p>


                </div>


              </div>


            </div>





            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">


              <div className="flex gap-4 items-center">


                <BarChart3 className="text-cyan-400" />


                <div>


                  <h3 className="font-bold text-xl">

                    Track Results

                  </h3>


                  <p className="text-white/60">

                    See your business progress clearly.

                  </p>


                </div>


              </div>


            </div>



          </div>


        </div>


      </section>
            {/* AI PLATFORM PREVIEW */}

      <section className="relative py-24">


        <div className="max-w-7xl mx-auto px-6">


          <div className="text-center mb-14">


            <div className="flex justify-center mb-5">

              <Sparkles className="w-12 h-12 text-cyan-400" />

            </div>


            <h2 className="text-4xl md:text-5xl font-black">

              The AI Surfer Platform

            </h2>


            <p className="mt-5 text-white/60 max-w-3xl mx-auto text-lg">

              Everything you need to launch your AI-powered business
              systems from one command center.

            </p>


          </div>






          <div className="grid lg:grid-cols-3 gap-8">



            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">


              <Bot className="text-cyan-400 w-12 h-12 mb-5" />


              <h3 className="text-2xl font-black">

                AI Agent Harbor

              </h3>


              <p className="text-white/60 mt-4">

                Deploy AI assistants that help your customers,
                answer questions, and support your daily operations.

              </p>


            </div>





            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">


              <Workflow className="text-blue-400 w-12 h-12 mb-5" />


              <h3 className="text-2xl font-black">

                Automation Waves

              </h3>


              <p className="text-white/60 mt-4">

                Create smart workflows that connect your favorite
                business tools together.

              </p>


            </div>






            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">


              <Globe className="text-purple-400 w-12 h-12 mb-5" />


              <h3 className="text-2xl font-black">

                Global AI Growth

              </h3>


              <p className="text-white/60 mt-4">

                Build systems ready for customers anywhere,
                anytime.

              </p>


            </div>


          </div>



        </div>


      </section>







      {/* MEMBER AREA PREVIEW */}



      <section className="relative py-24">


        <div className="max-w-7xl mx-auto px-6">


          <div className="rounded-[3rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-10 md:p-16">


            <div className="grid lg:grid-cols-2 gap-12 items-center">



              <div>


                <div className="flex items-center gap-3 mb-5">


                  <Waves className="text-cyan-400 w-10 h-10" />


                  <span className="text-cyan-300 font-bold tracking-widest">

                    MEMBER COMMAND CENTER

                  </span>


                </div>





                <h2 className="text-4xl md:text-5xl font-black">

                  Your AI Operations Deck

                </h2>




                <p className="mt-6 text-white/70 text-lg">


                  Members get access to AI tools,
                  automation systems, project tracking,
                  revenue dashboards, and growth resources.


                </p>





                <Link

                  to="/login"

                  className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-cyan-400 text-black font-bold"

                >

                  Enter Command Center

                  <ArrowRight />

                </Link>



              </div>





              <div className="rounded-3xl bg-black/30 border border-white/10 p-8">


                <div className="space-y-5">



                  <div className="flex justify-between border-b border-white/10 pb-4">

                    <span>
                      AI Agents
                    </span>

                    <span className="text-cyan-400">
                      Ready
                    </span>

                  </div>





                  <div className="flex justify-between border-b border-white/10 pb-4">

                    <span>
                      Automation
                    </span>

                    <span className="text-cyan-400">
                      Connected
                    </span>

                  </div>





                  <div className="flex justify-between border-b border-white/10 pb-4">

                    <span>
                      Revenue Tracking
                    </span>

                    <span className="text-cyan-400">
                      Active
                    </span>

                  </div>





                  <div className="flex justify-between">

                    <span>
                      Business Growth
                    </span>

                    <span className="text-cyan-400">
                      Rising
                    </span>

                  </div>


                </div>


              </div>



            </div>


          </div>


        </div>


      </section>








      {/* TESTIMONIALS */}


      <section className="relative py-24">


        <div className="max-w-7xl mx-auto px-6">


          <div className="text-center mb-12">


            <h2 className="text-4xl font-black">

              Built For Business Builders

            </h2>


            <p className="text-white/60 mt-4">

              AI tools designed around real entrepreneurs.

            </p>


          </div>





          <div className="grid md:grid-cols-3 gap-6">



            {[

              "AI finally makes sense for my business.",
              "Automation saved me hours every week.",
              "The future of business feels accessible."

            ].map((quote) => (


              <div

                key={quote}

                className="rounded-3xl bg-white/5 border border-white/10 p-8"

              >


                <div className="flex mb-4">

                  {[1,2,3,4,5].map((star)=>(
                    <Star
                      key={star}
                      className="w-5 h-5 text-cyan-400 fill-cyan-400"
                    />
                  ))}

                </div>


                <p className="text-white/70">

                  "{quote}"

                </p>


              </div>


            ))}



          </div>


        </div>


      </section>
            {/* PRICING CTA */}


      <section className="relative py-24">


        <div className="max-w-7xl mx-auto px-6">


          <div className="rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 text-center">


            <div className="flex justify-center mb-6">

              <Rocket className="w-14 h-14 text-cyan-400" />

            </div>



            <h2 className="text-4xl md:text-6xl font-black">


              Ready To Catch The AI Wave?


            </h2>




            <p className="mt-6 max-w-2xl mx-auto text-white/60 text-lg">


              Join Ocean Tide Drop AI SURFER and start building
              smarter systems for your business today.


            </p>




            <div className="mt-10 flex flex-wrap justify-center gap-5">



              <Link

                to="/pricing"

                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-cyan-400 text-black font-black hover:bg-cyan-300 transition"

              >

                View AI Plans

                <ArrowRight />

              </Link>





              <Link

                to="/login"

                className="px-10 py-5 rounded-full border border-white/20 hover:bg-white/10 transition font-bold"

              >

                Join Members Area

              </Link>



            </div>



          </div>


        </div>


      </section>







      {/* FOOTER */}


      <footer className="border-t border-white/10 py-12">


        <div className="max-w-7xl mx-auto px-6">


          <div className="grid md:grid-cols-3 gap-10">



            <div>


              <div className="flex items-center gap-3 mb-5">


                <Waves className="text-cyan-400 w-8 h-8" />


                <div>

                  <h3 className="font-black text-xl">

                    Ocean Tide Drop

                  </h3>


                  <p className="text-cyan-400 text-xs tracking-[0.3em]">

                    AI SURFER

                  </p>

                </div>


              </div>




              <p className="text-white/60">

                AI automation tools helping businesses
                ride the next digital wave.

              </p>


            </div>






            <div>


              <h4 className="font-bold mb-5">

                Platform

              </h4>



              <div className="space-y-3 text-white/60">


                <Link
                  to="/pricing"
                  className="block hover:text-cyan-400"
                >
                  Pricing
                </Link>


                <Link
                  to="/login"
                  className="block hover:text-cyan-400"
                >
                  Members
                </Link>


                <a
                  href="#"
                  className="block hover:text-cyan-400"
                >
                  AI Tools
                </a>


              </div>


            </div>






            <div>


              <h4 className="font-bold mb-5">

                Stay Connected

              </h4>


              <p className="text-white/60 mb-4">

                New AI waves and business resources.

              </p>



              <div className="flex gap-3">


                <MessageSquare className="text-cyan-400" />

                <span className="text-white/60">

                  AI Support Ready

                </span>


              </div>


            </div>




          </div>






          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm">


            © {new Date().getFullYear()} Ocean Tide Drop AI SURFER.
            All rights reserved.


          </div>



        </div>


      </footer>



    </div>

  );

}
