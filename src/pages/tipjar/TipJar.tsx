import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowLeft, Heart, QrCode, Waves } from "lucide-react";

const logoImage = "https://gw-tk.tanka.ai/npc/v2/file/df2c3bd0-9421-4c40-910a-6a62f3cdf44f";
const paddleboardImage = "https://gw-tk.tanka.ai/npc/v2/file/615b8793-aca4-47c7-94ce-0fb6c49e1590";
const paypalQrImage = "https://gw-tk.tanka.ai/npc/v2/file/8b0980ac-1b1d-4e0d-8fde-c2ba03c2a0ea";

export default function TipJar() {
  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-black/70 px-6 py-12 md:px-12 md:py-16 shadow-[0_0_80px_rgba(34,211,238,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.16),transparent_35%)]" />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Back to AI Surfer
            </Link>
            <div className="mb-8 flex items-center gap-5">
              <img src={logoImage} alt="Ocean Tide Drop AI Surfer logo" className="h-24 w-24 rounded-2xl border border-white/10 object-cover shadow-[0_0_40px_rgba(34,211,238,0.2)]" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.45em] text-cyan-300">Ocean Tide Drop</p>
                <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-tighter text-white md:text-6xl">AI Surfer <span className="block text-pink-400">Tip Jar</span></h1>
              </div>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-relaxed text-white/80 md:text-xl">Thank you for supporting Ocean Tide Drop AI Surfer. Every tip helps keep the creative tide moving — websites, tools, automations, and island-energy tech built with heart.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[["Scan", "Open your camera and scan the PayPal code."], ["Pay", "Choose the amount that feels right."], ["Go", "Complete it safely through PayPal."]].map(([title, copy], index) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-black">{index + 1}</div>
                  <h3 className="text-xl font-black uppercase text-white">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-white/60">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl">
              <img src={paddleboardImage} alt="Founder paddleboarding in a calm tropical setting" className="h-[360px] w-full object-cover object-center md:h-[440px]" />
              <div className="border-t border-white/10 bg-black/70 p-5"><p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">A little bit of the human behind the wave</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-12 grid max-w-5xl gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div className="flex items-center justify-center rounded-[1.5rem] bg-white p-5"><img src={paypalQrImage} alt="PayPal QR code for Ocean Tide Drop AI Surfer tip jar" className="w-full max-w-sm rounded-xl" /></div>
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex items-center gap-3 text-cyan-300"><QrCode className="h-6 w-6" /><span className="text-[10px] font-black uppercase tracking-[0.4em]">PayPal QR Code</span></div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">Scan. Pay. Go.</h2>
          <p className="mt-5 text-base font-semibold leading-relaxed text-white/70">Use your phone camera to scan the QR code, open PayPal, and send a tip securely. Thank you for helping Ocean Tide Drop AI Surfer keep building.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-pink-200"><Heart className="h-4 w-4" /> Tip Jar</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-200"><Waves className="h-4 w-4" /> Ocean Tide Drop</span>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
