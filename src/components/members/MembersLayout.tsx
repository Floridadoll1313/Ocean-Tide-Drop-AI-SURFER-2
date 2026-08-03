import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Workflow,
  FolderKanban,
  Users,
  DollarSign,
  ScanSearch,
  Waves,
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  RotateCcw,
} from "lucide-react";

import { useState } from "react";
import AICrewStatus from "../../pages/members/AICrewStatus";


type TideMode = "auto" | "dawn" | "high" | "moon";


function getAutoTide() {

  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return "dawn";
  }

  if (hour >= 12 && hour < 18) {
    return "high";
  }

  return "moon";

}



function getTideInfo(mode: TideMode) {

  const activeMode =
    mode === "auto"
      ? getAutoTide()
      : mode;


  if (activeMode === "dawn") {

    return {
      title: "Dawn Patrol",
      overlay: "bg-orange-300/10",
    };

  }


  if (activeMode === "high") {

    return {
      title: "High Tide",
      overlay: "bg-cyan-400/10",
    };

  }


  return {
    title: "Moonlit Deck",
    overlay: "bg-indigo-900/25",
  };

}




export default function MembersLayout() {


  const [tideMode,setTideMode] =
    useState<TideMode>("auto");


  const tide =
    getTideInfo(tideMode);



  const links = [

    {
      name:"Command Center",
      path:"/members/dashboard",
      icon:LayoutDashboard
    },

    {
      name:"AI Agents",
      path:"/members/agents",
      icon:Bot
    },

    {
      name:"Automation",
      path:"/members/automation",
      icon:Workflow
    },

    {
      name:"Workspace",
      path:"/members/workspace",
      icon:FolderKanban
    },

    {
      name:"Leads",
      path:"/members/leads",
      icon:Users
    },

    {
      name:"Revenue",
      path:"/members/revenue",
      icon:DollarSign
    },

    {
      name:"Scanner",
      path:"/members/scanner",
      icon:ScanSearch
    },

  ];



  return (

    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-fixed
        bg-no-repeat
        text-white
      "

      style={{
        backgroundImage:'url("/images/Members-bg.png")'
      }}

    >


      <div
        className={`
          min-h-screen
          p-6
          ${tide.overlay}
        `}
      >


        <div className="flex gap-6">



          <aside
            className="
              hidden
              md:flex
              w-80
              flex-col
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              p-6
              shadow-2xl
              h-fit
            "
          >



            <div className="flex items-center gap-3 mb-6">

              <Waves
                className="w-12 h-12 text-cyan-300"
              />


              <div>

                <h2 className="text-xl font-black">
                  Surfer's Deck
                </h2>

                <p className="text-sm text-cyan-300">
                  {tide.title}
                </p>

              </div>

            </div>




            <div
              className="
                rounded-2xl
                bg-black/20
                p-4
                mb-6
              "
            >

              <Sparkles className="text-yellow-300 mb-2"/>


              <h3 className="font-black text-lg">
                AI Wave Rider
              </h3>


              <p className="text-sm text-white/70">
                Member Headquarters
              </p>


            </div>




            <AICrewStatus />





            <div
              className="
                rounded-2xl
                bg-white/10
                border
                border-white/20
                p-4
                mb-6
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-widest
                  text-cyan-300
                  mb-3
                "
              >
                Tide Control
              </p>


              <div className="grid grid-cols-2 gap-2">


                <button
                  onClick={()=>setTideMode("auto")}
                  className="rounded-xl p-2 bg-white/10 hover:bg-white/20 text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw size={15}/>
                  Auto
                </button>



                <button
                  onClick={()=>setTideMode("dawn")}
                  className="rounded-xl p-2 bg-white/10 hover:bg-white/20 text-sm flex items-center justify-center gap-2"
                >
                  <Sunrise size={15}/>
                  Dawn
                </button>



                <button
                  onClick={()=>setTideMode("high")}
                  className="rounded-xl p-2 bg-white/10 hover:bg-white/20 text-sm flex items-center justify-center gap-2"
                >
                  <Sun size={15}/>
                  High
                </button>



                <button
                  onClick={()=>setTideMode("moon")}
                  className="rounded-xl p-2 bg-white/10 hover:bg-white/20 text-sm flex items-center justify-center gap-2"
                >
                  <Moon size={15}/>
                  Moon
                </button>


              </div>


            </div>





            <nav className="space-y-3">


              {links.map((link)=>{

                const Icon = link.icon;


                return (

                  <NavLink
                    key={link.path}
                    to={link.path}

                    className={({isActive})=>`
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      px-4
                      py-3
                      transition
                      ${
                        isActive
                        ? "bg-cyan-400/30 border border-cyan-300/40"
                        : "hover:bg-white/10"
                      }
                    `}
                  >

                    <Icon size={22}/>

                    <span>
                      {link.name}
                    </span>


                  </NavLink>

                );

              })}


            </nav>



          </aside>





          <main className="flex-1 min-h-screen">

            <Outlet />

          </main>



        </div>


      </div>


    </div>

  );

}
