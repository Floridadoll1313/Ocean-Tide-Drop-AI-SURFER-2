import {
  Bot,
  Plus,
  Activity,
  MessageSquare,
  Database,
  Sparkles,
  Settings
} from "lucide-react";


export default function Agents() {

  const agents = [
    {
      name: "Customer Support Surfer",
      description: "Handles customer questions and support conversations.",
      status: "Ready",
    },
    {
      name: "Sales Wave AI",
      description: "Helps qualify leads and identify opportunities.",
      status: "Building",
    },
    {
      name: "Content Captain",
      description: "Creates marketing ideas, posts, and campaigns.",
      status: "Coming Soon",
    }
  ];


  return (

    <div className="min-h-screen dashboard-bg p-6 md:p-10">


      <div className="max-w-7xl mx-auto">


        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">


          <div>

            <div className="flex items-center gap-3">

              <Bot className="w-12 h-12 text-cyan-400"/>

              <h1 className="text-4xl font-black">
                AI Agents Harbor
              </h1>

            </div>


            <p className="text-white/60 mt-3 max-w-xl">
              Build, manage, and deploy your AI crew from one command deck.
            </p>


          </div>



          <button className="ai-button px-6 py-3 flex items-center gap-2">

            <Plus className="w-5 h-5"/>

            Create Agent

          </button>


        </div>





        {/* Agent Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">


          <div className="ai-card rounded-2xl p-6">

            <Activity className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Active Agents
            </p>

          </div>



          <div className="ai-card rounded-2xl p-6">

            <MessageSquare className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Conversations
            </p>

          </div>




          <div className="ai-card rounded-2xl p-6">

            <Database className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Knowledge Sources
            </p>

          </div>




          <div className="ai-card rounded-2xl p-6">

            <Sparkles className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              AI
            </h2>

            <p className="text-white/50">
              Intelligence Level
            </p>

          </div>


        </div>






        {/* Agent Fleet */}

        <h2 className="text-3xl font-bold mb-6">
          Your AI Crew
        </h2>



        <div className="grid md:grid-cols-3 gap-6">


          {agents.map((agent)=> (

            <div
              key={agent.name}
              className="ai-card rounded-3xl p-7"
            >


              <div className="
                flex
                justify-between
                items-start
              ">


                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-cyan-400/10
                  flex
                  items-center
                  justify-center
                ">

                  <Bot className="text-cyan-400 w-7 h-7"/>

                </div>



                <span className="
                  text-xs
                  rounded-full
                  bg-white/10
                  px-3
                  py-1
                  text-cyan-300
                ">

                  {agent.status}

                </span>


              </div>




              <h3 className="
                text-xl
                font-bold
                mt-6
              ">

                {agent.name}

              </h3>



              <p className="
                text-white/60
                mt-3
              ">

                {agent.description}

              </p>




              <div className="
                flex
                gap-3
                mt-6
              ">


                <button className="
                  flex-1
                  bg-white/5
                  hover:bg-cyan-400
                  hover:text-slate-950
                  py-3
                  rounded-xl
                  font-bold
                  transition
                ">

                  Open

                </button>



                <button className="
                  px-4
                  bg-white/5
                  rounded-xl
                  hover:bg-white/10
                ">

                  <Settings className="w-5 h-5"/>

                </button>


              </div>



            </div>

          ))}


        </div>




      </div>


    </div>

  );

}
