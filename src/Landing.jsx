import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* 🌊 ocean glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 rounded-full blur-3xl top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-3xl bottom-[-200px] right-[-200px]" />
      </div>

      <div className="relative z-10 text-center max-w-xl px-6">

        <div className="text-xs text-white/50 mb-4 tracking-widest">
          OCEAN TIDE DROP AI SYSTEM BOOT
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          🌊 AI Operating System
        </h1>

        <p className="mt-4 text-white/60">
          Your business is now connected to autonomous AI agents that generate leads, run sales, and optimize revenue in real time.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-xl hover:bg-cyan-400"
          >
            Enter System
          </Link>

          <Link
            to="/login"
            className="border border-white/20 px-6 py-3 rounded-xl hover:border-white/40"
          >
            Secure Login
          </Link>
        </div>

        <div className="mt-6 text-xs text-white/30">
          STATUS: ONLINE • AI NODES ACTIVE • REVENUE ENGINE READY
        </div>
      </div>
    </div>
  );
}
