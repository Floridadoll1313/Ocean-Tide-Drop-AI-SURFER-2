import { Link } from "react-router-dom";
import {
  Bot,
  Workflow,
  FolderKanban,
  Users,
  DollarSign,
  ScanSearch,
  Waves
} from "lucide-react";

export default function HeadquartersBridge() {
  const tools = [
    {
      title: "AI Agents",
      description: "Build and manage your AI Surfer agents.",
      icon: Bot,
      link: "/members/agents"
    },
    {
      title: "Automation",
      description: "Create workflows that run while you ride the wave.",
      icon: Workflow,
      link: "/members/automation"
    },
    {
      title: "Workspace",
      description: "Your AI command workspace.",
      icon: FolderKanban,
      link: "/members/workspace"
    },
    {
      title: "Leads",
      description: "Track and nurture business opportunities.",
      icon: Users,
      link: "/members/leads"
    },
    {
      title: "Revenue",
      description: "Monitor your business growth.",
      icon: DollarSign,
      link: "/members/revenue"
    },
    {
      title: "Scanner",
      description: "Analyze and optimize your business.",
      icon: ScanSearch,
      link: "/members/scanner"
    }
  ];

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Waves size={40} />
            <h1 className="text-4xl font-bold">
              Ocean Tide Drop AI Headquarters
            </h1>
          </div>

          <p className="mt-3 text-lg opacity-80">
            Your AI Surfer command deck. Choose your tools and ride the next wave.
          </p>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.title}
                to={tool.link}
                className="rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
              >

                <Icon size={36} />

                <h2 className="mt-4 text-2xl font-semibold">
                  {tool.title}
                </h2>

                <p className="mt-2 opacity-80">
                  {tool.description}
                </p>

              </Link>
            );
          })}

        </div>

      </div>
    </div>
  );
}