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
        "Organize prospects, score opportunities, and trigger smart follow-ups.",
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

    <div className="p-6 text-white overflow-hidden">


      <div className="mb-8">


        <div className="flex items-center gap-3">


          <Sparkles
            className="text-cyan-300"
            size={32}
          />


          <h1 className="
            text-3xl
            font-black
            text-white
          ">
            🌊 Automation Harbor
          </h1>


        </div>


        <p className="
          text-cyan-300
          mt-2
          font-bold
          text-sm
        ">
          AI Workflow Command Deck
        </p>


        <p className="
          text-white/80
          mt-3
          max-w-2xl
          text-sm
        ">
          Build automation currents that move your business forward.
          Your AI crew handles workflows, follow-ups, and digital operations.
        </p>


      </div>





      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
        mb-8
      ">


        {systems.map((system)=>{


          const Icon = system.icon;


          return (

            <div
              key={system.name}
              className="
                rounded-2xl
                bg-black/45
                backdrop-blur-lg
                border
                border-white/20
                p-4
                min-h-[130px]
              "
            >


              <Icon
                className="text-cyan-300 mb-3"
                size={28}
              />


              <p className="
                text-white/60
                text-xs
                uppercase
                tracking-wide
              ">
                {system.name}
              </p>


              <p className="
                text-lg
                font-black
                mt-1
              ">
                {system.value}
              </p>


            </div>

          );


        })}


      </div>








      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
      ">


        {automations.map((item)=>{


          const Icon = item.icon;


          return (

            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="
                rounded-2xl
                bg-black/45
                backdrop-blur-lg
                border
                border-white/20
                p-5
                min-h-[240px]
                cursor-pointer
                hover:bg-black/60
                transition
                flex
                flex-col
              "
            >


              <Icon
                className="text-cyan-300 mb-4"
                size={34}
              />



              <h2 className="
                text-lg
                font-black
              ">
                {item.title}
              </h2>



              <p className="
                text-white/75
                text-sm
                mt-3
                leading-relaxed
                flex-1
              ">
                {item.description}
              </p>




              <div className="
                mt-4
                pt-3
                border-t
                border-white/20
                flex
                justify-between
                items-center
              ">


                <span className="
                  flex
                  items-center
                  gap-2
                  text-cyan-300
                  text-xs
                  font-bold
                  uppercase
                ">

                  <CheckCircle2 size={14}/>

                  {item.status}

                </span>



                <ArrowRight
                  className="text-cyan-300"
                  size={18}
                />


              </div>


            </div>

          );


        })}


      </div>







      <div className="
        mt-8
        rounded-2xl
        bg-cyan-900/40
        border
        border-cyan-300/20
        p-6
      ">


        <div className="
          flex
          items-center
          gap-3
        ">


          <Activity
            className="text-cyan-300"
            size={24}
          />


          <h2 className="
            text-xl
            font-black
          ">
            Automation Engine Status
          </h2>


        </div>


        <p className="
          mt-3
          text-white/75
          text-sm
        ">
          Your automation systems are standing by.
          Connect more tools and your AI crew will keep the tide moving.
        </p>


      </div>


    </div>

  );

}