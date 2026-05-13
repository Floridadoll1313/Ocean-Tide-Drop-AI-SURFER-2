import React from "react";
import { products } from "../../data/products";
import { ProductCard } from "../../components/ProductCard";
import { motion } from "motion/react";
import "./pricing.css";

export default function PricingIndex() {
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

      <div className="max-w-4xl mb-16">
        <h1 className="pricing-title mb-6 leading-[0.9]">
          The Surf <br /> 
          <span className="text-neon-cyan drop-shadow-neon">Tier System</span>
        </h1>
        <p className="pricing-subtitle text-sm md:text-lg leading-relaxed max-w-xl">
          Choose your entry point into the Outer Banks. Each tier provides scalable architecture, 
          automated content, and cinematic brand evolution.
        </p>
      </div>

      <div className="pricing-grid">
        {products.map((product, idx) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProductCard 
              title={product.name}
              description={product.narrative}
              slug={product.slug}
              price={product.price}
              image={product.image}
              features={product.features}
            />
          </motion.div>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-24 p-8 border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-2">Architectural Consulting</h3>
          <p className="text-white/40 text-xs tracking-wider uppercase leading-relaxed max-w-md">
            Need a custom drop? We build bespoke neural pipelines and automated 
            ecosystems for enterprise-level cinematic brands.
          </p>
        </div>
        <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 text-white text-[10px] uppercase font-bold tracking-[0.2em] transition-all rounded-xl">
          Initiate Protocol
        </button>
      </div>
    </div>
  );
}
