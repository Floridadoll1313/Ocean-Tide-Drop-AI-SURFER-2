import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Waves, Zap, Flame, Crown, ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';

const iconMap = {
  waves: Waves,
  zap: Zap,
  flame: Flame,
  crown: Crown
};

export default function PricingDetail() {
  const { slug } = useParams();
  const tier = products.find(t => t.slug === slug);

  if (!tier) {
    return (
      <div className="w-full relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-12">
        <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">404</h1>
        <p className="text-white/50 text-sm leading-relaxed mb-8">Wave Not Found. This coordinate does not exist.</p>
        <Link to="/pricing" className="px-8 py-4 bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors inline-block">
          Return to Pricing
        </Link>
      </div>
    );
  }

  const Icon = iconMap[tier.iconName] || Waves;

  return (
    <div className="w-full text-left relative z-10">
      {/* NEON OCEAN AURA */}
      <motion.div
        className="absolute inset-0 opacity-40 blur-[140px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(6,182,212,0.25), transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="mb-12">
        <Link to="/pricing" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-cyan-400 transition-colors">
          <ArrowLeft size={16} /> Back to Tiers
        </Link>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full"
        >
          <div className="mb-6 px-3 py-1.5 bg-white/5 border border-white/10 w-fit">
            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${tier.color} flex items-center gap-2`}>
              <Icon size={12} /> System Tier
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">{tier.name}</h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg">{tier.narrative}</p>
          
          <div className="text-6xl md:text-8xl font-bold font-display uppercase tracking-tighter mb-12 text-white/90">
            {tier.price}
          </div>

          <a href="#" className={`px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors inline-flex items-center justify-center w-full sm:w-auto`}>
            Begin Your Drop
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-96 p-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl relative overflow-hidden group"
        >
          {tier.image && (
             <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-black/80 z-10 backdrop-blur-sm group-hover:bg-black/60 transition-colors duration-500" />
               <img src={tier.image} alt={tier.alt} className="w-full h-full object-cover opacity-50" crossOrigin="anonymous" referrerPolicy="no-referrer" />
             </div>
          )}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-[50px] pointer-events-none z-10" />
          
          <div className="relative z-20">
            <h3 className="font-display text-2xl font-bold mb-8 uppercase tracking-tighter">Architecture Includes</h3>
            
            <ul className="space-y-6">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className={`w-5 h-5 ${tier.color} mr-4 shrink-0 mt-0.5`} /> 
                  <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
