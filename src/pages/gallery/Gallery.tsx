import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X } from "lucide-react";

const GALLERY_ITEMS = [
  { id: '1', title: "The Outer Banks Pillar", category: "Artisan Legacy", size: "large", color: "#f59e0b", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1000", description: "Inspired by Bull's master structural design on the Outer Banks." },
  { id: '2', title: "Neon Swell", category: "Cinematic", size: "large", color: "#00eaff", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000", description: "Capturing the high-frequency energy of the nocturnal tide." },
  { id: '3', title: "Neural Drift", category: "Abstract", size: "medium", color: "#ff5E00", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000", description: "AI-driven architecture mapped from ocean floor resonance." },
  { id: '4', title: "Synth Tide", category: "Mythic", size: "small", color: "#ec4899", image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1000", description: "Digital dreams rendered in physical structures." },
  { id: '5', title: "Glitch Wave", category: "Technical", size: "medium", color: "#8b5cf6", image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&q=80&w=1000", description: "Precision engineering meets fluid digital aesthetics." },
  { id: '6', title: "Digital Horizon", category: "Cinematic", size: "small", color: "#10b981", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", description: "The convergence of human vision and machine intelligence." },
  { id: '7', title: "Cyber Shore", category: "Mythic", size: "large", color: "#f59e0b", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000", description: "A structural tribute to the guardians of the shore." },
];

const CATEGORIES = ["All", ...new Set(GALLERY_ITEMS.map(item => item.category))];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => 
    filter === "All" || item.category === filter
  );

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6">Master Portfolio</span>
          <h1 className="text-5xl md:text-8xl font-black uppercase text-white tracking-tighter mb-8">
            Selected <span className="text-soul-gradient italic font-serif lowercase">Work.</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-loose">
             From Bull's master-built coastal homes to high-frequency digital architecture—our work is defined by structural integrity and elite growth design.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 px-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                filter === cat 
                ? 'bg-white text-black border-white' 
                : 'bg-zinc-950 text-zinc-500 border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                layoutId={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setSelectedItem(item)}
                className={`group relative overflow-hidden rounded-sm border border-white/10 bg-zinc-900 cursor-pointer
                  ${item.size === 'large' ? 'md:row-span-2' : ''}
                  ${item.size === 'medium' ? 'md:col-span-2' : ''}
                `}
              >
                <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent md:opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-200 mb-2">
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
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LIGHTBOX / FULLSCREEN VIEW */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            
            <motion.div 
              layoutId={selectedItem.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="relative w-full max-w-6xl h-full flex flex-col md:flex-row bg-zinc-950 border border-white/10 rounded-sm overflow-hidden"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/3 h-64 md:h-full relative overflow-hidden">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/3 p-12 flex flex-col justify-center">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-6 block">
                   {selectedItem.category}
                 </span>
                 <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-8 leading-none">
                   {selectedItem.title}
                 </h2>
                 <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-loose mb-12">
                   {selectedItem.description}
                 </p>
                 <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-soul-gradient hover:text-white transition-all">
                       Project Data
                    </button>
                    <button className="p-4 border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                       <Maximize2 className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
