import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    console.log("🌊 Home page loaded - Ocean Tide AI Surfer online");
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* HERO SECTION */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            🌊 Ocean Tide <span className="text-cyan-400">AI Surfer</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg md:text-xl">
            Your AI command system for building, automating, and scaling digital
            businesses like waves that never stop moving.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
            >
              Enter System 🌊
            </Link>

            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl border border-cyan-500 hover:bg-cyan-500/10 transition"
            >
              View Dashboard
            </Link>

          </div>

          {/* STATUS CARD */}
          <div className="mt-12 p-6 rounded-xl border border-slate-800 bg-slate-900/40">
            <p className="text-sm text-slate-400">
              System Status
            </p>
            <p className="text-cyan-300 mt-2">
              🌊 AI Engine: Online • Supabase: Connected • Build: Stable
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="p-6 text-center text-slate-500 text-sm">
        Ocean Tide Drop AI Surfer • Built for flow, speed & automation 🌊
      </footer>
    </div>
  );
}