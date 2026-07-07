export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-950 to-black text-white">

      {/* HEADER */}
      <section className="relative px-6 py-16 text-center overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0891b2,transparent_40%)] opacity-40" />

        <div className="relative z-10 max-w-5xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-black">
            🌊 Welcome Back
            <br />
            <span className="text-cyan-400">
              AI SURFER
            </span>
          </h1>

          <p className="mt-6 text-xl text-white/70">
            Your AI command center is ready.
          </p>

          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            Launch AI agents, manage automation tools, track your business
            systems, and ride the next technology wave.
          </p>

        </div>

      </section>


      {/* DASHBOARD CARDS */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">

        <div className="grid md:grid-cols-3 gap-6">


          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="text-5xl">
              🤖
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              My AI Agents
            </h2>

            <p className="mt-3 text-white/60">
              Create and manage intelligent assistants for your business.
            </p>

            <button className="mt-6 px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition">
              Open Agents
            </button>

          </div>



          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="text-5xl">
              ⚡
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Automation Hub
            </h2>

            <p className="mt-3 text-white/60">
              Connect workflows and let AI handle repetitive tasks.
            </p>

            <button className="mt-6 px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition">
              View Automations
            </button>

          </div>



          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <div className="text-5xl">
              📊
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Business Dashboard
            </h2>

            <p className="mt-3 text-white/60">
              Monitor leads, activity, and AI-powered growth tools.
            </p>

            <button className="mt-6 px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition">
              Open Dashboard
            </button>

          </div>


        </div>

      </section>


      {/* AI ASSISTANT AREA */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-10 text-center">

          <h2 className="text-4xl font-black">
            🌊 Your AI Surf Companion
          </h2>

          <p className="mt-4 text-white/70">
            Ask questions, build strategies, and navigate your AI journey.
          </p>


          <button className="mt-8 px-10 py-4 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition">
            Launch AI Assistant
          </button>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">

        © {new Date().getFullYear()} Ocean Tide Drop AI SURFER

      </footer>


    </main>
  );
}
