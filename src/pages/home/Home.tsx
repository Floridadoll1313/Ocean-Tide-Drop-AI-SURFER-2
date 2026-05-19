import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { 
  Waves, Bot, Cpu, Headset, 
  Globe, Palette, Smartphone, Search,
  TrendingUp, Database, Mail, Zap,
  Activity, Rocket,
  CheckCircle2, ArrowRight, Star
} from "lucide-react";
import cyberSurferWave from "../../assets/images/cyber_surfer_wave_1779220118634.png";

export default function Home() {
  return (
    <PageWrapper maxWidth="max-w-screen-2xl" showHero={false}>
      {/* 🌊 HERO SECTION */}
      <div className="flex flex-col items-center text-center max-w-6xl mx-auto relative mt-16 px-6">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-950/35 blur-[120px] mix-blend-screen rounded-full pointer-events-none"></div>

        {/* 1. Main Words at the Top */}
        <motion.div 
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 relative z-10 max-w-4xl"
        >
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-cyan-500/50"></div>
             <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-400">AI Surfer Core Systems</span>
             <div className="h-[1px] w-12 bg-cyan-500/50"></div>
          </div>
          
          <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-orbitron font-black leading-[1.15] tracking-tighter uppercase text-white">
            AI Systems That Help Businesses <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">Surf Faster</span>, Sell Smarter, <br />
            <span className="italic font-serif text-pink-500 lowercase tracking-normal">and scale smoothly.</span>
          </h1>

          <p className="text-base md:text-lg text-cyan-100 max-w-2xl leading-relaxed font-sans font-medium">
            Storm-resilient AI automation, high-converting websites, and smart business tools built for high-frequency surfing.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 mb-12">
             <Link to="/contact" className="px-10 py-5 bg-cyan-500/10 border border-cyan-400/80 text-cyan-400 hover:bg-cyan-400 hover:text-black font-black uppercase text-xs tracking-[0.2em] transition-all transform hover:scale-105 flex items-center gap-3">
               🚀 Book a Call
             </Link>
             <Link to="/gallery" className="px-10 py-5 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center gap-3">
               🌺 See Our Work
             </Link>
          </div>
        </motion.div>

        {/* 2. Enticing Image Box with Cyber Floating Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative w-full z-10 rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(6,182,212,0.15)] group max-w-5xl"
        >
          {/* Neon corner trims */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-pink-400 z-20"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400 z-20"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-20"></div>

          {/* Immersive overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
          
          {/* Cyber Status Tag */}
          <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10 rounded-sm flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-[9px] font-bold text-white uppercase tracking-widest font-mono">Surfer Telemetry Active_</span>
          </div>

          <motion.div
            whileHover={{ scale: 1.025 }}
            transition={{ type: "spring", stiffness: 150, damping: 25 }}
            className="overflow-hidden"
          >
            <img 
              src={cyberSurferWave} 
              alt="Cyber Surfer riding a neon wave under cosmic skies" 
              className="w-full h-auto aspect-[16/9] object-cover transition-all duration-700 opacity-90 group-hover:scale-105 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 🐚 WHAT YOU DO */}
      <div className="mt-40 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-cyan-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tight text-white">
            Our Tooling <span className="text-pink-500 italic font-serif lowercase">Arsenal</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category 1 */}
          <div className="glass-card p-10 border-t-2 border-t-blue-500 hover:border-t-cyan-400 transition-all group">
            <Cpu className="w-12 h-12 text-blue-500 mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black uppercase text-white mb-6">AI Services</h3>
            <ul className="space-y-4 text-slate-100 font-bold font-sans">
              <li className="flex items-center gap-3"><Bot className="w-4 h-4 text-cyan-400" /> AI Chatbots</li>
              <li className="flex items-center gap-3"><Activity className="w-4 h-4 text-cyan-400" /> Workflow Automation</li>
              <li className="flex items-center gap-3"><Cpu className="w-4 h-4 text-cyan-400" /> AI Assistants</li>
              <li className="flex items-center gap-3"><Headset className="w-4 h-4 text-cyan-400" /> Customer Support AI</li>
            </ul>
          </div>

          {/* Category 2 */}
          <div className="glass-card p-10 border-t-2 border-t-pink-500 hover:border-t-pink-400 transition-all group">
            <Globe className="w-12 h-12 text-pink-500 mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black uppercase text-white mb-6">Web Services</h3>
            <ul className="space-y-4 text-slate-100 font-bold font-sans">
              <li className="flex items-center gap-3"><Globe className="w-4 h-4 text-pink-400" /> React/Vite Websites</li>
              <li className="flex items-center gap-3"><Palette className="w-4 h-4 text-pink-400" /> Landing Pages</li>
              <li className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-pink-400" /> Mobile Optimization</li>
              <li className="flex items-center gap-3"><Search className="w-4 h-4 text-pink-400" /> SEO Setup</li>
            </ul>
          </div>

          {/* Category 3 */}
          <div className="glass-card p-10 border-t-2 border-t-emerald-400 hover:border-t-emerald-300 transition-all group">
            <TrendingUp className="w-12 h-12 text-emerald-400 mb-8 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black uppercase text-white mb-6">Business Growth</h3>
            <ul className="space-y-4 text-slate-100 font-bold font-sans">
              <li className="flex items-center gap-3"><Database className="w-4 h-4 text-emerald-400" /> Lead Capture Systems</li>
              <li className="flex items-center gap-3"><Database className="w-4 h-4 text-emerald-400" /> CRM Integration</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-emerald-400" /> Email/SMS Automation</li>
              <li className="flex items-center gap-3"><TrendingUp className="w-4 h-4 text-emerald-400" /> Brand Strategy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🌴 "HOW IT WORKS" */}
      <div className="mt-40 max-w-7xl mx-auto relative">
        <div className="text-center mb-24 relative z-10">
           <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tight text-white mb-6">
             The 3-Step <span className="text-cyan-400">Wave Flow</span>
           </h2>
           <p className="text-[#00eaff] font-sans max-w-2xl mx-auto text-lg font-bold">We turn complex technology constraints into seamless digital velocity.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          <div className="relative text-center p-8 group">
             <div className="w-20 h-20 mx-auto bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mb-8 group-hover:bg-blue-500/20 transition-all">
                <Waves className="w-8 h-8 text-blue-400" />
             </div>
             <h4 className="text-xl font-bold text-white mb-4">1. Catch the Wave 🌊</h4>
             <p className="text-slate-100 font-sans line-clamp-3 font-medium">We learn your business. Deep discovery to understand your operational bottlenecks and growth desires.</p>
          </div>
          
          <div className="relative text-center p-8 group">
             <div className="w-20 h-20 mx-auto bg-pink-500/10 border border-pink-500/30 rounded-full flex items-center justify-center mb-8 group-hover:bg-pink-500/20 transition-all">
                <Zap className="w-8 h-8 text-pink-400" />
             </div>
             <h4 className="text-xl font-bold text-white mb-4">2. Build the Current ⚡</h4>
             <p className="text-slate-100 font-sans line-clamp-3 font-medium">We create your AI systems and web tools utilizing state-of-the-art React, Vite, and Tailwind workflows.</p>
          </div>

          <div className="relative text-center p-8 group">
             <div className="w-20 h-20 mx-auto bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-8 group-hover:bg-emerald-500/20 transition-all">
                <Rocket className="w-8 h-8 text-emerald-400" />
             </div>
             <h4 className="text-xl font-bold text-white mb-4">3. Ride the Growth 🐬</h4>
             <p className="text-slate-100 font-sans line-clamp-3 font-medium">Automation helps your business scale. Watch your conversion metrics and task efficiency skyrocket.</p>
          </div>
        </div>
      </div>

      {/* 🌺 FEATURED PROJECTS */}
      <div className="mt-40 relative z-10 py-20 border-y border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <div>
              <span className="text-pink-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Archive</span>
              <h2 className="text-4xl md:text-5xl font-orbitron font-black uppercase tracking-tight text-white max-w-xl">
                Featured Concept Systems
              </h2>
            </div>
            <Link to="/gallery" className="text-cyan-400 font-bold uppercase text-xs tracking-widest hover:text-white transition-all flex items-center gap-2 mt-6 md:mt-0">
               View Full Archive <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
               <div className="relative aspect-video rounded-sm overflow-hidden mb-6 bg-zinc-900 border border-white/10 group-hover:border-cyan-400 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <span className="bg-cyan-500 text-black px-3 py-1 font-bold text-[10px] uppercase tracking-widest mb-4 inline-block">AI Automations</span>
                     <h3 className="text-2xl font-black text-white">Neural Real Estate Agent</h3>
                  </div>
               </div>
            </div>

            <div className="group cursor-pointer">
               <div className="relative aspect-video rounded-sm overflow-hidden mb-6 bg-zinc-900 border border-white/10 group-hover:border-pink-400 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-900/40 to-purple-900/40 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <span className="bg-pink-500 text-black px-3 py-1 font-bold text-[10px] uppercase tracking-widest mb-4 inline-block">Web Platform</span>
                     <h3 className="text-2xl font-black text-white">E-Commerce Hyper-Scale</h3>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🐠 WHY CHOOSE YOU */}
      <div className="mt-40 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-4xl md:text-5xl font-orbitron font-black uppercase tracking-tight text-white mb-8">
                Tech Agency Meets <span className="text-cyan-400">Beach Energy.</span>
              </h2>
              <p className="text-slate-100 font-sans text-lg mb-10 leading-relaxed font-semibold">
                Not corporate drywall energy. We bring high-end developmental power with smooth, personalized collaboration. You get an elite engineering outfit that actually feels good to work with.
              </p>

              <ul className="space-y-6">
                {[
                  "Fast deployment cycles via Vite & React",
                  "Modern AI model integrations out-of-the-box",
                  "Mobile-first, conversion-heavy design architectures",
                  "Personalized support workflows directly with founders",
                  "Hyper-automation-focused digital strategy"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium font-sans">
                     <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                     </div>
                     {item}
                  </li>
                ))}
              </ul>
           </div>
           
           <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-white/10 rounded-sm relative overflow-hidden group">
                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-10">
                    <h3 className="text-4xl font-black text-white opacity-40 uppercase tracking-tighter mix-blend-overlay">Ocean Tide Drop</h3>
                    <h3 className="text-4xl font-black text-cyan-400 tracking-tighter -mt-4 mix-blend-screen">AI SURFER</h3>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 🌊 TESTIMONIALS */}
      <div className="mt-40 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/5 pt-32">
         <div className="text-center mb-20">
           <span className="text-cyan-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Telemetry</span>
           <h2 className="text-4xl font-orbitron font-black uppercase text-white mb-4">Client Feedback</h2>
         </div>
 
         <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 border-l-2 border-l-cyan-400 flex flex-col">
               <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-cyan-400 text-cyan-400" />)}
               </div>
               <p className="text-white font-sans text-lg leading-relaxed mb-8">"Made our workflow 10x easier. Their AI integration completely shifted how we manage incoming requests."</p>
               <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full border border-white/20 flex items-center justify-center font-bold text-xs">TV</div>
                  <div>
                     <h5 className="text-white font-bold text-sm">Thomas Vance</h5>
                     <span className="text-[10px] text-cyan-300 font-black uppercase tracking-widest">CEO, NexaStream</span>
                  </div>
               </div>
            </div>
            
            <div className="glass-card p-10 border-l-2 border-l-pink-400 flex flex-col">
               <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-pink-400 text-pink-400" />)}
               </div>
               <p className="text-white font-sans text-lg leading-relaxed mb-8">"Our leads doubled after launch. The new landing page architecture converts like a machine."</p>
               <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full border border-white/20 flex items-center justify-center font-bold text-xs">SJ</div>
                  <div>
                     <h5 className="text-white font-bold text-sm">Sarah Jenkins</h5>
                     <span className="text-[10px] text-pink-300 font-black uppercase tracking-widest">Marketing Director, Bloom</span>
                  </div>
               </div>
            </div>
 
            <div className="glass-card p-10 border-l-2 border-l-emerald-400 flex flex-col">
               <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />)}
               </div>
               <p className="text-white font-sans text-lg leading-relaxed mb-8">"Finally a tech company that explains things simply. We scaled our operations without the typical friction."</p>
               <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full border border-white/20 flex items-center justify-center font-bold text-xs">MT</div>
                  <div>
                     <h5 className="text-white font-bold text-sm">Marcus Thorne</h5>
                     <span className="text-[10px] text-emerald-300 font-black uppercase tracking-widest">Founder, Thorne & Co</span>
                  </div>
               </div>
            </div>
         </div>

         <div className="mt-12 text-center">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase text-[10px] tracking-[0.3em] hover:text-white transition-all">
               See All Reviews <ArrowRight className="w-3 h-3" />
            </Link>
         </div>
      </div>

      {/* 🐬 CALL TO ACTION */}
      <div className="mt-40 max-w-7xl mx-auto px-6 mb-40 relative z-10 w-full">
         <div className="relative w-full rounded-2xl overflow-hidden glass-card p-16 md:p-24 text-center border border-white/20 shadow-neon">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/60 to-blue-900/60 opacity-80 mix-blend-multiply"></div>
            <div className="relative z-10">
               <h2 className="text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tighter text-white mb-8">
                 Ready to Ride the <span className="text-cyan-400 italic">AI Wave?</span>
               </h2>
               <p className="text-xl text-white font-bold font-sans max-w-2xl mx-auto mb-12 leading-relaxed">
                 Join the elite brands that are surfing ahead of the competition. Let's architect your next growth phase.
               </p>
               <Link to="/contact" className="inline-flex px-12 py-6 bg-cyan-400 text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]">
                 🚀 Start Your Project
               </Link>
            </div>
         </div>
      </div>
    </PageWrapper>
  );
}

