import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import OceanBubbles from '../../components/OceanBubbles';
import OceanChatbot from '../../components/OceanChatbot';
import { DollarSign, Zap, TrendingUp } from 'lucide-react';

export default function OceanROICalculator() {
  const [leads, setLeads] = useState<string>('');
  const [sales, setSales] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateROI = () => {
    const l = parseFloat(leads);
    const s = parseFloat(sales);
    if (!isNaN(l) && !isNaN(s)) {
      setResult(l * s);
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
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean">Free Tools</Link></li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-cases">Success Stories</Link></li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-reports">Surf Reports</Link></li>
            <li><Link className="hover:text-cyan-400 transition-colors cursor-pointer" to="/ocean-contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Header Section */}
        <header className="relative pt-24 pb-16 overflow-hidden text-center">
          <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-[100%] bg-gradient-to-br from-teal-600 to-cyan-800 blur-[150px] opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-900/40 border border-cyan-500/30 text-teal-400 mb-6 shadow-[0_0_30px_rgba(0,242,254,0.15)] overflow-hidden">
               <Zap className="w-8 h-8 relative z-10" />
               <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-teal-200 mb-6 tracking-tight">
              AI ROI Calculator
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/60 font-light max-w-2xl mx-auto">
              Calculate your estimated monthly revenue potential.
            </p>
          </div>
        </header>

        {/* Calculator Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="max-w-2xl mx-auto px-6">
            <div className="bg-[#030e1a]/80 backdrop-blur-xl border border-cyan-800/60 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-[2.6rem] blur opacity-10 pointer-events-none"></div>
              
              <div className="space-y-8 relative z-10">
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-3 ml-1 uppercase tracking-wider">
                    Monthly Leads
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 w-6 h-6" />
                    <input 
                      type="number" 
                      id="leads"
                      value={leads}
                      onChange={(e) => setLeads(e.target.value)}
                      className="w-full bg-[#02070e] border border-cyan-900/60 rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-xl shadow-inner placeholder:text-slate-700"
                      placeholder="e.g. 150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-3 ml-1 uppercase tracking-wider">
                    Average Sale Value
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 w-6 h-6" />
                    <input 
                      type="number" 
                      id="sales"
                      value={sales}
                      onChange={(e) => setSales(e.target.value)}
                      className="w-full bg-[#02070e] border border-cyan-900/60 rounded-2xl pl-14 pr-6 py-5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono text-xl shadow-inner placeholder:text-slate-700"
                      placeholder="e.g. 1000"
                    />
                  </div>
                </div>

                <button 
                  onClick={calculateROI} 
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-[#020b14] font-black text-xl hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all transform hover:scale-[1.02] mt-4"
                >
                  Calculate Potential
                </button>

                {result !== null && (
                  <div className="mt-10 p-8 bg-[#02070e] border border-teal-500/20 rounded-3xl animate-[bounce_0.5s_ease-out_1] text-center">
                    <p className="text-cyan-100/60 mb-2 font-medium">Estimated Monthly Revenue Potential</p>
                    
                    <div id="result" className="text-5xl md:text-6xl font-black text-white font-mono tracking-tight text-shadow-sm flex justify-center items-center gap-1 drop-shadow-[0_0_15px_rgba(20,184,166,0.4)] mt-4">
                      <span className="text-teal-400/80 -mt-2">$</span>
                      {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <OceanChatbot />
      </div>
    </PageWrapper>
  );
}
