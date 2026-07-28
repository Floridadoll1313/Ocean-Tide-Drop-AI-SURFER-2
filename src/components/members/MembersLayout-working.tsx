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
  ShieldCheck,
} from "lucide-react";

function getDeckTheme() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return {
      background: "/surfers-deck-morning.png",
      title: "Dawn Patrol",
      message: "🌅 Good morning. The next wave is yours.",
    };
  }

  if (hour >= 12 && hour < 18) {
    return {
      background: "/surfers-deck-bg.png",
      title: "High Tide",
      message: "☀️ Build, create, and ride the momentum.",
    };
  }

  return {
    background: "/surfers-deck-night.png",
    title: "Moonlit Deck",
    message: "🌙 The ocean is calm. The AI crew is ready.",
  };
}


export default function MembersLayout() {

  const deck = getDeckTheme();


  const links = [
    {
      name: "Command Center",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "AI Agents",
      path: "/members/agents",
      icon: Bot,
    },
    {
      name: "Automation",
      path: "/members/automation",
      icon: Workflow,
    },
    {
      name: "Workspace",
      path: "/members/workspace",
      icon: FolderKanban,
    },
    {
      name: "Leads",
      path: "/members/leads",
      icon: Users,
    },
    {
      name: "Revenue",
      path: "/members/revenue",
      icon: DollarSign,
    },
    {
      name: "Scanner",
      path: "/members/scanner",
      icon: ScanSearch,
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
        backgroundImage: `url('${deck.background}')`,
      }}
    >

      <div className="min-h-screen bg-black/30 p-6">


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
              shadow-2xl
              p-6
              sticky
              top-6
              h-fit
            "
          >


            {/* Brand */}

            <div className="flex items-center gap-3 mb-6">

              <div className="relative">

                <Waves className="w-12 h-12 text-cyan-300" />

                <Sparkles
                  className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    text-yellow-300
                  "
                />

              </div>


              <div>

                <h2 className="text-xl font-black">
                  Surfer's Deck
                </h2>

                <p className="text-xs text-white/70">
                  AI Headquarters
                </p>

              </div>

            </div>



            {/* Member Card */}

            <div
              className="
                rounded-2xl
                bg-black/20
                border
                border-white/10
                p-4
                mb-5
              "
            >

              <p className="text-xs uppercase tracking-widest text-cyan-300">
                Welcome Surfer
              </p>


              <h3 className="text-xl font-black mt-2">
                AI Wave Rider
              </h3>


              <p className="text-sm text-white/70 mt-1">
                Member Profile
              </p>


              <div
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-cyan-400/20
                  px-3
                  py-1
                  text-sm
                "
              >

                🌊 Wave Member

              </div>


            </div>




            {/* Tide Status */}

            <div
              className="
                rounded-2xl
                bg-white/10
                border
                border-white/10
                p-4
                mb-6
              "
            >

              <div className="flex items-center gap-2">

                <ShieldCheck className="w-5 h-5 text-cyan-300" />

                <span className="font-bold">
                  Deck Status
                </span>

              </div>


              <p className="text-sm text-white/70 mt-3">
                {deck.title}
              </p>


              <p className="text-xs text-white/60 mt-2">
                Systems Online 🌊
              </p>


            </div>




            {/* Navigation */}

            <nav className="space-y-3">

              {links.map((link) => {

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
                      rounded-2xl
                      px-4
                      py-3
                      transition-all
                      ${
                        isActive
                        ? "bg-cyan-400/30 border border-cyan-300/40 shadow-lg"
                        : "hover:bg-white/10"
                      }
                      `
                    }
                  >

                    <Icon size={22}/>

                    <span className="font-semibold">
                      {link.name}
                    </span>


                  </NavLink>

                );

              })}

            </nav>


          </aside>



          <main className="flex-1">

            <Outlet />

          </main>


        </div>


      </div>


    </div>

  );
}