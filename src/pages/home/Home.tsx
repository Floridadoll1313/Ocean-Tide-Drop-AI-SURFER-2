```tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-950 to-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 py-24 text-center">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0891b2,transparent_40%)] opacity-40" />

        <div className="relative z-10 max-w-5xl mx-auto">

          <h1 className="text-6xl md:text-7xl font-black tracking-tight">
            🌊 Ocean Tide Drop
            <br />
            <span className="text-cyan-400">
              AI SURFER
            </span>
          </h1>

          <p className="mt-6 text-xl text-white/70">
            Build. Automate. Ride the AI wave.
          </p>

          <p className="mt-4 max-w-2xl mx-auto text-white/50">
            AI automation tools, intelligent agents, and business systems
            designed to help companies catch the next digital wave.
          </p>


          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <a
              href="/pricing"
              className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition"
            >
              Ride The Wave
            </a>

            <a
              href="/login"
              className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              Member Login
            </a>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="grid md:grid-cols-3 gap-6 px-6 pb-20 max-w-6xl mx-auto">

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          🤖
          <h2 className="text-2xl font-bold mt-4">
            AI Agents
          </h2>
          <p className="mt-3 text-white/60">
            Smart assistants that help businesses automate everyday work.
          </p>
        </div>


        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          ⚡
          <h2 className="text-2xl font-bold mt-4">
            Automation
          </h2>
          <p className="mt-3 text-white/60">
            Connect workflows and save time with intelligent systems.
          </p>
        </div>


        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
          🏄
          <h2 className="text-2xl font-bold mt-4">
            AI Training
          </h2>
          <p className="mt-3 text-white/60">
            Learn how to use AI to grow your business.
          </p>
        </div>

      </section>


      {/* FOOTER */}

      <div className="relative z-10 px-6 py-8 text-center text-xs text-white/30 border-t border-white/10">

        © {new Date().getFullYear()} Ocean Tide Drop AI

      </div>

    </div>
  );
}
```
