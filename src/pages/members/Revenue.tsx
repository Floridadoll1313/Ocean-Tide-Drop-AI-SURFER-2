import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  BarChart3,
  ArrowUpRight,
  Settings,
  Sparkles
} from "lucide-react";


export default function Revenue() {


  const metrics = [
    {
      title: "Monthly Revenue",
      value: "$0.00",
      icon: DollarSign,
    },
    {
      title: "Active Members",
      value: "0",
      icon: Users,
    },
    {
      title: "Subscriptions",
      value: "0",
      icon: CreditCard,
    },
    {
      title: "Growth Rate",
      value: "0%",
      icon: TrendingUp,
    }
  ];



  const revenueStreams = [
    {
      name: "Membership Tiers",
      description:
        "Track Free, Bronze, Wave, Tsunami, and Enterprise members.",
      status: "Ready",
    },
    {
      name: "AI Services",
      description:
        "Monitor revenue from AI agents, automation, and consulting.",
      status: "Building",
    },
    {
      name: "Digital Products",
      description:
        "Track ebooks, templates, courses, and downloads.",
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

              <DollarSign className="w-12 h-12 text-cyan-400"/>

              <h1 className="text-4xl font-black">
                Revenue Dashboard
              </h1>

            </div>


            <p className="text-white/60 mt-3 max-w-xl">

              Navigate your business growth with AI-powered financial insights.

            </p>


          </div>




          <button className="ai-button px-6 py-3 flex items-center gap-2">

            <Sparkles className="w-5 h-5"/>

            Connect Revenue Source

          </button>



        </div>







        {/* Metrics */}

        <div className="grid md:grid-cols-4 gap-6 mb-12">


          {metrics.map((metric)=>{


            const Icon = metric.icon;


            return (

              <div
                key={metric.title}
                className="ai-card rounded-2xl p-6"
              >

                <Icon className="text-cyan-400 mb-4"/>


                <h2 className="text-3xl font-bold">

                  {metric.value}

                </h2>


                <p className="text-white/50">

                  {metric.title}

                </p>


              </div>

            );


          })}



        </div>







        {/* Chart Placeholder */}

        <div className="
          glass-panel
          rounded-3xl
          p-8
          mb-12
        ">


          <div className="
            flex
            justify-between
            items-center
            mb-8
          ">


            <h2 className="text-2xl font-bold flex items-center gap-3">

              <BarChart3 className="text-cyan-400"/>

              Revenue Growth

            </h2>



            <Settings className="text-white/40"/>


          </div>





          <div className="
            h-64
            rounded-2xl
            bg-white/5
            border
            border-white/10
            flex
            items-center
            justify-center
          ">


            <p className="text-white/40">

              Revenue analytics chart will connect here

            </p>


          </div>


        </div>








        {/* Revenue Streams */}


        <h2 className="text-3xl font-bold mb-6">

          Revenue Streams

        </h2>





        <div className="grid md:grid-cols-3 gap-6">


          {revenueStreams.map((stream)=>(


            <div
              key={stream.name}
              className="ai-card rounded-3xl p-7"
            >



              <div className="
                w-14
                h-14
                rounded-2xl
                bg-cyan-400/10
                flex
                items-center
                justify-center
              ">

                <TrendingUp className="text-cyan-400"/>

              </div>





              <h3 className="
                text-xl
                font-bold
                mt-6
              ">

                {stream.name}

              </h3>





              <p className="
                text-white/60
                mt-3
              ">

                {stream.description}

              </p>







              <div className="
                mt-6
                flex
                justify-between
                items-center
              ">


                <span className="
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  bg-white/10
                  text-cyan-300
                ">

                  {stream.status}

                </span>




                <ArrowUpRight className="text-cyan-400"/>


              </div>




            </div>


          ))}



        </div>





      </div>


    </div>

  );

}
