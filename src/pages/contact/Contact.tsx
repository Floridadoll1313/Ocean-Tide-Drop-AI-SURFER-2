import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { Sparkles, Loader2, Send, CheckCircle2, MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  const [inquiry, setInquiry] = useState("");
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.trim()) return;

    setIsConsulting(true);
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: inquiry,
          systemInstruction: "You are the AI Surfer Lead Strategist. The user is inquiring about marketing/branding services. Provide a brief, brilliant set of 'Preliminary Strategic Initializations' (immediate advice/feedback) based on their message. Be sophisticated, high-conviction, and professional."
        }),
      });
      const data = await response.json();
      setConsultResult(data.result);
    } catch (err) {
      console.error("Consult Error:", err);
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      {/* CONTACT SECTION */}
      <section className="relative flex flex-col items-center justify-center py-10">
        {/* Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00eaff]/10 blur-[150px] rounded-full pointer-events-none"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_25px_#00eaff] mb-6">
            Get in Touch
          </h1>

          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto mb-16 underline decoration-soul-gradient decoration-2">
            The Ocean Tide Drop team is here to help you ride the frequency of growth. Whether you need cinematic branding or advanced AI automations, we're ready to architect your future.
          </p>

          <div className="mb-20 glass-card p-10 border border-white/10 bg-white/5 rounded-[2rem] text-left">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-[#00eaff]" />
              <h2 className="text-xl font-black uppercase text-white tracking-tighter">AI Pre-Consultancy Initialization</h2>
            </div>
            
            {!consultResult ? (
              <form onSubmit={handleConsult} className="space-y-6">
                <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Describe your brand challenge or project vision:</p>
                <textarea 
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="E.g. We are a boutique hotel looking to dominate the cinematic luxury sector with automated booking funnels..."
                  className="w-full bg-black border border-white/10 p-6 text-white text-sm font-medium focus:outline-none focus:border-[#00eaff]/50 transition-all min-h-[150px] resize-none"
                />
                <button 
                  type="submit"
                  disabled={isConsulting || !inquiry.trim()}
                  className="bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#00eaff] transition-all disabled:opacity-50 flex items-center gap-4"
                >
                  {isConsulting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isConsulting ? "Synthesizing Strategy..." : "Initialize Pre-Consult"}
                </button>
              </form>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[#00eaff] text-[10px] font-black uppercase tracking-[0.3em]">Neural Recommendation Output</h3>
                  <button 
                    onClick={() => { setConsultResult(null); setInquiry(""); }}
                    className="text-white/40 hover:text-white text-[8px] font-black uppercase tracking-widest"
                  >
                    Reset Initialization
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap mb-10">
                  {consultResult}
                </div>
                <div className="p-6 border border-emerald-500/30 bg-emerald-500/5 rounded-xl flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Initialization Complete. Our human strategists have been notified of your frequency.</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md accent-glow-cyan">
              <h3 className="text-[#00eaff] font-bold text-xl mb-4 font-display">Visit Us</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-lg text-white/80">
                  <MapPin className="w-5 h-5 text-[#00eaff]" />
                  <span>Charleston, SC</span>
                </div>
                <p className="text-xs text-white/40 uppercase tracking-widest font-black">Digital Headquarters</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md accent-glow-purple">
              <h3 className="text-purple-400 font-bold text-xl mb-4 font-display uppercase tracking-widest">Connect</h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:oceantidedropaisurf@gmail.com" className="text-xs hover:text-white transition-colors break-all flex items-center gap-2">
                  <Mail className="w-3 h-3 text-[#00eaff]" /> oceantidedropaisurf@gmail.com
                </a>
                <a href="tel:8432177075" className="text-xs hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="w-3 h-3 text-purple-400" /> (843) 217-7075
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
