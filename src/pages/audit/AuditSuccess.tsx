import { Link, useSearchParams } from "react-router-dom";

export default function AuditSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const intakeTarget = sessionId ? `/audit/intake?session_id=${encodeURIComponent(sessionId)}` : "/audit/intake";

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-cyan-300/25 bg-slate-900/80 p-8 text-center shadow-2xl">
        <div className="text-5xl" aria-hidden="true">🌊</div>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Payment complete</p>
        <h1 className="mt-3 text-4xl font-black">Your AEO Wave Audit Is Paid</h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">Your purchase is complete. The next step is your paid audit intake so AI Fin can build the deeper analysis around your business.</p>
        <Link to={intakeTarget} className="mt-8 inline-flex rounded-full bg-gradient-to-r from-cyan-300 to-teal-300 px-7 py-4 font-black text-slate-950">Continue to My Audit Intake</Link>
      </section>
    </main>
  );
}
