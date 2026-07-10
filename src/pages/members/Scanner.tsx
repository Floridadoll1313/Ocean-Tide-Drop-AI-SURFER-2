import React from "react";

export default function Scanner() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            🔍 AI Business Scanner
          </h1>

          <p className="mt-3 text-white/70">
            Analyze businesses, websites, and automation opportunities.
          </p>

        </div>


        <div className="rounded-3xl bg-white/10 border border-white/10 p-8">

          <h2 className="text-2xl font-bold">
            🌊 Business Intelligence Scanner
          </h2>


          <p className="mt-4 text-white/60">
            Scan businesses and uncover AI automation opportunities,
            marketing improvements, and growth strategies.
          </p>


          <button
            className="
              mt-8
              px-8
              py-3
              rounded-full
              bg-cyan-400
              text-black
              font-bold
              hover:bg-cyan-300
              transition
            "
          >
            Start AI Scan
          </button>

        </div>


        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="rounded-2xl bg-white/10 p-6 border border-white/10">
            <h3 className="font-bold">
              🌐 Website Analysis
            </h3>

            <p className="mt-2 text-white/60">
              Review online presence and opportunities.
            </p>
          </div>


          <div className="rounded-2xl bg-white/10 p-6 border border-white/10">
            <h3 className="font-bold">
              ⚡ Automation Finder
            </h3>

            <p className="mt-2 text-white/60">
              Discover tasks AI can automate.
            </p>
          </div>


          <div className="rounded-2xl bg-white/10 p-6 border border-white/10">
            <h3 className="font-bold">
              💰 Revenue Ideas
            </h3>

            <p className="mt-2 text-white/60">
              Generate business growth suggestions.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}