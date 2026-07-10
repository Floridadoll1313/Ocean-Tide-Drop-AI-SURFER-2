import React from "react";

export default function Leads() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            🌊 AI Lead Harbor
          </h1>

          <p className="mt-3 text-white/70">
            Capture, organize, and nurture business leads with AI-powered workflows.
          </p>
        </div>


        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-2xl bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-bold">
              🐚 New Leads
            </h2>

            <p className="mt-3 text-white/60">
              Track new prospects entering your business pipeline.
            </p>
          </div>


          <div className="rounded-2xl bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-bold">
              🤖 AI Follow Ups
            </h2>

            <p className="mt-3 text-white/60">
              Let AI help create follow-up messages and customer journeys.
            </p>
          </div>


          <div className="rounded-2xl bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-bold">
              📈 Revenue Signals
            </h2>

            <p className="mt-3 text-white/60">
              Identify your hottest opportunities and growth waves.
            </p>
          </div>

        </div>


        <div className="mt-10 rounded-3xl bg-white/10 border border-white/10 p-8">

          <h2 className="text-2xl font-bold">
            AI Lead Command Center
          </h2>

          <p className="mt-3 text-white/60">
            Your future lead database, AI scoring system, and automated sales engine
            will connect here.
          </p>

        </div>

      </div>
    </div>
  );
}