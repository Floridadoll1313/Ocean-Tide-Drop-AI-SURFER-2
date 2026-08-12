import { motion } from "framer-motion";
import { ArrowRight, Bot, ChartNoAxesCombined, Headphones, Sparkles, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import homepageConcept from "../../assets/images/ocean_ai_yacht.png";
import OceanBackground from "../../components/landing/OceanBackground";
import SunriseGlow from "../../components/landing/SunriseGlow";
import BioluminescentParticles from "../../components/landing/BioluminescentParticles";
import Navbar from "../../components/landing/Navbar";

const opportunities = [
  { icon: ChartNoAxesCombined, title: "More leads", text: "Find missed opportunities and move prospects forward faster." },
  { icon: Bot, title: "Smarter sales", text: "Automate follow-up so good leads do not disappear into the undertow." },
  { icon: Workflow, title: "Less busywork", text: "Turn repetitive steps into clean AI-powered workflows." },
  { icon: Headphones, title: "Better customer care", text: "Handle routine questions with faster, more consistent answers." },
];

export default function NewLanding() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <OceanBackground />
      <SunriseGlow />
      <BioluminescentParticles />
      <Navbar />

      <section
        className="relative isolate flex min-h-[92vh] items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(2,12,30,.58), rgba(2,12,30,.97)), url(${homepageConcept})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,.12),transparent_30%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-md">
              <Sparkles size={15} /> Ocean Hybrid AI
            </div>

            <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Find the AI Opportunities
              <span className="block bg-gradient-to-r from-cyan-200 via-teal-300 to-amber-200 bg-clip-text text-transparent">
                Hiding in Your Business
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              AI Surfer shows you where AI can save time, capture more leads, improve customer care, and create new growth opportunities, starting with a free five-question Wave Audit.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/wave-audit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-teal-300 px-7 py-4 text-base font-black text-slate-950 shadow-[0_0_35px_rgba(45,212,191,.26)] transition hover:-translate-y-1 hover:from-cyan-200 hover:to-teal-200"
              >
                Get My Free AI Wave Audit <ArrowRight size={19} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                See How AI Surfer Works
              </a>
            </div>

            <p className="mt-5 text-sm text-slate-400">Free • 5 questions • Instant opportunity score</p>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 border-y border-white/10 bg-slate-950/80 px-6 py-24 backdrop-blur-xl md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Ride the right wave</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">What the Wave Audit looks for</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">No AI jargon exam. Just five business questions that help us spot where automation could create the most practical value.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {opportunities.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} whileHover={{ y: -6 }} className="rounded-3xl border border-cyan-300/15 bg-slate-900/65 p-6 shadow-2xl backdrop-blur-xl">
                <Icon className="text-cyan-300" size={30} />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">Your first readout</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Get your score before you give us your email.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">The scanner shows an instant AI Opportunity Score™ and a teaser Wave Map first. Then your email unlocks the detailed report.</p>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-slate-900/75 p-7 shadow-[0_20px_80px_rgba(8,47,73,.5)] backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Sample result</div>
            <div className="mt-5 flex items-end gap-3">
              <div className="text-6xl font-black text-white">82</div>
              <div className="pb-2 text-slate-400">/100</div>
            </div>
            <div className="mt-2 text-sm font-semibold text-cyan-200">AI Opportunity Score™</div>
            <p className="mt-4 text-sm leading-6 text-slate-300">A practical estimate based on the answers you provide, not a scientific measurement.</p>
            <div className="mt-6 rounded-2xl border border-amber-200/20 bg-amber-100/5 p-4">
              <div className="text-xs uppercase tracking-wider text-amber-200">Your Biggest Wave</div>
              <div className="mt-1 text-lg font-bold">Lead & Sales Follow-Up</div>
              <p className="mt-2 text-sm text-slate-300">Faster response and consistent follow-up could be a high-value place to start.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-28 pt-6 text-center md:px-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 via-slate-900/70 to-amber-200/5 p-9 shadow-2xl backdrop-blur-xl md:p-14">
          <h2 className="text-4xl font-black md:text-5xl">Ready to see your biggest AI wave?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Five questions. One instant score. A clear next step for your business.</p>
          <Link to="/wave-audit" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100">
            Start My Free Wave Audit <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
