import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { ShoppingBag, Star, CreditCard, ShieldCheck } from "lucide-react";

const SHOP_ITEMS = [
  {
    id: 1,
    name: "Obsidian Board Set",
    category: "Digital Asset",
    price: "$49.00",
    description: "Multi-layered RAW workflow templates for dark aesthetic brands.",
    image: "🌊",
    color: "#00eaff"
  },
  {
    id: 2,
    name: "Neural Lube v2",
    category: "Optimization",
    price: "$29.00",
    description: "Deep-sea noise reduction presets for cinematic AI video output.",
    image: "⚡",
    color: "#ff5E00"
  },
  {
    id: 3,
    name: "Mythic Font Pack",
    category: "Typography",
    price: "$35.00",
    description: "3 high-frequency italic fonts designed for mythical brand building.",
    image: "🖋️",
    color: "#ec4899"
  }
];

export default function Shop() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-violet-500 mb-6">
            <ShoppingBag className="w-3 h-3" />
            Digital Outpost 01
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Gear <span className="text-violet-500">Shop</span>
          </h1>
          <p className="mt-6 text-white/40 text-sm md:text-base uppercase tracking-[0.2em] font-medium text-center max-w-2xl">
            Acquire high-frequency digital assets to enhance your creative output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOP_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card flex flex-col items-center text-center p-8 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-violet-500/30 transition-all duration-500 group"
            >
              <div 
                className="w-full aspect-square rounded-[2rem] bg-black/40 border border-white/5 mb-8 flex items-center justify-center text-7xl relative overflow-hidden group-hover:border-violet-500/20 transition-all"
              >
                <div className="z-10 group-hover:scale-110 transition-transform duration-500">{item.image}</div>
                <div 
                   className="absolute inset-x-0 bottom-0 h-1/2 opacity-20 blur-3xl"
                   style={{ backgroundColor: item.color }}
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2 h-2 text-yellow-500 fill-yellow-500" />)}
              </div>
              
              <h3 className="text-xl font-black italic uppercase text-white mb-2 tracking-tighter">
                {item.name}
              </h3>
              
              <div className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-4">
                {item.category}
              </div>

              <p className="text-white/40 text-[10px] leading-relaxed mb-8 flex-grow uppercase tracking-wider">
                {item.description}
              </p>

              <div className="w-full pt-8 border-t border-white/5 flex flex-col gap-4">
                <div className="text-2xl font-black italic text-white tracking-tighter">
                  {item.price}
                </div>
                <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-violet-500 hover:text-black hover:border-violet-500 transition-all shadow-[0_0_20px_rgba(139,92,246,0)] hover:shadow-[0_10px_30px_rgba(139,92,246,0.3)]">
                  Add to Payload
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[3.5rem] border border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">Secure Logistics</h3>
            <p className="text-white/40 text-xs font-black uppercase tracking-widest leading-loose">
              All digital assets are delivered instantly via encrypted neural link. <br />
              No physical shipments are processed from this outpost.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-2">
               <div className="p-4 rounded-2xl bg-white/5 text-white/40"><ShieldCheck className="w-8 h-8"/></div>
               <span className="text-[8px] font-black uppercase tracking-widest text-white/20 text-center">Encrypted<br/>Transactions</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="p-4 rounded-2xl bg-white/5 text-white/40"><CreditCard className="w-8 h-8"/></div>
               <span className="text-[8px] font-black uppercase tracking-widest text-white/20 text-center">Auth-Link<br/>Payments</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
