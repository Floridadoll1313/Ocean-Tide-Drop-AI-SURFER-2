import {
  Workflow,
  Plus,
  Zap,
  Clock,
  Plug,
  Activity,
  Settings,
  PlayCircle
} from "lucide-react";


export default function Automation() {


  const workflows = [
    {
      name: "Lead Follow-Up Wave",
      description:
        "Automatically follow up with new leads and organize conversations.",
      status: "Ready",
    },
    {
      name: "Customer Response AI",
      description:
        "AI assistant responds to customer questions instantly.",
      status: "Building",
    },
    {
      name: "Content Automation Current",
      description:
        "Creates and schedules marketing content automatically.",
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

              <Workflow className="w-12 h-12 text-cyan-400"/>

              <h1 className="text-4xl font-black">
                Automation Hub
              </h1>

            </div>


            <p className="text-white/60 mt-3 max-w-xl">

              Connect your business systems and let AI handle repetitive tasks.

            </p>


          </div>




          <button className="ai-button px-6 py-3 flex items-center gap-2">

            <Plus className="w-5 h-5"/>

            Create Workflow

          </button>



        </div>






        {/* Automation Stats */}


        <div className="grid md:grid-cols-4 gap-6 mb-12">



          <div className="ai-card rounded-2xl p-6">

            <Zap className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Active Automations
            </p>

          </div>





          <div className="ai-card rounded-2xl p-6">

            <Activity className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Tasks Completed
            </p>

          </div>






          <div className="ai-card rounded-2xl p-6">

            <Clock className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0h
            </h2>

            <p className="text-white/50">
              Time Saved
            </p>

          </div>






          <div className="ai-card rounded-2xl p-6">

            <Plug className="text-cyan-400 mb-4"/>

            <h2 className="text-3xl font-bold">
              0
            </h2>

            <p className="text-white/50">
              Integrations
            </p>

          </div>



        </div>







        {/* Workflow Fleet */}


        <h2 className="text-3xl font-bold mb-6">

          Your Automation Fleet

        </h2>




        <div className="grid md:grid-cols-3 gap-6">



          {workflows.map((workflow)=>(


            <div
              key={workflow.name}
              className="ai-card rounded-3xl p-7"
            >



              <div className="flex justify-between items-start">


                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-cyan-400/10
                  flex
                  items-center
                  justify-center
                ">

                  <Workflow className="w-7 h-7 text-cyan-400"/>

                </div>




                <span className="
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  bg-white/10
                  text-cyan-300
                ">

                  {workflow.status}

                </span>



              </div>






              <h3 className="
                text-xl
                font-bold
                mt-6
              ">

                {workflow.name}

              </h3>





              <p className="
                text-white/60
                mt-3
              ">

                {workflow.description}

              </p>







              <div className="flex gap-3 mt-6">


                <button className="
                  flex-1
                  bg-white/5
                  hover:bg-cyan-400
                  hover:text-slate-950
                  rounded-xl
                  py-3
                  font-bold
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                ">


                  <PlayCircle className="w-5 h-5"/>

                  Run


                </button>




                <button className="
                  px-4
                  rounded-xl
                  bg-white/5
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
