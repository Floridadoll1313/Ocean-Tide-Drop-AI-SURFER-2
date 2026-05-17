import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PieChart,
  Repeat
} from "lucide-react";

export default function Monetization() {
  const blueprint = [
    {
      phase: "Phase 01",
      title: "Value Architecture",
      description: "Define your high-ticket offer and align it with AI-driven market resonance.",
      icon: <Target className="w-6 h-6" />,
      steps: [
        "Identify your 'Peak Problem' solving capability",
        "Structure a 3-tier value ladder",
        "Develop an AI-assisted lead magnet"
      ],
      color: "from-cyan-500 to-blue-600"
    },
    {
      phase: "Phase 02",
      title: "Conversion Frequency",
      description: "Deploy automated high-frequency sales funnels that work while you sleep.",
      icon: <Zap className="w-6 h-6" />,
      steps: [
        "Launch cinematic landing pages",
        "Configure AI behavioral email triggers",
        "Setup high-conversion checkout flows"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      phase: "Phase 03",
      title: "Asset Multiplier",
      description: "Scale your revenue through diversification and elite brand equity expansion.",
      icon: <Repeat className="w-6 h-6" />,
      steps: [
        "Implement recurring premium subscriptions",
        "Launch white-label AI growth tools",
        "Deploy strategic partnership networks"
      ],
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full py-20 relative">
        {/* SOULFUL BACKGROUND DECORATION */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,234,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-8 bg-soul-gradient"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">Elite Strategy</span>
            <div className="h-px w-8 bg-soul-gradient"></div>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">
            Monetization <br /><span className="text-soul-gradient italic font-serif lowercase">Blueprint.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-12">
            Welcome to the growth corridor. This is how Ocean Tide Drop AI Surfer architecturally scales businesses. Follow the frequency to achieve peak monetization.
          </p>
        </div>

        {/* BLUEPRINT GRID */}
        <div className="grid lg:grid-cols-3 gap-8 px-6">
          {blueprint.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative bg-white/5 border border-white/10 rounded-sm p-10 hover:bg-white/[0.07] transition-all accent-glow-cyan overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-2xl group-hover:opacity-20 transition-all`}></div>
              
              <div className="relative z-10">
                <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase mb-4 block">{item.phase}</span>
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-6">{item.title}</h3>
                <p className="text-zinc-500 text-xs font-bold leading-relaxed mb-10 uppercase tracking-widest">
                  {item.description}
                </p>

                <div className="space-y-4">
                  {item.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE CALL TO ACTION */}
        <div className="mt-40 px-6 max-w-4xl mx-auto">
          <div className="bg-glass-colorful border border-white/10 p-20 rounded-sm text-center relative overflow-hidden accent-glow-purple">
            <div className="absolute-top-right p-10 opacity-5">
               <Sparkles className="w-40 h-40" />
            </div>
            
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-8">
              Ready to <span className="text-soul-gradient italic font-serif">Synchronize?</span>
            </h2>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] mb-12 max-w-xl mx-auto leading-loose">
              Our AI Core is ready to analyze your specific business frequency and deploy these phases for you.
            </p>
            
            <button className="px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-soul-gradient hover:text-white transition-all flex items-center gap-4 mx-auto group">
              Initial Calibration
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        <div className="mt-40 text-center flex flex-col items-center gap-6">
           <div className="w-px h-20 bg-soul-gradient opacity-30"></div>
           <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.8em]">Architecture Mastery — Ocean Tide Drop</span>
        </div>
      </div>
    </PageWrapper>
  );
}
