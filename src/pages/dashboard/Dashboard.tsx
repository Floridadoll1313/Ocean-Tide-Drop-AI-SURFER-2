import { Link } from "react-router-dom";
import {
  Bot,
  Terminal,
  Compass,
  CreditCard,
  User,
  CloudSun,
  BookOpen,
  Image,
  ShoppingBag,
  Headphones,
  Sparkles,
  Waves,
  BrainCircuit,
  Ship,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function Dashboard() {
  const tools = [
    {
      title: "AI Tools Hub",
      description: "Access your collection of AI-powered business tools.",
      icon: Bot,
      link: "/tools",
      color: "cyan",
    },
    {
      title: "AI Terminal",
      description: "Your advanced AI workspace and command console.",
      icon: Terminal,
      link: "/terminal",
      color: "blue",
    },
    {
      title: "AI Commander",
      description: "Launch AI missions, workflows, and automation tasks.",
      icon: Ship,
      link: "/commander",
      color: "purple",
    },
    {
      title: "Prompt Studio",
      description: "Create powerful AI prompts and workflows.",
      icon: BrainCircuit,
      link: "/prompting",
      color: "green",
    },
    {
      title: "MCP Center",
      description: "Connect intelligent systems and AI integrations.",
      icon: Zap,
      link: "/mcp",
      color: "orange",
    },
  ];

  const business = [
    {
      title: "Billing Center",
      description: "Manage subscriptions and payments.",
      icon: CreditCard,
      link: "/billing",
    },
    {
      title: "AI Forecast",
      description: "View predictions and business insights.",
      icon: CloudSun,
      link: "/forecast",
    },
    {
      title: "Profile",
      description: "Manage your member account.",
      icon: User,
      link: "/profile",
    },
  ];

  const creator = [
    {
      title: "AI Diary",
      description: "Capture ideas, plans, and creative journeys.",
      icon: BookOpen,
      link: "/diary",
    },
    {
      title: "Gallery",
      description: "Store and manage AI creations.",
      icon: Image,
      link: "/gallery",
    },
    {
      title: "AI Shop",
      description: "Explore products and resources.",
      icon: ShoppingBag,
      link: "/shop",
    },
    {
      title: "Support",
      description: "Get help from the AI Surfer crew.",
      icon: Headphones,
      link: "/support",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-white/10 p-8 mb-10">

          <div className="flex items-center gap-4 mb-4">
            <Waves className="w-12 h-12 text-cyan-400" />

            <div>
              <h1 className="text-4xl md:text-5xl font-black">
                AI Surfer Command Center
              </h1>

              <p className="text-white/60 mt-2">
                Your digital captain's bridge for AI tools, automation, and growth.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">

            <div className="flex items-center gap-2 bg-black/30 px-5 py-3 rounded-full">
              <ShieldCheck className="text-green-400 w-5 h-5" />
              Member Active
            </div>

            <div className="flex items-center gap-2 bg-black/30 px-5 py-3 rounded-full">
              <Sparkles className="text-cyan-400 w-5 h-5" />
              AI Systems Online
            </div>

            <div className="flex items-center gap-2 bg-black/30 px-5 py-3 rounded-full">
              <Compass className="text-blue-400 w-5 h-5" />
              Ocean Navigation Ready
            </div>

          </div>
        </div>


        {/* AI Fleet */}
        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Bot className="text-cyan-400"/>
            AI Fleet
          </h2>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {tools.map((tool) => {

              const Icon = tool.icon;

              return (
                <Link
                  key={tool.title}
                  to={tool.link}
                  className="group bg-slate-900 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/50 hover:-translate-y-1 transition-all"
                >

                  <Icon className="w-10 h-10 text-cyan-400 mb-5 group-hover:scale-110 transition"/>

                  <h3 className="text-xl font-bold mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-white/60 text-sm">
                    {tool.description}
                  </p>

                </Link>
              );
            })}

          </div>

        </section>



        {/* Business */}
        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Ship className="text-blue-400"/>
            Business Deck
          </h2>


          <div className="grid md:grid-cols-3 gap-6">

            {business.map((item)=>{

              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="bg-slate-900 border border-white/10 rounded-3xl p-6 hover:border-blue-400/50 transition-all"
                >

                  <Icon className="w-9 h-9 text-blue-400 mb-4"/>

                  <h3 className="font-bold text-xl">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-sm mt-2">
                    {item.description}
                  </p>

                </Link>
              );

            })}

          </div>

        </section>



        {/* Creator */}
        <section>

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Sparkles className="text-purple-400"/>
            Creator Cove
          </h2>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {creator.map((item)=>{

              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="bg-slate-900 border border-white/10 rounded-3xl p-6 hover:border-purple-400/50 transition-all"
                >

                  <Icon className="w-8 h-8 text-purple-400 mb-4"/>

                  <h3 className="font-bold">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-sm mt-2">
                    {item.description}
                  </p>

                </Link>
              );

            })}

          </div>

        </section>


      </div>

    </div>
  );
}
