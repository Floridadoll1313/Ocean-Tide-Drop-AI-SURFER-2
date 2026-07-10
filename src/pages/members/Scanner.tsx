import React from "react";

export default function Scanner() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          🌊 AI Business Scanner
        </h1>

        <p className="text-white/70 mb-8">
          Scan businesses, websites, and opportunities with AI analysis.
        </p>


        <div className="rounded-3xl bg-white/10 border border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-4">
            🔍 Business Intelligence Scanner
          </h2>

          <p className="text-white/60">
            This tool will analyze websites, marketing, automation gaps,
            and revenue opportunities.
          </p>


          <button
            className="
              mt-6
              px-6
              py-3
              rounded-full
              bg-cyan-400
              text-black
              font-bold
              hover:bg-cyan-300
              transition
            "
          >
            Start Scan
          </button>

        </div>

      </div>
    </div>
  );
}
