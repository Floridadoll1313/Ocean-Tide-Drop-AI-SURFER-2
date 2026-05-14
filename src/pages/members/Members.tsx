import React from "react";

export default function Members() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase text-[#00eaff] mb-4">Members Sanctum</h1>
        <p className="text-white/60 mb-8 max-w-md text-center">Welcome to the inner realm of Ocean Tide Drop AI Surfer.</p>
        <a href="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors uppercase tracking-widest text-xs font-bold rounded-xl">Return to the surface</a>
    </div>
  )
}
