import { Link } from "react-router-dom";
import {
  Bot,
  Workflow,
  FolderKanban,
  Users,
  DollarSign,
  ScanSearch,
  Waves,
  LayoutDashboard
} from "lucide-react";


export default function HeadquartersBridge() {


  const tools = [

    {
      title: "AI Agents",
      description:
        "Build and manage your AI Surfer agents.",
      icon: Bot,
      link: "/members/agents"
    },

    {
      title: "Automation",
      description:
        "Create workflows that run while you ride the wave.",
      icon: Workflow,
      link: "/members/automation"
    },

    {
      title: "Workspace",
      description:
        "Your AI command workspace.",
      icon: FolderKanban,
      link: "/members/workspace"
    },

    {
      title: "Leads",
      description:
        "Track and nurture business opportunities.",
      icon: Users,
      link: "/members/leads"
    },

    {
      title: "Revenue",
      description:
        "Monitor your business growth.",
      icon: DollarSign,
      link: "/members/revenue"
    },

    {
      title: "Scanner",
      description:
        "Analyze and optimize your business.",
      icon: ScanSearch,
      link: "/members/scanner"
    }

  ];



  return (

    <div
      className="
        min-h-screen
        p-8
        text-white
      "
    >

      <div className="max-w-6xl mx-auto">


        <div className="mb-10">


          <div className="flex items-center gap-3">

            <Waves
              size={45}
              className="text-cyan-300"
            />


            <h1
              className="
                text-4xl
                font-black
              "
            >
              Ocean Tide Drop AI Headquarters
            </h1>


          </div>



          <p
            className="
              mt-4
              text-lg
              text-white/70
              max-w-2xl
            "
          >
            Welcome aboard the AI Surfer command deck.
            Your business tools, automation systems, and
            growth engines are ready.
          </p>


          <Link

            to="/members/dashboard"

            className="
              inline-flex
              items-center
              gap-2
              mt-6
              rounded-full
              bg-cyan-400
              px-6
              py-3
              text-slate-950
              font-bold
              hover:scale-105
              transition
            "

          >

            <LayoutDashboard size={20}/>

            Open Command Center

          </Link>


        </div>





        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >


          {tools.map((tool)=>{

            const Icon = tool.icon;


            return (

              <Link

                key={tool.title}

                to={tool.link}

                className="
                  rounded-3xl
                  p-6
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  hover:bg-white/20
                  hover:border-cyan-300/50
                  transition
                "

              >

                <Icon
                  size={38}
                  className="text-cyan-300"
                />


                <h2
                  className="
                    mt-5
                    text-2xl
                    font-bold
                  "
                >

                  {tool.title}

                </h2>


                <p
                  className="
                    mt-3
                    text-white/70
                  "
                >

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