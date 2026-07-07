import homepageDesign from "../../assets/images/otd-ai-surfer-homepage-concept.png";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-950 to-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 py-20 text-center">

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0891b2,transparent_45%)] opacity-40"
        />

        <div className="relative z-10 max-w-6xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            🌊 Ocean Tide Drop
            <br />
            <span className="text-cyan-400">
              AI SURFER
            </span>
          </h1>

          <p className="mt-6 text-2xl text-white/80">
            Build. Automate. Ride the AI Wave.
          </p>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-white/60">
            AI agents, automation systems, and intelligent business tools
            designed to help companies surf the future of technology.
          </p>


          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <a
              href="/pricing"
              className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition"
            >
              🏄 Ride The Wave
            </a>

            <a
              href="/login"
              className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              🔐 Member Login
            </a>

          </div>


          {/* IMAGE PREVIEW */}
          <div className="mt-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

            <img
              src={homepageDesign}
              alt="Ocean Tide Drop AI SURFER homepage concept"
              className="w-full h-auto"
            />

          </div>

        </div>

      </section>


      {/* SERVICES */}
      <section className="px-6 py-20 max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          🌊 Catch The AI Wave
        </h2>


        <div className="grid md:grid-cols-3 gap-8">


          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur">

            <div className="text-5xl">
              🤖
            </div>

            <h3 className="text-2xl font-bold mt-5">
              AI Agents
            </h3>

            <p className="mt-4 text-white/60">
              Custom AI assistants that help businesses automate tasks,
              answer questions, and improve customer experiences.
            </p>

          </div>



          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur">

            <div className="text-5xl">
              ⚡
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Automation
            </h3>

            <p className="mt-4 text-white/60">
              Connect your business tools and create smarter workflows
              that save time.
            </p>

          </div>



          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur">

            <div className="text-5xl">
              🏄
            </div>

            <h3 className="text-2xl font-bold mt-5">
              AI Training
            </h3>

            <p className="mt-4 text-white/60">
              Learn how to use AI tools and bring digital transformation
              into your business.
            </p>

          </div>


        </div>

      </section>


      {/* CTA */}
      <section className="px-6 py-20 text-center">

        <div className="max-w-4xl mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-400/20 p-10">

          <h2 className="text-4xl font-black">
            Ready To Surf Into The Future?
          </h2>

          <p className="mt-4 text-white/70">
            Join Ocean Tide Drop AI SURFER and build smarter business systems.
          </p>

          <a
            href="/pricing"
            className="inline-block mt-8 px-10 py-4 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition"
          >
            Start Your AI Journey 🌊
          </a>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">

        © {new Date().getFullYear()} Ocean Tide Drop AI SURFER
        <br />
        Ride the wave. Build the future.

      </footer>


    </main>
  );
}
