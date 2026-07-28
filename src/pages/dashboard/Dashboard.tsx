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

  const stats = [
    {
      title: "Projects",
      value: "0",
      label: "Active Projects",
      icon: FolderKanban,
    },
    {
      title: "AI Agents",
      value: "0",
      label: "Your AI Crew",
      icon: Bot,
    },
    {
      title: "GitHub",
      value: "Waiting Sync",
      label: "Repository Connection",
      icon: Github,
    },
    {
      title: "Revenue",
      value: "$0",
      label: "Growth Tracking",
      icon: TrendingUp,
    },
  ];


  return (

    <div className="
      min-h-screen
      text-white
      bg-transparent
      relative
      overflow-hidden
    ">

      <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-cyan-950/20
        via-transparent
        to-blue-950/20
      " />


      <div className="
        relative
        z-10
        p-6
        md:p-10
      ">


        <div className="mb-10">

          <div className="
            flex
            items-center
            gap-4
          ">

            <Waves className="
              w-12
              h-12
              text-cyan-300
            "/>


            <div>

              <h1 className="
                text-4xl
                md:text-5xl
                font-black
              ">
                AI Surfer Command Center
              </h1>


              <p className="
                text-cyan-300
                font-bold
              ">
                Member Headquarters
              </p>


              <p className="
                text-white/70
              ">
                Your AI workspace is ready.
              </p>


            </div>

          </div>


          <p className="
            mt-5
            text-lg
            text-white/80
            max-w-3xl
          ">
            Welcome back, Wave Rider. Your AI crew, automation systems,
            projects, and business growth tools are ready for the next wave.
          </p>


        </div>



        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-10
        ">


          {stats.map((card)=>{

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="
                  rounded-3xl
                  p-6
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                "
              >

                <Icon className="
                  w-8
                  h-8
                  text-cyan-300
                  mb-4
                "/>


                <h2 className="
                  text-xl
                  font-bold
                ">
                  {card.title}
                </h2>


                <p className="
                  text-3xl
                  font-black
                  mt-3
                ">
                  {card.value}
                </p>


                <p className="
                  text-white/60
                ">
                  {card.label}
                </p>


              </div>

            )

          })}


        </div>



        <div className="
          grid
          lg:grid-cols-3
          gap-6
          mb-10
        ">


          <div className="
            lg:col-span-2
            rounded-3xl
            p-8
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
          ">


            <div className="
              flex
              gap-3
              items-center
              mb-6
            ">

              <Sparkles className="
                text-cyan-300
              "/>


              <h2 className="
                text-2xl
                font-black
              ">
                Your AI Ocean Tools
              </h2>


            </div>


            <div className="
              grid
              md:grid-cols-2
              gap-5
            ">


              <div className="
                rounded-2xl
                p-5
                bg-black/20
              ">

                <Zap className="
                  text-cyan-300
                "/>


                <h3 className="
                  font-bold
                  text-lg
                ">
                  Automation Hub
                </h3>


                <p className="
                  text-white/60
                  text-sm
                ">
                  Connect workflows and let AI handle repetitive tasks.
                </p>


                <ArrowRight className="
                  mt-3
                  text-cyan-300
                "/>

              </div>



              <div className="
                rounded-2xl
                p-5
                bg-black/20
              ">


                <Users className="
                  text-blue-300
                "/>


                <h3 className="
                  font-bold
                  text-lg
                ">
                  Lead Navigator
                </h3>


                <p className="
                  text-white/60
                  text-sm
                ">
                  Track prospects and grow your customer network.
                </p>


                <ArrowRight className="
                  mt-3
                  text-blue-300
                "/>


              </div>


            </div>


          </div>



          <div className="
            rounded-3xl
            p-8
            bg-cyan-900/30
            border
            border-cyan-300/20
          ">


            <ShieldCheck className="
              w-10
              h-10
              text-cyan-300
            "/>


            <h2 className="
              text-2xl
              font-black
              mt-5
            ">
              Member Security
            </h2>


            <p className="
              mt-3
              text-white/70
            ">
              Authentication, subscriptions, and member tools connect here.
            </p>


            <div className="
              mt-6
              bg-black/20
              rounded-xl
              p-4
            ">

              <p className="
                text-cyan-300
                text-xs
              ">
                ACCOUNT STATUS
              </p>


              <p className="
                font-bold
                mt-2
              ">
                Active Member 🌊
              </p>


            </div>


          </div>


        </div>



        <div className="
          rounded-3xl
          p-8
          bg-white/10
          border
          border-white/20
        ">


          <h2 className="
            text-3xl
            font-black
          ">
            🌊 Ready to Ride the AI Wave?
          </h2>


          <p className="
            text-white/70
            mt-3
          ">
            Your command center is the launch point for AI assistants,
            automations, revenue tools, and your digital growth journey.
          </p>


        </div>


      </div>

    </div>

  );
}