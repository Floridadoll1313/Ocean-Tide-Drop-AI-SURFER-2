import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, Hash, Users, Bot } from 'lucide-react';

export const MemberChat = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 h-[calc(100vh-80px)] flex flex-col">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Collective Comms</h1>
        <p className="text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mt-2">Global Channel</p>
      </motion.div>
      <div className="flex-1 glass-card rounded-3xl border border-white/10 bg-white/5 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 bg-black/40 hidden md:flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Channels</h3>
          </div>
          <div className="p-2 space-y-1">
            {['General', 'Announcements', 'Support', 'Feedback'].map((chan, i) => (
              <button key={i} className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-colors ${i === 0 ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
                <Hash size={16} /> <span className="text-sm font-bold">{chan}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 flex flex-col items-center justify-center opacity-50 relative overflow-hidden">
             <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
             <MessageSquare size={64} className="text-neon-cyan mb-6 relative z-10" />
             <p className="text-white text-xl font-black italic uppercase tracking-widest relative z-10 text-center">Comms Uplink<br/>Establishing Connection...</p>
          </div>
          <div className="p-4 border-t border-white/10 bg-black/40 flex items-center gap-4">
             <input type="text" disabled placeholder="Connecting to relay..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none opacity-50 cursor-not-allowed" />
             <button disabled className="p-3 bg-neon-cyan/50 text-black rounded-xl opacity-50 cursor-not-allowed">
               <Send size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
