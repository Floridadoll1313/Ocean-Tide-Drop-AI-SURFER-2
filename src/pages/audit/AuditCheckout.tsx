import { useEffect, useState } from "react";
import { supabaseAnonKey, supabaseUrl } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function AuditCheckout() {
  const { session } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.access_token) return;
    let cancelled = false;

    const start = async () => {
      try {
        const saved = window.sessionStorage.getItem("ai-surfer:aeo-checkout-context");
        const context = saved ? JSON.parse(saved) as { email?: string; submissionId?: string } : {};
        const response = await fetch(`${supabaseUrl}/functions/v1/stripe-payments/create-aeo-checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ submission_id: context.submissionId ?? null }),
        });
        const payload = await response.json() as { checkout_url?: string; error?: string };
        if (!response.ok || !payload.checkout_url) throw new Error(payload.error || "Could not start checkout");
        if (!cancelled) window.location.assign(payload.checkout_url);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not start checkout");
      }
    };

    void start();
    return () => { cancelled = true; };
  }, [session?.access_token]);

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-[2rem] border border-cyan-300/25 bg-slate-900/80 p-8 text-center shadow-2xl">
        <div className="text-5xl" aria-hidden="true">🌊</div>
        <h1 className="mt-4 text-3xl font-black">Opening Secure Checkout</h1>
        <p className="mt-3 text-slate-300">Connecting your $97 AEO Wave Audit to Stripe securely.</p>
        {error && <div role="alert" className="mt-6 rounded-2xl border border-rose-300/25 bg-rose-300/10 p-4 text-rose-100">{error}</div>}
      </section>
    </main>
  );
}
