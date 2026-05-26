import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import OceanBubbles from '../../components/OceanBubbles';
import OceanChatbot from '../../components/OceanChatbot';
import { Phone, LifeBuoy, Share2, Mic } from 'lucide-react';

export default function OceanServices() {
  const services = [
    {
      title: "AI Receptionist",
      icon: Phone,
      emoji: "🐬",
      desc: "Answers calls, books appointments, and captures leads 24/7.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "AI Lead Lifeguard",
      icon: LifeBuoy,
      emoji: "🐚",
      desc: "Recover lost leads automatically using AI follow-up systems.",
      color: "from-teal-400 to-emerald-500"
    },
    {
      title: "AI Social Media Surfer",
      icon: Share2,
      emoji: "🌴",
      desc: "Generate content, captions, hashtags, and trending ideas instantly.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "AI Voice Agents",
      icon: Mic,
      emoji: "⚡",
      desc: "Voice AI that talks naturally with your customers.",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <PageWrapper>
      <div className="-mt-4 md:-mt-8 -mx-4 md:-mx-8 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#021B33] via-[#033860] to-[#0AA1DD] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 relative">
        <OceanBubbles />
        {/* Custom Mini-Nav to match the Ocean vibe */}
        <nav className="flex items-center justify-between px-6 py-4 bg-[#030e1a]/80 backdrop-blur-md border-b border-cyan-900/40 sticky top-0 z-50">
          <div className="flex items-center gap-2 font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-lg md:text-xl">
            <span className="text-2xl" role="img" aria-label="wave">🌊</span> 
            OCEAN TIDE DROP 
            <span className="text-2xl hidden sm:inline-block" role="img" aria-label="flower">🌺</span>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-cyan-100/70">
            <li className="text-cyan-400 cursor-pointer">Services</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/ocean'}>Free Tools</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/ocean-cases'}>Success Stories</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/ocean-reports'}>Surf Reports</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/ocean-contact'}>Contact</li>
          </ul>
        </nav>

        {/* Header Section */}
        <header className="relative pt-24 pb-16 overflow-hidden text-center">
          <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 blur-[150px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-3xl mb-6 shadow-[0_0_30px_rgba(0,242,254,0.2)]">
              🌊
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 mb-6 tracking-tight">
              AI Services
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/60 font-light max-w-2xl mx-auto">
              Automated systems engineered to keep your business riding the perfect wave.
            </p>
          </div>
        </header>

        {/* Services Grid */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-[#04111f] border border-cyan-900/40 hover:border-cyan-500/50 p-10 md:p-12 rounded-[2.5rem] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,242,254,0.1)] hover:-translate-y-2 overflow-hidden flex flex-col"
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${service.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full pointer-events-none`}></div>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-5xl bg-[#030e1a] w-20 h-20 rounded-full flex items-center justify-center border border-cyan-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {service.emoji}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-cyan-100/70 text-lg md:text-xl leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-cyan-900/40 flex items-center gap-3 text-cyan-500 font-semibold group-hover:gap-4 transition-all w-fit cursor-pointer">
                    <span>Activate Service</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Footer */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to paddle out?</h2>
            <p className="text-xl text-cyan-200/60 mb-10 max-w-2xl mx-auto">
              Our AI solutions integrate seamlessly into your existing workflows, delivering immediate results from day one.
            </p>
            <button className="px-10 py-5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#020b14] font-black text-lg transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_40px_rgba(0,242,254,0.5)] hover:-translate-y-1">
              Start Free Trial
            </button>
          </div>
        </section>
        
        <OceanChatbot />
      </div>
    </PageWrapper>
  );
}
