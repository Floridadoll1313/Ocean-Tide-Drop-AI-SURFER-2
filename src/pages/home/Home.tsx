import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    console.log("🌊 Home online");
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">

          <h1 className="text-5xl md:text-6xl font-bold">
            🌊 Ocean Tide <span className="text-cyan-400">AI Surfer</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg">
            AI systems that ride your business like a perfect wave.
          </p>

          <div className="mt-10 flex gap-4 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 bg-cyan-500 text-black rounded-xl"
            >
              Enter System
            </Link>

            <Link
              to="/dashboard"
              className="px-6 py-3 border border-cyan-500 rounded-xl"
            >
              Dashboard
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}