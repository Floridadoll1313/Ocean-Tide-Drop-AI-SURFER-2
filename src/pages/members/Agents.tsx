import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import {
  Bot,
  Plus,
  Sparkles,
  Trash2,
  Waves
} from "lucide-react";


interface Agent {

  id: string;

  name: string;

  business_type: string;

  purpose: string;

  status: string;

  created_at: string;

}



export default function Agents() {


  const [agents, setAgents] =
    useState<Agent[]>([]);


  const [name, setName] =
    useState("");


  const [businessType, setBusinessType] =
    useState("");


  const [purpose, setPurpose] =
    useState("");



  const [loading, setLoading] =
    useState(false);





  const loadAgents = async () => {


    const {
      data:{
        user
      }
    } =
      await supabase.auth.getUser();



    if (!user) {

      return;

    }





    const {
      data,
      error
    } =
      await supabase

        .from("agents")

        .select("*")

        .eq(
          "user_id",
          user.id
        )

        .order(
          "created_at",
          {
            ascending:false
          }
        );





    if(error){

      console.error(
        "Loading agents failed:",
        error
      );

      return;

    }




    setAgents(
      data || []
    );


  };







  useEffect(()=>{

    loadAgents();

  },[]);









  const createAgent = async () => {


    if(
      !name ||
      !businessType ||
      !purpose
    ){

      alert(
        "Please complete all AI Agent fields."
      );

      return;

    }





    setLoading(true);






    const {
      data:{
        user
      }
    } =
      await supabase.auth.getUser();





    if(!user){

      alert(
        "You must be logged in first."
      );


      setLoading(false);

      return;

    }






    const {
      error
    } =
      await supabase

        .from("agents")

        .insert({

          user_id:user.id,

          name,

          business_type:
            businessType,

          purpose,

          status:
            "active"

        });






    if(error){

      console.error(
        "Create agent error:",
        error
      );


      alert(
        error.message
      );


      setLoading(false);

      return;

    }






    setName("");

    setBusinessType("");

    setPurpose("");



    await loadAgents();



    setLoading(false);


  };







  const deleteAgent = async (
    id:string
  ) => {


    const {
      error
    } =
      await supabase

        .from("agents")

        .delete()

        .eq(
          "id",
          id
        );




    if(error){

      console.error(
        error
      );

      return;

    }




    loadAgents();


  };
    return (

    <div
      className="
        min-h-screen
        dashboard-bg
        text-white
        p-6
        md:p-10
      "
    >


      <div className="max-w-7xl mx-auto">



        <div className="flex items-center gap-4 mb-8">


          <div
            className="
              p-4
              rounded-2xl
              bg-cyan-400/10
              border
              border-cyan-300/20
            "
          >

            <Waves
              className="
                w-10
                h-10
                text-cyan-300
              "
            />

          </div>



          <div>


            <h1
              className="
                text-4xl
                font-black
                text-white
              "
            >
              AI Agent Harbor
            </h1>


            <p
              className="
                text-slate-200
                mt-2
              "
            >
              Build your digital AI crew and deploy automation workers.
            </p>


          </div>


        </div>






        <div
          className="
            rounded-3xl
            p-8
            mb-10
            bg-slate-900/70
            backdrop-blur-xl
            border
            border-cyan-300/20
          "
        >


          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <Plus className="text-cyan-300"/>


            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Create New AI Agent
            </h2>


          </div>





          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >


            <input

              className="
                p-4
                rounded-xl
                bg-slate-800/80
                border
                border-cyan-300/20
                text-white
                placeholder:text-slate-300
                outline-none
              "

              placeholder="Agent name"

              value={name}

              onChange={(e)=>
                setName(e.target.value)
              }

            />



            <input

              className="
                p-4
                rounded-xl
                bg-slate-800/80
                border
                border-cyan-300/20
                text-white
                placeholder:text-slate-300
                outline-none
              "

              placeholder="Business type"

              value={businessType}

              onChange={(e)=>
                setBusinessType(e.target.value)
              }

            />


          </div>





          <textarea

            className="
              w-full
              mt-5
              p-4
              rounded-xl
              bg-slate-800/80
              border
              border-cyan-300/20
              text-white
              placeholder:text-slate-300
              min-h-32
              outline-none
            "

            placeholder="What should this AI agent do?"

            value={purpose}

            onChange={(e)=>
              setPurpose(e.target.value)
            }

          />






          <button

            onClick={createAgent}

            disabled={loading}

            className="
              mt-6
              px-8
              py-4
              rounded-xl
              bg-cyan-400
              text-slate-950
              font-black
              hover:scale-105
              transition
            "

          >

            {
              loading
              ? "Launching..."
              : "Launch AI Agent 🚀"
            }


          </button>



        </div>







        <div
          className="
            mb-6
            flex
            items-center
            gap-3
          "
        >

          <Sparkles className="text-cyan-300"/>


          <h2
            className="
              text-3xl
              font-bold
            "
          >
            Your AI Fleet
          </h2>


        </div>







        {
          agents.length === 0 ? (


            <div
              className="
                rounded-3xl
                p-10
                text-center
                bg-slate-900/70
                border
                border-cyan-300/20
              "
            >

              <Bot
                className="
                  mx-auto
                  w-14
                  h-14
                  text-cyan-300
                  mb-4
                "
              />


              <p
                className="
                  text-slate-200
                "
              >
                No AI agents launched yet.
                Create your first digital crew member.
              </p>


            </div>


          ) : (


            <div
              className="
                grid
                md:grid-cols-3
                gap-6
              "
            >


              {
                agents.map((agent)=>(


                  <div

                    key={agent.id}

                    className="
                      rounded-3xl
                      p-6
                      bg-slate-900/70
                      backdrop-blur-xl
                      border
                      border-cyan-300/20
                    "

                  >


                    <div
                      className="
                        flex
                        justify-between
                      "
                    >

                      <Bot
                        className="
                          text-cyan-300
                          w-8
                          h-8
                        "
                      />



                      <button

                        onClick={()=>
                          deleteAgent(agent.id)
                        }

                        className="
                          text-red-400
                          hover:text-red-300
                        "

                      >

                        <Trash2 size={18}/>

                      </button>


                    </div>






                    <h3
                      className="
                        text-xl
                        font-bold
                        mt-5
                      "
                    >

                      {agent.name}

                    </h3>





                    <p
                      className="
                        text-cyan-300
                        mt-2
                        font-semibold
                      "
                    >

                      {agent.business_type}

                    </p>





                    <p
                      className="
                        text-slate-200
                        mt-4
                      "
                    >

                      {agent.purpose}

                    </p>





                    <span
                      className="
                        inline-block
                        mt-5
                        px-3
                        py-1
                        rounded-full
                        bg-cyan-300/20
                        border
                        border-cyan-300/30
                        text-cyan-100
                        text-xs
                        font-bold
                      "
                    >

                      {agent.status}

                    </span>




                  </div>


                ))

              }


            </div>


          )

        }



      </div>


    </div>


  );

                  }
