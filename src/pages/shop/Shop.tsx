import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Download,
  Gift,
  Megaphone,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const SHOP_ITEMS = [
  {
    id: 1,
    name: "Launch Wave Toolkit",
    category: "Creator Launch System",
    price: "$49.00",
    value: "$140 value",
    description:
      "A ready-to-use launch command center with offer copy, landing-page sections, promo captions, and delivery email templates.",
    image: "🌊",
    color: "#00eaff",
    outcome: "Ship a polished product launch in one focused afternoon.",
    features: ["Sales page copy blocks", "Launch checklist", "Email delivery sequence"],
  },
  {
    id: 2,
    name: "Prompt-to-Profit Pack",
    category: "AI Workflow Templates",
    price: "$29.00",
    value: "$95 value",
    description:
      "High-converting AI prompt workflows for product ideas, social posts, hooks, upsells, FAQs, and customer support replies.",
    image: "⚡",
    color: "#ff5E00",
    outcome: "Create more assets without staring at a blank page.",
    features: ["75+ prompt chains", "Offer positioning prompts", "Content repurposing flows"],
  },
  {
    id: 3,
    name: "Mythic Brand Asset Kit",
    category: "Visual Identity Bundle",
    price: "$35.00",
    value: "$120 value",
    description:
      "A cinematic identity bundle with headline styles, product-card layouts, icon prompts, and brand voice guidance for premium digital offers.",
    image: "🖋️",
    color: "#ec4899",
    outcome: "Make your product look premium before the first click.",
    features: ["Brand voice guide", "Promo graphic prompts", "Product badge system"],
  },
];

const CORE_MESSAGE =
  "Digital product creators do not need to start from scratch. Download launch-ready templates, AI prompts, and brand assets that help you package your offer, promote it with confidence, and start selling faster.";

const BENEFITS = [
  "Instant digital download after checkout",
  "Beginner-friendly setup guides included",
  "Commercial use for your own business",
  "Built for creators, founders, coaches, and agencies",
];

const LAUNCH_STEPS = [
  {
    title: "Pick your kit",
    copy: "Choose the product that solves your biggest bottleneck: copy, AI workflow, or visual identity.",
  },
  {
    title: "Customize the assets",
    copy: "Swap in your offer, audience, voice, and pricing using the included quick-start prompts.",
  },
  {
    title: "Launch and promote",
    copy: "Use the bundled launch captions, email templates, and sales blocks to start selling faster.",
  },
];

export default function Shop() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-violet-950/60 via-black to-cyan-950/40 px-6 py-16 md:px-14 md:py-24 mb-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-[100px]" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black uppercase tracking-[0.3em] text-violet-300 mb-6">
                <ShoppingBag className="w-3 h-3" />
                Digital Product Launch Shop
              </div>

              <h1 className="text-5xl md:text-8xl font-black italic uppercase text-white tracking-tighter leading-[0.9] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Sell More <span className="text-violet-400">Digital Products</span>
              </h1>

              <p className="mt-8 text-white/70 text-base md:text-xl font-medium max-w-3xl leading-relaxed">
                {CORE_MESSAGE}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#products" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-violet-400 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white hover:shadow-[0_0_40px_rgba(167,139,250,0.45)]">
                  Shop Launch Kits <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#bundle" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:border-cyan-300/40 hover:bg-cyan-300/10">
                  View Best Value <Gift className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-black/30 p-8 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 text-cyan-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <Megaphone className="w-4 h-4" />
                What you get
              </div>
              <div className="grid gap-4">
                {BENEFITS.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                    <span className="text-sm font-bold uppercase tracking-wider text-white/70">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mb-24 scroll-mt-24">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-300">Featured Products</span>
              <h2 className="mt-3 text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter">Launch-ready assets</h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-white/50">
              Each kit is designed to remove one launch bottleneck so you can move from idea to polished offer faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SHOP_ITEMS.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card flex flex-col p-7 rounded-[2.5rem] border border-white/10 bg-white/5 hover:border-violet-400/40 transition-all duration-500 group"
              >
                <div className="w-full aspect-square rounded-[2rem] bg-black/40 border border-white/5 mb-7 flex items-center justify-center text-7xl relative overflow-hidden group-hover:border-violet-500/20 transition-all">
                  <div className="z-10 group-hover:scale-110 transition-transform duration-500">{item.image}</div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-20 blur-3xl" style={{ backgroundColor: item.color }} />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white/60">
                    {item.value}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <div className="text-[10px] font-black uppercase tracking-widest text-violet-300 mb-3">
                  {item.category}
                </div>

                <h3 className="text-2xl font-black italic uppercase text-white mb-3 tracking-tighter">
                  {item.name}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed mb-5 flex-grow">
                  {item.description}
                </p>

                <div className="mb-6 rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-4 text-xs font-bold uppercase tracking-wider text-cyan-100/80">
                  <Sparkles className="mb-2 h-4 w-4 text-cyan-300" />
                  {item.outcome}
                </div>

                <ul className="mb-8 space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/45">
                      <Zap className="h-3 w-3 text-violet-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="w-full mt-auto pt-7 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25">Instant Access</div>
                      <div className="text-3xl font-black italic text-white tracking-tighter">{item.price}</div>
                    </div>
                    <Download className="h-6 w-6 text-white/25" />
                  </div>
                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-violet-400 hover:text-black hover:border-violet-400 transition-all shadow-[0_0_20px_rgba(139,92,246,0)] hover:shadow-[0_10px_30px_rgba(139,92,246,0.3)]">
                    Add to Payload
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="bundle" className="mb-24 scroll-mt-24 rounded-[3.5rem] border border-cyan-300/20 bg-cyan-300/[0.04] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">
                <Rocket className="h-3 w-3" />
                Best Value Bundle
              </div>
              <h2 className="mt-6 text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                The Complete Launch Current
              </h2>
              <p className="mt-5 text-white/55 leading-relaxed">
                Bundle all three digital products into a single launch stack: plan your offer, build your promotional engine, and wrap everything in a premium brand system.
              </p>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-black/35 p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/35">Bundle Price</div>
                  <div className="mt-2 flex items-end gap-3">
                    <span className="text-5xl font-black italic tracking-tighter text-white">$89</span>
                    <span className="pb-2 text-sm font-bold uppercase tracking-widest text-white/35 line-through">$113</span>
                  </div>
                </div>
                <button className="rounded-2xl bg-cyan-300 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-white">
                  Claim Bundle
                </button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {SHOP_ITEMS.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 text-center">
                    <div className="text-3xl">{item.image}</div>
                    <div className="mt-3 text-[10px] font-black uppercase tracking-widest text-white/60">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-violet-300">Launch Path</span>
            <h2 className="mt-3 text-4xl md:text-6xl font-black italic uppercase text-white tracking-tighter">From download to sold</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {LAUNCH_STEPS.map((step, index) => (
              <div key={step.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400 text-lg font-black italic text-black">
                  {index + 1}
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/50">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-10 md:p-12 rounded-[3.5rem] border border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">Secure Digital Delivery</h3>
            <p className="text-white/45 text-xs font-black uppercase tracking-widest leading-loose">
              All products are digital assets delivered instantly after purchase. No physical shipments are processed from this outpost.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl bg-white/5 text-white/40"><ShieldCheck className="w-8 h-8" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/25 text-center">Encrypted<br />Transactions</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl bg-white/5 text-white/40"><CreditCard className="w-8 h-8" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/25 text-center">Auth-Link<br />Payments</span>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
