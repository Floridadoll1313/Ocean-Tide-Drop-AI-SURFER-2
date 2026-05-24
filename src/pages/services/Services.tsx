import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowRight, Sparkles, Search, HardHat, Sprout, Store, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Services() {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const roles = [
    {
      id: "contractor",
      name: "Contractor / Builder",
      icon: HardHat,
      color: "from-amber-500 to-orange-600",
      intro: "Manage heavy client schedules, complex estimates, and sub‑contracting handshakes without losing your sanity.",
      useCases: [
        { title: "Smart Estimates", desc: "Instantly draft perfect project cost estimates using our AI templates." },
        { title: "Contract Generator", desc: "Create robust, customized client agreements in seconds on the go." },
        { title: "Team Handshake", desc: "Coordinate multi‑party calendar schedules so everyone shows up on time." }
      ],
      tags: ["builder", "contractor", "estimate", "scheduling", "bids", "agreement"],
      quote: "AI Surfer changed how I run my crews. I write up an estimate in the truck right after measuring—bids close three times faster now."
    },
    {
      id: "lawn",
      name: "Lawn Service Specialist",
      icon: Sprout,
      color: "from-emerald-500 to-teal-600",
      intro: "Keep your routes tight, invoice effortlessly in the field, and send automated client notifications on weather events.",
      useCases: [
        { title: "Dynamic Routing", desc: "Optimize stop orders based on distance, keeping wear on your trucks minimal." },
        { title: "Field Invoice Dispatch", desc: "Trigger simple mobile-friendly invoices straight to client SMS as soon as the grass is cut." },
        { title: "Weather Parity Logs", desc: "Auto-notify client lists of rain-day rescheduling before they even think to call you." }
      ],
      tags: ["lawn", "grass", "landscaping", "invoice", "route", "rescheduling", "text", "customer"],
      quote: "No secret system needed. When it rains, the app handles rescheduling notices. My clients love the direct text alerts."
    },
    {
      id: "manager",
      name: "Grocery Store Manager",
      icon: Store,
      color: "from-cyan-500 to-blue-600",
      intro: "Forecast localized product demands, balance shifts under peak shopping windows, and synthesize feedback loops.",
      useCases: [
        { title: "Inventory Forecasting", desc: "Scan community trends to predict food and stock demands before holidays." },
        { title: "Shift Parity", desc: "Create optimal team rosters that align with peak foot-traffic data windows." },
        { title: "Feedback Synth", desc: "Sift through feedback boxes, turning customer reviews directly into custom system action lists." }
      ],
      tags: ["grocery", "manager", "store", "inventory", "stock", "shifts", "feedback", "reviews"],
      quote: "We balanced shelf space and solved long checkout lines. It demonstrates that anyone managing space and staff can exploit these models."
    },
    {
      id: "anybody",
      name: "Anybody & Everybody",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      intro: "Whether you are a local baker, a lawyer, a private tutor, a content creator, or simply starting out, AI Surfer fits your grid.",
      useCases: [
        { title: "Custom Prompt Templates", desc: "Unlock natural, descriptive marketing content tailored strictly to your specific local vibe." },
        { title: "Infinite Growth Vectors", desc: "Automate calendar bookings, invoice tracking, or follow‑up emails with standard modular flows." },
        { title: "Accessible Dashboard", desc: "No complex tech setup or server jargon required. Beautiful, literal interfaces created for all human beings." }
      ],
      tags: ["anybody", "baker", "lawyer", "tutor", "creator", "everything", "baker", "design", "marketing"],
      quote: "You don't need a computer science degree. If you have an idea and a browser, AI Surfer gives you professional tools to scale it."
    }
  ];

  const filteredRoles = roles.filter(role => {
    if (selectedRole !== "all" && role.id !== selectedRole) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      role.name.toLowerCase().includes(q) ||
      role.intro.toLowerCase().includes(q) ||
      role.tags.some(t => t.includes(q)) ||
      role.useCases.some(uc => uc.title.toLowerCase().includes(q) || uc.desc.toLowerCase().includes(q))
    );
  });

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full py-10">
        <div className="flex flex-col items-center text-center mb-24">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 mb-6 block">Capabilities & Solution Matrix</span>
           <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">Our <br /><span className="text-soul-gradient italic font-serif lowercase">Services.</span></h1>
        </div>

        {/* INTERACTIVE COMPONENT: What do you need help with? */}
        <div className="mb-32">
          <div className="relative p-8 md:p-12 bg-zinc-950/40 border border-white/10 rounded-2xl overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="max-w-2xl text-center mx-auto mb-12">
              <span className="px-3 py-1 bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-widest rounded-full inline-block mb-4">Anyone Can Ride the Wave</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">What do you need help with?</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                You don't need to be a corporate tech firm to benefit from automation. Our systems are built literally for real world professions. Choose yours below, or query anything you desire!
              </p>
            </div>

            {/* Live custom search bar */}
            <div className="max-w-xl mx-auto mb-10 relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type your profession or keyword (e.g., baker, invoice, estimates)..."
                className="w-full bg-black/80 border border-white/10 text-white pl-12 pr-4 py-4 font-mono text-xs rounded-xl focus:border-cyan-400/50 outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white font-mono text-[10px]"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Quick selectors */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              <button
                onClick={() => { setSelectedRole("all"); }}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all border ${selectedRole === "all" ? "bg-white text-black border-white" : "bg-white/5 text-zinc-400 border-white/5 hover:border-white/10"}`}
              >
                Show All
              </button>
              {roles.map(role => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => { setSelectedRole(role.id); }}
                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all border flex items-center gap-2 ${selectedRole === role.id ? "bg-cyan-400 text-black border-cyan-400" : "bg-white/5 text-zinc-400 border-white/5 hover:border-white/10"}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {role.name}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Results Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredRoles.map(role => {
                  const Icon = role.icon;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={role.id}
                      className="p-8 bg-black/60 border border-white/5 hover:border-cyan-500/20 rounded-2xl flex flex-col justify-between transition-colors group"
                    >
                      <div>
                        {/* Header card info */}
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div className={`p-4 rounded-xl bg-gradient-to-r ${role.color} text-black`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded">MATRIX CONNECT</span>
                        </div>

                        <h3 className="text-xl font-black uppercase text-white mb-3 tracking-tight">{role.name}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">{role.intro}</p>

                        {/* Use action list */}
                        <div className="space-y-4 mb-6 pt-4 border-t border-white/5">
                          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/80">Real-World Automation</span>
                          <div className="space-y-3">
                            {role.useCases.map((uc, idx) => (
                              <div key={idx} className="flex gap-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <h4 className="text-xs font-black text-white uppercase tracking-wider">{uc.title}</h4>
                                  <p className="text-zinc-500 text-xs leading-normal font-medium">{uc.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Professional Quote block */}
                      <div className="pt-4 mt-4 border-t border-white/5 flex gap-3">
                        <span className="text-2xl text-cyan-500 font-serif shrink-0">“</span>
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-400 text-xs italic font-medium leading-normal">{role.quote}</p>
                          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">— Active Surfer Partner</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {filteredRoles.length === 0 && (
                <div className="col-span-2 text-center py-16 text-zinc-500 font-mono text-xs border border-dashed border-white/10 rounded-xl">
                  No explicit matching sector records found for your query. But don't worry—our modular matrix can customize to literally any workflow! Contact us to shape a fit.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-4 block">Core Offerings</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white text-center">Core Agency Capabilities</h2>
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
