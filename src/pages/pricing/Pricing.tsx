import React from "react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Dawn Patrol",
    slug: "dawn-patrol",
    price: "$97",
    desc: "Your cinematic entry point. Clean landing, AI‑assisted content, and your first automated workflows.",
    features: [
      "Cinematic landing page",
      "AI‑assisted content engine",
      "Starter automations",
      "Brand color tuning",
    ],
    color: "text-slate-300",
  },
  {
    name: "Breakline",
    slug: "breakline",
    price: "$197",
    desc: "A multi‑page experience with deeper automations and a tuned content engine that moves with your brand.",
    features: [
      "Multi‑page site",
      "Advanced automations",
      "Content engine tuning",
      "Brand story expansion",
    ],
    color: "text-neon-cyan",
    popular: true,
  },
  {
    name: "Hatteras Island",
    slug: "hatteras-island",
    price: "$297",
    desc: "High‑touch creative systems, evolving brand identity, and ongoing cinematic refinement.",
    features: [
      "Ongoing creative direction",
      "Cinematic brand evolution",
      "AI content pipelines",
      "Monthly experiments",
    ],
    color: "text-pink-500",
  },
  {
    name: "Cape Point",
    slug: "cape-point",
    price: "$497",
    desc: "Full‑stack automation, AI‑driven content pipelines, and mythic brand architecture built for scale.",
    features: [
      "Full automation suite",
      "AI‑driven content pipelines",
      "Mythic brand architecture",
      "Founder‑first creative systems",
    ],
    color: "text-yellow-300",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black"></div>
        <div className="relative max-w-7xl mx-auto z-10 w-full text-center">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">Pricing</h1>
            <p className="text-slate-400 mb-16 max-w-2xl mx-auto">Choose your wave. From initial drops to full-scale cinematic AI automation.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {tiers.map((tier) => (
                    <div key={tier.slug} className={`glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col ${tier.popular ? 'border-[#00eaff]/50 shadow-[0_0_30px_rgba(0,255,255,0.1)]' : 'border-white/10'}`}>
                        {tier.popular && (
                            <div className="absolute top-0 right-0 bg-[#00eaff] text-black text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-bl-xl">Best Value</div>
                        )}
                        <h3 className={`text-2xl font-black italic uppercase ${tier.color} mb-2`}>{tier.name}</h3>
                        <div className="text-4xl font-bold mb-4">{tier.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                        <p className="text-sm text-slate-400 mb-8">{tier.desc}</p>
                        
                        <div className="flex-1">
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                        <span className="text-[#00eaff] mt-0.5">✦</span> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to={`/pricing/${tier.slug}`} className="w-full text-center block py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors uppercase tracking-widest text-xs font-bold">
                            Select Tier
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
