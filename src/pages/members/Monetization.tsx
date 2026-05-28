import React, { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { Target, Zap, ShieldCheck, Repeat, CheckCircle2, ArrowUpRight, Loader2 } from "lucide-react";
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

const fallbackTiers: PricingTier[] = [
  { id: "dawn-patrol", name: "Dawn Patrol", price: "$49", period: "/month", description: "For creators starting their high-frequency journey.", features: ["Daily AI Trend Analysis", "Basic Workflow Automations", "Standard Cinematic Templates", "Community Access"], color: "border-cyan-500/20" },
  { id: "breakline", name: "Breakline", price: "$99", period: "/month", description: "Optimized for scaling digital structures.", features: ["Everything in Dawn Patrol", "Advanced AI Marketing Tools", "Unlimited Workflow Triggers", "Primary Support Frequency"], color: "border-purple-500/30", popular: true },
  { id: "hatteras-island", name: "Surfer Elite", price: "$249", period: "/month", description: "The elite frequency for established brands.", features: ["Everything in Breakline", "Cinematic Brand Architecture", "Custom AI Personas", "High-Frequency Consultation"], color: "border-orange-500/20" },
  { id: "cape-point", name: "Cape Point", price: "$499", period: "/month", description: "Ultimate architectural mastery and custom growth.", features: ["Full Private AI Ecosystem", "Dedicated Growth Architect", "White-Label Implementation", "Peak Priority 24/7"], color: "border-white/20" }
];

export default function Monetization() {
  const [loading, setLoading] = useState<string | null>(null);
  const [tiers, setTiers] = useState<PricingTier[]>(fallbackTiers);
  const [error, setError] = useState<string | null>(null);
  const { user, loginWithGoogle } = useAuth();

  useEffect(() => {
    fetch("/api/pricing-tiers")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTiers(data);
      })
      .catch(() => setTiers(fallbackTiers));
  }, []);

  const blueprint = [
    { phase: "Phase 01", title: "Value Architecture", description: "Define your high-ticket offer and align it with AI-driven market resonance.", icon: <Target className="w-6 h-6" />, steps: ["Identify your peak problem", "Structure a 3-tier value ladder", "Develop an AI-assisted lead magnet"] },
    { phase: "Phase 02", title: "Conversion Frequency", description: "Deploy automated high-frequency sales funnels that work while you sleep.", icon: <Zap className="w-6 h-6" />, steps: ["Launch cinematic landing pages", "Configure AI behavioral triggers", "Set up high-conversion checkout flows"] },
    { phase: "Phase 03", title: "Asset Multiplier", description: "Scale revenue through diversification and elite brand equity expansion.", icon: <Repeat className="w-6 h-6" />, steps: ["Implement recurring subscriptions", "Launch white-label AI growth tools", "Deploy strategic partnership networks"] }
  ];

  const handleCheckout = async (tierId: string) => {
    setError(null);
    let activeUser = user;

    if (!activeUser) {
      try {
        activeUser = await loginWithGoogle();
      } catch {
        setError("Sign-in failed. Open the site in a full browser tab and try again.");
        return;
      }
    }

    if (!activeUser) {
      setError("Please sign in before starting checkout so your membership can be attached to your account.");
      return;
    }

    setLoading(tierId);
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId, userId: activeUser.uid, email: activeUser.email }),
      });
      const data = await response.json();
      if (response.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error || "Checkout is not configured yet. Please contact support before making a payment.");
    } catch (err: unknown) {
      console.error("Checkout Error:", err);
      setError("Checkout could not be started. Please contact support before making a payment.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full py-20 relative">
        <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto px-6">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8">Elite Strategy</span>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-8">Monetization <br /><span className="text-soul-gradient italic font-serif lowercase">Blueprint.</span></h1>
          <p className="text-zinc-400 text-lg font-medium leading-relaxed">Follow the frequency to achieve peak monetization. Paid access is now handled only by verified Stripe checkout.</p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-left text-sm text-emerald-100 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <span>Security fix applied: this page no longer offers direct Firestore subscription activation when Stripe is unavailable.</span>
        </div>

        {error && <div className="max-w-3xl mx-auto mb-12 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

        <div className="grid lg:grid-cols-3 gap-8 px-6 mb-32">
          {blueprint.map((item) => (
            <div key={item.phase} className="group relative bg-white/5 border border-white/10 rounded-sm p-10 hover:bg-white/[0.07] transition-all overflow-hidden">
              <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase mb-4 block">{item.phase}</span>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center mb-8 text-white">{item.icon}</div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-6">{item.title}</h3>
              <p className="text-zinc-500 text-xs font-bold leading-relaxed mb-10 uppercase tracking-widest">{item.description}</p>
              <div className="space-y-4">
                {item.steps.map((step) => <div key={step} className="flex items-start gap-3"><ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /><span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{step}</span></div>)}
              </div>
            </div>
          ))}
        </div>

        <div className="py-20 px-6 border-y border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-6">Peak <span className="text-soul-gradient italic font-serif">Frequency Tiers.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div key={tier.id} className={`relative bg-zinc-950 border ${tier.color} p-8 rounded-sm flex flex-col group hover:border-white/40 transition-all ${tier.popular ? 'ring-1 ring-purple-500/50' : ''}`}>
                {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-1 rounded-full whitespace-nowrap">Most Resonate</div>}
                <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">{tier.name}</h3>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest line-clamp-2 h-10 mb-8">{tier.description}</p>
                <div className="mb-8"><span className="text-4xl font-black text-white">{tier.price}</span><span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{tier.period}</span></div>
                <div className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature) => <div key={feature} className="flex items-start gap-3"><CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0 mt-0.5" /><span className="text-[10px] font-medium text-zinc-400 leading-tight uppercase tracking-widest">{feature}</span></div>)}
                </div>
                <button onClick={() => handleCheckout(tier.id)} disabled={loading !== null} className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${tier.popular ? 'bg-white text-black hover:bg-cyan-400' : 'bg-zinc-900 text-white border border-white/10 hover:border-white/30'}`}>
                  {loading === tier.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <>{user ? "Secure Checkout" : "Sign In to Checkout"} <ArrowUpRight className="w-3 h-3" /></>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
