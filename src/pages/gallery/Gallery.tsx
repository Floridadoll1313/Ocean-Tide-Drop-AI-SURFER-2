import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { Image as ImageIcon, Maximize2, Zap } from "lucide-react";

const GALLERY_ITEMS = [
  { id: 'bull-1', title: "The Hatteras Pillar", category: "Artisan Legacy", size: "large", color: "#f59e0b", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1000", description: "Inspired by Bull's master structural design." },
  { id: 1, title: "Neon Swell", category: "Cinematic", size: "large", color: "#00eaff", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, title: "Neural Drift", category: "Abstract", size: "medium", color: "#ff5E00", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, title: "Synth Tide", category: "Mythic", size: "small", color: "#ec4899", image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, title: "Glitch Wave", category: "Technical", size: "medium", color: "#8b5cf6", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=1000" },
  { id: 5, title: "Digital Horizon", category: "Cinematic", size: "small", color: "#10b981", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" },
  { id: 6, title: "Cyber Shore", category: "Mythic", size: "large", color: "#f59e0b", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000" },
];

export default function Gallery() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6">Master Portfolio</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase text-white tracking-tighter mb-8">
            Selected <span className="text-soul-gradient italic font-serif lowercase">Work.</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-loose">
             From Bull's master-built homes on Hatteras Island to high-frequency digital architecture—our work is defined by structural integrity and elite growth design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[400px]">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className={`group relative overflow-hidden rounded-sm border border-white/10 bg-zinc-900 cursor-pointer
                ${item.size === 'large' ? 'md:row-span-2' : ''}
                ${item.size === 'medium' ? 'md:col-span-2' : ''}
              `}
            >
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent md:opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">
                   {item.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter">
                  {item.title}
                </h3>
              </div>

              <div 
                className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
