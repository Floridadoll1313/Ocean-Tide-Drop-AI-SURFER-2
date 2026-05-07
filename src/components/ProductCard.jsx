import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function ProductCard({ title, description, slug, price, image, features }) {
  return (
    <Link to={`/pricing/${slug}`} className="block h-full">
      <div className="p-8 bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col h-full relative overflow-hidden group rounded-2xl hover:border-cyan-400/50 transition-colors duration-300">
        
        {/* Glow Element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-24 bg-cyan-400/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="flex-1 relative z-10 flex flex-col">
          {image && (
            <div className="w-full h-32 mb-6 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply group-hover:bg-black/20 transition-colors duration-500" />
              <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            </div>
          )}
          <span className="text-[10px] text-cyan-400 font-bold mb-2 uppercase tracking-widest block">{slug.replace('-', ' ')}</span>
          <h3 className="font-display text-2xl md:text-3xl font-black mb-4 uppercase tracking-tighter">{title}</h3>
          
          <div className="text-3xl font-bold font-display uppercase tracking-tighter mb-6 text-white/90">
            {price}
          </div>
          
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            {description}
          </p>
          
          {features && features.length > 0 && (
            <div className="mt-auto pt-4 border-t border-white/5 space-y-2 mb-4">
              {features.slice(0, 3).map((feature, i) => (
                <div key={i} className="flex items-center text-white/60 text-xs">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2" />
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto relative z-10 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-cyan-400 transition-colors">
            <span>Select System</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
