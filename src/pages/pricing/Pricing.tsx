import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { Loader2, ShieldCheck } from "lucide-react";

const productLines = [
  {
    title: "AI Surfer Membership",
    tiers: [
      { name: "Membership", slug: "dawn-patrol", price: "$45", desc: "Core sanctuary access for creators and founders.", features: ["Community Sanctuary", "Essential AI Tools", "Weekly Momentum Drops", "Basic Core Access"] },
      { name: "Premium 2", slug: "breakline", price: "$95", desc: "Advanced toolsets for scaling visionaries.", features: ["Advanced Toolkit", "Private Mastermind", "Priority Beta Access", "Monthly High-Frequency Sync"], popular: true },
      { name: "Enterprise 2", slug: "cape-point", price: "$250", desc: "Concierge strategy and custom tool development.", features: ["Custom Tool Development", "1-on-1 Concierge Support", "Elite Network Access", "Strategic Governance"] }
    ]
  },
  {
    title: "Automation & AI Workflows",
    tiers: [
      { name: "Automatic AI 1", slug: "dawn-patrol", price: "$350", desc: "Entry-level automation architecture.", features: ["Core AI Automation", "Content Synchronization", "Workflow Foundation", "Standard Support"] },
      { name: "Automatic AI 2", slug: "breakline", price: "$650", desc: "Deeper automation layers for growing brands.", features: ["Advanced AI Workflows", "Multi-channel Content Sync", "Process Optimization", "Priority Wave Support"], popular: true },
      { name: "Automatic AI 3", slug: "hatteras-island", price: "$1,200", desc: "Elite systems for high-frequency operations.", features: ["Full Ecosystem Automation", "Predictive AI Modeling", "Custom Core Integrations", "Strategic Monitoring"] },
      { name: "Automatic AI Elite", slug: "cape-point", price: "$3,500", desc: "Fully custom AI architecture.", features: ["Bespoke System Architecture", "White-Glove Integration", "Full Creative Governance", "Scale Support"] }
    ]
  },
  {
    title: "Cinematic Web Systems",
    tiers: [
      { name: "Sys Core 1", slug: "dawn-patrol", price: "$450", desc: "Clean, fast cinematic web foundation.", features: ["Modular Components", "Standard Motion Suite", "Responsive Architecture", "SEO Synchronization"] },
      { name: "Sys Core 2", slug: "breakline", price: "$750", desc: "Immersive storytelling platform.", features: ["Immersive Motion Pack", "Custom Data Viz", "Advanced Story Blocks", "Performance Tuning"], popular: true },
      { name: "Sys Core 3", slug: "hatteras-island", price: "$1,200", desc: "High-fidelity brand portal.", features: ["Bespoke Interactions", "Premium Motion Assets", "Priority Deployment", "Conversion Support"] },
      { name: "Sys Core Elite", slug: "cape-point", price: "$6,500", desc: "Master-built web system.", features: ["Unlimited Page Architect", "Custom Engine Build", "Creative Direction", "Core Updates"] }
    ]
  },
  {
    title: "Brand Architecture & Identity",
    tiers: [
      { name: "Brand Arch 1", slug: "dawn-patrol", price: "$2,500", desc: "Foundational identity system.", features: ["Core Visual Identity", "Universe Style Guide", "Brand Voice Sync", "Essential Asset Pack"] },
      { name: "Premium System 2", slug: "breakline", price: "$4,500", desc: "Deep brand immersion.", features: ["Full Identity Ecosystem", "Cinematic Style Guide", "Custom Iconography", "Marketing World-Building"], popular: true },
      { name: "Enterprise Ecosystem 3", slug: "cape-point", price: "$7,500", desc: "Total brand universe.", features: ["Total Brand Architecture", "Bespoke Visual Language", "Full Asset Governance", "Strategic World Audit"] }
    ]
  }
];

export default function Pricing() {
  const { user, loginWithGoogle } = useAuth();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (tier: { slug: string; name: string }) => {
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

    setLoadingTier(tier.slug);
    try {
      const resp = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: activeUser.uid,
          email: activeUser.email,
          tierId: tier.slug,
        }),
      });

      const data = await resp.json();
      if (resp.ok && data.url) {
        window.location.assign(data.url);
        return;
      }

      setError(data.error || "Checkout is not configured yet. Please contact Ocean Tide Drop support before making a payment.");
    } catch (err) {
      console.error("Stripe checkout error:", err);
      setError("Checkout could not be started. Please contact Ocean Tide Drop support before making a payment.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="relative z-10 w-full text-center py-10">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">Pricing</h1>
        <p className="text-cyan-100 font-bold mb-8 max-w-2xl mx-auto text-base">Choose your wave. All paid access now goes through verified Stripe checkout only.</p>

        <div className="max-w-3xl mx-auto mb-12 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-left text-sm text-emerald-100 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <span>No public sandbox bypass is available on this page. If checkout is missing a live Stripe price, the page shows an error instead of upgrading an account.</span>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-12 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-32">
          {productLines.map((line) => (
            <section key={line.title} className="text-left">
              <div className="flex items-center gap-6 mb-10 px-4">
                <div className="h-px bg-cyan-400/20 flex-1"></div>
                <h2 className="text-lg font-black uppercase tracking-[0.25em] text-cyan-300 text-center">{line.title}</h2>
                <div className="h-px bg-cyan-400/20 flex-1"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {line.tiers.map((tier) => (
                  <div key={`${line.title}-${tier.name}`} className={`glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col ${tier.popular ? 'border-[#00eaff] shadow-[0_0_30px_rgba(0,255,255,0.15)] bg-slate-950/60' : 'border-white/10'}`}>
                    {tier.popular && <div className="absolute top-0 right-0 bg-[#00eaff] text-black text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-bl-xl">Best Value</div>}
                    <h3 className="text-2xl font-black italic uppercase text-white mb-2">{tier.name}</h3>
                    <div className="text-4xl font-bold mb-4">{tier.price}</div>
                    <p className="text-sm text-[#00eaff] font-bold mb-8 min-h-[48px] leading-relaxed">{tier.desc}</p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feature) => (
                        <li key={feature} className="text-sm text-white font-medium flex items-start gap-2 leading-relaxed">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-[#00eaff] shadow-[0_0_10px_#00eaff] shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleCheckout(tier)}
                      disabled={loadingTier !== null}
                      className="w-full py-4 rounded-sm bg-white text-black hover:bg-cyan-400 transition-all uppercase tracking-widest text-[10px] font-black flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loadingTier === tier.slug ? <Loader2 className="w-4 h-4 animate-spin" /> : user ? "Secure Checkout" : "Sign In to Checkout"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
