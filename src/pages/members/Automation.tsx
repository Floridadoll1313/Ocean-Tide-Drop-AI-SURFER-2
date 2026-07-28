import {
  Workflow,
  Bot,
  Clock,
  ArrowRight,
  Activity,
  CheckCircle2,
  Database,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


export default function Automation() {

  const navigate = useNavigate();


  const automations = [
    {
      title: "AI Workflow Builder",
      description:
        "Design intelligent workflows that connect your AI crew with business operations.",
      icon: Workflow,
      status: "Ready",
      path: "/members/workspace",
    },
    {
      title: "Lead Follow-Up Engine",
      description:
        "Automatically organize prospects, score opportunities, and trigger smart follow-ups.",
      icon: Bot,
      status: "Waiting",
      path: "/members/leads",
    },
    {
      title: "Scheduled AI Tasks",
      description:
        "Let your AI systems handle repetitive tasks while your business keeps moving.",
      icon: Clock,
      status: "Online",
      path: "/members/agents",
    },
  ];


  const systems = [
    {
      name: "AI Agents",
      value: "Connected",
      icon: Bot,
    },
    {
      name: "Workflow Engine",
      value: "Active",
      icon: Workflow,
    },
    {
      name: "Data Sync",
      value: "Monitoring",
      icon: Database,
    },
  ];


  return (

    <div className="p-8 text-white">

      <div className="mb-10">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-cyan-300"
            size={42}
          />

          <h1 className="text-4xl font-black">
            🌊 Automation Harbor
          </h1>

        </div>


        <p className="text-cyan-300 mt-3 font-bold">
          AI Workflow Command Deck
        </p>


        <p className="text-white/70 mt-4 max-w-3xl">
          Build automation currents that move your business forward.
          Your AI crew handles workflows, follow-ups, and digital operations.
        </p>

      </div>



      <div className="
        grid
        md:grid-cols-3
        gap-5
        mb-10
      ">

        {systems.map((system)=>{

          const Icon = system.icon;

          return (

            <div
              key={system.name}
              className="
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              p-5
              "
            >

              <Icon
                className="text-cyan-300 mb-4"
                size={32}
              />


              <p className="text-white/60 text-sm">
                {system.name}
              </p>


              <p className="font-black text-xl mt-2">
                {system.value}
              </p>


            </div>

          );

        })}

      </div>





      <div className="
        grid
        md:grid-cols-3
        gap-6
      ">


        {automations.map((item)=>{

          const Icon = item.icon;


          return (

            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              p-6
              shadow-xl
              hover:bg-white/20
              transition
              cursor-pointer
              "
            >

              <Icon
                className="text-cyan-300 mb-5"
                size={40}
              />


              <h2 className="text-xl font-black">
                {item.title}
              </h2>


              <p className="text-white/70 mt-3">
                {item.description}
              </p>



              <div className="
                mt-6
                flex
                justify-between
                items-center
              ">


                <span className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  uppercase
                  tracking-widest
                  text-cyan-300
                ">

                  <CheckCircle2 size={15}/>

                  {item.status}

                </span>



                <ArrowRight
                  className="text-cyan-300"
                />


              </div>


            </div>

          );

        })}


      </div>





      <div className="
        mt-10
        rounded-3xl
        bg-cyan-900/30
        border
        border-cyan-300/20
        p-8
      ">

        <div className="flex items-center gap-3">

          <Activity
            className="text-cyan-300"
          />

          <h2 className="text-2xl font-black">
            Automation Engine Status
          </h2>

        </div>


        <p className="
          text-white/70
          mt-3
        ">
          Your automation systems are standing by.
          Connect more tools and your AI crew will keep the tide moving.
        </p>


      </div>


    </div>

  );
}