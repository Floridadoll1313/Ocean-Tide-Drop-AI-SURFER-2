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
