import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* 🌊 glowing ocean background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl bottom-[-200px] right-[-200px]" />
      </div>

      {/* 🌊 NAVBAR */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 backdrop-blur">
        <div className="font-bold tracking-wide">
          🌺 Ocean Tide AI Surfer
        </div>

        <div className="flex gap-5 text-sm text-white/70">
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          <Link to="/login" className="hover:text-white">Login</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        </div>
      </div>

      {/* 🌊 HERO */}
      <div className="relative z-10 text-center px-6 pt-24 pb-14">
        
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/10 text-xs text-white/70">
          AI Revenue System for Modern Founders
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Turn Your Business Into
          <br />
          <span className="text-cyan-400">an AI Money Wave</span>
        </h1>

        <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
          Ocean Tide AI builds autonomous systems that generate leads, follow up with customers, and optimize conversions while you sleep.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pricing"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-xl"
          >
            ⚡ Start Free
          </Link>

          <Link
            to="/dashboard"
            className="border border-white/20 hover:border-white/40 px-8 py-3 rounded-xl"
          >
            View Dashboard
          </Link>
        </div>

        <div className="mt-6 text-xs text-white/40">
          No setup • No code required • AI runs the system
        </div>
      </div>

      {/* 🧠 VALUE SECTION */}
      <div className="relative z-10 grid md:grid-cols-3 gap-6 px-6 py-14 border-t border-white/10">

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="font-semibold text-lg">🌊 AI Lead Engine</h3>
          <p className="text-white/60 text-sm mt-2">
            Finds and captures high-intent buyers automatically.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="font-semibold text-lg">⚡ Auto Sales System</h3>
          <p className="text-white/60 text-sm mt-2">
            AI follows up and converts leads into paying customers.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="font-semibold text-lg">📈 Growth Engine</h3>
          <p className="text-white/60 text-sm mt-2">
            Self-improving system that increases conversions over time.
          </p>
        </div>
      </div>

      {/* 💳 PRICING TEASER */}
      <div className="relative z-10 text-center px-6 py-16 border-t border-white/10">

        <h2 className="text-3xl font-bold">
          Start small. Scale like a system.
        </h2>

        <p className="mt-3 text-white/60">
          Upgrade only when the AI starts producing results.
        </p>

        <div className="mt-6 inline-block bg-white/5 border border-white/10 p-6 rounded-xl">
          <div className="text-sm text-white/50">Starter Plan</div>
          <div className="text-2xl font-bold">$49/mo</div>
          <div className="text-xs text-white/40 mt-2">
            AI-managed revenue automation
          </div>
        </div>

        <div className="mt-6">
          <Link
            to="/pricing"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl inline-block"
          >
            View Pricing
          </Link>
        </div>
      </div>

      {/* 🚀 FINAL CTA */}
      <div className="relative z-10 text-center px-6 py-20 border-t border-white/10 bg-gradient-to-t from-cyan-500/10">

        <h2 className="text-4xl font-extrabold">
          You don’t need more tools.
          <br />
          You need a system.
        </h2>

        <p className="mt-4 text-white/60">
          Ocean Tide AI runs your growth while you focus on strategy.
        </p>

        <Link
          to="/pricing"
          className="mt-8 inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-10 py-4 rounded-xl"
        >
          🌊 Activate System
        </Link>

        <div className="mt-6 text-xs text-white/30">
          Built for founders scaling beyond $10K/month
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 text-center px-6 py-8 text-xs text-white/30 border-t border-white/10">
        © {new Date().getFullYear()} Ocean Tide AI Surfer
      </div>

    </div>
  );
}
