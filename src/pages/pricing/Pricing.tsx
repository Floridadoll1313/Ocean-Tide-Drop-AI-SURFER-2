import React from "react";
import { ProductCard } from "../../components/ProductCard"; // named export
import { motion } from "motion/react";
import "./pricing.css";

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 relative overflow-hidden">
      {/* NEON OCEAN AURA */}
      <motion.div
        className="absolute inset-0 opacity-40 blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(0,255,255,0.35), transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="pricing-title text-neon-cyan drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">
          Choose Your Tier
        </h1>

        <p className="pricing-subtitle uppercase tracking-[0.3em] text-xs">
          Calibrate Your Neural Surf Engine
        </p>
      </motion.div>

      {/* GRID WITH STAGGERED ANIMATION */}
      <motion.div
        className="pricing-grid max-w-6xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
      >
        {/* DAWN PATROL */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ProductCard
            title="Dawn Patrol"
            description="Your cinematic entry point. Clean landing, AI‑assisted content, and your first automated workflows."
            slug="dawn-patrol"
            image="/images/dawn-patrol.jpg"
          />
        </motion.div>

        {/* BREAKLINE */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ProductCard
            title="Breakline"
            description="A multi‑page experience with deeper automations and a tuned content engine that moves with your brand."
            slug="breakline"
            image="/images/breakline.jpg"
          />
        </motion.div>

        {/* HATTERAS ISLAND */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ProductCard
            title="Hatteras Island"
            description="High‑touch creative systems, evolving brand identity, and ongoing cinematic refinement."
            slug="hatteras-island"
            image="/images/hatteras.jpg"
          />
        </motion.div>

        {/* CAPE POINT */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ProductCard
            title="Cape Point"
            description="Full‑stack automation, AI‑driven content pipelines, and mythic brand architecture built for scale."
            slug="cape-point"
            image="/images/cape-point.jpg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Pricing;
