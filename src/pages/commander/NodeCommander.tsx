import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../../components/PageWrapper';

export default function NodeCommander() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [booting, setBooting] = useState(true);
  const [threatCount, setThreatCount] = useState(14);
  const [cpuAlpha, setCpuAlpha] = useState(42);
  const [cpuBeta, setCpuBeta] = useState(87);
  const [cpuGamma, setCpuGamma] = useState(14);
  const avg = (cpuAlpha + cpuBeta + cpuGamma) / 3;
  let healthPct = Math.round(100 - (avg * 0.35));
  healthPct = Math.max(5, Math.min(100, healthPct));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const particles: {x: number, y: number, r: number, dx: number, dy: number}[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3
        });
      }
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    handleResize();

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,102,0.6)';
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const threatTimer = setInterval(() => {
      if (Math.random() > 0.6) {
        setThreatCount(prev => prev + 1);
      }
    }, 10000);
    return () => clearInterval(threatTimer);
  }, []);

  useEffect(() => {
    const fluctuationTimer = setInterval(() => {
      setCpuAlpha(prev => Math.max(20, Math.min(60, prev + Math.floor(Math.random() * 10 - 5))));
      setCpuBeta(prev => Math.max(70, Math.min(98, prev + Math.floor(Math.random() * 10 - 5))));
      setCpuGamma(prev => Math.max(5, Math.min(25, prev + Math.floor(Math.random() * 10 - 5))));
    }, 2500);
    return () => clearInterval(fluctuationTimer);
  }, []);

  return (
    <PageWrapper>
      <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col select-none" 
           style={{ backgroundColor: '#0c081a', color: '#f3f1f9', fontFamily: "'Inter', sans-serif", backgroundImage: 'radial-gradient(circle at top left, rgba(0,255,102,0.08), transparent 40%), radial-gradient(circle at bottom right, rgba(0,240,255,0.08), transparent 40%)', overflowX: 'hidden' }}>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');

          .cmd-font-orbitron { font-family: 'Orbitron', sans-serif; }

          .cmd-glass-card {
            background: rgba(30,20,55,0.45);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,102,0.05);
          }

          .cmd-glow-text-green { text-shadow: 0 0 12px rgba(0,255,102,0.8); }
          .cmd-glow-text-cyan { text-shadow: 0 0 12px rgba(0,240,255,0.8); }

          .cmd-status-dot {
            width: 10px; height: 10px; border-radius: 999px;
            animation: cmd-ambientPulse 2s infinite ease-in-out, cmd-randomBlink 5s infinite;
          }

          .cmd-status-online { background: #00ff66; box-shadow: 0 0 12px #00ff66; }
          .cmd-status-degraded { background: #ffaa00; box-shadow: 0 0 12px #ffaa00; }
          .cmd-status-standby { background: #00f0ff; box-shadow: 0 0 12px #00f0ff; }

          @keyframes cmd-ambientPulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
          @keyframes cmd-randomBlink { 0%,95%,100% { opacity: 1; } 96% { opacity: 0.2; } }

          @keyframes cmd-bootFade { 0%,70% { opacity: 1; } 100% { opacity: 0; visibility: hidden; } }

          .cmd-radar-container {
            position: relative; width: 220px; height: 220px; border-radius: 50%;
            border: 2px solid rgba(0,255,102,0.25); overflow: hidden;
          }

          .cmd-radar-ring {
            position: absolute; inset: 20%; border: 1px solid rgba(0,255,102,0.15); border-radius: 50%;
          }

          .cmd-radar-sweep {
            position: absolute; width: 50%; height: 2px;
            background: linear-gradient(to right, rgba(0,255,102,0), rgba(0,255,102,0.8));
            top: 50%; left: 50%; transform-origin: left center;
            animation: cmd-radarSweep 4s linear infinite;
          }

          .cmd-radar-dot {
            position: absolute; width: 8px; height: 8px; border-radius: 999px; background: #00ff66;
            top: 40%; left: 65%; box-shadow: 0 0 12px #00ff66;
          }

          @keyframes cmd-radarSweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

          .cmd-progress-bar { transition: width 0.4s ease; }
        `}} />

        {/* CSS Overlay pattern */}
        <div className="absolute inset-0 pointer-events-none z-40" style={{ background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.015), rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)' }} />

        {/* Particles Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-35 z-0" />

        {/* Boot Screen */}
        {booting && (
          <div className="absolute inset-0 flex items-center justify-center z-[100] bg-[#05010f]" style={{ animation: 'cmd-bootFade 3s forwards' }} onAnimationEnd={() => setBooting(false)}>
            <div className="text-center">
              <h1 className="cmd-font-orbitron text-4xl text-[#00ff66] cmd-glow-text-green">
                INITIALIZING SYSTEM
              </h1>
              <p className="text-[#8b80a3] mt-4 tracking-widest uppercase">
                Quantum Operations Relay Online
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 w-full p-4 md:p-8" style={{ maxWidth: '80rem', margin: '0 auto' }}>
          
          <header className="cmd-glass-card rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <h1 className="cmd-font-orbitron text-3xl font-black tracking-wider">
                  SYSTEM MONITOR
                  <span className="text-[#00ff66] cmd-glow-text-green ml-2 text-xl">v5.0</span>
                </h1>
                <p className="text-[#8b80a3] uppercase tracking-[0.3em] text-xs mt-2">
                  Cyber Operations Reef Command
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="cmd-glass-card px-4 py-3 rounded-xl">
                  <div className="text-xs text-[#8b80a3] uppercase">System Health</div>
                  <div className="text-2xl font-bold text-[#00ff66]">{healthPct}%</div>
                </div>

                <div className="cmd-glass-card px-4 py-3 rounded-xl border border-red-500/20">
                  <div className="text-xs text-red-400 uppercase">Threats</div>
                  <div className="text-2xl font-bold">{threatCount}</div>
                </div>

                <div className="cmd-glass-card px-4 py-3 rounded-xl border border-cyan-400/20">
                  <div className="text-xs text-cyan-400 uppercase">Relays</div>
                  <div className="text-2xl font-bold">7</div>
                </div>

                <div className="cmd-glass-card px-4 py-3 rounded-xl border border-green-400/20">
                  <div className="text-xs text-green-400 uppercase">Tokens</div>
                  <div className="text-2xl font-bold">23</div>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="cmd-glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="cmd-font-orbitron text-xl tracking-wider">NODE COMMANDER</h2>
                  <span className="text-[#00ff66] text-xs uppercase tracking-[0.3em]">3 Active Nodes</span>
                </div>

                <div className="space-y-6">
                  {/* Node Alpha */}
                  <div className="bg-black/20 rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="cmd-status-dot cmd-status-online"></div>
                          <h3 className="cmd-font-orbitron">NODE ALPHA</h3>
                        </div>
                        <p className="text-sm text-[#8b80a3] mt-1">Operational</p>
                      </div>
                      <button className="px-4 py-2 bg-[#00ff66]/10 border border-[#00ff66]/30 rounded-lg text-[#00ff66] hover:bg-[#00ff66]/20 transition text-sm">
                        OPTIMIZE
                      </button>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>CPU</span>
                        <span>{cpuAlpha}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                        <div className="cmd-progress-bar bg-[#00ff66] h-full shadow-[0_0_12px_rgba(0,255,102,0.8)]" style={{ width: `${cpuAlpha}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Node Beta */}
                  <div className="bg-black/20 rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="cmd-status-dot cmd-status-degraded"></div>
                          <h3 className="cmd-font-orbitron">NODE BETA</h3>
                        </div>
                        <p className="text-sm text-[#ffaa00] mt-1">Degraded</p>
                      </div>
                      <button className="px-4 py-2 bg-[#ffaa00]/10 border border-[#ffaa00]/30 rounded-lg text-[#ffaa00] hover:bg-[#ffaa00]/20 transition text-sm">
                        REPAIR
                      </button>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>CPU</span>
                        <span>{cpuBeta}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                        <div className="cmd-progress-bar bg-[#ffaa00] h-full shadow-[0_0_12px_rgba(255,170,0,0.8)]" style={{ width: `${cpuBeta}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Node Gamma */}
                  <div className="bg-black/20 rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="cmd-status-dot cmd-status-standby"></div>
                          <h3 className="cmd-font-orbitron">NODE GAMMA</h3>
                        </div>
                        <p className="text-sm text-[#00f0ff] mt-1">Standby</p>
                      </div>
                      <button className="px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-lg text-[#00f0ff] hover:bg-[#00f0ff]/20 transition text-sm">
                        WAKE
                      </button>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>CPU</span>
                        <span>{cpuGamma}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                        <div className="cmd-progress-bar bg-[#00f0ff] h-full shadow-[0_0_12px_rgba(0,240,255,0.8)]" style={{ width: `${cpuGamma}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="cmd-glass-card rounded-2xl p-6">
                <h2 className="cmd-font-orbitron text-xl mb-6 tracking-wider">RADAR SWEEP</h2>
                <div className="flex justify-center">
                  <div className="cmd-radar-container">
                    <div className="cmd-radar-ring"></div>
                    <div className="cmd-radar-ring"></div>
                    <div className="cmd-radar-ring"></div>
                    <div className="cmd-radar-sweep"></div>
                    <div className="cmd-radar-dot"></div>
                  </div>
                </div>
              </div>

              <div className="cmd-glass-card rounded-2xl p-6 flex flex-col">
                <h2 className="cmd-font-orbitron text-xl mb-6 tracking-wider">LIVE LOG FEED</h2>
                <div className="bg-black/40 rounded-xl p-4 h-[240px] sm:h-64 overflow-y-auto font-mono text-sm space-y-3">
                  <div className="text-[#00ff66]">[NET] Gateway-09 relay stable (42ms)</div>
                  <div className="text-[#ffaa00]">[WARN] Node Beta thermal spike (+7°C)</div>
                  <div className="text-red-400">[CRIT] Unauthorized auth signature blocked</div>
                  <div className="text-cyan-400">[INFO] Neural routing optimization complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
