import {
  Sparkles,
  Waves,
  Bot,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950 to-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative px-6 py-24 text-center">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.15),transparent_50%)]" />

        <div className="relative z-10 max-w-5xl mx-auto">

          <div className="flex justify-center mb-6">
            <Waves className="w-16 h-16 text-cyan-400 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Ocean Tide Drop
            <span className="block text-cyan-400">
              AI SURFER
            </span>
          </h1>

          <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto">
            Build. Automate. Ride the AI wave.
            Smart AI tools, automation, and digital surfboards
            designed for businesses ready to grow.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <a
              href="/pricing"
              className="group flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 font-bold text-black hover:bg-cyan-300 transition"
            >
              Ride The Wave
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </a>

            <a
              href="/login"
              className="rounded-full border border-white/20 px-8 py-4 font-bold hover:bg-white/10 transition"
            >
              Member Login
            </a>

          </div>

        </div>
      </section>


      {/* FEATURES */}
      <section className="px-6 py-16">

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <Feature
            icon={<Bot />}
            title="AI Agents"
            text="Deploy intelligent assistants that help your business work smarter."
          />

          <Feature
            icon={<Zap />}
            title="Automation"
            text="Connect your tools and eliminate repetitive tasks."
          />

          <Feature
            icon={<ShieldCheck />}
            title="Secure Growth"
            text="Build your digital foundation with modern AI technology."
          />

        </div>

      </section>


      {/* CTA */}
      <section className="px-6 py-20 text-center">

        <Sparkles className="mx-auto w-12 h-12 text-cyan-300 mb-5" />

        <h2 className="text-4xl font-bold">
          Catch the next AI wave 🌊
        </h2>

        <p className="mt-4 text-white/60">
          Join Ocean Tide Drop AI SURFER and start building your AI-powered future.
        </p>

      </section>


      {/* FOOTER */}
      <footer className="relative z-10 px-6 py-8 text-center text-xs text-white/30 border-t border-white/10">

        &copy; {new Date().getFullYear()} Ocean Tide Drop AI

      </footer>

    </div>
  );
}


function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg hover:bg-white/10 transition">

      <div className="text-cyan-400 mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-white/60">
        {text}
      </p>

    </div>
  );
}
