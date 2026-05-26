import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import OceanBubbles from '../../components/OceanBubbles';
import OceanChatbot from '../../components/OceanChatbot';
import { Droplet, Bot, CalendarCheck, TrendingUp, Phone, LifeBuoy, Share2, MessageSquare, DollarSign, Waves } from 'lucide-react';

export default function OceanTideDrop() {
  const [leads, setLeads] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const l = parseFloat(leads);
    const v = parseFloat(value);
    if (!isNaN(l) && !isNaN(v)) {
      setResult(Math.round(l * 0.2 * v)); // Assuming 20% lost leads
    } else {
      setResult(0);
    }
  };

  return (
    <PageWrapper>
      <div className="-mt-4 md:-mt-8 -mx-4 md:-mx-8 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#021B33] via-[#033860] to-[#0AA1DD] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 relative">
        <OceanBubbles />
        {/* Custom Mini-Nav */}
        <nav className="flex items-center justify-between px-6 py-4 bg-[#030e1a]/80 backdrop-blur-md border-b border-cyan-900/40 sticky top-0 z-50">
          <div className="flex items-center gap-2 font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-lg md:text-xl">
            <span className="text-2xl" role="img" aria-label="wave">🌊</span> 
            OCEAN TIDE DROP 
            <span className="text-2xl hidden sm:inline-block" role="img" aria-label="flower">🌺</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-cyan-100/70 justify-between select-none p-0 list-none m-0">
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-services">Services</Link></li>
            <li className="text-cyan-400 cursor-pointer">Free Tools</li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-cases">Success Stories</Link></li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-reports">Surf Reports</Link></li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#00f2fe] to-[#4facfe] blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#38b2ac] to-[#3182ce] blur-[120px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-8">
              <Waves className="w-4 h-4" /> Start Riding the Automation Wave
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 mb-6 tracking-tight leading-tight">
              Ride the AI Wave <span className="inline-block animate-pulse">🌊</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Automation systems that answer leads, book appointments, and grow your business 24/7.
            </p>
            
            <button className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-all hover:-translate-y-1 transform focus:ring-4 focus:ring-cyan-500/50 outline-none">
              Catch the Wave
            </button>
          </div>
        </section>

        {/* Wave Simulator */}
        <section className="py-24 bg-[#04111f] relative border-y border-cyan-900/30 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight flex items-center justify-center gap-3">
                <span className="text-4xl">🌺</span> AI Wave Simulator
              </h2>
              <p className="text-cyan-200/60 text-lg">Watch how the automation flows endlessly</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
              <div className="hidden md:block absolute top-1/2 left-[10%] w-[80%] h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -translate-y-1/2"></div>
              
              {[
                { icon: Droplet, text: "Lead Comes In", emoji: "📩", color: "text-cyan-400" },
                { icon: Bot, text: "AI Responds", emoji: "🤖", color: "text-blue-400" },
                { icon: CalendarCheck, text: "Appointment Booked", emoji: "📅", color: "text-teal-400" },
                { icon: TrendingUp, text: "Revenue Grows", emoji: "💰", color: "text-green-400" }
              ].map((step, idx) => (
                <div key={idx} className="relative z-10 bg-[#06182c] border border-cyan-500/20 p-8 rounded-3xl w-full md:w-1/4 text-center hover:bg-[#081e36] hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,242,254,0.1)] group">
                  <div className="w-20 h-20 mx-auto bg-[#030e1a] rounded-full flex items-center justify-center mb-6 border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className={`w-10 h-10 ${step.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.text}</h3>
                  <div className="text-2xl">{step.emoji}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-24 bg-[#020b14]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight flex items-center justify-center gap-3">
                <span className="text-4xl">🏄</span> Our AI Services
              </h2>
              <p className="text-cyan-200/60 text-lg">Tailored digital lifeguards for your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "AI Receptionist", icon: Phone, desc: "Never miss a call. Our AI handles inquiries, routes priority clients, and schedules 24/7." },
                { title: "AI Lead Lifeguard", icon: LifeBuoy, desc: "Rescues dying leads instantly with personalized, automated SMS and email follow-ups." },
                { title: "AI Social Media Surfer", icon: Share2, desc: "Rides the algorithm. Auto-engages with followers and posts content seamlessly." },
                { title: "AI Chatbots", icon: MessageSquare, desc: "Smart conversational agents trained specifically on your business knowledge base." }
              ].map((srv, i) => (
                <div key={i} className="group bg-gradient-to-b from-[#06182c] to-[#04111f] border border-cyan-900/50 hover:border-cyan-500/40 p-8 md:p-10 rounded-[2rem] transition-all hover:shadow-[0_10px_40px_rgba(0,242,254,0.08)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
                  <srv.icon className="w-12 h-12 text-cyan-400 mb-6 group-hover:-translate-y-2 group-hover:text-cyan-300 transition-all duration-300" />
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{srv.title}</h3>
                  <p className="text-cyan-100/60 leading-relaxed text-lg">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-32 bg-[#061424] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#020b14"></path>
            </svg>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="bg-[#030e1a]/80 backdrop-blur-xl border border-cyan-800/60 p-8 md:p-16 rounded-[2.5rem] shadow-2xl text-center relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.6rem] blur opacity-10 pointer-events-none"></div>
              
              <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 mb-4 tracking-tight flex items-center justify-center gap-3">
                ⚡ ROI Calculator
              </h2>
              <p className="text-cyan-200/60 mb-12 text-lg">See how much lost revenue the AI Surfer can recover.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-3 ml-1 uppercase tracking-wider">Monthly Leads</label>
                  <input 
                    type="number" 
                    value={leads}
                    onChange={(e) => setLeads(e.target.value)}
                    className="w-full bg-[#02070e] border border-cyan-900/60 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-xl shadow-inner placeholder:text-slate-700"
                    placeholder="e.g. 100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-3 ml-1 uppercase tracking-wider">Average Sale Value</label>
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 w-6 h-6" />
                    <input 
                      type="number" 
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full bg-[#02070e] border border-cyan-900/60 rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-xl shadow-inner placeholder:text-slate-700"
                      placeholder="e.g. 500"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCalculate} 
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020b14] font-black text-xl hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all transform hover:scale-[1.02] mb-4"
              >
                Calculate Lost Revenue
              </button>

              {result !== null && (
                <div className="mt-10 p-8 bg-[#02070e] border border-red-500/20 rounded-3xl animate-[bounce_0.5s_ease-out_1]">
                  <p className="text-cyan-100/60 mb-2 font-medium">Estimated Monthly Lost Revenue</p>
                  <p className="text-xs text-cyan-500/50 mb-6 uppercase tracking-wider">Assuming 20% industry standard drop-off rate</p>
                  
                  <div className="text-5xl md:text-7xl font-black text-white font-mono tracking-tight text-shadow-sm flex justify-center items-center gap-1 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                    <span className="text-red-400/80 -mt-2">$</span>
                    {result.toLocaleString()}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-cyan-900/30 text-teal-400 font-semibold text-lg flex items-center justify-center gap-2">
                    <LifeBuoy className="w-5 h-5" /> 
                    Our AI catches these falling leads and books them automatically.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#01060a]/50 py-12 border-t border-cyan-900/50 text-center px-6 relative z-10">
          <p className="text-cyan-500/60 text-lg flex items-center justify-center gap-3 relative z-10">
            🌴 Ride the automation tide with <strong className="text-cyan-400 font-bold">Ocean Tide Drop AI SURFER</strong>
          </p>
        </footer>

        <OceanChatbot />
      </div>
    </PageWrapper>
  );
}
