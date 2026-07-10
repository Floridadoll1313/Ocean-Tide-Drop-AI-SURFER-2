import {
  Bot,
  FolderKanban,
  Github,
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  Waves,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Ocean Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-slate-950 to-blue-950/50" />

      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[140px]" />


      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">


        {/* Header */}
        <div className="mb-10">

          <div className="flex items-center gap-3 mb-4">
            <Waves className="w-10 h-10 text-cyan-400" />

            <div>
              <h1 className="text-4xl md:text-5xl font-black">
                AI Surfer Command Center
              </h1>

              <p className="text-cyan-400 font-semibold tracking-widest text-sm">
                MEMBER DASHBOARD
              </p>
            </div>
          </div>


          <p className="text-white/60 max-w-2xl">
            Welcome aboard. Your AI crew, automation systems, projects, and
            business growth tools are ready to ride the next wave.
          </p>

        </div>



        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <FolderKanban className="text-cyan-400 w-8 h-8 mb-4" />

            <h2 className="text-xl font-bold">
              Projects
            </h2>

            <p className="text-3xl font-black mt-3">
              0
            </p>

            <p className="text-white/50 text-sm">
              Active Projects
            </p>

          </div>



          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Bot className="text-blue-400 w-8 h-8 mb-4" />

            <h2 className="text-xl font-bold">
              AI Agents
            </h2>

            <p className="text-3xl font-black mt-3">
              0
            </p>

            <p className="text-white/50 text-sm">
              Your AI Crew
            </p>

          </div>




          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <Github className="text-purple-400 w-8 h-8 mb-4" />

            <h2 className="text-xl font-bold">
              GitHub
            </h2>

            <p className="text-lg font-bold mt-4 text-yellow-300">
              Waiting Sync
            </p>

            <p className="text-white/50 text-sm">
              Repository Connection
            </p>

          </div>




          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

            <TrendingUp className="text-green-400 w-8 h-8 mb-4" />

            <h2 className="text-xl font-bold">
              Revenue
            </h2>

            <p className="text-3xl font-black mt-3">
              $0
            </p>

            <p className="text-white/50 text-sm">
              Growth Tracking
            </p>

          </div>


        </div>





        {/* AI Tools Section */}

        <div className="grid lg:grid-cols-3 gap-6 mb-10">


          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">


            <div className="flex items-center gap-3 mb-6">

              <Sparkles className="text-cyan-400 w-7 h-7"/>

              <h2 className="text-2xl font-black">
                Your AI Ocean Tools
              </h2>

            </div>


            <div className="grid md:grid-cols-2 gap-5">


              <button className="text-left bg-slate-900/70 hover:bg-cyan-500/10 border border-white/10 rounded-2xl p-5 transition">

                <Zap className="text-cyan-400 mb-3"/>

                <h3 className="font-bold text-lg">
                  Automation Hub
                </h3>

                <p className="text-white/50 text-sm mt-2">
                  Connect workflows and let AI handle repetitive tasks.
                </p>

                <ArrowRight className="mt-4 text-cyan-400"/>

              </button>





              <button className="text-left bg-slate-900/70 hover:bg-blue-500/10 border border-white/10 rounded-2xl p-5 transition">

                <Users className="text-blue-400 mb-3"/>

                <h3 className="font-bold text-lg">
                  Lead Navigator
                </h3>

                <p className="text-white/50 text-sm mt-2">
                  Track prospects and grow your customer current.
                </p>

                <ArrowRight className="mt-4 text-blue-400"/>

              </button>



            </div>


          </div>





          {/* Security Panel */}

          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-400/20 rounded-3xl p-8">


            <ShieldCheck className="w-10 h-10 text-cyan-300 mb-5"/>


            <h2 className="text-2xl font-black mb-3">
              Member Security
            </h2>


            <p className="text-white/60 text-sm leading-relaxed">

              Your AI workspace is protected. Authentication,
              subscriptions, and member tools connect here.

            </p>


            <div className="mt-6 bg-black/20 rounded-xl p-4">

              <p className="text-xs uppercase tracking-widest text-cyan-300">
                Account Status
              </p>

              <p className="font-bold mt-2">
                Active Member
              </p>

            </div>


          </div>



        </div>




        {/* Bottom Banner */}

        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8">

          <h2 className="text-3xl font-black mb-3">
            🌊 Ready to Ride the AI Wave?
          </h2>

          <p className="text-white/60 max-w-2xl">
            Your command center is the launch point for AI assistants,
            automations, revenue tools, and your digital growth journey.
          </p>

        </div>


      </div>

    </div>
  );
}
