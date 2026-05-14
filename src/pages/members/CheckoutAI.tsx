import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Bot, ArrowRight } from 'lucide-react';

export const CheckoutAI = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white">Checkout AI</h1>
        <p className="text-neon-pink text-[10px] font-black uppercase tracking-[0.3em] mt-2">Conversion Intelligence</p>
      </motion.div>
      <div className="glass-card p-12 rounded-[3rem] border border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-black text-center max-w-3xl mx-auto">
        <div className="w-24 h-24 mx-auto rounded-full bg-neon-pink/10 flex items-center justify-center mb-8 border border-neon-pink/20">
          <ShoppingCart size={40} className="text-neon-pink" />
        </div>
        <h2 className="text-3xl font-black italic text-white uppercase mb-4">Smart Cart Generation</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Describe the product, pricing tier, and checkout requirements. The neural engine will construct an optimized Stripe integration and frictionless UI module.
        </p>
        <div className="flex items-center p-2 bg-black/40 border border-white/10 rounded-2xl">
          <Bot size={24} className="text-slate-500 ml-4" />
          <input type="text" placeholder="E.g., Subscription for $49/mo with 7-day trial..." className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none text-sm placeholder:text-slate-600" />
          <button className="bg-neon-pink text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all flex items-center gap-2">
            Generate <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
