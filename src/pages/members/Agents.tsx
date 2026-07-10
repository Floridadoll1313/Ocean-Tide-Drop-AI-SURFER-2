import {
  Bot,
  Sparkles,
  Plus,
  ShipWheel,
  Trash2
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";


type Agent = {
  id: string;
  name: string;
  business_type: string;
  purpose: string;
  status: string;
};




export default function Agents() {


  const [showBuilder, setShowBuilder] = useState(false);


  const [agents, setAgents] = useState<Agent[]>([]);


  const [name, setName] = useState("");

  const [businessType, setBusinessType] = useState("");

  const [purpose, setPurpose] = useState("");

  const [loading, setLoading] = useState(false);





  async function loadAgents(){


    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();



    if(!user) return;



    const {
      data,
      error
    } = await supabase
      .from("agents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending:false
      });



    if(error){

      console.error(error);

      return;

    }



    setAgents(data || []);


  }






  async function createAgent(){


    if(!name || !businessType || !purpose){

      alert("Please complete your AI agent details.");

      return;

    }



    setLoading(true);



    const {
      data:{
        user
      }
    } = await supabase.auth.getUser();



    if(!user){

      alert("Please login first.");

      setLoading(false);

      return;

    }





    const {
      error
    } = await supabase
      .from("agents")
      .insert({

        user_id:user.id,

        name:name,

        business_type:businessType,

        purpose:purpose,

        status:"active"

      });





    if(error){

      console.error(error);

      alert(error.message);

      setLoading(false);

      return;

    }





    setName("");

    setBusinessType("");

    setPurpose("");

    setShowBuilder(false);


    await loadAgents();


    setLoading(false);


  }





  async function deleteAgent(id:string){


    await supabase
      .from("agents")
      .delete()
      .eq("id", id);


    loadAgents();


  }





  useEffect(()=>{

    loadAgents();

  },[]);






  return (

    <div className="p-6 md:p-10">



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
            {agents.length === 0 
              ? "Your Harbor is Empty"
              : "Your AI Fleet Is Ready"
            }
          </h2>



          <button

            onClick={()=>setShowBuilder(true)}

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
          mb-10
        ">


          <div className="flex items-center gap-3 mb-8">


            <Sparkles className="text-cyan-400"/>


            <h2 className="
              text-2xl
              font-black
            ">
              Agent Builder
            </h2>


          </div>





          <div className="grid gap-5">



            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-xl p-4"
              placeholder="Agent Name"
            />



            <input
              value={businessType}
              onChange={(e)=>setBusinessType(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-xl p-4"
              placeholder="Business Type"
            />



            <textarea

              value={purpose}

              onChange={(e)=>setPurpose(e.target.value)}

              className="bg-black/20 border border-white/10 rounded-xl p-4 min-h-32"

              placeholder="What should this AI agent do?"

            />





            <button

              onClick={createAgent}

              disabled={loading}

              className="
              bg-cyan-400
              text-black
              font-black
              rounded-xl
              py-4
              "

            >

              {loading 
              ? "Launching..."
              : "Launch Agent 🚀"
              }


            </button>


          </div>


        </div>


      )}






      <div className="grid md:grid-cols-3 gap-6">


      {agents.map((agent)=>(


        <div
          key={agent.id}
          className="
          rounded-3xl
          bg-white/5
          border
          border-white/10
          p-6
          "
        >


          <Bot className="text-cyan-400 mb-4"/>


          <h3 className="text-xl font-black">
            {agent.name}
          </h3>


          <p className="text-white/60">
            {agent.business_type}
          </p>


          <p className="mt-3">
            {agent.purpose}
          </p>



          <button

            onClick={()=>deleteAgent(agent.id)}

            className="mt-5 text-red-400 flex gap-2"

          >

            <Trash2 size={18}/>

            Delete

          </button>



        </div>


      ))}


      </div>




    </div>

  );

}