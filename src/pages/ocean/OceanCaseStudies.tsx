import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import OceanBubbles from '../../components/OceanBubbles';
import OceanChatbot from '../../components/OceanChatbot';
import { Target, Zap, TrendingUp, CheckCircle } from 'lucide-react';

export default function OceanCaseStudies() {
  const caseStudies = [
    {
      title: "Med Spa Automation",
      problem: "Missed calls and slow responses.",
      solution: "AI receptionist and automated booking.",
      results: "+37 appointments booked in 9 days.",
      icon: "🐬",
      color: "from-blue-400 to-indigo-500",
      accent: "text-blue-400"
    },
    {
      title: "Contractor Lead Recovery",
      problem: "Lost leads from delayed follow-up.",
      solution: "AI SMS nurturing system.",
      results: "42% increase in booked estimates.",
      icon: "🔨",
      color: "from-orange-400 to-red-500",
      accent: "text-orange-400"
    }
  ];

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
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-cyan-100/70">
            <li className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/ocean-services'}>Services</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/ocean'}>Free Tools</li>
            <li className="text-cyan-400 cursor-pointer">Success Stories</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => window.location.href = '/ocean-reports'}>Surf Reports</li>
          </ul>
        </nav>

        {/* Header Section */}
        <header className="relative pt-24 pb-16 overflow-hidden text-center">
          <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-[100%] bg-gradient-to-br from-blue-600 to-cyan-800 blur-[150px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-3xl mb-6 shadow-[0_0_30px_rgba(0,242,254,0.15)] overflow-hidden">
               🐬
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-200 mb-6 tracking-tight">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/60 font-light max-w-2xl mx-auto">
              Real results from businesses riding the automation wave.
            </p>
          </div>
        </header>

        {/* Case Studies */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            {caseStudies.map((study, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#04111f] border border-cyan-900/40 hover:border-cyan-500/50 p-8 md:p-12 rounded-[2.5rem] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,242,254,0.1)] overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${study.color} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full pointer-events-none`}></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="text-6xl bg-[#030e1a] w-24 h-24 rounded-3xl flex items-center justify-center border border-cyan-500/20 shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-500">
                    {study.icon}
                  </div>
                  
                  <div className="flex-1 w-full flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">
                      {study.title}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#020b14]/50 p-6 rounded-2xl border border-cyan-900/30 flex flex-col gap-3 h-full">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-red-400">
                          <Target className="w-4 h-4" /> Problem
                        </div>
                        <p className="text-slate-300 flex-1">{study.problem}</p>
                      </div>
                      
                      <div className="bg-[#020b14]/50 p-6 rounded-2xl border border-cyan-900/30 flex flex-col gap-3 h-full">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-400">
                          <Zap className="w-4 h-4" /> Solution
                        </div>
                        <p className="text-slate-300 flex-1">{study.solution}</p>
                      </div>

                      <div className="bg-gradient-to-br from-[#06182c] to-[#020b14] p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)] flex flex-col gap-3 h-full relative overflow-hidden group-hover:border-cyan-400/50 transition-colors">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-green-400 relative z-10">
                          <TrendingUp className="w-4 h-4" /> Results
                        </div>
                        <p className={`text-xl font-bold text-white relative z-10 flex-1 flex items-center`}>{study.results}</p>
                        <CheckCircle className={`absolute -bottom-4 -right-4 w-24 h-24 ${study.accent} opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <OceanChatbot />
      </div>
    </PageWrapper>
  );
}
