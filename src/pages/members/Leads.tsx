import React from "react";

export default function Leads() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          🌊 AI Lead Harbor
        </h1>

        <p className="text-white/70 mb-8">
          Capture, organize, and nurture your business leads with AI-powered workflows.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="rounded-2xl bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-bold">
              🐚 New Leads
            </h2>
            <p className="mt-3 text-white/60">
              Track incoming prospects and opportunities.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-bold">
              🤖 AI Follow Ups
            </h2>
            <p className="mt-3 text-white/60">
              Let AI help manage conversations and reminders.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-bold">
              📈 Revenue Signals
            </h2>
            <p className="mt-3 text-white/60">
              Discover which leads are ready to ride the wave.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
