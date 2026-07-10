import { 
  Bot,
  FolderKanban,
  Github,
  DollarSign,
  Sparkles,
  Workflow,
  Users,
  BarChart3,
  ShieldCheck,
  Settings,
  Rocket,
  Waves
} from "lucide-react";

export default function Dashboard() {
  const tools = [
    {
      title: "AI Agent Harbor",
      description: "Create and manage your custom AI assistants.",
      icon: Bot,
      status: "Ready",
    },
    {
      title: "Automation Hub",
      description: "Connect workflows and let AI handle repetitive tasks.",
      icon: Workflow,
      status: "Coming Online",
    },
    {
      title: "AI Workspace",
      description: "Your creative command deck for projects and ideas.",
      icon: FolderKanban,
      status: "Ready",
    },
    {
      title: "Lead Tracker",
      description: "Monitor prospects, conversations, and opportunities.",
      icon: Users,
      status: "Connected Soon",
    },
    {
      title: "Revenue Dashboard",
      description: "Track your AI-powered business growth.",
      icon: DollarSign,
      status: "Building",
    },
    {
      title: "AI Ocean Scanner",
      description: "Discover automation opportunities inside your business.",
      icon: Sparkles,
      status: "Ready",
    },
  ];

  return (
    <div className="min-h-screen dashboard-bg text-white p-6 md:p-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">

          <div>
            <div className="flex items-center gap-3">
              <Waves className="w-10 h-10 text-cyan-400" />

              <h1 className="text-4xl md:text-5xl font-black">
                AI Surfer Command Center
              </h1>
            </div>

            <p className="mt-3 text-white/60 max-w-xl">
              Welcome aboard. Your AI business tools, automation systems,
              and growth engines are gathering here.
            </p>
          </div>


          <button className="ai-button px-6 py-3 flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Launch Tool
          </button>

        </div>


        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

          <div className="ai-card rounded-2xl p-6">
            <Bot className="text-cyan-400 mb-4" />
            <h3 className="text-3xl font-bold">
              0
            </h3>
            <p className="text-white/50">
              Active AI Agents
            </p>
          </div>


          <div className="ai-card rounded-2xl p-6">
            <Workflow className="text-cyan-400 mb-4" />
            <h3 className="text-3xl font-bold">
              0
            </h3>
            <p className="text-white/50">
              Automations Running
            </p>
          </div>


          <div className="ai-card rounded-2xl p-6">
            <Github className="text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold">
              Waiting
            </h3>
            <p className="text-white/50">
              GitHub Sync
            </p>
          </div>


          <div className="ai-card rounded-2xl p-6">
            <DollarSign className="text-cyan-400 mb-4" />
            <h3 className="text-3xl font-bold">
              $0
            </h3>
            <p className="text-white/50">
              Revenue Tracked
            </p>
          </div>

        </div>



        {/* Tools */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Sparkles className="text-cyan-400"/>
            Your AI Fleet
          </h2>

          <p className="text-white/50 mt-2">
            These are the tools moving from the public site into your members-only ocean.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tools.map((tool) => {

            const Icon = tool.icon;

            return (

              <div
                key={tool.title}
                className="ai-card rounded-3xl p-7"
              >

                <div className="flex justify-between items-start">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-cyan-400"/>
                  </div>


                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-cyan-300">
                    {tool.status}
                  </span>

                </div>


                <h3 className="text-xl font-bold mt-6">
                  {tool.title}
                </h3>


                <p className="text-white/60 mt-3">
                  {tool.description}
                </p>


                <button className="mt-6 w-full py-3 rounded-xl bg-white/5 hover:bg-cyan-400 hover:text-slate-950 transition font-bold">
                  Open Tool
                </button>


              </div>

            );

          })}

        </div>



        {/* Security */}
        <div className="mt-12 glass-panel rounded-3xl p-8 flex flex-col md:flex-row gap-5 items-center">

          <ShieldCheck className="w-12 h-12 text-cyan-400"/>

          <div>
            <h3 className="text-xl font-bold">
              Members Area Protected
            </h3>

            <p className="text-white/60">
              Your AI tools, business data, and workspace stay behind the login wall.
            </p>
          </div>


          <Settings className="md:ml-auto text-white/40"/>

        </div>


      </div>

    </div>
  );
}
