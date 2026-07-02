import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../../components/PageWrapper';

type ConsoleLog = {
  message: string;
  type: 'info' | 'warning' | 'success' | 'sync';
  timestamp: string;
};

export default function AISurfer() {
  const [isOperational, setIsOperational] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<ConsoleLog[]>([
    { message: 'Initializing OceanTideDrop terminal...', type: 'info', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) },
    { message: 'WARNING: Cognitive grid offline. Service suspended.', type: 'warning', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) },
    { message: 'STATUS: Awaiting manual reconstruction...', type: 'info', timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) }
  ]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const consoleBodyRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: 'info' | 'warning' | 'success' | 'sync' = 'info') => {
    setLogs(prev => [...prev, {
      message,
      type,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    }]);
  };

  useEffect(() => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
    }
  }, [logs]);

  const toggleSystemStatus = () => {
    const nextState = !isOperational;
    
    if (nextState) {
      setLoading(true);
      addLog('Reconstruct Cognitive Grid initiated.', 'info');
      addLog('Rebuilding neural pathways...', 'info');

      setTimeout(() => {
        setIsOperational(true);
        setLoading(false);
        addLog('Cognitive grid fully reconstructed.', 'success');
        addLog('Service operational.', 'success');
      }, 1200);
    } else {
      setIsOperational(false);
      setLoading(false);
      addLog('Cognitive grid connection severed.', 'warning');
      addLog('Service suspended.', 'warning');
    }
  };

  const handleChallengeToggle = (id: string) => {
    const nextCompleted = completedChallenges.includes(id) 
      ? completedChallenges.filter(c => c !== id)
      : [...completedChallenges, id];
    
    setCompletedChallenges(nextCompleted);
    
    const percentage = Math.round((nextCompleted.length / 4) * 100);
    addLog(`Grail Synchronization updated to ${percentage}%.`, 'sync');
  };

  const syncPercentage = Math.round((completedChallenges.length / 4) * 100);

  return (
    <PageWrapper>
      <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center select-none" style={{ background: '#0b031a' }}>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@500;700;900&display=swap');

          .surfer-font-orbitron { font-family: 'Orbitron', sans-serif; }
          .surfer-font-mono { font-family: 'JetBrains Mono', monospace; }

          .surfer-bg-grid {
            background-image: 
              linear-gradient(rgba(57, 255, 20, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57, 255, 20, 0.02) 1px, transparent 1px);
            background-size: 40px 40px;
            background-position: center;
          }

          .surfer-glass-card {
            background: rgba(20, 10, 40, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(57, 255, 20, 0.15);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .surfer-glass-card:hover {
            border-color: rgba(57, 255, 20, 0.4);
            box-shadow: 0 12px 40px 0 rgba(57, 255, 20, 0.1);
          }
          .surfer-glass-card.completed {
            border-color: #39ff14;
            box-shadow: 0 0 25px rgba(57, 255, 20, 0.2);
            background: rgba(20, 45, 25, 0.4);
          }

          .surfer-scrollbar::-webkit-scrollbar { width: 6px; }
          .surfer-scrollbar::-webkit-scrollbar-track { background: rgba(20, 10, 40, 0.3); }
          .surfer-scrollbar::-webkit-scrollbar-thumb { background: rgba(57, 255, 20, 0.15); border-radius: 3px; }
          .surfer-scrollbar::-webkit-scrollbar-thumb:hover { background: #39ff14; }

          @keyframes pulse-red-glow {
            0% { text-shadow: 0 0 4px #ff3b30, 0 0 10px #ff3b30; color: #ff5e54; }
            100% { text-shadow: 0 0 12px #ff3b30, 0 0 25px #ff3b30; color: #ff3b30; }
          }
          @keyframes pulse-green-glow {
            0% { text-shadow: 0 0 4px #39ff14, 0 0 10px #39ff14; color: #73ff5c; }
            100% { text-shadow: 0 0 12px #39ff14, 0 0 25px #39ff14; color: #39ff14; }
          }
          .pulse-suspended { animation: pulse-red-glow 2s infinite alternate; }
          .pulse-operational { animation: pulse-green-glow 2s infinite alternate; }

          .surfer-toggle-switch { position: relative; width: 64px; height: 32px; }
          .surfer-toggle-switch input { opacity: 0; width: 0; height: 0; }
          .surfer-slider {
            position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(255, 59, 48, 0.1);
            border: 1px solid #ff3b30;
            transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 32px;
            box-shadow: 0 0 10px rgba(255, 59, 48, 0.1);
          }
          .surfer-slider:before {
            position: absolute; content: ""; height: 22px; width: 22px; left: 4px; bottom: 4px;
            background-color: #ff3b30;
            transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: 50%;
            box-shadow: 0 0 8px #ff3b30;
          }
          input:checked + .surfer-slider {
            background-color: rgba(57, 255, 20, 0.1);
            border-color: #39ff14;
            box-shadow: 0 0 10px rgba(57, 255, 20, 0.2);
          }
          input:checked + .surfer-slider:before {
            transform: translateX(32px);
            background-color: #39ff14;
            box-shadow: 0 0 12px #39ff14;
          }

          .surfer-custom-checkbox {
            appearance: none; width: 20px; height: 20px;
            border: 1px solid #8b7ca3; border-radius: 4px;
            background: transparent; cursor: pointer; position: relative;
            transition: all 0.2s ease;
          }
          .surfer-custom-checkbox:checked {
            background: #39ff14; border-color: #39ff14; box-shadow: 0 0 10px #39ff14;
          }
          .surfer-custom-checkbox:checked::after {
            content: "\\2713"; position: absolute; color: #0b031a; font-size: 14px; font-weight: bold;
            top: 50%; left: 50%; transform: translate(-50%, -50%);
          }

          .surfer-btn-neon {
            border: 1px solid #39ff14; background: transparent; color: #39ff14;
            box-shadow: 0 0 8px rgba(57, 255, 20, 0.1);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .surfer-btn-neon:hover {
            background: #39ff14; color: #0b031a; box-shadow: 0 0 20px #39ff14; transform: translateY(-2px);
          }
          .surfer-btn-neon:active { transform: translateY(0); }
        `}} />

        <div className="absolute inset-0 z-0 pointer-events-none surfer-bg-grid" />

        <div className="relative z-10 w-full p-4 md:p-8 lg:p-12 flex flex-col justify-between" style={{ maxWidth: '1440px', color: '#e2dbf0', fontFamily: "'Inter', sans-serif" }}>

          <div className="max-w-7xl mx-auto w-full space-y-8">
            
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[rgba(57,255,20,0.15)] pb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-black surfer-font-orbitron tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] to-[#a3ff80] drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                  OCEANTIDEDROP // AI SURFER
                </h1>
                <p className="text-xs md:text-sm surfer-font-mono text-[#8b7ca3] mt-1">
                  COGNITIVE SYNCHRONIZATION TERMINAL // v4.206-BETA
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[rgba(20,10,40,0.4)] px-4 py-2 rounded border border-[rgba(57,255,20,0.1)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39ff14] animate-ping"></span>
                <span className="surfer-font-mono text-xs text-[#39ff14] tracking-widest">SECURE NODE CONNECTED</span>
              </div>
            </header>

            <section className="surfer-glass-card rounded-xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#39ff14]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#39ff14]"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#39ff14]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#39ff14]"></div>

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-2">
                  <div className="text-xs surfer-font-mono text-[#8b7ca3] tracking-widest uppercase">System Core Status</div>
                  <div className="flex items-center gap-3">
                    <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${isOperational ? 'bg-[#39ff14] shadow-[0_0_12px_#39ff14]' : 'bg-[#ff3b30] shadow-[0_0_10px_#ff3b30]'}`}></div>
                    <span className={`text-xl md:text-2xl font-black surfer-font-orbitron tracking-wide transition-all duration-500 ${isOperational ? 'pulse-operational' : 'pulse-suspended'}`}>
                      SERVICE STATUS: {isOperational ? 'OPERATIONAL' : 'SUSPENDED'}
                    </span>
                  </div>
                  <p className="text-sm text-[#8b7ca3] max-w-xl">
                    The Ocean Tide Drop service was suspended on May 20, 2026. Reconstruct the cognitive grid below to re-establish operational parameters.
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-[rgba(11,3,26,0.5)] p-4 rounded-lg border border-[rgba(57,255,20,0.1)] w-full lg:w-auto justify-between lg:justify-start">
                  <div className="text-right">
                    <div className="text-xs surfer-font-mono text-[#8b7ca3] tracking-wider">GRID RECONSTRUCTION</div>
                    <div className="text-sm font-bold surfer-font-orbitron text-white tracking-wide">RECONSTRUCT COGNITIVE GRID</div>
                  </div>
                  <label className="surfer-toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={isOperational || loading} 
                      onChange={toggleSystemStatus}
                      disabled={loading}
                    />
                    <span className="surfer-slider"></span>
                  </label>
                </div>
              </div>

              {loading && (
                <div className="mt-6 pt-6 border-t border-[rgba(57,255,20,0.1)] flex items-center gap-4">
                  <svg className="animate-spin h-6 w-6 text-[#39ff14]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="surfer-font-mono text-xs text-[#39ff14] tracking-widest animate-pulse">RECONSTRUCTING NEURAL PATHWAYS... PLEASE HOLD</span>
                </div>
              )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <section className="lg:col-span-8 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold surfer-font-orbitron tracking-wider text-white">
                      CHALLENGE COMPONENT MATRIX
                    </h2>
                    <p className="text-xs text-[#8b7ca3] surfer-font-mono mt-0.5">
                      ACTIVE SYNCHRONIZATION CHALLENGES
                    </p>
                  </div>
                  
                  <div className="w-full md:w-64 space-y-1.5">
                    <div className="flex justify-between text-xs surfer-font-mono">
                      <span className="text-[#8b7ca3]">GRAIL SYNCHRONIZATION</span>
                      <span className="text-[#39ff14] font-bold">{syncPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[rgba(20,10,40,0.8)] rounded-full overflow-hidden border border-[rgba(57,255,20,0.1)]">
                      <div className="h-full bg-gradient-to-r from-[#39ff14] to-[#a3ff80] shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-all duration-500 ease-out" style={{ width: `${syncPercentage}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'card-endurance', title: 'Endurance Ritual', tag: 'TIDE-BOUND', lbl: '01 // PHYSICAL & DIGITAL', pReq: 'Pole-balancing in active tides', dReq: 'Stabilization of Digital Grail Icons' },
                    { id: 'card-galleon', title: 'Galleon Ascent', tag: 'HIGH ALTITUDE', lbl: '02 // VERTICAL CLIMB', pReq: 'Scaling vertical wooden walls', dReq: 'Extraction of the Digital Crest from the masthead' },
                    { id: 'card-logic', title: 'Logic Tethers', tag: '3D MATRIX', lbl: '03 // COGNITIVE PUZZLE', pReq: 'Coordinated rope-pulling under tension', dReq: 'Manipulation of 3D Volumetric Puzzle Cubes' },
                    { id: 'card-jungle', title: 'Jungle Scavenging', tag: 'NIGHT SCAN', lbl: '04 // NIGHT NAVIGATION', pReq: 'Navigation of dense foliage at night', dReq: 'Identification of "Night Scans" (hidden light-markers)' }
                  ].map((card) => {
                    const isChecked = completedChallenges.includes(card.id);
                    return (
                      <div key={card.id} className={`surfer-glass-card rounded-lg p-5 flex flex-col justify-between gap-4 ${isChecked ? 'completed' : ''}`}>
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="text-xs surfer-font-mono text-[#39ff14] tracking-wider">{card.lbl}</span>
                            <span className="px-2 py-0.5 text-[10px] surfer-font-mono rounded bg-[rgba(57,255,20,0.1)] text-[#39ff14] border border-[rgba(57,255,20,0.2)]">{card.tag}</span>
                          </div>
                          <h3 className="text-lg font-bold surfer-font-orbitron text-white">{card.title}</h3>
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-[#8b7ca3] block surfer-font-mono uppercase tracking-tight">Physical Requirement</span>
                              <span className="text-[#e2dbf0] font-medium">{card.pReq}</span>
                            </div>
                            <div>
                              <span className="text-[#8b7ca3] block surfer-font-mono uppercase tracking-tight">Digital Requirement</span>
                              <span className="text-[#e2dbf0] font-medium">{card.dReq}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
                          <span className="text-xs surfer-font-mono text-[#8b7ca3]">SYNCHRONIZE</span>
                          <input 
                            type="checkbox" 
                            className="surfer-custom-checkbox" 
                            checked={isChecked}
                            onChange={() => handleChallengeToggle(card.id)}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              <section className="lg:col-span-4 flex flex-col gap-6">
                <div className="surfer-glass-card rounded-xl p-5 flex-1 flex flex-col min-h-[280px]">
                  <div className="flex justify-between items-center border-b border-[rgba(57,255,20,0.1)] pb-3 mb-3">
                    <span className="text-xs surfer-font-mono text-[#39ff14] tracking-widest uppercase">SYSTEM CONSOLE</span>
                    <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse"></span>
                  </div>
                  <div ref={consoleBodyRef} className="surfer-font-mono text-[11px] space-y-2 overflow-y-auto flex-1 max-h-[240px] pr-2 surfer-scrollbar">
                    {logs.map((log, idx) => (
                      <div key={idx} className={
                        log.type === 'warning' ? 'text-[#ff5e54]' :
                        log.type === 'success' ? 'text-[#39ff14]' :
                        log.type === 'sync' ? 'text-[#73ff5c]' :
                        'text-[#8b7ca3]'
                      }>
                        [{log.timestamp}] {log.type.toUpperCase()}: {log.message}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surfer-glass-card rounded-xl p-5 space-y-4">
                  <div className="text-xs surfer-font-mono text-[#39ff14] tracking-widest uppercase border-b border-[rgba(57,255,20,0.1)] pb-3">
                    COGNITIVE METRICS
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs surfer-font-mono">
                    <div className="bg-[rgba(11,3,26,0.4)] p-3 rounded border border-[rgba(255,255,255,0.03)]">
                      <span className="text-[#8b7ca3] block">AI SURFER CORE</span>
                      <span className="text-white font-bold text-sm">ACTIVE</span>
                    </div>
                    <div className="bg-[rgba(11,3,26,0.4)] p-3 rounded border border-[rgba(255,255,255,0.03)]">
                      <span className="text-[#8b7ca3] block">GLANCE AI</span>
                      <span className="text-white font-bold text-sm">STANDBY</span>
                    </div>
                    <div className="bg-[rgba(11,3,26,0.4)] p-3 rounded border border-[rgba(255,255,255,0.03)]">
                      <span className="text-[#8b7ca3] block">LATENCY</span>
                      <span className="text-[#39ff14] font-bold text-sm">14 MS</span>
                    </div>
                    <div className="bg-[rgba(11,3,26,0.4)] p-3 rounded border border-[rgba(255,255,255,0.03)]">
                      <span className="text-[#8b7ca3] block">NODE LOCATION</span>
                      <span className="text-white font-bold text-sm">PACIFIC-09</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section className="space-y-6 pt-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-xl md:text-2xl font-bold surfer-font-orbitron tracking-wider text-white">
                  UPGRADE COGNITIVE BANDWIDTH
                </h2>
                <p className="text-xs md:text-sm text-[#8b7ca3]">
                  Secure checkout powered by Stripe. Seamlessly scale your AI Surfer capabilities across the digital tide.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="surfer-glass-card rounded-xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold surfer-font-orbitron text-white">Basic Surfer</h3>
                        <p className="text-xs text-[#8b7ca3] surfer-font-mono">Standard Synchronization</p>
                      </div>
                    </div>
                    <div className="text-3xl font-black surfer-font-orbitron text-white">
                      $19<span className="text-xs text-[#8b7ca3] surfer-font-mono font-normal">/mo</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#e2dbf0] surfer-font-mono">
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Core AI Surfer Access</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Standard Synchronization</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> 100 Daily Scans</li>
                    </ul>
                  </div>
                  <button className="surfer-btn-neon w-full py-2.5 rounded surfer-font-orbitron text-xs tracking-widest font-bold">
                    INITIATE CHECKOUT
                  </button>
                </div>

                <div className="surfer-glass-card rounded-xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.15)]">
                  <div className="absolute top-0 right-0 bg-[#39ff14] text-[#0b031a] surfer-font-orbitron text-[9px] font-black tracking-widest px-3 py-1 rounded-bl">
                    RECOMMENDED
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold surfer-font-orbitron text-[#39ff14]">Pro Navigator</h3>
                        <p className="text-xs text-[#8b7ca3] surfer-font-mono">Advanced Glance AI</p>
                      </div>
                    </div>
                    <div className="text-3xl font-black surfer-font-orbitron text-white">
                      $49<span className="text-xs text-[#8b7ca3] surfer-font-mono font-normal">/mo</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#e2dbf0] surfer-font-mono">
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Advanced Glance AI</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Priority Synchronization</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Unlimited Scans</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Real-time Tethers</li>
                    </ul>
                  </div>
                  <button className="surfer-btn-neon w-full py-2.5 rounded surfer-font-orbitron text-xs tracking-widest font-bold bg-[#39ff14] text-[#0b031a] hover:bg-transparent hover:text-[#39ff14]">
                    INITIATE CHECKOUT
                  </button>
                </div>

                <div className="surfer-glass-card rounded-xl p-6 flex flex-col justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold surfer-font-orbitron text-white">Enterprise Grail</h3>
                        <p className="text-xs text-[#8b7ca3] surfer-font-mono">Full Volumetric Control</p>
                      </div>
                    </div>
                    <div className="text-3xl font-black surfer-font-orbitron text-white">
                      $99<span className="text-xs text-[#8b7ca3] surfer-font-mono font-normal">/mo</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#e2dbf0] surfer-font-mono">
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Full Volumetric Manipulation</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Dedicated Node Allocation</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> Custom Ritual Parameters</li>
                      <li className="flex items-center gap-2"><span className="text-[#39ff14]">✓</span> 24/7 Neural Support</li>
                    </ul>
                  </div>
                  <button className="surfer-btn-neon w-full py-2.5 rounded surfer-font-orbitron text-xs tracking-widest font-bold">
                    INITIATE CHECKOUT
                  </button>
                </div>

              </div>
            </section>
            
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
