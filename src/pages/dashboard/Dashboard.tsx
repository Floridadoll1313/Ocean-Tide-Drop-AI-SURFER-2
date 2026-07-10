import GlassPanel from "../../components/ui/GlassPanel";

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white p-8">

      <div className="mb-10">
        <p className="
          text-cyan-400
          uppercase
          tracking-[0.4em]
          text-xs
          font-bold
        ">
          Ocean Tide HQ
        </p>

        <h1 className="
          text-4xl
          md:text-5xl
          font-black
          mt-3
        ">
          🌊 AI Surfer Command Center
        </h1>

        <p className="
          text-white/60
          mt-3
          max-w-xl
        ">
          Your AI operations bridge. Manage projects, automation, and growth
          systems from one digital ocean deck.
        </p>
      </div>


      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      ">

        <GlassPanel>
          <h2 className="text-xl font-semibold">
            🚀 Projects
          </h2>

          <p className="text-cyan-200/60 mt-3">
            0 Active Projects
          </p>

          <div className="
            mt-6
            h-1
            rounded-full
            bg-cyan-400/20
            overflow-hidden
          ">
            <div className="
              h-full
              w-1/3
              bg-cyan-400
              animate-pulse
            "/>
          </div>

        </GlassPanel>


        <GlassPanel>
          <h2 className="text-xl font-semibold">
            🛰️ GitHub Sync
          </h2>

          <p className="text-cyan-200/60 mt-3">
            Waiting for sync...
          </p>

          <div className="
            mt-5
            text-xs
            uppercase
            tracking-widest
            text-emerald-400
          ">
            System Ready
          </div>

        </GlassPanel>


        <GlassPanel>
          <h2 className="text-xl font-semibold">
            💰 Revenue
          </h2>

          <p className="
            text-3xl
            font-black
            mt-3
          ">
            $0.00
          </p>

          <p className="
            text-xs
            text-white/40
            mt-2
          ">
            Monetization dashboard initializing
          </p>

        </GlassPanel>

      </div>

    </div>
  );
}
