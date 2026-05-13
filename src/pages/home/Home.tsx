import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Waves, Bot, Zap, Network, ArrowRight, Mail } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-start justify-center pt-24 pb-12 w-full text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
          <div className="mb-6 px-3 py-1.5 bg-white/5 border border-white/10 w-fit">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400 flex items-center gap-2">
              <Bot size={12} /> The Outer Banks of Innovation
            </span>
          </div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-7xl md:text-[140px] leading-[0.8] font-black uppercase tracking-[unset]"
        >
          <div className="flex flex-col tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 leading-[0.75]">SUR</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 leading-[0.75]">FER</span>
          </div>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-sm md:text-base text-white/50 max-w-lg font-light leading-relaxed gap-2"
        >
          We are the AI Surfer Marketing Agency. We craft digital structures, automated workflows, and AI-driven creations in the Outer Banks.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/studio" className="px-8 py-4 bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-2">
            Explore the Banks <ArrowRight size={16} />
          </Link>
          <Link to="/services" className="px-8 py-4 border border-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
            View Our Work
          </Link>
        </motion.div>
      </section>

      {/* Services Bento Grid */}
      <section id="services" className="relative z-10 pt-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tighter">Our Expertise</h2>
              <p className="text-white/50 text-sm mt-4 max-w-lg">Navigating the intricate currents of AI to build systems that scale, engage, and convert.</p>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col h-full relative overflow-hidden group rounded-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 flex items-center justify-center text-cyan-400 mb-6">
              <Network size={32} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-cyan-400 font-bold mb-2 uppercase tracking-widest">Structure 01</span>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4 uppercase tracking-tighter">Digital Architecture</h3>
            <p className="text-white/50 text-sm leading-relaxed flex-1">
              We build solid, scalable digital foundations. From high-conversion landing pages to complex web applications that form the bedrock of your online presence.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col h-full relative overflow-hidden group rounded-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 flex items-center justify-center text-white/50 mb-6">
              <Zap size={32} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-white/50 font-bold mb-2 uppercase tracking-widest">Active Flows</span>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4 uppercase tracking-tighter">Automated Workflows</h3>
            <p className="text-white/50 text-sm leading-relaxed flex-1">
              Eliminate the manual grind. We design intelligent workflows that connect your apps, process data on autopilot, and free your team to focus on strategy.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col h-full relative overflow-hidden group rounded-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 flex items-center justify-center text-cyan-400 mb-6">
              <Bot size={32} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] text-cyan-400 font-bold mb-2 uppercase tracking-widest">Generation 03</span>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4 uppercase tracking-tighter">AI-Driven Creations</h3>
            <p className="text-white/50 text-sm leading-relaxed flex-1">
              Personalized copy, dynamic generative assets, and autonomous agents. We implement AI solutions that communicate directly to your audience at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Outer Banks Concept */}
      <section id="outer-banks" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-gradient-to-bl from-cyan-900/20 to-transparent flex items-center justify-center overflow-hidden">
            <div className="absolute top-1/2 left-0 w-40 h-40 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[80%] h-[80%] border-[1px] border-cyan-500/20 rounded-[40%] bg-cyan-500/5 mix-blend-screen"
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute w-[90%] h-[90%] border-[2px] border-white/10 rounded-[35%] bg-blue-500/5 mix-blend-screen"
            />
            <div className="z-10 text-center">
              <div className="w-20 h-20 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center rotate-12">
                  <Waves size={32} className="text-cyan-400 opacity-80" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
        </div>
        <div className="space-y-8">
          <div className="px-3 py-1.5 bg-white/5 border border-white/10 w-fit mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">The Ecosystem</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">Welcome to the <br/><span className="text-cyan-400">Outer Banks</span></h2>
          <p className="text-white/50 text-sm leading-relaxed">
            In the vast digital ocean, isolation means stagnation. We view modern marketing as the Outer Banks—a series of distinct, powerful islands of capability (AI, Web, Automation) that must be seamlessly connected to thrive.
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            Our agency bridges the gaps between your tools, data, and customers. We don't just build isolated assets; we construct cohesive digital ecosystems that perform in harmony.
          </p>
          <ul className="space-y-4 pt-4 border-t border-white/5">
            <li className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold text-white/70"><Zap size={14} className="text-purple-400"/> Seamless API & Webhook Integrations</li>
            <li className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold text-white/70"><Bot size={14} className="text-cyan-400"/> LLM-powered Agent Swarms</li>
            <li className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold text-white/70"><Network size={14} className="text-blue-400"/> Omnichannel Growth Architectures</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-6 flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 blur-[100px] pointer-events-none" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400 mb-6 z-10 w-fit px-3 py-1.5 bg-white/5 border border-white/10">Next Steps</span>
        <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 z-10">Stop Paddling.<br/>Start Surfing.</h2>
        <p className="text-white/50 text-sm max-w-xl mb-12 z-10">Ready to transform your marketing infrastructure with the power of artificial intelligence? Let's build your next big wave.</p>
        <button className="px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-2 z-10">
          <Mail size={16} /> Contact the Team
        </button>
      </section>
    </>
  );
}
