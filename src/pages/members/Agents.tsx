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
