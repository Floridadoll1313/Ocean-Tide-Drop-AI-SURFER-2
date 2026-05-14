import React from 'react';
import { motion } from 'motion/react';
import { Settings, Zap, Play, Square, MoreHorizontal } from 'lucide-react';

export const Automations = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Automations</h1>
          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Event Hooks & Triggers</p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-colors">
          + New Hook
        </button>
      </motion.div>
      <div className="space-y-4">
        {[
          { name: 'New User Onboarding Drone', status: 'active', triggers: 'auth.signup', lastRun: '2m ago' },
          { name: 'Weekly Analytics Digest', status: 'paused', triggers: 'cron.weekly', lastRun: '3d ago' },
          { name: 'Payment Failure Recovery', status: 'active', triggers: 'stripe.charge.failed', lastRun: '1hr ago' },
        ].map((auto, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${auto.status === 'active' ? 'bg-emerald-400/10 border-emerald-400/30' : 'bg-slate-500/10 border-slate-500/30'}`}>
                <Zap size={20} className={auto.status === 'active' ? 'text-emerald-400' : 'text-slate-500'} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase italic">{auto.name}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">Hook: {auto.triggers}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden md:block">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Last Run</p>
                <p className="text-sm text-white font-medium">{auto.lastRun}</p>
              </div>
              <div className="flex items-center gap-2">
                {auto.status === 'active' ? (
                  <button className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20" title="Pause">
                    <Square size={16} fill="currentColor" />
                  </button>
                ) : (
                  <button className="p-3 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 rounded-lg transition-colors border border-emerald-400/20" title="Start">
                    <Play size={16} fill="currentColor" />
                  </button>
                )}
                <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
