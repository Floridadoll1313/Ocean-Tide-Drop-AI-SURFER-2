import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* 🌊 subtle animated glow background */}
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

      {/* 🚨 LIVE STATUS BAR */}
      <div className="relative z-10 text-center text-xs py-2 bg-cyan-500/10 border-b border-cyan-500/20 text-cyan-300">
        🔴 Live: 142 AI agents currently running • 18 new leads generated in last hour • System uptime 99.98%
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
          Ocean Tide Drop AI replaces manual sales, follow-ups, and optimization with self-improving AI systems that quietly grow your revenue in the background.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pricing"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-7 py-3 rounded-xl transition"
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

        {/* TRUST STRIP */}
        <div className="mt-6 text-xs text-white/40">
          No ads • No fluff • Just AI systems that generate outcomes
        </div>
      </div>

      {/* 💰 VALUE STACK */}
      <div className="relative z-10 grid md:grid-cols-3 gap-6 px-6 py-14 border-t border-white/10">

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-cyan-400 text-sm mb-2">01 — Acquisition</div>
          <h3 className="font-semibold text-lg">AI Lead Generation</h3>
          <p className="text-white/60 text-sm mt-2">
            Continuously identifies, qualifies, and nurtures high-intent buyers across your funnel.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-cyan-400 text-sm mb-2">02 — Conversion</div>
          <h3 className="font-semibold text-lg">Autonomous Sales Engine</h3>
          <p className="text-white/60 text-sm mt-2">
            AI follows up, handles objections, and pushes users toward checkout without human input.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="text-cyan-400 text-sm mb-2">03 — Optimization</div>
          <h3 className="font-semibold text-lg">Self-Improving Growth Loop</h3>
          <p className="text-white/60 text-sm mt-2">
            Every interaction improves conversion rates, pricing, and engagement automatically.
          </p>
        </div>
      </div>

      {/* 📊 “SOCIAL PROOF / ACTIVITY” */}
      <div className="relative z-10 px-6 py-14 border-t border-white/10">

        <h2 className="text-center text-2xl font-bold mb-8">
          Live System Activity
        </h2>

        <div className="max-w-3xl mx-auto space-y-3 text-sm">

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            ⚡ AI Agent “WaveCloser-7” converted a $49 trial → $199 upgrade
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            🌊 New lead captured from pricing page (high intent score: 87%)
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            📈 Pricing experiment “Tier Optimization B” increased conversion +12%
          </div>

        </div>
      </div>

      {/* 💳 PRICING TEASE */}
      <div className="relative z-10 px-6 py-16 text-center border-t border-white/10">

        <h2 className="text-3xl font-bold">
          Start free. Scale like a system.
        </h2>

        <p className="mt-3 text-white/60">
          Only upgrade when the AI starts generating results.
        </p>

        <div className="mt-6 inline-block bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="text-sm text-white/60">Most Popular</div>
          <div className="text-2xl font-bold mt-1">$49 → $199/mo scaling tiers</div>
          <div className="text-xs text-white/40 mt-2">
            AI adjusts pricing based on user behavior
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/pricing"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl inline-block"
          >
            View Pricing Engine
          </Link>
        </div>
      </div>

      {/* 🚀 FINAL CTA */}
      <div className="relative z-10 px-6 py-20 text-center border-t border-white/10 bg-gradient-to-t from-cyan-500/10">

        <h2 className="text-4xl font-extrabold">
          You don’t need more tools.
          <br />
          You need an AI system.
        </h2>

        <p className="mt-4 text-white/60">
          Ocean Tide Drop runs your growth while you focus on decisions, not execution.
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
        © {new Date().getFullYear()} Ocean Tide Drop AI — Revenue automation infrastructure
      </div>

    </div>
  );
}
