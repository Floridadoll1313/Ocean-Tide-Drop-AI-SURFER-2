import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { Sparkles, Loader2, Send, CheckCircle2, MapPin, Mail, Phone, Anchor } from "lucide-react";
import hatterasBg from "../../assets/images/hatteras_light_bg_1779221087362.png";

export default function Contact() {
  const [inquiry, setInquiry] = useState("");
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.trim()) return;

    setIsConsulting(true);
    try {
      setConsultResult("");
      const response = await fetch("/api/ai/generate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: inquiry,
          systemInstruction: "You are the AI Surfer Lead Strategist. The user is inquiring about marketing/branding services. Provide a brief, brilliant set of 'Preliminary Strategic Initializations' (immediate advice/feedback) based on their message. Be sophisticated, high-conviction, professional, and weave in subtle coastal/surfing theme language."
        }),
      });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunkStr = decoder.decode(value, { stream: true });
          const lines = chunkStr.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
               const dataStr = line.slice(6);
               if (dataStr === '[DONE]') break;
               try {
                 const parsed = JSON.parse(dataStr);
                 if (parsed.text) {
                   fullText += parsed.text;
                   setConsultResult(fullText);
                 }
               } catch {
                 // Ignore parsing errors
               }
            }
          }
        }
      }
    } catch (err) {
      console.error("Consult Error:", err);
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      {/* CONTACT SECTION WITH COASTAL BACKGROUND */}
      <section className="relative flex flex-col items-center justify-center py-10 rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-950/40 backdrop-blur-sm">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hatterasBg} 
            alt="Coastal Lighthouse background" 
            className="w-full h-full object-cover opacity-[0.18] pointer-events-none mix-blend-lighten"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/85"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00eaff]/10 blur-[150px] rounded-full pointer-events-none"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10 w-full">
          <div className="flex justify-center mb-6">
            <span className="text-[10px] bg-cyan-400/15 border border-cyan-400/30 text-cyan-400 font-bold uppercase tracking-[0.4em] px-4 py-2 rounded-full">
              AI Surfer Head Office
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_0_20px_rgba(0,195,255,0.25)] mb-6 text-white font-orbitron uppercase">
            Get in Touch
          </h1>

          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-16 underline decoration-cyan-400/40 decoration-2">
            The AI Surfer team is here to help you ride the perfect frequency of growth. Directly operating from the wind-swept shores of the Outer Banks, NC, we're ready to architect your digital horizon.
          </p>

          <div className="mb-20 glass-card p-10 border border-white/10 bg-black/60 backdrop-blur-md rounded-[2rem] text-left">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-[#00eaff]" />
              <h2 className="text-xl font-black uppercase text-white tracking-tighter">AI Pre-Consultancy Initialization_</h2>
            </div>
            
            {!consultResult ? (
              <form onSubmit={handleConsult} className="space-y-6">
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold font-mono">Describe your brand challenge, project vision, or automation needs:</p>
                <textarea 
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  placeholder="E.g. We want to automate our booking flow for local beach cottage rentals, or implement search grounding..."
                  className="w-full bg-black/80 border border-white/10 p-6 text-white text-sm font-medium focus:outline-none focus:border-[#00eaff]/50 transition-all min-h-[150px] resize-none"
                />
                <button 
                  type="submit"
                  disabled={isConsulting || !inquiry.trim()}
                  className="bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#00eaff] transition-all disabled:opacity-50 flex items-center gap-4"
                >
                  {isConsulting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {isConsulting ? "Synthesizing Strategy..." : "Initialize Coastal Strategy"}
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
                  <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Initialization Complete. Our elite strategists are ready for your call.</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md accent-glow-cyan">
              <h3 className="text-[#00eaff] font-bold text-xl mb-4 font-display flex items-center gap-2 font-orbitron uppercase">
                <Anchor className="w-5 h-5 text-cyan-400" /> Visit Us
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-lg text-white/80">
                  <MapPin className="w-5 h-5 text-[#00eaff]" />
                  <span>Salvo, Outer Banks, NC</span>
                </div>
                <p className="text-xs text-white/40 uppercase tracking-widest font-black font-mono">Outer Banks HQ_</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md accent-glow-purple">
              <h3 className="text-purple-400 font-bold text-xl mb-4 font-display uppercase tracking-widest font-orbitron">Connect</h3>
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
