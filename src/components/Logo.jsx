import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center overflow-hidden">
        <div className="w-full h-1 bg-black -rotate-45"></div>
      </div>
      <span className="font-display font-bold text-xl tracking-tighter italic uppercase text-white">AI Surfer</span>
    </div>
  );
}
