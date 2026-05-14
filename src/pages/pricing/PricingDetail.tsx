import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

// ---------------------------------------------
// TIER METADATA (CINEMATIC THEMES)
// ---------------------------------------------
const TIERS: Record<
  string,
  {
    title: string;
    color: string;
    glow: string;
    description: string;
  }
> = {
  "neural-node": {
    title: "Neural Node",
    color: "text-neon-pink",
    glow: "shadow-[0_0_40px_rgba(255,0,128,0.6)]",
    description: "Initializing your neural field…",
  },
  "ocean-pro": {
    title: "Ocean Pro",
    color: "text-neon-cyan",
    glow: "shadow-[0_0_40px_rgba(0,255,255,0.6)]",
    description: "Calibrating oceanic resonance…",
  },
  "founders-realm": {
    title: "Founders Realm",
    color: "text-neon-gold",
    glow: "shadow-[0_0_40px_rgba(255,215,0,0.6)]",
    description: "Opening the inner sanctum…",
  },
};

// ---------------------------------------------
// PARTICLE FIELD
// ---------------------------------------------
const particles = Array.from({ length: 24 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  delay: Math.random() * 4,
}));

// ---------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------
const PricingDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const tier = slug && TIERS[slug] ? TIERS[slug] : TIERS["neural-node"];

  // Activation reveal state
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivated(true);
    }, 3000); // 3-second activation ritual

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center p-4">

      {/* --------------------------------------------- */}
      {/* NEON OCEAN AURA BACKGROUND */}
      {/* --------------------------------------------- */}
      <motion.div
        className="absolute inset-0 opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.4), transparent 60%)",
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* --------------------------------------------- */}
      {/* PARTICLE DRIFT LAYER */}
      {/* --------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.y}%`,
              left: `${p.x}%`,
            }}
            animate={{
              y: ["0%", "-20%", "0%"],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* --------------------------------------------- */}
      {/* GLASS ACTIVATION CARD */}
      {/* --------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={`relative max-w-2xl w-full glass-card p-12 rounded-[3rem] border border-white/10 bg-white/5 text-center backdrop-blur-xl ${tier.glow}`}
      >
        {/* TITLE */}
        <h1
          className={`text-5xl font-black italic uppercase mb-4 drop-shadow-xl ${tier.color}`}
        >
          {tier.title}
        </h1>

        <p className="text-slate-500 mb-12 uppercase text-[10px] tracking-[0.4em]">
          Activation Sequence Online
        </p>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-300 font-light mb-8"
        >
          {tier.description}
        </motion.p>

        {/* ACTIVATION LOADER */}
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-10">
          <motion.div
            className={`h-full ${tier.color.replace("text-", "bg-")}`}
            animate={{ x: ["-200%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </div>

        {/* BACK LINK */}
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 text-neon-cyan text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Tiers
        </Link>
      </motion.div>

      {/* --------------------------------------------- */}
      {/* ACTIVATION COMPLETE REVEAL OVERLAY */}
      {/* --------------------------------------------- */}
      {activated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-5xl font-black uppercase tracking-widest mb-6 ${tier.color}`}
            >
              Activation Complete
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className={`mx-auto w-32 h-32 rounded-full border-4 ${tier.color.replace(
                'text-',
                'border-'
              )} ${tier.glow}`}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-8 text-slate-300 uppercase text-xs tracking-[0.3em]"
            >
              Welcome to the {tier.title}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-10"
            >
              <Link
                to="/members"
                className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white uppercase tracking-widest text-xs hover:bg-white/20 transition"
              >
                Enter Realm
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PricingDetail;

