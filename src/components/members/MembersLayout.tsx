import { NavLink, Outlet } from "react-router-dom";
import {
  Bot,
  LayoutDashboard,
  Workflow,
  FolderKanban,
  Users,
  DollarSign,
  Sparkles,
  Waves
} from "lucide-react";


export default function MembersLayout() {


  const links = [
    {
      name: "Command Center",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "AI Agent Harbor",
      path: "/members/agents",
      icon: Bot,
    },
    {
      name: "Automation Hub",
      path: "/members/automation",
      icon: Workflow,
    },
    {
      name: "Workspace Dock",
      path: "/members/workspace",
      icon: FolderKanban,
    },
    {
      name: "Lead Tracker Bay",
      path: "/members/leads",
      icon: Users,
    },
    {
      name: "Revenue Radar",
      path: "/members/revenue",
      icon: DollarSign,
    },
    {
      name: "Ocean Scanner",
      path: "/members/scanner",
      icon: Sparkles,
    },
  ];


  return (

    <div className="min-h-screen dashboard-bg text-white flex">


      {/* Sidebar */}

      <aside
        className="
        w-72 
        hidden 
        md:flex
        flex-col
        border-r
        border-white/10
        p-6
        "
      >


        <div className="flex items-center gap-3 mb-10">

          <Waves className="text-cyan-400 w-10 h-10"/>

          <div>

            <h1 className="font-black text-xl">
              AI SURFER
            </h1>

            <p className="text-xs text-white/50">
              Members Ocean
            </p>

          </div>

        </div>



        <nav className="space-y-3">


          {links.map((link)=>{

            const Icon = link.icon;


            return (

              <NavLink
                key={link.path}
                to={link.path}
                className={({isActive}) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition
                  ${
                    isActive
                    ?
                    "bg-cyan-400 text-black font-bold"
                    :
                    "text-white/70 hover:bg-white/10"
                  }
                  `
                }
              >

                <Icon size={20}/>

                {link.name}

              </NavLink>

            );

          })}


        </nav>



        <div className="
          mt-auto
          rounded-2xl
          bg-white/5
          p-5
          border
          border-white/10
        ">

          <p className="font-bold">
            🌊 Surf Tip
          </p>

          <p className="text-sm text-white/60 mt-2">
            Automate the boring waves.
            Ride the growth ones.
          </p>

        </div>


      </aside>




      {/* Main Content */}

      <section className="flex-1">

        <Outlet />

      </section>


    </div>

  );

}