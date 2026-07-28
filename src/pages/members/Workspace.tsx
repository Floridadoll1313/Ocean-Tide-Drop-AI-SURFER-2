import {
  FolderKanban,
  Plus,
  Workflow,
  Bot,
  Sparkles,
  PlayCircle,
  Settings,
} from "lucide-react";


export default function Workspace() {


  const workflows = [
    {
      title: "Customer Support AI",
      description:
        "AI agent workflow for answering customer questions and routing requests.",
      status: "Active",
      icon: Bot,
    },
    {
      title: "Lead Capture Flow",
      description:
        "Collect leads, organize contacts, and prepare follow-up actions.",
      status: "Building",
      icon: Workflow,
    },
    {
      title: "Business Growth System",
      description:
        "Connect AI tools that help automate daily business operations.",
      status: "Ready",
      icon: Sparkles,
    },
  ];


  return (

    <div className="p-8 text-white">


      <div className="mb-10">

        <div className="flex items-center gap-3">

          <FolderKanban
            className="text-cyan-300"
            size={42}
          />

          <h1 className="text-4xl font-black">
            🌊 Workspace Harbor
          </h1>

        </div>


        <p className="text-cyan-300 mt-3 font-bold">
          AI Workflow Creation Deck
        </p>


        <p className="text-white/70 mt-4 max-w-3xl">
          Build, organize, and launch your AI-powered business systems
          from one command center.
        </p>

      </div>





      <button
        className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-cyan-400/30
        border
        border-cyan-300/40
        px-6
        py-4
        font-black
        hover:bg-cyan-400/50
        transition
        "
      >

        <Plus size={22}/>

        Create New Workflow

      </button>





      <div className="
        grid
        md:grid-cols-3
        gap-6
        mt-10
      ">


        {workflows.map((workflow)=>{

          const Icon = workflow.icon;


          return (

            <div
              key={workflow.title}
              className="
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              p-6
              shadow-xl
              "
            >

              <Icon
                className="text-cyan-300 mb-5"
                size={38}
              />


              <h2 className="text-xl font-black">
                {workflow.title}
              </h2>


              <p className="text-white/70 mt-3">
                {workflow.description}
              </p>


              <div className="
                mt-6
                flex
                justify-between
                items-center
              ">


                <span className="
                  text-xs
                  uppercase
                  tracking-widest
                  text-cyan-300
                ">
                  {workflow.status}
                </span>


                <div className="flex gap-3">

                  <PlayCircle
                    className="text-cyan-300"
                    size={22}
                  />

                  <Settings
                    className="text-white/60"
                    size={22}
                  />

                </div>


              </div>


            </div>

          );

        })}


      </div>





      <div className="
        mt-10
        rounded-3xl
        bg-black/20
        border
        border-white/20
        p-8
      ">


        <h2 className="text-2xl font-black">
          AI Builder Console
        </h2>


        <p className="text-white/70 mt-3">
          Your workflow studio is ready. Connect agents,
          automate tasks, and launch your AI crew.
        </p>


      </div>


    </div>

  );

}