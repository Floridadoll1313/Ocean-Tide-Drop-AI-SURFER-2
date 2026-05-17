import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Services() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full py-10">
        <div className="flex flex-col items-center text-center mb-24">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6 block">Capabilities</span>
           <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">Our <br /><span className="text-soul-gradient italic font-serif lowercase">Services.</span></h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {[
            {
              title: "Brand Architecture & Identity Systems",
              desc: "A mythic, neon‑ocean identity system that transforms your brand into a living world. Built for founders who want more than a logo — they want a universe.",
              deliverables: ["Logo & Iconography", "Design Systems", "Brand Strategy", "Sonic Branding"],
              path: "/pricing"
            },
            {
              title: "Automation & AI Workflow Systems",
              desc: "A fully automated ecosystem that handles the repetitive, the predictable, and the time-consuming tasks — so you can stay in your creative flow.",
              deliverables: ["Automated Content Pipelines", "AI Personalization", "Workflow Architecture", "LLM Fine-tuning"],
              path: "/pricing"
            },
            {
              title: "Cinematic Web Design Systems",
              desc: "A neon‑ocean cinematic website experience built with modular components, immersive motion, and story‑driven architecture. A site that feels alive.",
              deliverables: ["Modular Components", "Immersive Motion", "Story-driven Architecture", "Conversion Optimization"],
              path: "/pricing"
            },
            {
              title: "Growth Marketing",
              desc: "Data-driven strategy to dominate your niche. We find the frequency where your audience lives and ensure you're heard.",
              deliverables: ["Market Positioning", "Campaign Architecture", "Funnel Development", "Predictive Analytics"],
              path: "/pricing"
            }
          ].map((service, i) => (
            <div key={i} className="p-16 bg-black hover:bg-zinc-900 transition-all group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-8 text-zinc-900 font-black text-6xl group-hover:text-white/5 transition-colors">0{i+1}</div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">{service.title}</h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10 relative z-10">{service.desc}</p>
              
              <div className="space-y-4 relative z-10 flex-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Core Deliverables</span>
                <ul className="grid grid-cols-2 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-12">
                   {service.deliverables.map((item, j) => (
                     <li key={j} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-white opacity-20"></div>
                        {item}
                     </li>
                   ))}
                </ul>
              </div>

              <div className="relative z-10 mt-12 pt-8 border-t border-white/5">
                <Link 
                  to={service.path}
                  className="inline-flex items-center gap-4 text-white font-black uppercase text-xs tracking-widest group-hover:gap-6 transition-all"
                >
                  Configure Service <ArrowRight className="w-4 h-4 text-soul-gradient" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* MEMBERSHIP CTA */}
        <div className="mt-40 p-20 bg-glass-colorful border border-white/10 rounded-sm text-center relative overflow-hidden accent-glow-purple">
           <div className="absolute top-0 right-0 p-10 opacity-10">
              <Sparkles className="w-40 h-40" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400 mb-8 block">AI Surfer Membership</span>
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
              Community + <span className="text-soul-gradient italic font-serif lowercase">Tools.</span>
           </h2>
           <p className="text-zinc-400 text-sm font-bold uppercase tracking-[0.2em] mb-12 max-w-xl mx-auto leading-loose">
              A sanctuary for creators, founders, and visionaries riding the neon tide of AI. Tools, community, and momentum — all in one place.
           </p>
           <Link 
             to="/pricing"
             className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-soul-gradient hover:text-white transition-all inline-flex items-center gap-4 group"
           >
             Lock in Membership
             <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

        {/* PROCESS SECTION */}
        <div className="mt-60 pb-40">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
              <div className="max-w-xl">
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 block mb-6">Workflow</span>
                 <h2 className="text-5xl font-black uppercase tracking-tighter text-white">The Architecture <br /> of <span className="text-zinc-600">Results.</span></h2>
              </div>
              <p className="text-zinc-500 max-w-sm font-medium">A standardized 4-phase synchronization process that ensures every project resonates at peak frequency.</p>
           </div>

           <div className="grid md:grid-cols-4 gap-12">
              {[
                { step: "Discovery", detail: "Deep-dive into market frequencies and brand soul." },
                { step: "Architect", detail: "Defining the AI workflow and visual strategy." },
                { step: "Execute", detail: "High-frequency production and integration." },
                { step: "Optimize", detail: "Real-time scaling based on performance data." }
              ].map((phase, i) => (
                <div key={i} className="flex flex-col gap-6">
                   <div className="w-full h-px bg-white/10 relative">
                      <div className="absolute top-0 left-0 w-2 h-2 bg-white -translate-y-1/2"></div>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Phase 0{i+1}</span>
                   <h4 className="text-2xl font-black uppercase text-white">{phase.step}</h4>
                   <p className="text-zinc-600 text-sm font-medium leading-relaxed">{phase.detail}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </PageWrapper>
  );
}
