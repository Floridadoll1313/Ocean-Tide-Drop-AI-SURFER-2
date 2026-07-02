import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* 🌊 background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl bottom-[-200px] right-[-200px]" />
      </div>

      {/* 🌊 TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur">
        <div className="font-bold tracking-wide">
          🌊 Ocean Tide Drop AI
        </div>

        <div className="flex gap-5 text-sm text-white/70">
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/login" className="hover:text-white">Login</Link>
        </div>
      </div>

      {/* 🔴 LIVE BAR */}
      <div className="relative z-10 text-center text-xs py-2 bg-cyan-500/10 border-b border-cyan-500/20 text-cyan-300">
        🔴 Live: AI agents running • leads processing • revenue systems optimizing in real time
      </div>

      {/* 🌊 HERO */}
      <div className="relative z-10 text-center px-6 pt-20 pb-12">

        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/10 text-xs text-white/70">
          AI Revenue Infrastructure for Modern Founders
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Your Business.
          <br />
          <span className="text-cyan-400">Autopiloted by AI.</span>
        </h1>

        <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
          Ocean Tide Drop replaces manual sales, follow-ups, and optimization with autonomous AI systems that grow revenue in the background.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pricing"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-7 py-3 rounded-xl"
          >
            ⚡ Start Scaling
          </Link>

          <Link
            to="/dashboard"
            className="border border-white/20 hover:border-white/40 px-7 py-3 rounded-xl"
          >
            View Live System
          </Link>
        </div>

        <div className="mt-6 text-xs text-white/40">
          No ads • No fluff • Autonomous AI revenue systems
        </div>
      </div>

      {/* 🧠 VALUE STACK */}
      <div className="relative z-10 grid md:grid-cols-3 gap-6 px-6 py-14 border-t border-white/10">

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-cyan-400 text-sm mb-2">01 — Acquisition</div>
          <h3 className="font-semibold text-lg">AI Lead Generation</h3>
          <p className="text-white/60 text-sm mt-2">
            Continuously identifies and qualifies high-intent buyers using behavioral AI signals.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-cyan-400 text-sm mb-2">02 — Conversion</div>
          <h3 className="font-semibold text-lg">Autonomous Sales Engine</h3>
          <p className="text-white/60 text-sm mt-2">
            AI handles follow-ups, objections, and checkout optimization automatically.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-cyan-400 text-sm mb-2">03 — Optimization</div>
          <h3 className="font-semibold text-lg">Self-Improving Growth Loop</h3>
          <p className="text-white/60 text-sm mt-2">
            Every interaction improves conversion rates, pricing, and funnel performance.
          </p>
        </div>
      </div>

      {/* 📊 ACTIVITY */}
      <div className="relative z-10 px-6 py-14 border-t border-white/10">

        <h2 className="text-center text-2xl font-bold mb-8">
          Live System Activity
        </h2>

        <div className="max-w-3xl mx-auto space-y-3 text-sm">

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            ⚡ AI Agent converted $49 trial → $199 upgrade
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            🌊 New high-intent lead captured from pricing page
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            📈 Pricing experiment increased conversion +12%
          </div>

        </div>
      </div>

      {/* 💳 PRICING */}
      <div className="relative z-10 px-6 py-16 text-center border-t border-white/10">

        <h2 className="text-3xl font-bold">
          Pricing that scales with your system
        </h2>

        <p className="mt-2 text-white/60">
          Start small. Scale when results appear.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">

          <div className="bg-white/5 p-5 rounded border border-white/10">
            <div className="text-sm text-white/50">Starter</div>
            <div className="text-xl font-bold">$49/mo</div>
          </div>

          <div className="bg-cyan-500/10 p-5 rounded border border-cyan-400/30">
            <div className="text-sm text-cyan-300">Growth</div>
            <div className="text-xl font-bold">$199/mo</div>
          </div>

          <div className="bg-white/5 p-5 rounded border border-white/10">
            <div className="text-sm text-white/50">Scale</div>
            <div className="text-xl font-bold">$499/mo</div>
          </div>

        </div>

        <Link
          to="/pricing"
          className="mt-6 inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl"
        >
          View Pricing Engine
        </Link>
      </div>

      {/* 🚀 FINAL CTA */}
      <div className="relative z-10 px-6 py-20 text-center border-t border-white/10 bg-gradient-to-t from-cyan-500/10">

        <h2 className="text-4xl font-extrabold">
          You don’t need more tools.
          <br />
          You need an AI system.
        </h2>

        <p className="mt-4 text-white/60">
          Ocean Tide Drop runs your growth automatically in the background.
        </p>

        <Link
          to="/pricing"
          className="mt-8 inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-10 py-4 rounded-xl"
        >
          🌊 Activate System
        </Link>

        <div className="mt-6 text-xs text-white/30">
          Built for founders targeting $10K–$100K/month systems
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 px-6 py-8 text-center text-xs text-white/30 border-t border-white/10">
        © {new Date().getFullYear()} Ocean Tide Drop AI
      </div>

    </div>
  );
}
