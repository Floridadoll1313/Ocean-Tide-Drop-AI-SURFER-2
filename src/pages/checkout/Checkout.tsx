import { useState } from "react";
import type { FormEvent } from "react";

interface Tier {
  name: string;
  basePrice: number;
  features: string[];
}

const tiers: Tier[] = [
  { name: "Starter Access", basePrice: 49, features: ["Full app access", "Standard automation flows", "Continuous support"] },
  { name: "Innovator Tier", basePrice: 99, features: ["Full app + dashboard", "Quarterly AI forecasts", "Dedicated local support"] },
  { name: "Console Tier", basePrice: 149, features: ["Full app access + major consoles", "Custom automation builds", "Priority fast-track onboarding"] },
  { name: "Full Takeover", basePrice: 497, features: ["Custom AI ecosystem build", "Exclusive console permissions", "Direct 1-on-1 mentorship"] },
];

export default function Checkout() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [promoStatus, setPromoStatus] = useState<{ msg: string; success: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "OCEANTIDE20") {
      setDiscountRate(0.2);
      setPromoStatus({ msg: "20% launch discount applied.", success: true });
    } else if (!code) {
      setDiscountRate(0);
      setPromoStatus(null);
    } else {
      setDiscountRate(0);
      setPromoStatus({ msg: "Invalid promo code.", success: false });
    }
  };

  const submitCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTier) return;
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tierName: selectedTier.name, basePrice: selectedTier.basePrice, promoCode }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Unable to start checkout.");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Network error connecting to payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Your Next Wave</p>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">Choose the AI Surfer path that fits your business.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">The free Wave Audit comes first. These are the next-step access options for implementation and ongoing AI systems.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <article key={tier.name} className="flex flex-col justify-between rounded-3xl border border-cyan-300/15 bg-slate-900/80 p-6 shadow-2xl">
              <div>
                <h2 className="text-xl font-bold">{tier.name}</h2>
                <div className="mt-4 text-4xl font-black text-cyan-300">${(tier.basePrice * 0.8).toFixed(0)}<span className="text-sm font-semibold text-slate-400">/mo with launch code</span></div>
                <p className="mt-2 text-xs text-slate-500 line-through">${tier.basePrice.toFixed(0)}/mo</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">{tier.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
              </div>
              <button type="button" onClick={() => { setSelectedTier(tier); setPromoCode(""); setDiscountRate(0); setPromoStatus(null); }} className="mt-7 rounded-full bg-gradient-to-r from-cyan-300 to-teal-300 px-5 py-3 font-black text-slate-950">Choose this wave</button>
            </article>
          ))}
        </div>
      </div>

      {selectedTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-5 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-cyan-300/25 bg-slate-900 p-7 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Checkout</p><h2 className="mt-1 text-2xl font-black">{selectedTier.name}</h2></div>
              <button type="button" onClick={() => setSelectedTier(null)} className="text-slate-400 hover:text-white" aria-label="Close">✕</button>
            </div>

            <form onSubmit={submitCheckout} className="mt-6 space-y-4">
              <div>
                <label htmlFor="checkout-email" className="mb-2 block text-sm font-semibold text-slate-300">Email address</label>
                <input id="checkout-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourbusiness.com" className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-300" />
              </div>
              <div>
                <label htmlFor="promo-code" className="mb-2 block text-sm font-semibold text-slate-300">Promo code</label>
                <div className="flex gap-2">
                  <input id="promo-code" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="OCEANTIDE20" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 uppercase outline-none focus:border-cyan-300" />
                  <button type="button" onClick={applyPromo} className="rounded-xl bg-cyan-300 px-4 font-bold text-slate-950">Apply</button>
                </div>
                {promoStatus && <p className={`mt-2 text-sm ${promoStatus.success ? "text-emerald-300" : "text-amber-200"}`}>{promoStatus.msg}</p>}
              </div>
              <div className="rounded-xl bg-white/[0.04] p-4 text-sm text-slate-300">Total: <span className="font-black text-cyan-300">${(selectedTier.basePrice * (1 - discountRate)).toFixed(2)}/mo</span></div>
              <button disabled={loading} type="submit" className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-teal-300 px-5 py-3 font-black text-slate-950 disabled:opacity-60">{loading ? "Connecting to Stripe..." : "Continue to secure checkout"}</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
