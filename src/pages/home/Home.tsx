import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { Waves, Zap, Cpu, Palette, Command, MousePointer2, Mail } from "lucide-react";

export default function Home() {
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <PageWrapper maxWidth="max-w-screen-2xl" showHero={false}>
      <div className="flex flex-col items-center text-center min-h-[70vh] justify-center gap-12 max-w-4xl mx-auto">
        {/* CENTERED CONTENT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-white/20"></div>
             <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-500">Since 2024</span>
             <div className="h-[1px] w-12 bg-white/20"></div>
          </div>
          
          <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase text-white">
            Ocean Tide Drop <br />
            <span className="text-soul-gradient italic font-serif lowercase">AI Surfer.</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed font-medium">
            Ocean Tide Drop AI Surfer is a premium marketing agency. We engineer digital high-frequencies that scale brands through architectural AI strategies and elite growth design.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8 mt-4">
             <Link to="/contact" className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-soul-gradient hover:text-white transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
               Start Your Project
             </Link>
             <div className="flex flex-col items-center sm:items-start text-left">
                <span className="text-white font-black text-xs uppercase tracking-widest">Average ROI</span>
                <span className="text-zinc-500 font-bold text-[10px] uppercase">320% Yearly Growth</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* CENTERED VISUAL ELEMENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="mt-20 relative w-full aspect-[21/9] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-white/5 rounded-sm overflow-hidden border border-white/10 group shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 opacity-40"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
           </div>
           
           <div className="relative z-10 flex flex-col items-center justify-center h-full p-10">
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40 mb-4">Architecture Manifest</span>
              <div className="flex items-center gap-10">
                 <div className="flex flex-col items-center">
                    <span className="text-6xl font-black text-white">842</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Brands Scaled</span>
                 </div>
                 <div className="h-20 w-px bg-white/10"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-6xl font-black text-white">94%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Retainer Rate</span>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* STRATEGY PILLARS */}
      <div className="mt-60 grid md:grid-cols-2 gap-20">
         <div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">Our Philosophy</span>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-10 leading-tight">
              We design for <br />
              <span className="text-zinc-600 italic font-serif font-light lowercase">the digital elite.</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed font-medium mb-12">
              Generic marketing is dead. In the age of AI noise, only the most distinct frequencies resonate. We don't just "run ads"—we architect growth ecosystems that evolve with the market.
            </p>
            <Link to="/gallery" className="p-8 border border-white/10 bg-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white flex items-center justify-center">
                     <Command className="w-6 h-6 text-black" />
                  </div>
                  <div>
                     <span className="text-xs font-black uppercase text-white block mb-1">Explore the Archive</span>
                     <span className="text-[10px] uppercase text-zinc-600 font-bold tracking-widest">View 50+ Case Studies</span>
                  </div>
               </div>
               <span className="text-white opacity-0 group-hover:opacity-100 transition-all">→</span>
            </Link>
         </div>
         <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Efficiency", val: "+240%" },
              { label: "Reach", val: "1.2M+" },
              { label: "Engagement", val: "High" },
              { label: "Retainers", val: "94%" }
            ].map((stat, i) => (
              <div key={i} className="p-10 border border-white/5 flex flex-col justify-end min-h-[240px]">
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">{stat.label}</span>
                 <span className="text-5xl font-black text-white">{stat.val}</span>
              </div>
            ))}
         </div>
      </div>

      {/* NEWSLETTER / EMAIL TAKER */}
      <div className="mt-40 p-20 bg-white/5 border border-white/10 rounded-sm relative overflow-hidden accent-glow-cyan">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <Mail className="w-40 h-40" />
        </div>
        <div className="max-w-2xl relative z-10">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">Dispatch</span>
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
             Subscribe to the <span className="text-soul-gradient italic font-serif">Frequency.</span>
           </h2>
           <p className="text-zinc-500 mb-10 font-bold uppercase text-xs tracking-widest leading-loose">
             Get weekly insights on AI growth strategies, market shifts, and elite brand architecture directly in your inbox.
           </p>
           {subscribed ? (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="p-10 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-black uppercase text-xs tracking-widest"
             >
               Frequency Synced. Welcome to the Archive.
             </motion.div>
           ) : (
             <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  required
                  placeholder="EMAIL ADDRESS" 
                  className="flex-1 bg-black border border-white/10 p-5 text-xs font-black tracking-widest text-white focus:outline-none focus:border-white transition-all uppercase"
                />
                <button type="submit" className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all">
                  Join Archive
                </button>
             </form>
           )}
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <div className="mt-40 grid md:grid-cols-3 gap-1px bg-white/10 border border-white/10 overflow-hidden">
         {[
           { title: "Brand Identity", desc: "Creating distinct visual languages for market leaders." },
           { title: "AI Integration", desc: "Automating engagement and content scaling at warp speed." },
           { title: "Growth Design", desc: "Performance-focused aesthetics that convert at first sight." }
         ].map((s, i) => (
           <Link to="/services" key={i} className="bg-black p-12 hover:bg-zinc-900 transition-all cursor-pointer group border-none">
              <span className="text-zinc-600 font-bold mb-8 block text-sm">0{i+1} /</span>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4 group-hover:translate-x-2 transition-transform">{s.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-semibold">{s.desc}</p>
           </Link>
         ))}
      </div>
    </PageWrapper>
  );
}
