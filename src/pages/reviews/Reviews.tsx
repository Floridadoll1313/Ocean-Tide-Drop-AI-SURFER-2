import React from "react";
import PageWrapper from "../../components/PageWrapper";
import { motion } from "motion/react";
import { Star, Quote, CheckCircle2, MessageSquare } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  industry: string;
  content: string;
  rating: number;
  project: string;
  image?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Thomas Vance",
    role: "CEO, NexaStream",
    industry: "SaaS Industry",
    content: "The AI Surfer team integrated a custom Gemini-powered workflow into our customer support pipeline and it reduced our manual response time by 85%. Absolute game changer for our scaling efforts.",
    rating: 5,
    project: "AI Customer Support Engine"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Marketing Director, Bloom Retail",
    industry: "Retail Sector",
    content: "Our landing page conversions jumped from 2.4% to 6.8% within two weeks of launching the new site. The speed of the React/Vite architecture is incredible.",
    rating: 5,
    project: "High-Conversion E-commerce Flow"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Founder, Thorne & Co",
    industry: "Marketing Sector",
    content: "Finally a tech agency that speaks business language. They didn't just build a tool; they built a growth strategy that happened to use high-end AI. Highly recommend.",
    rating: 5,
    project: "Growth Strategy AI Integration"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Product Manager, FitPulse",
    industry: "Health Tech",
    content: "The mobile optimization is flawless. Our users are spending 40% more time in-app because the interface is so smooth and intuitive. The team really understands UX.",
    rating: 5,
    project: "Custom React Component Library"
  },
  {
    id: 5,
    name: "David Chen",
    role: "Head of Operations, LogisticsIQ",
    industry: "Logistics",
    content: "We needed a complex data visualization dashboard for our warehouse tracking. AI Surfer built it in record time using D3 and React. It's now the backbone of our daily operations.",
    rating: 5,
    project: "Real-time Operations Dashboard"
  },
  {
    id: 6,
    name: "Julian Rivera",
    role: "Creative Director, Studio Flux",
    industry: "Creative Agency",
    content: "Working with AI Surfer felt more like a partnership than a client-vendor relationship. Their 'Beach Energy' isn't just a slogan; it's a culture of smooth, stress-free delivery.",
    rating: 5,
    project: "AI-Powered Creative Assets Manager"
  }
];

export default function Reviews() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      {/* 🌊 HEADER */}
      <div className="flex flex-col items-center text-center mt-20 mb-32">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
             <div className="h-[1px] w-12 bg-cyan-500/50"></div>
             <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-cyan-400">Wall of Love</span>
             <div className="h-[1px] w-12 bg-cyan-500/50"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tight text-white mb-8">
            Client <span className="text-soul-gradient italic font-serif">Telemetry</span>
          </h1>
          <p className="text-zinc-400 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            Real feedback from the brands that caught the wave and rode it to the top. We don't just build products; we build long-term success stories.
          </p>
        </motion.div>
      </div>

      {/* ⭐ STATS SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
         {[
           { label: "Client Satisfaction", value: "100%", icon: CheckCircle2, color: "text-emerald-400" },
           { label: "Avg. Growth Multiplier", value: "3.5x", icon: Star, color: "text-cyan-400" },
           { label: "Reviews", value: "48+", icon: MessageSquare, color: "text-pink-400" },
           { label: "Efficiency Gain", value: "60%", icon: Quote, color: "text-purple-400" }
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1 * i }}
             className="glass-card p-8 border border-white/5 text-center flex flex-col items-center"
           >
             <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
             <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">{stat.label}</div>
           </motion.div>
         ))}
      </div>

      {/* 📋 REVIEWS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
        {reviews.map((review, i) => (
          <motion.div
             key={review.id}
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 }}
             className="glass-card p-10 flex flex-col items-start relative overflow-hidden group border border-white/5 hover:border-cyan-400/30 transition-all"
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-16 h-16 text-white" />
             </div>

             <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                   <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                ))}
             </div>

             <p className="text-white font-medium font-sans text-lg mb-8 leading-relaxed italic">
               "{review.content}"
             </p>

             <div className="mt-auto w-full">
                <div className="h-[1px] w-full bg-white/5 mb-8"></div>
                
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-white uppercase overflow-hidden">
                      {review.image ? (
                        <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                      ) : (
                        review.name.split(' ').map(n => n[0]).join('')
                      )}
                   </div>
                   <div>
                      <h4 className="text-white font-bold text-base leading-none mb-1">{review.name}</h4>
                      <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-2">{review.role}</div>
                   </div>
                </div>
                
                <div className="mt-4 flex flex-col gap-1">
                   <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                      Project: {review.project}
                   </div>
                   <div className="text-[9px] font-medium text-zinc-600 uppercase tracking-widest italic">
                      {review.industry}
                   </div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* 🌊 SECONDARY CTA */}
      <div className="mb-40 text-center glass-card p-20 border border-cyan-400/20 max-w-4xl mx-auto shadow-neon">
         <h2 className="text-4xl font-orbitron font-black uppercase text-white mb-6">Ready to give your own review?</h2>
         <p className="text-zinc-400 font-sans text-lg mb-10">Start your journey with us today and let's build something review-worthy.</p>
         <button  className="px-12 py-6 bg-cyan-400 text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all">
            🚀 Schedule Discovery
         </button>
      </div>
    </PageWrapper>
  );
}
