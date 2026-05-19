import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PageWrapper from '../../components/PageWrapper';

const TIERS: Record<string, { title: string; color: string; glow: string; description: string; }> = {
  "dawn-patrol": {
    title: "Dawn Patrol",
    color: "text-slate-300",
    glow: "shadow-[0_0_40px_rgba(200,200,255,0.3)]",
    description: "Initializing your cinematic entry point...",
  },
  "breakline": {
    title: "Breakline",
    color: "text-[#00eaff]",
    glow: "shadow-[0_0_40px_rgba(0,255,255,0.5)]",
    description: "Calibrating deeper automations...",
  },
  "hatteras-island": {
    title: "Surfer Elite",
    color: "text-pink-500",
    glow: "shadow-[0_0_40px_rgba(255,0,128,0.5)]",
    description: "Opening high-touch creative systems...",
  },
  "cape-point": {
    title: "Cape Point",
    color: "text-yellow-300",
    glow: "shadow-[0_0_40px_rgba(255,215,0,0.5)]",
    description: "Activating full-stack architecture...",
  },
};

export default function PricingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const tierId = slug || "dawn-patrol";
  const tier = TIERS[tierId] || TIERS["dawn-patrol"];
  const [activated, setActivated] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { user, loginWithGoogle } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivated(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      // Require login before checkout
      await loginWithGoogle();
      // the page will reactively update state, user can then click Subscribe again.
      return;
    }

    setLoadingCheckout(true);
    try {
      const resp = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          tierId: tierId,
        }),
      });

      const data = await resp.json();
      if (resp.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout configuration missing. Set STRIPE_SECRET_KEY and Stripe Prices in .env");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to start checkout. Check console for details.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="relative flex items-center justify-center py-10 w-full min-h-[60vh]">
        {/* BACKGROUND */}
        <div className="absolute inset-0 opacity-40 blur-[120px]" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,255,255,0.2), transparent 60%)" }} />

        {/* GLASS ACTIVATION CARD */}
        <div className={`relative max-w-2xl w-full glass-card p-12 rounded-[3xl] border border-white/10 bg-white/5 text-center backdrop-blur-xl ${tier.glow} transition-all duration-1000 z-20`}>
          <h1 className={`text-5xl font-black italic uppercase mb-4 drop-shadow-xl ${tier.color}`}>
            {tier.title}
          </h1>
          <p className="text-slate-500 mb-12 uppercase text-[10px] tracking-[0.4em]">Activation Sequence Online</p>
          <p className="text-slate-300 font-light mb-8">{tier.description}</p>

          {/* ACTIVATION LOADER */}
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-10 relative">
            <div className={`absolute top-0 bottom-0 left-0 w-1/2 ${tier.color.replace("text-", "bg-")} animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]`} />
          </div>

          <Link to="/pricing" className="inline-flex items-center gap-2 text-[#00eaff] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
            ← Back to Tiers
          </Link>
        </div>

        {/* ACTIVATION COMPLETE REVEAL OVERLAY */}
        {activated && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-1000 z-50">
            <div className="text-center w-full max-w-md px-6">
              <div className={`text-5xl font-black uppercase tracking-widest mb-6 ${tier.color} drop-shadow-lg`}>
                Activation Complete
              </div>
              <div className={`mx-auto w-32 h-32 rounded-full border-4 ${tier.color.replace('text-', 'border-')} ${tier.glow} animate-pulse shadow-xl`} />
              <p className="mt-8 text-slate-300 text-sm tracking-widest font-light">
                Welcome to the {tier.title} tier.
              </p>
              <div className="mt-10 flex flex-col gap-4">
                <button 
                  onClick={handleSubscribe} 
                  disabled={loadingCheckout}
                  className={`py-4 px-8 rounded-full ${tier.color.replace('text-', 'bg-')}/20 border border-white/20 text-white uppercase tracking-widest text-xs font-bold shadow-lg hover:shadow-xl hover:bg-white/30 transition-all ${loadingCheckout ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {loadingCheckout ? "Processing..." : user ? "Subscribe to Enter" : "Sign In to Subscribe"}
                </button>
                <Link to="/pricing" className="text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
