import {
  Bot,
  Zap,
  Activity,
  ShieldCheck,
} from "lucide-react";


export default function AICrewStatus() {


  const crew = [
    {
      name: "AI Agent Fleet",
      value: "Online",
      icon: Bot,
    },
    {
      name: "Automation Engine",
      value: "Ready",
      icon: Zap,
    },
    {
      name: "System Monitor",
      value: "Active",
      icon: Activity,
    },
    {
      name: "Security Shield",
      value: "Protected",
      icon: ShieldCheck,
    },
  ];



  return (

    <div
      className="
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        p-4
        mb-6
        shadow-xl
      "
    >


      <div
        className="
          flex
          items-center
          gap-3
          mb-4
        "
      >

        <Bot
          size={28}
          className="
            text-cyan-300
          "
        />


        <div>

          <h3
            className="
              text-lg
              font-black
              text-white
            "
          >
            AI Crew Status
          </h3>


          <p
            className="
              text-xs
              text-cyan-300
              uppercase
              tracking-widest
            "
          >
            Live Member Systems
          </p>


        </div>


      </div>





      <div className="space-y-3">


        {crew.map((member)=>{


          const Icon = member.icon;


          return (

            <div
              key={member.name}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                bg-black/20
                border
                border-white/10
                p-3
              "
            >


              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Icon
                  size={20}
                  className="
                    text-cyan-300
                  "
                />


                <span
                  className="
                    text-sm
                    text-white
                  "
                >
                  {member.name}
                </span>


              </div>




              <span
                className="
                  rounded-full
                  bg-green-400/20
                  border
                  border-green-300/30
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-green-300
                "
              >

                {member.value}

              </span>


            </div>

          );


        })}


      </div>


    </div>

  );

}