import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  LayoutDashboard,
  Palette,
  ShieldCheck,
  Smartphone,
  Waves,
} from "lucide-react";

const mvpTracks = [
  {
    key: "OAS-13",
    title: "Build AI Chat panel",
    description: "A clean AI chat area for business help, content ideas, support prompts, and Ocean Tide Drop workflows.",
    icon: Bot,
    tone: "from-cyan-300 to-blue-500",
  },
  {
    key: "OAS-12",
    title: "Add Analytics dashboard",
    description: "Simple visual metrics for surfers, waves scaled, engagement, support flow, and future business signals.",
    icon: BarChart3,
    tone: "from-emerald-300 to-cyan-400",
  },
  {
    key: "OAS-15",
    title: "Apply Ocean Tide Drop branding",
    description: "Cyber-coastal colors, island-tech energy, and AI Surfer identity across the dashboard experience.",
    icon: Palette,
    tone: "from-pink-400 to-purple-500",
  },
  {
    key: "OAS-14",
    title: "Make dashboard responsive",
    description: "Desktop, tablet, and mobile layouts that keep the dashboard usable from any device.",
    icon: Smartphone,
    tone: "from-yellow-300 to-orange-400",
  },
  {
    key: "OAS-16",
    title: "Connect safe API environment placeholders",
    description: "Use secure environment variables and placeholders only — no real secret keys exposed in the site code.",
    icon: ShieldCheck,
    tone: "from-violet-300 to-cyan-400",
  },
];

const dashboardStats = [
  ["OAS-6", "Jira Epic"],
  ["5", "MVP Tracks"],
  ["PayPal", "Support Flow"],
  ["Safe Env", "API Setup"],
];

export default function DashboardMvp() {
  return (
    <PageWrapper maxWidth="max-w-screen-2xl" showHero={false}>
      <section className="relative overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-black/75 p-6 shadow-[0_0_90px_rgba(34,211,238,0.16)] md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative z-10 grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
              Connected to Jira OAS-6
            </div>
            <h1 className="font-orbitron text-[clamp(2.4rem,6vw,5.7rem)] font-black uppercase leading-[0.92] tracking-tighter text-white">
              AI Surfer
              <span className="mt-3 block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-blue-400">
                Dashboard MVP
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-relaxed text-cyan-100 md:text-xl">
              The Ocean Tide Drop AI dashboard command center for business: AI Chat, Analytics, Ocean Theme Branding, Responsive Design, and safe API setup.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/members" className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan-400 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition-all hover:bg-white hover:shadow-[0_0_35px_rgba(34,211,238,0.55)]">
                <LayoutDashboard className="h-4 w-4" /> Open Members Area <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/ai-surfer" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white transition-all hover:border-emerald-300 hover:bg-emerald-400/10 hover:text-emerald-100">
                <Waves className="h-4 w-4" /> Back to AI Surfer
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-300">Build Status</p>
                <h2 className="mt-2 text-2xl font-black uppercase text-white">MVP Command Board</h2>
              </div>
              <Activity className="h-8 w-8 text-emerald-300" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {dashboardStats.map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-black/50 p-5">
                  <p className="text-3xl font-black text-white">{value}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/60">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
              <div className="mb-3 flex items-center gap-3 text-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]">Safe Connection Mode</span>
              </div>
              <p className="text-sm font-semibold leading-relaxed text-cyan-50/80">
                This website connects to the dashboard plan and uses placeholder/env-variable architecture only. Real API keys belong in secure hosting secrets, not in public code.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {mvpTracks.map((track) => (
          <div key={track.key} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-cyan-300/50">
            <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${track.tone} text-black shadow-[0_0_24px_rgba(34,211,238,0.22)]`}>
              <track.icon className="h-7 w-7" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">{track.key}</p>
            <h3 className="mt-3 text-2xl font-black text-white">{track.title}</h3>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-cyan-50/80">{track.description}</p>
          </div>
        ))}

        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 xl:col-span-1">
          <Code2 className="mb-5 h-8 w-8 text-cyan-200" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">Next Build</p>
          <h3 className="mt-3 text-2xl font-black text-white">Turn the MVP into working panels.</h3>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-cyan-50/80">
            The site is now connected to the AI Surfer 2 dashboard plan. The next step is building the live AI chat and analytics components behind this command page.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-3 rounded-full border border-cyan-300/50 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-cyan-100 transition-all hover:bg-cyan-300 hover:text-black">
            Request Dashboard Help <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
