import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion, AnimatePresence } from "motion/react";
import { X, Share2, Link2, Twitter, Facebook, Linkedin, Mail, Check } from "lucide-react";

const GALLERY_ITEMS = [
  { id: '1', title: "The Charleston Pillar", category: "Artisan Legacy", size: "large", color: "#f59e0b", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1000", description: "Inspired by Bull's master structural design in Charleston." },
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
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLightboxSharing, setIsLightboxSharing] = useState(false);
  const [showProjectData, setShowProjectData] = useState(false);

  // Active parameter listener for real-world dynamic loading
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemParam = params.get("item");
    if (itemParam) {
      const match = GALLERY_ITEMS.find((itm) => itm.id === itemParam);
      if (match) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedItem(match);
      }
    }
  }, []);

  const handleShareClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSharingId(id);
  };

  const handleCopyLink = (item: typeof GALLERY_ITEMS[0]) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?item=${item.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Link copy action failed:", err);
      });
  };

  const filteredItems = GALLERY_ITEMS.filter(item => 
    filter === "All" || item.category === filter
  );

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedId && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-zinc-900 border border-emerald-500/50 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-3 backdrop-blur-md"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold uppercase tracking-widest">Link Copied to Clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

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
                onClick={() => {
                  setSelectedItem(item);
                  setShowProjectData(false);
                }}
                className={`group relative overflow-hidden rounded-sm border border-white/10 bg-zinc-900 cursor-pointer
                  hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(0,234,255,0.08)] transition-all duration-700
                  ${item.size === 'large' ? 'md:row-span-2' : ''}
                  ${item.size === 'medium' ? 'md:col-span-2' : ''}
                `}
              >
                {/* SHARE TRIGGER BUTTON */}
                <button
                  onClick={(e) => handleShareClick(e, item.id)}
                  className="absolute top-6 right-6 z-30 p-2.5 bg-black/60 hover:bg-[#00eaff] border border-white/10 hover:border-[#00eaff] text-zinc-300 hover:text-black rounded-full transition-all duration-300 backdrop-blur-md opacity-100 md:opacity-0 group-hover:opacity-100"
                  title="Share Legacy Artwork"
                >
                  <Share2 className="w-3.5 h-3.5 animate-pulse" />
                </button>

                {/* ANIMATED HOVER TEXT & GRADIENT BAR EFFECT */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00eaff]/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-20" />

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

                {/* INLINE ANIMATED SHARE PANEL OVERLAY */}
                <AnimatePresence>
                  {sharingId === item.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute inset-0 z-40 bg-black/95 p-8 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00eaff]">Share Legacy Work</span>
                        <button 
                          onClick={() => setSharingId(null)}
                          className="p-1 px-3 bg-white/5 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white rounded transition-all text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5"
                        >
                          <X className="w-3 h-3" /> Back
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col justify-center gap-4">
                        {/* Copy Link button */}
                        <button 
                          onClick={() => handleCopyLink(item)}
                          className="w-full bg-white/5 border border-white/15 hover:border-cyan-400/40 py-3.5 px-4 flex items-center justify-between text-left transition-all hover:bg-white/10 rounded group/btn"
                        >
                          <span className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-wider">
                            {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Link2 className="w-4 h-4 text-[#00eaff]" />}
                            {copiedId === item.id ? "Asset Link Copied" : "Copy Live Link"}
                          </span>
                        </button>

                        {/* Social grid */}
                        <div className="grid grid-cols-4 gap-2">
                          <a 
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out legacy work "${item.title}" from the master-built portfolio`)}&url=${encodeURIComponent(`${window.location.origin}/gallery?item=${item.id}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/10 p-3.5 flex flex-col items-center justify-center rounded group/soc transition-transform hover:-translate-y-0.5"
                          >
                            <Twitter className="w-4 h-4 text-zinc-400 group-hover/soc:text-[#00eaff] transition-colors" />
                            <span className="text-[8px] font-black tracking-widest text-zinc-500 uppercase mt-1.5 group-hover/soc:text-[#00eaff]">X</span>
                          </a>

                          <a 
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/gallery?item=${item.id}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/10 p-3.5 flex flex-col items-center justify-center rounded group/soc transition-transform hover:-translate-y-0.5"
                          >
                            <Linkedin className="w-4 h-4 text-zinc-400 group-hover/soc:text-[#00eaff] transition-colors" />
                            <span className="text-[8px] font-black tracking-widest text-zinc-500 uppercase mt-1.5 group-hover/soc:text-[#00eaff]">LN</span>
                          </a>

                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/gallery?item=${item.id}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/10 p-3.5 flex flex-col items-center justify-center rounded group/soc transition-transform hover:-translate-y-0.5"
                          >
                            <Facebook className="w-4 h-4 text-zinc-400 group-hover/soc:text-[#00eaff] transition-colors" />
                            <span className="text-[8px] font-black tracking-widest text-zinc-500 uppercase mt-1.5 group-hover/soc:text-[#00eaff]">FB</span>
                          </a>

                          <a 
                            href={`mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(`Checkout legacy artwork "${item.title}" at our high-frequency portfolio:\n\n${window.location.origin}/gallery?item=${item.id}`)}`}
                            className="bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-400/10 p-3.5 flex flex-col items-center justify-center rounded group/soc transition-transform hover:-translate-y-0.5"
                          >
                            <Mail className="w-4 h-4 text-zinc-400 group-hover/soc:text-[#00eaff] transition-colors" />
                            <span className="text-[8px] font-black tracking-widest text-zinc-500 uppercase mt-1.5 group-hover/soc:text-[#00eaff]">MAIL</span>
                          </a>
                        </div>
                      </div>

                      <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest text-center">
                        Active Node Transport Layer
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              onClick={() => {
                setSelectedItem(null);
                setIsLightboxSharing(false);
                setShowProjectData(false);
              }}
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
                onClick={() => {
                  setSelectedItem(null);
                  setIsLightboxSharing(false);
                  setShowProjectData(false);
                }}
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
                 <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                       <button onClick={() => setShowProjectData(!showProjectData)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${showProjectData ? 'bg-cyan-400 text-black' : 'bg-white text-black hover:bg-soul-gradient hover:text-white'}`}>
                          {showProjectData ? 'Hide Data' : 'Project Data'}
                       </button>
                       <button 
                         onClick={() => setIsLightboxSharing(!isLightboxSharing)}
                         className={`p-4 border transition-all ${isLightboxSharing ? "bg-cyan-400 border-cyan-400 text-black hover:bg-white" : "border-white/10 text-white hover:bg-white hover:text-black"}`}
                         title="Share"
                       >
                          <Share2 className="w-4 h-4" />
                       </button>
                    </div>

                    <AnimatePresence>
                      {showProjectData && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden border-t border-white/5 mt-4 pt-4 text-xs text-zinc-400"
                        >
                           <ul className="space-y-2">
                             <li className="flex justify-between">
                               <span className="uppercase tracking-widest text-[#00eaff] font-mono">Status:</span>
                               <span className="text-white">Deployed</span>
                             </li>
                             <li className="flex justify-between">
                               <span className="uppercase tracking-widest text-[#00eaff] font-mono">Category:</span>
                               <span className="text-white">{selectedItem.category}</span>
                             </li>
                             <li className="flex justify-between">
                               <span className="uppercase tracking-widest text-[#00eaff] font-mono">System ID:</span>
                               <span className="text-white">{selectedItem.id}</span>
                             </li>
                           </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Lightbox Inline Sharing Panel */}
                    <AnimatePresence>
                      {isLightboxSharing && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden border-t border-white/5 pt-4"
                        >
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00eaff] mb-3 block">Share Artwork Hub</span>
                          
                          <div className="grid grid-cols-5 gap-2">
                            <button 
                              onClick={() => handleCopyLink(selectedItem)}
                              className="bg-white/5 border border-white/10 hover:border-[#00eaff] hover:bg-cyan-400/10 p-3 h-12 flex items-center justify-center rounded transition-all"
                              title="Copy link to clipboard"
                            >
                              {copiedId === selectedItem.id ? (
                                <Check className="w-4.5 h-4.5 text-emerald-400" />
                              ) : (
                                <Link2 className="w-4.5 h-4.5 text-zinc-400 hover:text-white" />
                              )}
                            </button>

                            <a 
                              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out "${selectedItem.title}" on AI Surfer`)}&url=${encodeURIComponent(`${window.location.origin}/gallery?item=${selectedItem.id}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/5 border border-white/10 hover:border-[#00eaff] hover:bg-cyan-400/10 flex items-center justify-center rounded transition-all"
                            >
                              <Twitter className="w-4 h-4 text-zinc-400" />
                            </a>

                            <a 
                              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/gallery?item=${selectedItem.id}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/5 border border-white/10 hover:border-[#00eaff] hover:bg-cyan-400/10 flex items-center justify-center rounded transition-all"
                            >
                              <Linkedin className="w-4 h-4 text-zinc-400" />
                            </a>

                            <a 
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/gallery?item=${selectedItem.id}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/5 border border-white/10 hover:border-[#00eaff] hover:bg-cyan-400/10 flex items-center justify-center rounded transition-all"
                            >
                              <Facebook className="w-4 h-4 text-zinc-400" />
                            </a>

                            <a 
                              href={`mailto:?subject=${encodeURIComponent(selectedItem.title)}&body=${encodeURIComponent(`Check out legacy asset "${selectedItem.title}" here:\n\n${window.location.origin}/gallery?item=${selectedItem.id}`)}`}
                              className="bg-white/5 border border-white/10 hover:border-[#00eaff] hover:bg-cyan-400/10 flex items-center justify-center rounded transition-all"
                            >
                              <Mail className="w-4 h-4 text-zinc-400" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

