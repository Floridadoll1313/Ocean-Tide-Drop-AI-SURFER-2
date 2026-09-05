import { Link } from "react-router-dom";
import { SERVICES } from "../../data/services";

const MEMBERSHIP_URL = "https://buy.stripe.com/cNi00j5BFcFAcDg7RR4gg03";
const AEO_AUDIT_URL = "https://buy.stripe.com/eVq4gzaVZ350cDg5JJ4gg0a";

export default function Pricing() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Ocean Tide Drop AI SURFER</p>
          <h1 className="mt-3 text-5xl font-black md:text-6xl">Choose Your AI Wave 🌊</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">Start free, go deeper with a $97 AEO Wave Audit, join the Members Portal for $17/month, or bring us in to build the system for you.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Offer title="Free AI Wave Check" price="$0" text="See where AI visibility, lead follow-up, and automation opportunities are hiding." cta="Start Free" href="/wave-check" internal />
          <Offer title="AEO Wave Audit" price="$97 once" text="A deeper paid audit with business context, 100-point scoring, and your 30-Day Wave Plan." cta="Get My $97 Audit" href={AEO_AUDIT_URL} />
          <Offer title="AI Surfer Members Portal" price="$17/month" text="Recurring access to the Ocean Tide Drop AI SURFER members experience and released tools." cta="Join the Members Portal" href={MEMBERSHIP_URL} featured />
        </div>

        <section className="mt-20">
          <h2 className="text-center text-4xl font-black">AI Surfer Memberships</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-300">One clear live membership instead of a maze of stale tiers. Upgrade-specific tools can still be released behind the Members Portal as they are ready.</p>
        </section>
        <section className="mt-16">
          <h2 className="text-center text-4xl font-black text-cyan-300">Done-For-You AI Builds ⚡</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-300">For businesses ready for implementation, each current build offer is $2,500 one-time.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {Object.entries(SERVICES).map(([key, service]) => (
              <article key={key} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <h3 className="text-2xl font-black">{service.label}</h3>
                <div className="mt-3 text-4xl font-black text-cyan-300">${service.price.toLocaleString()}</div>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">{service.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul>
                <a href={service.stripeLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">Build My System</a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Offer({ title, price, text, cta, href, featured = false, internal = false }: { title: string; price: string; text: string; cta: string; href: string; featured?: boolean; internal?: boolean }) {
  const classes = `rounded-3xl border p-7 ${featured ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-white/[0.04]"}`;
  return <article className={classes}><h2 className="text-2xl font-black">{title}</h2><div className="mt-3 text-4xl font-black text-cyan-300">{price}</div><p className="mt-4 leading-7 text-slate-300">{text}</p>{internal ? <Link to={href} className="mt-7 inline-flex rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">{cta}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">{cta}</a>}</article>;
}