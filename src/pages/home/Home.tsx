import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* 🌊 NAVBAR */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="text-lg font-bold tracking-wide">
          🌊 Ocean Tide Drop AI
        </div>

        <div className="flex gap-6 text-sm text-white/70">
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/login" className="hover:text-white">Login</Link>
        </div>
      </div>

      {/* 🌊 HERO SECTION */}
      <div className="text-center px-6 pt-24 pb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Turn AI Into a <span className="text-cyan-400">Revenue Machine</span>
        </h1>

        <p className="mt-6 text-white/70 max-w-2xl mx-auto text-lg">
          Ocean Tide Drop AI Surfer builds, automates, and scales your business with intelligent AI agents that sell, follow up, and optimize your growth 24/7.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pricing"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            🌊 Start Scaling Now
          </Link>

          <Link
            to="/dashboard"
            className="border border-white/20 hover:border-white/40 px-6 py-3 rounded-xl text-white/80"
          >
            View AI Dashboard
          </Link>
        </div>

        <p className="mt-4 text-xs text-white/40">
          No setup needed. AI runs your business logic automatically.
        </p>
      </div>

      {/* 🌊 FEATURE STRIP */}
      <div className="grid md:grid-cols-3 gap-6 px-6 py-16 border-t border-white/10">
        
        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="font-semibold text-lg">🤖 AI Sales Engine</h3>
          <p className="text-white/60 mt-2 text-sm">
            Automatically generates leads, follows up, and closes customers using intelligent AI workflows.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="font-semibold text-lg">📊 Revenue Dashboard</h3>
          <p className="text-white/60 mt-2 text-sm">
            Track conversions, upgrades, and user behavior in real time with predictive AI analytics.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="font-semibold text-lg">⚡ One-Click Scaling</h3>
          <p className="text-white/60 mt-2 text-sm">
            Launch experiments, pricing changes, and funnels without touching code.
          </p>
        </div>
      </div>

      {/* 🌊 SOCIAL PROOF */}
      <div className="px-6 py-16 text-center border-t border-white/10">
        <h2 className="text-2xl font-bold">
          Built for founders who want leverage, not burnout.
        </h2>

        <p className="mt-4 text-white/60 max-w-xl mx-auto">
          Replace manual selling with AI-driven systems that learn, adapt, and improve your conversion flow automatically.
        </p>

        <div className="mt-8 text-sm text-white/40">
          Trusted by early-stage AI builders, automation founders, and digital operators.
        </div>
      </div>

      {/* 🌊 FINAL CTA STRIP */}
      <div className="px-6 py-20 text-center bg-gradient-to-t from-cyan-500/10 to-transparent border-t border-white/10">
        <h2 className="text-3xl font-bold">
          Ready to turn your AI into income?
        </h2>

        <p className="mt-4 text-white/60">
          Your system is already built. It just needs activation.
        </p>

        <Link
          to="/pricing"
          className="mt-8 inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl"
        >
          🌊 Activate Ocean Tide Drop AI
        </Link>
      </div>

      {/* 🌊 FOOTER */}
      <div className="px-6 py-8 text-center text-xs text-white/30 border-t border-white/10">
        © {new Date().getFullYear()} Ocean Tide Drop AI Surfer — Built for builders who ship.
      </div>
    </div>
  );
}
