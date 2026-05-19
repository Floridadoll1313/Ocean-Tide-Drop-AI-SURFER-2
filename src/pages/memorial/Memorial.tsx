import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion, AnimatePresence } from "motion/react";
import { Waves, Heart, MapPin, Anchor, Hammer, Ruler, X, Send, Loader2, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Story {
  id: string;
  name: string;
  content: string;
  created_at: unknown;
}

export default function Memorial() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "memorial_stories"),
      orderBy("created_at", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const storyData: Story[] = [];
      snapshot.forEach((doc) => {
        storyData.push({ id: doc.id, ...doc.data() } as Story);
      });
      setStories(storyData);
      setLoadingStories(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !storyContent) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "memorial_stories"), {
        name: authorName,
        content: storyContent,
        created_at: serverTimestamp()
      });
      setSubmitted(true);
      setAuthorName("");
      setStoryContent("");
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding story:", error);
      alert("Failed to share memory. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">
            <Anchor className="w-3 h-3" />
            The Salvo Sanctuary
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter drop-shadow-[0_0_15px_rgba(30,144,255,0.3)] font-orbitron">
            Bull's <span className="text-cyan-400">Memorial</span>
          </h1>
          <p className="mt-6 text-white/70 text-sm md:text-base uppercase tracking-[0.2em] font-medium max-w-3xl leading-relaxed">
            Honoring the coastal legacy of <span className="text-cyan-300 font-extrabold pb-1 border-b border-cyan-400/30">Johnny Burgess Hooper ("Bull")</span> — The Master Carpenter whose legendary craftsmanship built the very skyline of Salvo, NC, and the tri-villages.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 group animate-float"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0">
               <img 
                 src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000" 
                 alt="Salvo Beach and Pamlico Sound" 
                 className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-cyan-950/20">
               <Waves className="w-32 h-32 text-cyan-400/20 animate-pulse" />
            </div>
            
            <div className="absolute bottom-12 left-12 right-12 z-20">
              <div className="flex items-center gap-3 text-cyan-400 mb-2">
                <MapPin className="w-4 h-4 animate-bounce" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-shadow-sm">Salvo, Outer Banks</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white tracking-tighter">Johnny Burgess Hooper</h2>
              <p className="text-cyan-300/80 text-sm font-black uppercase tracking-widest mt-2 font-mono">"Bull" — Anchored in Salvo soundside & shores</p>
            </div>
          </motion.div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <Hammer className="w-24 h-24" />
              </div>
              <Ruler className="w-8 h-8 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-black italic uppercase text-white mb-4 tracking-tighter font-orbitron">Outer Banks Masterclass Integrity</h3>
              <p className="text-white/70 text-base leading-relaxed font-sans">
                Johnny "Bull" Burgess Hooper was a cornerstone of the coastal surfer community. Operating primarily out of Salvo, NC, his master carpentry hands raised resilient beach homes and coastal landmarks engineered to stand strong against the fierce Atlantic ocean storms. Every rafter, joist, and deck he framed is a testament to honest craftsmanship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <Anchor className="w-24 h-24" />
              </div>
              <Waves className="w-8 h-8 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-black italic uppercase text-white mb-4 tracking-tighter font-orbitron">The Wind and Sound of Salvo</h3>
              <p className="text-white/70 text-base leading-relaxed font-sans">
                Like the persistent breezes blowing across the Salvo Day Use Area and the Pamlico Sound, Bull's influence lives on in the very wood and structure of our Outer Banks tri-villages. He built with heart, precision, and an unshakeable dedication. His architectural legacy remains a radiant beacon for all who treasure the ocean life and authentic quality.
              </p>
            </motion.div>

            <div className="pt-6 flex gap-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 py-5 rounded-2xl bg-cyan-400 text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_30px_rgba(6,182,212,0.3)] font-mono"
              >
                Share a memory of Bull
              </button>
              <Link 
                to="/gallery"
                className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center font-mono"
              >
                Work Gallery
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-white/5 text-center">
          <p className="text-cyan-400/30 text-[10px] font-black uppercase tracking-[1em] mb-10 font-mono">Forever in the Waves & Wind of Salvo</p>
          <div className="flex justify-center gap-10">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping delay-100" />
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping delay-200" />
          </div>
        </div>
        {/* STORIES SECTION */}
        <div className="mt-40 max-w-4xl mx-auto">
           <div className="text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6 block">Legacy Resonance</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Shared <span className="text-blue-500 italic font-serif lowercase">Memories.</span></h2>
           </div>

           {loadingStories ? (
             <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
             </div>
           ) : stories.length > 0 ? (
             <div className="grid gap-8">
                {stories.map((story) => (
                  <motion.div 
                    key={story.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-10 bg-white/5 border border-white/10 rounded-[2rem] relative"
                  >
                    <Quote className="absolute top-10 right-10 w-12 h-12 text-blue-500/10" />
                    <p className="text-lg text-white font-medium leading-relaxed mb-6 italic">
                      "{story.content}"
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="h-px w-8 bg-blue-500/30"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{story.name}</span>
                    </div>
                  </motion.div>
                ))}
             </div>
           ) : (
             <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[2rem]">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6">No memories shared yet. Be the first.</p>
                <button 
                   onClick={() => setIsModalOpen(true)}
                   className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                >
                   Share a memory
                </button>
             </div>
           )}
        </div>
      </div>

      {/* SHARE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-black/90 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-xl bg-zinc-900 border border-white/10 p-10 rounded-[3rem] shadow-2xl"
             >
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">Share a <span className="text-blue-500">Memory.</span></h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-white/5 text-zinc-500 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {submitted ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Heart className="w-8 h-8 text-blue-500 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-black uppercase text-white">Memory Captured</h4>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Thank you for honoring Bull's legacy.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Your Name</label>
                       <input 
                         type="text"
                         required
                         value={authorName}
                         onChange={(e) => setAuthorName(e.target.value)}
                         placeholder="Enter your name"
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">The Story</label>
                       <textarea 
                         required
                         rows={5}
                         value={storyContent}
                         onChange={(e) => setStoryContent(e.target.value)}
                         placeholder="What was your favorite memory of Bull?"
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                       />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-500 disabled:opacity-50 transition-all"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {isSubmitting ? "Submitting..." : "Send to the Sanctuarry"}
                    </button>
                  </form>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
