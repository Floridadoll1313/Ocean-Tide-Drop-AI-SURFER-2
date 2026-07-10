import HologramCard from "../../components/ui/HologramCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white p-8">

      <section className="mb-12">

        <p className="
          text-cyan-400
          text-xs
          font-black
          uppercase
          tracking-[0.5em]
        ">
          Ocean Tide HQ
        </p>

        <h1 className="
          mt-4
          text-4xl
          md:text-6xl
          font-black
          tracking-tight
        ">
          🌊 AI Surfer Command Center
        </h1>

        <p className="
          mt-5
          max-w-2xl
          text-white/60
          text-lg
        ">
          Welcome aboard the AI operations deck.
          Your projects, automation systems, and growth engines live here.
        </p>

      </section>


      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-8
      ">


        <HologramCard>

          <h2 className="
            text-xl
            font-bold
          ">
            🚀 Projects
          </h2>

          <p className="
            mt-4
            text-cyan-200/70
          ">
            0 Active Projects
          </p>

          <div className="
            mt-6
            h-2
            rounded-full
            bg-white/10
            overflow-hidden
          ">
            <div className="
              h-full
              w-1/4
              bg-cyan-400
              animate-pulse
            "/>
          </div>

        </HologramCard>



        <HologramCard>

          <h2 className="
            text-xl
            font-bold
          ">
            🛰️ GitHub Sync
          </h2>

          <p className="
            mt-4
            text-cyan-200/70
          ">
            Waiting for sync...
          </p>


          <div className="
            mt-6
            inline-flex
            items-center
            gap-2
            text-xs
            uppercase
            tracking-widest
            text-emerald-400
          ">

            <span className="
              w-2
              h-2
              rounded-full
              bg-emerald-400
              animate-pulse
            "/>

            System Ready

          </div>

        </HologramCard>




        <HologramCard>

          <h2 className="
            text-xl
            font-bold
          ">
            💰 Revenue
          </h2>

          <p className="
            mt-4
            text-4xl
            font-black
          ">
            $0.00
          </p>

          <p className="
            mt-3
            text-sm
            text-white/50
          ">
            Monetization systems initializing
          </p>

        </HologramCard>


      </div>


      <section className="
        mt-12
        grid
        grid-cols-1
        md:grid-cols-2
        gap-8
      ">

        <HologramCard>

          <h2 className="text-xl font-bold">
            🤖 AI Assistant Core
          </h2>

          <p className="mt-3 text-white/60">
            Neural assistant standing by.
          </p>

        </HologramCard>


        <HologramCard>

          <h2 className="text-xl font-bold">
            🌊 Ocean Automation Hub
          </h2>

          <p className="mt-3 text-white/60">
            Workflow systems ready for deployment.
          </p>

        </HologramCard>


      </section>


    </div>
  );
}
