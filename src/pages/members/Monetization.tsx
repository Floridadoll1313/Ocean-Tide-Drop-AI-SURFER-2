import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { 
  Target, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Repeat,
  CheckCircle2,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  color: string;
  popular?: boolean;
}

export default function Monetization() {
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const [tiers, setTiers] = useState<PricingTier[]>([
    {
      id: "dawn-patrol",
      name: "Dawn Patrol",
      price: "$49",
      period: "/month",
      description: "For creators starting their high-frequency journey.",
      features: [
        "Daily AI Trend Analysis",
        "Basic Workflow Automations",
        "Standard Cinematic Templates",
        "Community Access"
      ],
      color: "border-cyan-500/20"
    },
    {
      id: "breakline",
      name: "Breakline",
      price: "$99",
      period: "/month",
      description: "Optimized for scaling digital structures.",
      features: [
        "Everything in Dawn Patrol",
        "Advanced AI Marketing Tools",
        "Unlimited Workflow Triggers",
        "Primary Support Frequency"
      ],
      color: "border-purple-500/30",
      popular: true
    },
    {
      id: "hatteras-island",
      name: "Surfer Elite",
      price: "$249",
      period: "/month",
      description: "The elite frequency for established brands.",
      features: [
        "Everything in Breakline",
        "Cinematic Brand Architecture",
        "Custom AI Personas",
        "High-Frequency Consultation"
      ],
      color: "border-orange-500/20"
    },
    {
      id: "cape-point",
      name: "Cape Point",
      price: "$499",
      period: "/month",
      description: "Ultimate architectural mastery and custom growth.",
      features: [
        "Full Private AI Ecosystem",
        "Dedicated Growth Architect",
        "White-Label Implementation",
        "Peak Priority 24/7"
      ],
      color: "border-white/20"
    }
  ]);

  useEffect(() => {
    fetch("/api/pricing-tiers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTiers(data);
        }
      })
      .catch((err) => {
        console.warn("Could not retrieve dynamic pricing tiers, using fallbacks:", err);
      });
  }, []);

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

  const handleCheckout = async (tierId: string) => {
    console.log("🌊 Attempting synchronization for tier:", tierId);
    setLoading(tierId);
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          tierId,
          userId: user?.uid || null,
          email: user?.email || null
        }),
      });
      
      const data = await response.json();
      console.log("💳 Checkout response received:", data);

      if (data.url) {
        console.log("🚀 Redirecting to Stripe:", data.url);
        // Using window.location.assign for better reliability in some environments
        window.location.assign(data.url);
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (err: unknown) {
      console.error("❌ Checkout Error:", err);
      alert((err as Error).message || "An error occurred during checkout. Check your network or environment configuration.");
    } finally {
      setLoading(null);
    }
  };

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
            Welcome to the growth corridor. This is how AI Surfer architecturally scales businesses. Follow the frequency to achieve peak monetization.
          </p>
        </div>

        {/* BLUEPRINT GRID */}
        <div className="grid lg:grid-cols-3 gap-8 px-6 mb-40">
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

        {/* PRICING SECTION */}
        <div className="py-20 px-6 border-y border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-6">
              Peak <span className="text-soul-gradient italic font-serif">Frequency Tiers.</span>
            </h2>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] max-w-xl mx-auto">
              Select the amplitude that aligns with your growth architecture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-zinc-950 border ${tier.color} p-8 rounded-sm flex flex-col group hover:border-white/40 transition-all ${tier.popular ? 'ring-1 ring-purple-500/50' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-1 rounded-full whitespace-nowrap">
                    Most Resonate
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">{tier.name}</h3>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest line-clamp-2 h-10">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{tier.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0 mt-0.5" />
                      <span className="text-[10px] font-medium text-zinc-400 leading-tight uppercase tracking-widest">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleCheckout(tier.id)}
                  disabled={loading !== null}
                  className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                    tier.popular 
                    ? 'bg-white text-black hover:bg-soul-gradient hover:text-white' 
                    : 'bg-zinc-900 text-white border border-white/10 hover:border-white/30'
                  }`}
                >
                  {loading === tier.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <>
                      Synchronize
                      <ArrowUpRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
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
           <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.8em]">Architecture Mastery — AI Surfer</span>
        </div>
      </div>
    </PageWrapper>
  );
}

