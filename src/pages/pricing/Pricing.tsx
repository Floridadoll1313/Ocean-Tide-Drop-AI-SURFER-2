/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}

const productLines = [
  {
    title: "Automation & AI Workflows",
    pricingTableId: "prctbl_1TQvzmRwAZCPDqtyFmCeKNi1",
    publishableKey: "pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi",
    tiers: [
      {
        name: "Automatic AI 1",
        slug: "automatic-ai-1",
        price: "$350",
        desc: "Entry-level automation architecture. Streamlining your core content and basic workflow frequencies.",
        features: [
          "Core AI Automation",
          "Content Synchronization",
          "Workflow Foundation",
          "Standard Support",
        ],
        color: "text-slate-300",
      },
      {
        name: "Automatic AI 2",
        slug: "automatic-ai-2",
        price: "$650",
        desc: "The professional standard. Deeper automation layers for growing brands and scaling operations.",
        features: [
          "Advanced AI Workflows",
          "Multi-channel Content Sync",
          "Process Optimization",
          "Priority Wave Support",
        ],
        color: "text-[#00eaff]",
        popular: true,
      },
      {
        name: "Automatic AI 3",
        slug: "automatic-ai-3",
        price: "$1,200",
        desc: "Elite architectural scale. High-frequency systems for businesses demand total market resonance.",
        features: [
          "Full Ecosystem Automation",
          "Predictive AI Modeling",
          "Custom Core Integrations",
          "24/7 Strategic Monitoring",
        ],
        color: "text-purple-500",
      },
      {
        name: "Automatic AI Elite",
        slug: "automatic-ai-elite",
        price: "$3,500",
        desc: "The Masterpiece Package. A fully custom, master-built AI empire designed for undisputed dominance.",
        features: [
          "Bespoke System Architecture",
          "White-Glove Integration",
          "Full Creative Governance",
          "Unlimited Scale Support",
        ],
        oneTime: true,
        color: "text-yellow-300",
      },
    ]
  },
  {
    title: "Cinematic Web Systems",
    pricingTableId: "prctbl_1TQw2URwAZCPDqtyKTZZUQMo",
    publishableKey: "pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi",
    tiers: [
      {
        name: "Sys Core 1",
        slug: "cin-core-1",
        price: "$450",
        desc: "Foundational cinematic experience. Clean, fast, and architecturally sound.",
        features: [
          "Modular Core Components",
          "Standard Motion Suite",
          "Responsive Architecture",
          "SEO Synchronization",
        ],
        color: "text-slate-300",
      },
      {
        name: "Sys Core 2",
        slug: "cin-core-2",
        price: "$750",
        desc: "Immersive storytelling platform. Deeper motion integration and customized components.",
        features: [
          "Immersive Motion Pack",
          "Custom Data Viz",
          "Advanced Story Blocks",
          "Performance Tuning",
        ],
        color: "text-[#00eaff]",
        popular: true,
      },
      {
        name: "Sys Core 3",
        slug: "cin-core-3",
        price: "$1,200",
        desc: "The high-fidelity portal. Total brand immersion with bespoke interaction models.",
        features: [
          "Bespoke Interactions",
          "3D Element Integration",
          "Premium Motion Assets",
          "Priority Deployment",
        ],
        color: "text-purple-500",
      },
      {
        name: "Sys Core Elite",
        slug: "cin-core-elite",
        price: "$6,500",
        desc: "The ultimate digital monument. A master-built web system designed to leave a legacy.",
        features: [
          "Unlimited Page Architect",
          "Custom Engine Build",
          "Full Creative Direction",
          "Lifetime Core Updates",
        ],
        oneTime: true,
        color: "text-orange-500",
      },
    ]
  },
  {
    title: "Brand Architecture & Identity",
    pricingTableId: "prctbl_1TQw3pRwAZCPDqtypfjQBD64",
    publishableKey: "pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi",
    tiers: [
      {
        name: "Brand Arch 1",
        slug: "brand-arch-1",
        price: "$2,500",
        desc: "Foundational mythic identity. Essential universe-building for emerging pioneers.",
        features: [
          "Core Visual Identity",
          "Universe Style Guide",
          "Brand Voice Sync",
          "Essential Asset Pack",
        ],
        color: "text-slate-300",
      },
      {
        name: "Premium System 2",
        slug: "brand-premium-2",
        price: "$4,500",
        desc: "Deep brand immersion. A custom systemic world designed for high-frequency resonance.",
        features: [
          "Full Identity Ecosystem",
          "Cinematic Style Guide",
          "Custom Iconography",
          "Marketing World-Building",
        ],
        color: "text-[#00eaff]",
        popular: true,
      },
      {
        name: "Enterprise Ecosystem 3",
        slug: "brand-enterprise-3",
        price: "$7,500",
        desc: "The total brand universe. A living, breathing architectural masterpiece built for scale.",
        features: [
          "Total Brand Architecture",
          "Bespoke Visual Language",
          "Full Asset Governance",
          "Strategic World Audit",
        ],
        color: "text-purple-500",
      },
    ]
  },
  {
    title: "AI Surfer Membership",
    tiers: [
      {
        name: "Membership",
        slug: "membership-basic",
        price: "$45",
        desc: "Access to the core sanctuary for creators and founders riding the neon tide.",
        features: [
          "Community Sanctuary",
          "Essential AI Tools",
          "Weekly Momentum Drops",
          "Basic Core Access",
        ],
        color: "text-slate-300",
      },
      {
        name: "Premium 2",
        slug: "membership-premium",
        price: "$95",
        desc: "Deep community integration and advanced toolsets for scaling visionaries.",
        features: [
          "Advanced Toolkit",
          "Private Mastermind",
          "Priority Beta Access",
          "Monthly High-Frequency Sync",
        ],
        color: "text-[#00eaff]",
        popular: true,
      },
      {
        name: "Enterprise 2",
        slug: "membership-enterprise",
        price: "$250",
        desc: "Total platform immersion. Concierge strategy and custom tool development.",
        features: [
          "Custom Tool Development",
          "1-on-1 Concierge Support",
          "Elite Network Access",
          "Strategic Governance",
        ],
        color: "text-purple-500",
      },
    ]
  }
];

export default function Pricing() {
  const [isInIframe] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    }
    return false;
  });

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="relative z-10 w-full text-center py-10">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">Pricing</h1>
        <p className="text-cyan-100 font-bold mb-12 max-w-2xl mx-auto text-base">Choose your wave. From high-tier AI workflow automations to high-fidelity custom digital systems.</p>

        {isInIframe && (
          <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 p-6 rounded-sm mb-16 max-w-3xl mx-auto mx-4 text-sm font-medium tracking-wide">
             <div className="font-bold uppercase tracking-widest text-orange-500 mb-2 text-xs">⚠️ Preview Mode Constraint</div>
             Stripe Checkout cannot launch from inside this preview window. <strong>To use the Subscribe buttons, please open this app in a new tab</strong> by clicking the arrow/window icon at the top right of your screen.
          </div>
        )}

        <div className="space-y-40">
          {productLines.map((line, lineIdx) => (
            <div key={lineIdx} className="text-left">
              <div className="flex items-center gap-6 mb-16 px-4">
                 <div className="h-px bg-cyan-400/20 flex-1"></div>
                 <h2 className="text-lg font-black uppercase tracking-[0.4em] text-cyan-300">{line.title}</h2>
                 <div className="h-px bg-cyan-400/20 flex-1"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(line as { pricingTableId?: string; publishableKey?: string }).pricingTableId ? (
                  <div className="col-span-full">
                    <stripe-pricing-table 
                      pricing-table-id={(line as { pricingTableId: string }).pricingTableId}
                      publishable-key={(line as { publishableKey: string }).publishableKey}>
                    </stripe-pricing-table>
                  </div>
                ) : line.tiers.map((tier) => (
                  <div key={tier.slug} className={`glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col ${tier.popular ? 'border-[#00eaff] shadow-[0_0_30px_rgba(0,255,255,0.15)] bg-slate-950/60' : 'border-white/10'}`}>
                    {tier.popular && (
                      <div className="absolute top-0 right-0 bg-[#00eaff] text-black text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-bl-xl">Best Value</div>
                    )}
                    <h3 className={`text-2xl font-black italic uppercase ${tier.color} mb-2`}>{tier.name}</h3>
                    <div className="text-4xl font-bold mb-4">{tier.price}<span className="text-sm font-semibold text-cyan-400">{tier.oneTime ? '' : '/mo'}</span></div>
                    <p className="text-sm text-[#00eaff] font-bold mb-8 h-12 leading-relaxed">{tier.desc}</p>
                    
                    <div className="flex-1">
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="text-sm text-white font-medium flex items-start gap-2 leading-relaxed">
                            <span className="text-[#00eaff] mt-1.5 flex-shrink-0">
                               <div className="w-2 h-2 bg-[#00eaff] rounded-full shadow-[0_0_10px_#00eaff]"></div>
                            </span> 
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a 
                      href="https://buy.stripe.com/mock_link" 
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center block py-4 rounded-sm bg-white text-black hover:bg-soul-gradient hover:text-white transition-all uppercase tracking-widest text-[10px] font-black group relative overflow-hidden"
                    >
                      <span className="relative z-10">Secure Checkout</span>
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                    </a>
                    <div className="mt-4 flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400">Powered by Stripe</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
