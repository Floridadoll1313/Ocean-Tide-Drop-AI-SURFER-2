import { PROMO } from "../../config/promo";


export default function NewLanding() {

  // ... existing code unchanged ...

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">

      <OceanBackground />
      <SunriseGlow />
      <BioluminescentParticles />

      <Navbar />

      {/* Neon overlay + flare */}
      <div className="landing-light-overlay" aria-hidden="true" />
      <div className="landing-flare" aria-hidden="true" />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(2,12,30,.55), rgba(2,12,30,.90)), url(${homepageConcept})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-6 py-32"
        >

          {/* Logo + heading + text remain unchanged */}

          <div className="mt-10 flex flex-wrap gap-5">

            <Link to="/wave-check" className="rounded-full bg-cyan-400 px-8 py-4 text-slate-950 font-bold flex items-center gap-2 hover:scale-105 transition">
              Get My Free AI Wave Check™
              <ArrowRight size={20} />
            </Link>

            <Link to="/members" className="rounded-full bg-white/10 border border-cyan-300/40 px-8 py-4 text-cyan-200 font-bold flex items-center gap-2 hover:bg-cyan-300/20 hover:scale-105 transition">
              🌊 Members Area
              <ArrowRight size={20} />
            </Link>

            <a href="#solutions" className="rounded-full border border-white/40 px-8 py-4 font-bold hover:bg-white/10 transition">Explore AI Solutions</a>

          </div>

          {/* Promo Pill */}
          {PROMO.enabled && (
            <Link to="/pricing" className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-full font-black text-black bg-gradient-to-r from-cyan-300 to-pink-400 shadow-[0_12px_60px_rgba(0,200,255,0.12)] hover:scale-105 transition transform animate-pulse promo-pill">
              <span className="text-[11px] uppercase tracking-widest">{PROMO.title}</span>
              <strong className="ml-2">{PROMO.discount}</strong>
              <span className="ml-2 text-[10px] opacity-80">{PROMO.code}</span>
            </Link>
          )}

        </motion.div>

        <motion.img src={cyberWave} alt="AI ocean wave" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-0 right-0 w-[500px] opacity-40 pointer-events-none" />

      </section>

      {/* rest of page */}

    </div>
  );
}
