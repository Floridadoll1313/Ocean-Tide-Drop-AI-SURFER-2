import React from "react";

export default function UpgradeTrailer({ tier }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-xl">

      <div className="text-center space-y-4 animate-pulse">

        <div className="text-cyan-300 text-4xl font-black tracking-widest">
          UNLOCKING {tier.toUpperCase()}
        </div>

        <p className="text-white/60 text-sm">
          Previewing premium AI systems...
        </p>

        <div className="w-40 h-1 bg-cyan-500/30 mx-auto overflow-hidden rounded-full">
          <div className="h-full w-full bg-cyan-400 animate-[ping_1s_infinite]" />
        </div>

      </div>
    </div>
  );
}