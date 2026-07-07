import { Link } from "react-router-dom";
import { useState } from "react";
import { Radar, Bot, Anchor, TrendingUp, CheckCircle, Lock, ShieldCheck, Mail, Send, Compass, Shield, Award, Users, Clock } from "lucide-react";
import cleanBg from "../../assets/images/clean-background.jpg";
import { supabase } from "../../utils/supabase";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterStatus("loading");
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);
      if (error) throw error;
      setNewsletterStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setNewsletterStatus("error");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30 font-inter relative bg-[#020617]">
      {/* Global Background Image */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${cleanBg})`,
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'top center',
          opacity: 0.8
        }}
      />
      
      {/* Background Overlays for readability */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#020617]/40 via-[#020617]/60 to-[#020617]/90" />

      <div className="relative z-10">
        {/* --- HEADER --- */}
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-cyan-400" />
            <div className="flex flex-col">
              <span className="font-outfit font-black text-xl tracking-tight leading-none text-white">OCEAN TIDE DROP</span>
              <span className="font-outfit font-bold text-xs tracking-widest text-cyan-400 leading-none mt-1">AI SURFER</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-cyan-400 transition-colors">HOME</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">SERVICES</button>
            <button onClick={() => scrollToSection('packages')} className="hover:text-cyan-400 transition-colors">PACKAGES</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">ABOUT US</button>
            <button onClick={() => scrollToSection('case-studies')} className="hover:text-cyan-400 transition-colors">CASE STUDIES</button>
            <button onClick={() => scrollToSection('resources')} className="hover:text-cyan-400 transition-colors">RESOURCES</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors">CONTACT</button>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block text-sm font-bold text-white hover:text-cyan-400 transition-colors">
              LOGIN
            </Link>
            <button onClick={() => scrollToSection('contact')} className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              BOOK A STRATEGY CALL
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/50 to-transparent z-10" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="font-outfit text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
              NAVIGATE THE FUTURE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow">RIDE THE AI WAVE.</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              AI-powered solutions, automation, and custom systems that help your business grow smarter, faster, and further.
            </p>
            
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={() => scrollToSection('packages')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2">
                <Compass className="w-5 h-5" /> START YOUR AI VOYAGE
              </button>
              <button onClick={() => scrollToSection('contact')} className="glass-panel hover:bg-white/10 px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center gap-2">
                <Radar className="w-5 h-5 text-cyan-400" /> GET YOUR FREE AI OCEAN SCAN
              </button>
            </div>

            {/* Trusted By Logos */}
            <div className="mt-16">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Trusted by forward-thinking businesses worldwide</p>
              <div className="flex flex-wrap items-center gap-8 opacity-60">
                <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-white" /><span className="font-bold text-sm">Google Partner</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-6 bg-white" /><span className="font-bold text-sm">Microsoft AI Cloud Partner</span></div>
                <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full border-2 border-white" /><span className="font-bold text-sm">OpenAI Partner</span></div>
                <div className="flex items-center gap-2"><div className="w-8 h-4 rounded-full border-2 border-white" /><span className="font-bold text-sm">Meta Business Partner</span></div>
              </div>
            </div>
          </div>

          {/* AI Navigation Status Panel */}
          <div className="hidden lg:block justify-self-end w-full max-w-md">
            <div className="glass-panel-heavy p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full" />
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">AI NAVIGATION STATUS</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-bold text-green-400">LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2"><Bot className="w-4 h-4"/> <span className="text-[10px] uppercase font-bold text-white/50">AUTOMATIONS</span></div>
                  <div className="text-2xl font-black font-outfit">347</div>
                  <div className="text-[10px] text-green-400 mt-1">Active</div>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2"><Clock className="w-4 h-4"/> <span className="text-[10px] uppercase font-bold text-white/50">HOURS SAVED</span></div>
                  <div className="text-2xl font-black font-outfit">1,248</div>
                  <div className="text-[10px] text-green-400 mt-1">This Month</div>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2"><Users className="w-4 h-4"/> <span className="text-[10px] uppercase font-bold text-white/50">LEADS GENERATED</span></div>
                  <div className="text-2xl font-black font-outfit">2,671</div>
                  <div className="text-[10px] text-green-400 mt-1">This Month</div>
                </div>
                <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2"><TrendingUp className="w-4 h-4"/> <span className="text-[10px] uppercase font-bold text-white/50">REVENUE IMPACT</span></div>
                  <div className="text-2xl font-black font-outfit text-cyan-300">$287K+</div>
                  <div className="text-[10px] text-green-400 mt-1">This Month</div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-white/60">CURRENT COURSE: GROWTH & AUTOMATION</span>
                  <span className="text-cyan-400">85%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[85%] relative">
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <p className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-2">DISCOVER WHAT'S POSSIBLE</p>
          <h2 className="text-4xl md:text-5xl font-outfit font-black">YOUR BUSINESS. <span className="text-glow text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SUPERCHARGED</span> BY AI.</h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border-t border-t-cyan-500/30">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
              <Radar className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold font-outfit mb-3">AI OCEAN SCAN</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">We dive deep to find hidden opportunities, inefficiencies, and growth potential.</p>
            <Link to="/pricing" className="text-cyan-400 text-sm font-bold flex items-center gap-2 hover:text-cyan-300">LEARN MORE &rarr;</Link>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border-t border-t-cyan-500/30">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
              <Bot className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold font-outfit mb-3">AI CAPTAINS & CREW</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">Custom AI assistants that work 24/7 to support customers, answer questions and drive sales.</p>
            <Link to="/pricing" className="text-cyan-400 text-sm font-bold flex items-center gap-2 hover:text-cyan-300">LEARN MORE &rarr;</Link>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border-t border-t-cyan-500/30">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
              <Anchor className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold font-outfit mb-3">AUTOMATION SYSTEMS</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">Streamline workflows, eliminate repetitive tasks and sail smoother with intelligent automation.</p>
            <Link to="/pricing" className="text-cyan-400 text-sm font-bold flex items-center gap-2 hover:text-cyan-300">LEARN MORE &rarr;</Link>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border-t border-t-cyan-500/30">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold font-outfit mb-3">GROWTH CURRENTS</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">AI-powered marketing, visibility and engagement strategies that attract more customers.</p>
            <Link to="/pricing" className="text-cyan-400 text-sm font-bold flex items-center gap-2 hover:text-cyan-300">LEARN MORE &rarr;</Link>
          </div>
        </div>
      </section>

      {/* --- PACKAGES SECTION --- */}
      <section id="packages" className="py-24 px-6 bg-gradient-to-b from-[#020617] to-[#041a28]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-cyan-500/50" />
            <p className="text-sm font-bold text-cyan-400 tracking-widest uppercase">CHOOSE YOUR WAVE</p>
            <div className="h-px w-12 bg-cyan-500/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-outfit font-black mb-12">PACKAGES FOR EVERY JOURNEY</h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tier 1 */}
          <div className="glass-panel rounded-[2rem] p-1 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-[#020617] rounded-[1.8rem] h-full p-8 flex flex-col relative z-10">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <Compass className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black font-outfit text-center text-emerald-400 mb-1">CORAL REEF</h3>
              <h4 className="text-2xl font-black font-outfit text-center mb-2">EXPLORER</h4>
              <p className="text-xs text-center text-white/60 mb-8 uppercase tracking-wider font-bold">Begin Your Discovery</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> AI Opportunity Scan</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Business Assessment</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Personalized AI Roadmap</li>
              </ul>
              
              <div className="text-center mb-6">
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">STARTING AT</p>
                <p className="text-4xl font-outfit font-black">$497</p>
              </div>
              <Link to="/pricing" className="w-full block text-center bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-900 font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all">
                EXPLORE YOUR WATERS
              </Link>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="glass-panel rounded-[2rem] p-1 flex flex-col relative overflow-hidden group translate-y-0 lg:-translate-y-4">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-[#020617] rounded-[1.8rem] h-full p-8 flex flex-col relative z-10 border border-blue-500/30">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">Popular</div>
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <Radar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black font-outfit text-center text-blue-400 mb-1">WAVEMAKER</h3>
              <h4 className="text-2xl font-black font-outfit text-center mb-2 invisible">.</h4> {/* Spacer to align */}
              <p className="text-xs text-center text-white/60 mb-8 uppercase tracking-wider font-bold">Build Your AI Foundation</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-blue-400 shrink-0" /> AI Strategy & Planning</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-blue-400 shrink-0" /> Workflow Improvements</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-blue-400 shrink-0" /> Automation Roadmap</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-blue-400 shrink-0" /> Digital Growth Plan</li>
              </ul>
              
              <div className="text-center mb-6">
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">STARTING AT</p>
                <p className="text-4xl font-outfit font-black">$1,497</p>
              </div>
              <Link to="/pricing" className="w-full block text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-900 font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
                BECOME A WAVEMAKER
              </Link>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel rounded-[2rem] p-1 flex flex-col relative overflow-hidden group translate-y-0 lg:-translate-y-8">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-[#020617] rounded-[1.8rem] h-full p-8 flex flex-col relative z-10 border border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black font-outfit text-center text-purple-400 mb-1">BIG KAHUNA</h3>
              <h4 className="text-2xl font-black font-outfit text-center mb-2 invisible">.</h4>
              <p className="text-xs text-center text-white/60 mb-8 uppercase tracking-wider font-bold">Master the AI Current</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> Custom AI Solutions</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> AI Assistants & Agents</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> Automation Systems</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> Growth Strategy</li>
              </ul>
              
              <div className="text-center mb-6">
                <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">STARTING AT</p>
                <p className="text-4xl font-outfit font-black">$3,997</p>
              </div>
              <Link to="/pricing" className="w-full block text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                RIDE THE BIG KAHUNA
              </Link>
            </div>
          </div>

          {/* Tier 4 */}
          <div className="glass-panel rounded-[2rem] p-1 flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-[#020617] rounded-[1.8rem] h-full p-8 flex flex-col relative z-10">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-300 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <TrendingUp className="w-10 h-10 text-slate-900" />
              </div>
              <h3 className="text-xl font-black font-outfit text-center text-cyan-300 mb-1">TSUNAMI</h3>
              <h4 className="text-2xl font-black font-outfit text-center mb-2">TAKEOVER</h4>
              <p className="text-xs text-center text-white/60 mb-8 uppercase tracking-wider font-bold">Lead the Next Digital Tide</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-cyan-300 shrink-0" /> Full AI Ecosystem Design</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-cyan-300 shrink-0" /> Advanced Automation</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-cyan-300 shrink-0" /> Custom AI Agents</li>
                <li className="flex items-center gap-3 text-sm text-white/80"><CheckCircle className="w-4 h-4 text-cyan-300 shrink-0" /> Long-Term AI Partnership</li>
              </ul>
              
              <div className="text-center mb-6">
                <p className="text-xs text-transparent uppercase tracking-widest font-bold mb-1">.</p>
                <p className="text-2xl font-outfit font-black text-cyan-300">CUSTOM PRICING</p>
              </div>
              <Link to="/pricing" className="w-full block text-center bg-gradient-to-r from-cyan-300 to-blue-500 text-slate-900 font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
                LAUNCH YOUR TSUNAMI
              </Link>
            </div>
          </div>
        </div>

        {/* Value Props */}
        <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-10 border-t border-white/10">
          <div className="flex items-center justify-center gap-4">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
            <div className="text-left">
              <p className="font-bold text-sm">30-Day Satisfaction</p>
              <p className="text-xs text-white/60">Guarantee</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Lock className="w-8 h-8 text-cyan-400" />
            <div className="text-left">
              <p className="font-bold text-sm">Secure & Encrypted</p>
              <p className="text-xs text-white/60">Payments</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div className="text-left">
              <p className="font-bold text-sm">Ongoing Support &</p>
              <p className="text-xs text-white/60">Partnership</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS & TESTIMONIALS --- */}
      <section id="case-studies" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-10 rounded-[2rem] flex flex-col justify-center">
            <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">SUCCESS STORIES</p>
            <h2 className="text-3xl font-outfit font-black mb-1">REAL BUSINESSES.</h2>
            <h2 className="text-3xl font-outfit font-black text-white/50 mb-8">REAL RESULTS.</h2>
            
            <blockquote className="text-lg text-white/80 italic mb-6">
              "OTD AI SURFER helped us automate 80% of our customer follow-ups and increase leads by 215%."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20" />
              <div>
                <p className="font-bold text-sm">Sarah J.</p>
                <p className="text-xs text-white/60">Co-Founder, Glow Wellness</p>
              </div>
            </div>
            
            <Link to="/case-studies" className="mt-8 text-cyan-400 text-xs font-bold tracking-widest uppercase hover:text-cyan-300 flex items-center gap-2">
              VIEW ALL CASE STUDIES &rarr;
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-[2rem] p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-5xl font-outfit font-black mb-2">215%</p>
              <p className="text-sm font-medium text-white/60">Increase in Leads</p>
            </div>
            <div className="glass-panel rounded-[2rem] p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-5xl font-outfit font-black mb-2">1,350+</p>
              <p className="text-sm font-medium text-white/60">Hours Saved</p>
            </div>
            <div className="glass-panel rounded-[2rem] p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-cyan-400" />
              </div>
              <p className="text-5xl font-outfit font-black mb-2">$487K+</p>
              <p className="text-sm font-medium text-white/60">Revenue Generated</p>
            </div>
          </div>

        </div>

        {/* Newsletter CTA */}
        <div className="max-w-5xl mx-auto mt-8 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <Anchor className="w-64 h-64 -mt-10 -mr-10" />
          </div>
          <div className="relative z-10 max-w-md">
            <h3 className="text-2xl font-outfit font-black mb-2">JOIN THE OCEAN CURRENT</h3>
            <p className="text-sm text-white/70">Get AI insights, automation tips, and growth strategies delivered straight to your inbox.</p>
          </div>
          <div className="relative z-10 w-full max-w-md flex flex-col gap-2">
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                placeholder="Enter your email address" 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 placeholder-white/40 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {newsletterStatus === 'loading' ? 'JOINING...' : newsletterStatus === 'success' ? 'JOINED!' : 'JOIN THE CURRENT'} <Send className="w-4 h-4" />
              </button>
            </form>
            {newsletterStatus === 'success' && <p className="text-xs text-green-400 font-bold">Successfully joined the current! Welcome aboard.</p>}
            {newsletterStatus === 'error' && <p className="text-xs text-red-400 font-bold">There was an error. Please try again.</p>}
            {newsletterStatus !== 'success' && newsletterStatus !== 'error' && <p className="text-xs text-white/40">No spam. Just pure value.</p>}
          </div>
        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-24 px-6 bg-[#020617]/80 backdrop-blur-md border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-4">OUR MISSION</p>
          <h2 className="text-4xl font-outfit font-black mb-6">PIONEERING THE DIGITAL OCEAN</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            Ocean Tide Drop AI SURFER was founded on a simple belief: the future belongs to those who ride the wave, not those who fight the current. We are a team of AI engineers, automation specialists, and growth strategists dedicated to supercharging your business with intelligent systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="glass-panel px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"><Anchor className="w-4 h-4 text-cyan-400"/> Forward Thinking</div>
            <div className="glass-panel px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"><Bot className="w-4 h-4 text-cyan-400"/> Technology First</div>
            <div className="glass-panel px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-cyan-400"/> Results Driven</div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-[#020617]/80 to-[#01040a] relative z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-outfit font-black mb-6">READY TO SET SAIL?</h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Book a free Strategy Call with our AI Captains. We'll dive deep into your business and uncover exact areas where automation and AI can drive revenue.
          </p>
          <div className="glass-panel p-8 md:p-12 rounded-[2rem] max-w-2xl mx-auto border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
            <h3 className="text-2xl font-bold font-outfit mb-6">Book Your Strategy Call</h3>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! We'll be in touch shortly."); }}>
              <input type="text" required placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400 w-full" />
              <input type="email" required placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400 w-full" />
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 rounded-xl mt-2 transition-colors">
                REQUEST A CALL
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 pt-16 pb-8 px-6 bg-[#01040a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-8 h-8 text-cyan-400" />
              <div className="flex flex-col">
                <span className="font-outfit font-black text-xl tracking-tight leading-none">OCEAN TIDE DROP</span>
                <span className="font-outfit font-bold text-xs tracking-widest text-cyan-400 leading-none mt-1">AI SURFER</span>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-6 max-w-sm leading-relaxed">
              We help businesses navigate the ever-changing digital ocean with AI-powered solutions, automation, and strategies that create waves of growth.
            </p>
            <div className="flex items-center gap-4 text-white/40">
              <a href="#" className="hover:text-cyan-400 transition-colors"><div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold">f</div></a>
              <a href="#" className="hover:text-cyan-400 transition-colors"><div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold">in</div></a>
              <a href="#" className="hover:text-cyan-400 transition-colors"><div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold">y</div></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest">COMPANY</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-widest">SERVICES</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">AI Ocean Scan</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">AI Assistants</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Automation Systems</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Growth Strategies</a></li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col items-center text-center opacity-50 hover:opacity-100 transition-opacity">
              <p className="text-[10px] font-bold tracking-[0.2em] mb-2 curve-text">NAVIGATE. AUTOMATE. ELEVATE.</p>
              <Compass className="w-16 h-16 text-cyan-400 my-2" />
              <p className="text-[10px] font-bold tracking-[0.2em] mt-2">RIDE THE AI WAVE</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Ocean Tide Drop AI SURFER. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400">Terms of Service</a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
