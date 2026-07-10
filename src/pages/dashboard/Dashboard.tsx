import {
  Bot,
  Workflow,
  DollarSign,
  Users,
  Sparkles,
  Rocket,
  Waves
} from "lucide-react";


export default function Dashboard() {


  const stats = [
    {
      title: "AI Agents",
      value: "0",
      icon: Bot,
      text: "Create your first AI worker"
    },
    {
      title: "Automations",
      value: "0",
      icon: Workflow,
      text: "Workflows running"
    },
    {
      title: "Leads",
      value: "0",
      icon: Users,
      text: "Prospects captured"
    },
    {
      title: "Revenue",
      value: "$0",
      icon: DollarSign,
      text: "AI powered income"
    },
  ];


  return (

    <div className="p-6 md:p-10">


      {/* Welcome */}

      <div className="
        rounded-3xl
        p-8
        bg-white/5
        border
        border-white/10
        mb-8
      ">

        <div className="flex flex-col md:flex-row justify-between gap-6">


          <div>

            <div className="flex items-center gap-3">

              <Waves className="text-cyan-400 w-10 h-10"/>

              <h1 className="
                text-4xl
                font-black
              ">
                Command Center
              </h1>

            </div>


            <p className="mt-4 text-white/60 max-w-xl">

              Welcome back, Surfer.
              Your AI business fleet is ready
              for launch.

            </p>


          </div>



          <div className="
            rounded-2xl
            bg-cyan-400
            text-black
            px-6
            py-4
            font-black
            flex
            items-center
            gap-2
          ">

            🌊 WAVE MEMBER

          </div>


        </div>


      </div>





      {/* Stats */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">


        {stats.map((stat)=>{

          const Icon = stat.icon;


          return (

            <div
              key={stat.title}
              className="
              rounded-3xl
              bg-white/5
              border
              border-white/10
              p-6
              "
            >


              <Icon
                className="
                text-cyan-400
                mb-5
                "
                size={35}
              />


              <h2 className="
                text-4xl
                font-black
              ">
                {stat.value}
              </h2>


              <h3 className="
                font-bold
                mt-2
              ">
                {stat.title}
              </h3>


              <p className="
                text-sm
                text-white/50
                mt-2
              ">
                {stat.text}
              </p>


            </div>

          );


        })}


      </div>





      {/* AI Launch Area */}

      <div className="
        mt-10
        rounded-3xl
        bg-gradient-to-br
        from-cyan-400/20
        to-blue-500/10
        border
        border-cyan-400/20
        p-8
      ">


        <div className="
          flex
          items-center
          gap-4
        ">

          <Sparkles
            className="text-cyan-400"
            size={40}
          />


          <div>

            <h2 className="
              text-3xl
              font-black
            ">
              Launch Your First AI Worker
            </h2>


            <p className="
              text-white/60
              mt-2
            ">
              Build agents that answer,
              automate, sell, and support.
            </p>

          </div>


        </div>



        <button
          className="
          mt-6
          flex
          items-center
          gap-3
          px-8
          py-4
          rounded-full
          bg-cyan-400
          text-black
          font-black
          "
        >

          <Rocket size={22}/>

          Create AI Agent

        </button>


      </div>



      {/* Usage */}

      <div className="
        mt-8
        rounded-3xl
        bg-white/5
        border
        border-white/10
        p-6
      ">


        <div className="
          flex
          justify-between
          mb-3
        ">

          <span>
            AI Usage
          </span>

          <span className="text-cyan-400">
            0%

          </span>

        </div>


        <div className="
          h-4
          rounded-full
          bg-white/10
        ">

          <div
            className="
            h-full
            w-0
            rounded-full
            bg-cyan-400
            "
          />

        </div>


      </div>



    </div>

  );

}