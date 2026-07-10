import { Outlet } from "react-router-dom";

export default function MembersLayout() {

  return (

    <div className="min-h-screen dashboard-bg text-white">

      {/* Members Navigation Shell */}

      <header className="p-6 border-b border-white/10">

        <h1 className="text-3xl font-black">
          🌊 Ocean Tide Drop AI SURFER
        </h1>

        <p className="text-white/60 mt-2">
          Your AI business command deck.
        </p>

      </header>


      {/* Page Content */}

      <main>
        <Outlet />
      </main>


    </div>

  );

}