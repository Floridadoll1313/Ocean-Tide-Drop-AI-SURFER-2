import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabaseAnonKey, supabaseUrl } from "../../lib/supabase";

type IntakeState = {
  industry: string;
  service_area: string;
  main_product_service: string;
  ideal_customer: string;
  biggest_business_challenge: string;
  biggest_business_goal: string;
  employee_count: string;
  lead_sources: string;
  lead_followup_process: string;
  biggest_repetitive_task: string;
  customer_service_burden: string;
  marketing_channels: string;
  ai_goal: string;
};

const EMPTY: IntakeState = {
  industry: "",
  service_area: "",
  main_product_service: "",
  ideal_customer: "",
  biggest_business_challenge: "",
  biggest_business_goal: "",
  employee_count: "",
  lead_sources: "",
  lead_followup_process: "",
  biggest_repetitive_task: "",
  customer_service_burden: "",
  marketing_channels: "",
  ai_goal: "",
};

const FIELDS: Array<{ key: keyof IntakeState; label: string; placeholder: string; multiline?: boolean }> = [
  { key: "industry", label: "Industry", placeholder: "Example: HVAC, real estate, restaurant" },
  { key: "service_area", label: "Location or service area", placeholder: "Where do you serve customers?" },
  { key: "main_product_service", label: "Main product or service", placeholder: "What do you most want customers to buy?" },
  { key: "ideal_customer", label: "Ideal customer", placeholder: "Who is the best fit for your business?", multiline: true },
  { key: "biggest_business_challenge", label: "Biggest business challenge", placeholder: "What is getting in the way right now?", multiline: true },
  { key: "biggest_business_goal", label: "Biggest business goal", placeholder: "What would a strong result look like?", multiline: true },
  { key: "employee_count", label: "Approximate number of employees", placeholder: "0 if you are solo" },
  { key: "lead_sources", label: "How do leads find you now?", placeholder: "Google, referrals, social, ads, walk-ins...", multiline: true },
  { key: "lead_followup_process", label: "How do you follow up with leads?", placeholder: "Describe what happens after someone contacts you.", multiline: true },
  { key: "biggest_repetitive_task", label: "Biggest repetitive task", placeholder: "What work keeps eating your time?", multiline: true },
  { key: "customer_service_burden", label: "Biggest customer-service burden", placeholder: "What questions or requests repeat most often?", multiline: true },
  { key: "marketing_channels", label: "Current marketing channels", placeholder: "Website, Facebook, email, Google Business Profile...", multiline: true },
  { key: "ai_goal", label: "What do you most want AI to help accomplish?", placeholder: "Visibility, leads, follow-up, content, support, automation...", multiline: true },
];

export default function AuditIntake() {
  const { session } = useAuth();
  const [params] = useSearchParams();
  const stripeSessionId = params.get("session_id") || "";
  const [status, setStatus] = useState<"verifying" | "ready" | "saving" | "saved" | "error">("verifying");
  const [error, setError] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [form, setForm] = useState<IntakeState>(EMPTY);

  const callIntake = async (body: Record<string, unknown>) => {
    if (!session?.access_token) throw new Error("Please sign in to continue.");
    const response = await fetch(`${supabaseUrl}/functions/v1/aeo-audit-intake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(body),
    });
    const payload = await response.json() as { ok?: boolean; error?: string; business_name?: string };
    if (!response.ok || !payload.ok) throw new Error(payload.error || "Audit verification failed");
    return payload;
  };

  useEffect(() => {
    if (!session?.access_token) return;
    if (!stripeSessionId) {
      setError("Your Stripe checkout receipt is missing. Return from the payment confirmation link to continue.");
      setStatus("error");
      return;
    }

    let cancelled = false;
    void callIntake({ action: "verify", stripe_session_id: stripeSessionId })
      .then((payload) => {
        if (cancelled) return;
        setBusinessName(payload.business_name || "your business");
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Paid audit verification failed");
        setStatus("error");
      });
    return () => { cancelled = true; };
  }, [session?.access_token, stripeSessionId]);

  const update = (key: keyof IntakeState, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripeSessionId) return;
    setStatus("saving");
    setError("");
    try {
      await callIntake({
        action: "save",
        stripe_session_id: stripeSessionId,
        intake: {
          ...form,
          employee_count: form.employee_count.trim() === "" ? null : Number.parseInt(form.employee_count, 10),
        },
      });
      setStatus("saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your audit intake");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-14 text-white">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-cyan-300/25 bg-slate-900/80 p-7 shadow-2xl md:p-10">
        <div className="text-center">
          <div className="text-5xl" aria-hidden="true">🌊</div>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Paid AEO Wave Audit Intake</p>
          <h1 className="mt-3 text-4xl font-black">Tell AI Fin About Your Business</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">We use these details to turn your paid audit into a personalized visibility analysis, Customer Question Map, and 30-Day Wave Plan.</p>
        </div>

        {status === "verifying" && <div role="status" className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-5 text-center text-cyan-100">Verifying your paid audit…</div>}

        {status === "error" && <div role="alert" className="mt-8 rounded-2xl border border-rose-300/25 bg-rose-300/10 p-5 text-rose-100">{error}</div>}

        {status === "saved" && (
          <div role="status" className="mt-8 rounded-3xl border border-emerald-300/25 bg-emerald-300/10 p-7 text-center">
            <div className="text-3xl">✅</div>
            <h2 className="mt-3 text-2xl font-black">Your Intake Is In</h2>
            <p className="mt-3 text-emerald-100">We securely saved your paid AEO Wave Audit intake for {businessName || "your business"}. Your audit is now ready for the scoring and AI Fin analysis stage.</p>
          </div>
        )}

        {(status === "ready" || status === "saving") && (
          <form onSubmit={submit} className="mt-8 space-y-5">
            {businessName && <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm text-cyan-100">Paid audit verified for <strong>{businessName}</strong>.</div>}
            {FIELDS.map((field) => (
              <label key={field.key} className="block">
                <span className="mb-2 block font-bold text-slate-100">{field.label}</span>
                {field.multiline ? (
                  <textarea required value={form[field.key]} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} rows={4} className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300" />
                ) : (
                  <input required type={field.key === "employee_count" ? "number" : "text"} min={field.key === "employee_count" ? 0 : undefined} value={form[field.key]} onChange={(event) => update(field.key, event.target.value)} placeholder={field.placeholder} className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300" />
                )}
              </label>
            ))}
            <button type="submit" disabled={status === "saving"} className="w-full rounded-full bg-gradient-to-r from-cyan-300 to-teal-300 px-7 py-4 text-lg font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">{status === "saving" ? "Saving My Intake…" : "Submit My AEO Wave Audit Intake 🌊"}</button>
            <p className="text-center text-xs text-slate-500">Your intake is accepted only after your signed-in account and paid Stripe order are verified.</p>
          </form>
        )}
      </section>
    </main>
  );
}
