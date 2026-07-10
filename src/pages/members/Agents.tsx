import {
  Bot,
  Sparkles,
  Plus,
  ShipWheel
} from "lucide-react";

import { useState } from "react";


export default function Agents() {


  const [showBuilder, setShowBuilder] = useState(false);


  return (

    <div className="p-6 md:p-10">


      {/* Header */}

      <div className="
        rounded-3xl
        bg-white/5
        border
        border-white/10
        p-8
        mb-8
      ">


        <div className="flex items-center gap-4">

          <Bot
            className="text-cyan-400"
            size={45}
          />


          <div>

            <h1 className="
              text-4xl
              font-black
            ">
              AI Agent Harbor
            </h1>


            <p className="
              text-white/60
              mt-2
            ">
              Build your digital crew.
              Create AI workers for your business.
            </p>


          </div>


        </div>


      </div>




      {!showBuilder && (

        <div className="
          rounded-3xl
          bg-gradient-to-br
          from-cyan-400/20
          to-blue-500/10
          border
          border-cyan-400/20
          p-10
          text-center
        ">


          <ShipWheel
            className="
            mx-auto
            text-cyan-400
            mb-5
            "
            size={60}
          />


          <h2 className="
            text-3xl
            font-black
          ">
            Your Harbor is Empty
          </h2>


          <p className="
            text-white/60
            mt-3
          ">
            Launch your first AI crew member.
          </p>



          <button

            onClick={() => setShowBuilder(true)}

            className="
            mt-6
            px-8
            py-4
            rounded-full
            bg-cyan-400
            text-black
            font-black
            flex
            gap-3
            items-center
            mx-auto
            "

          >

            <Plus size={22}/>

            Create AI Agent

          </button>


        </div>

      )}






      {showBuilder && (

        <div className="
          rounded-3xl
          bg-white/5
          border
          border-white/10
          p-8
        ">


          <div className="flex items-center gap-3 mb-8">


            <Sparkles
              className="text-cyan-400"
            />


            <h2 className="
              text-2xl
              font-black
            ">
              Agent Builder
            </h2>


          </div>





          <div className="grid gap-5">


            <input
              className="
              bg-black/20
              border
              border-white/10
              rounded-xl
              p-4
              "
              placeholder="Agent Name"
            />



            <input
              className="
              bg-black/20
              border
              border-white/10
              rounded-xl
              p-4
              "
              placeholder="Business Type"
            />



            <textarea

              className="
              bg-black/20
              border
              border-white/10
              rounded-xl
              p-4
              min-h-32
              "

              placeholder="
              What should this AI agent do?
              "

            />




            <button

              className="
              bg-cyan-400
              text-black
              font-black
              rounded-xl
              py-4
              "

            >

              Launch Agent 🚀

            </button>


          </div>


        </div>

      )}



    </div>

  );

}