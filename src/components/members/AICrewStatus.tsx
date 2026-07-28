import {
  Bot,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";


export default function AICrewStatus() {

  const crew = [
    {
      title: "AI Agents",
      value: "Online",
      description: "Your AI crew is standing by",
      icon: Bot,
    },
    {
      title: "Automations",
      value: "Ready",
      description: "Workflow engines available",
      icon: Zap,
    },
    {
      title: "Lead Navigator",
      value: "Scanning",
      description: "Business opportunities tracked",
      icon: Users,
    },
    {
      title: "Revenue Pulse",
      value: "Active",
      description: "Growth systems monitoring",
      icon: TrendingUp,
    },
  ];


  return (

    <div
      className="
        rounded-2xl
        bg-white/10
        border
        border-white/20
        backdrop-blur-xl
        p-4
        mb-6
      "
    >

      <h3
        className="
          text-xs
          uppercase
          tracking-widest
          text-cyan-300
          mb-4
          font-bold
        "
      >
        AI Crew Status
      </h3>



      <div className="space-y-3">


        {crew.map((item) => {

          const Icon = item.icon;


          return (

            <div
              key={item.title}
              className="
                rounded-xl
                bg-black/20
                p-3
                border
                border-white/10
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
                  size={22}
                  className="text-cyan-300"
                />


                <div>

                  <p
                    className="
                      font-bold
                      text-sm
                    "
                  >
                    {item.title}
                  </p>


                  <p
                    className="
                      text-cyan-300
                      text-xs
                    "
                  >
                    {item.value}
                  </p>


                </div>


              </div>


              <p
                className="
                  text-white/60
                  text-xs
                  mt-2
                "
              >
                {item.description}
              </p>


            </div>

          );

        })}


      </div>


    </div>

  );

}
