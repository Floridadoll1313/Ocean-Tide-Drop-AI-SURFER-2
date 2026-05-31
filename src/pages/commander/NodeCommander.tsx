import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';

// Define log and node types
type LogLevel = 'info' | 'network' | 'warn' | 'critical';
interface Log {
  id: number;
  timestamp: string;
  level: LogLevel;
  message: string;
}

interface NodeState {
  id: string;
  name: string;
  status: 'Online' | 'Degraded' | 'Standby' | 'Rebooting' | 'Optimizing' | 'Optimized';
  cpu: number;
  mem: number;
  uptime: string;
}

export default function NodeCommander() {
  const [timeString, setTimeString] = useState('00:00:00 UTC');
  const [nodes, setNodes] = useState<Record<string, NodeState>>({
    alpha: { id: 'AL-90', name: 'Node Alpha', status: 'Online', cpu: 42, mem: 68, uptime: '142h 12m' },
    beta: { id: 'BT-44', name: 'Node Beta', status: 'Degraded', cpu: 89, mem: 91, uptime: '89h 41m' },
    gamma: { id: 'GM-12', name: 'Node Gamma', status: 'Standby', cpu: 12, mem: 34, uptime: '312h 05m' }
  });
  
  let totalLoad = 0;
  let activeNodes = 0;
  Object.values(nodes).forEach(node => {
    if (node.status !== 'Rebooting') {
      totalLoad += node.cpu;
      activeNodes++;
    }
  });
  const avgLoad = activeNodes > 0 ? totalLoad / activeNodes : 100;
  let healthPct = Math.round(100 - (avgLoad * 0.3));
  healthPct = Math.max(10, Math.min(100, healthPct));
  
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, timestamp: '12:04:15', level: 'info', message: 'System initialized. Core v4.22 online.' },
    { id: 2, timestamp: '12:04:18', level: 'network', message: 'Secure handshake verified with Gateway-09.' },
    { id: 3, timestamp: '12:05:01', level: 'warn', message: 'Node Beta reporting high memory utilization.' }
  ]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'network'>('all');
  
  const [scopes, setScopes] = useState({ read: true, write: true, admin: false, logs: false });
  const [token, setToken] = useState<string>('Click generate to create token...');
  const [tokenCopied, setTokenCopied] = useState(false);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);

  const [toasts, setToasts] = useState<{ id: number, title: string, message: string, type: 'success'|'error'|'info' }[]>([]);

  // Live Clock
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      setTimeString(now.toISOString().substring(11, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Node Fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          const node = { ...next[key] };
          if (node.status === 'Rebooting' || node.status === 'Optimizing') {
            next[key] = node;
            return;
          }

          if (node.status === 'Online' || node.status === 'Optimized') {
            node.cpu = Math.max(15, Math.min(65, Math.round(node.cpu + (Math.random() * 10 - 5))));
            node.mem = Math.max(30, Math.min(75, Math.round(node.mem + (Math.random() * 6 - 3))));
          } else if (node.status === 'Degraded') {
            node.cpu = Math.max(75, Math.min(98, Math.round(node.cpu + (Math.random() * 8 - 4))));
            node.mem = Math.max(80, Math.min(96, Math.round(node.mem + (Math.random() * 4 - 2))));
          } else if (node.status === 'Standby') {
            node.cpu = Math.max(5, Math.min(20, Math.round(node.cpu + (Math.random() * 4 - 2))));
            node.mem = Math.max(15, Math.min(40, Math.round(node.mem + (Math.random() * 2 - 1))));
          }
          next[key] = node;
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Log management
  const addLog = (level: LogLevel, message: string) => {
    setLogs(prev => {
      const now = new Date();
      const next = [{ id: Date.now(), timestamp: now.toISOString().substring(11, 19), level, message }, ...prev];
      if (next.length > 30) next.pop();
      return next;
    });
  };

  // Background Logs
  useEffect(() => {
    const bgEvents = [
      { level: 'network', message: 'Incoming packet burst routed through firewall.' },
      { level: 'info', message: 'Database replication sync successful.' },
      { level: 'warn', message: 'API Gateway latency spike: 184ms.' },
      { level: 'critical', message: 'Unauthorized access attempt blocked on Port 22.' },
      { level: 'network', message: 'Node Gamma handshake verified.' },
      { level: 'info', message: 'Garbage collection cycle completed (freed 412MB).' }
    ];
    const logInterval = setInterval(() => {
      const e = bgEvents[Math.floor(Math.random() * bgEvents.length)];
      addLog(e.level as LogLevel, e.message);
    }, 12000);
    return () => clearInterval(logInterval);
  }, []);

  const showToast = React.useCallback((title: string, message: string, type: 'success'|'error'|'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const optimizeNode = (nodeKey: string) => {
    const node = nodes[nodeKey];
    if (node.status === 'Rebooting' || node.status === 'Optimizing') return;

    setNodes(prev => ({ ...prev, [nodeKey]: { ...node, status: 'Optimizing' } }));
    addLog('info', `Optimization sequence initiated for ${node.name}.`);

    setTimeout(() => {
      setNodes(prev => {
        const n = prev[nodeKey];
        return {
          ...prev,
          [nodeKey]: {
            ...n,
            status: 'Optimized',
            cpu: Math.round(n.cpu * 0.5),
            mem: Math.round(n.mem * 0.7)
          }
        };
      });
      addLog('info', `${node.name} optimization complete. CPU load reduced.`);
      showToast('Success', `${node.name} optimized successfully.`, 'success');
    }, 3000);
  };

  const rebootNode = (nodeKey: string) => {
    const node = nodes[nodeKey];
    if (node.status === 'Rebooting' || node.status === 'Optimizing') return;

    setNodes(prev => ({ ...prev, [nodeKey]: { ...node, status: 'Rebooting', cpu: 0, mem: 0 } }));
    addLog('warn', `Emergency reboot command dispatched to ${node.name}.`);

    setTimeout(() => {
      setNodes(prev => {
        return {
          ...prev,
          [nodeKey]: {
            ...prev[nodeKey],
            status: 'Online',
            cpu: 25,
            mem: 35
          }
        };
      });
      addLog('info', `${node.name} reboot complete. All services restored.`);
      showToast('System Alert', `${node.name} is back online.`, 'info');
    }, 4000);
  };

  const generateToken = React.useCallback(() => {
    if (!scopes.read && !scopes.write && !scopes.admin && !scopes.logs) {
      showToast('Error', 'Please select at least one scope.', 'error');
      return;
    }

    let prefix = '';
    if (scopes.admin) prefix += 'adm_';
    else {
      if (scopes.read) prefix += 'r';
      if (scopes.write) prefix += 'w';
      if (scopes.logs) prefix += 'l';
      prefix += '_';
    }

    const chars = '0123456789abcdef';
    let hex = '';
    for (let i = 0; i < 32; i++) {
      hex += chars[Math.floor(Math.random() * chars.length)];
    }

    const fullToken = `cc_${prefix}${hex}`;
    setIsGeneratingToken(true);
    setToken('');

    let index = 0;
    const interval = setInterval(() => {
      setToken(() => fullToken.substring(0, index));
      index++;
      if (index > fullToken.length) {
        clearInterval(interval);
        setIsGeneratingToken(false);
        addLog('info', 'New API Access Token generated successfully.');
        showToast('Security', 'API Token generated.', 'success');
      }
    }, 20);
  }, [scopes, showToast]);

  const copyToken = () => {
    if (!token || token.includes('Click generate') || isGeneratingToken) return;
    navigator.clipboard.writeText(token).then(() => {
      showToast('Copied', 'Token copied to clipboard.', 'success');
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    }).catch(err => {
      showToast('Error', 'Failed to copy token.', 'error');
    });
  };

  const getHealthColors = (value: number) => {
    if (value > 80) return ['#00f0ff', '#00ff66', 'text-[#00ff66]'];
    if (value > 50) return ['#00f0ff', '#ffaa00', 'text-[#00ff66]'];
    return ['#ffaa00', '#ef4444', 'text-red-500'];
  };
  const [healthStartColor, healthEndColor, healthTextColor] = getHealthColors(healthPct);

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false} showLargeLogo={false}>
      <div className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col font-sans mb-8 text-[#f3f1f9]"
           style={{ backgroundColor: '#0c081a', backgroundImage: 'radial-gradient(at 0% 0%, rgba(21, 13, 45, 0.8) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(28, 17, 62, 0.6) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(12, 8, 26, 0.9) 0, transparent 100%), linear-gradient(rgba(18, 10, 43, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 10, 43, 0.3) 1px, transparent 1px)', backgroundSize: '100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px' }}>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;600;700;900&display=swap');
          .font-orbitron { font-family: 'Orbitron', sans-serif; }
          .glass-card {
            background: rgba(30, 20, 55, 0.45); backdrop-filter: blur(16px);
            border: 1px solid rgba(0, 255, 102, 0.15); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .glass-card:hover {
            border-color: rgba(0, 255, 102, 0.3); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 255, 102, 0.05);
          }
          .glow-text-green { text-shadow: 0 0 8px rgba(0, 255, 102, 0.6); }
          .glow-text-cyan { text-shadow: 0 0 8px rgba(0, 240, 255, 0.6); }
          .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
          .status-online { background-color: #00ff66; box-shadow: 0 0 8px #00ff66; }
          .status-degraded { background-color: #ffaa00; box-shadow: 0 0 8px #ffaa00; }
          .status-standby { background-color: #00f0ff; box-shadow: 0 0 8px #00f0ff; }
          .status-offline { background-color: #ef4444; box-shadow: 0 0 8px #ef4444; }
          .progress-bar-fill { transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          @keyframes slideUp { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}} />

        {/* Top Header */}
        <header className="w-full max-w-7xl mx-auto mb-6 p-4 md:p-8 pb-0">
          <div className="glass-card rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b-2 border-b-[#00ff66]/20">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff66]"></span>
              </div>
              <div>
                <h1 className="font-orbitron text-xl md:text-2xl font-black tracking-wider text-white flex items-center gap-2">
                  SYSTEM MONITOR <span className="text-[#00ff66] glow-text-green">v4.22</span>
                </h1>
                <p className="text-xs text-[#8b80a3] tracking-widest uppercase">Core Operations Command</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <div className="text-right">
                <span className="text-xs text-[#8b80a3] block uppercase tracking-wider">System Time</span>
                <span className="font-orbitron text-lg md:text-xl font-bold text-[#00f0ff] glow-text-cyan">{timeString}</span>
              </div>
              <div className="w-40 md:w-48">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#8b80a3] uppercase tracking-wider">System Health</span>
                  <span className={`${healthTextColor} font-bold`}>{healthPct}%</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/5">
                  <div className="h-full rounded-full progress-bar-fill" style={{ width: `${healthPct}%`, backgroundImage: `linear-gradient(to right, ${healthStartColor}, ${healthEndColor})` }}></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow px-4 md:px-8 pb-8">
          
          {/* Node Commander */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-card rounded-xl p-6 flex-grow flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <h2 className="font-orbitron text-lg font-bold tracking-wider text-white">NODE COMMANDER</h2>
                </div>
                <span className="text-xs bg-[#00ff66]/10 text-[#00ff66] px-2.5 py-1 rounded border border-[#00ff66]/20 font-orbitron uppercase">3 Active Nodes</span>
              </div>

              <div className="space-y-6 flex-grow flex flex-col justify-around">
                {Object.entries(nodes).map(([key, node]) => {
                  const isOptimizing = node.status === 'Optimizing';
                  const isRebooting = node.status === 'Rebooting';
                  
                  let dotClass = 'status-online';
                  let statusColor = 'text-[#00ff66]';
                  if (node.status === 'Degraded') { dotClass = 'status-degraded'; statusColor = 'text-[#ffaa00]'; }
                  else if (node.status === 'Standby') { dotClass = 'status-standby'; statusColor = 'text-[#00f0ff]'; }
                  else if (node.status === 'Rebooting') { dotClass = 'status-offline'; statusColor = 'text-red-500'; }

                  const cpuColor = node.cpu > 80 ? 'bg-red-500' : (node.cpu > 60 ? 'bg-[#ffaa00]' : 'bg-[#00ff66]');
                  const memColor = node.mem > 80 ? 'bg-red-500' : (node.mem > 60 ? 'bg-[#ffaa00]' : 'bg-[#00f0ff]');

                  return (
                    <div key={key} className="relative p-4 rounded-lg bg-black/20 border border-white/5 hover:border-white/10 transition-all duration-300">
                      
                      {/* Action Overlay */}
                      <div className={`absolute inset-0 bg-[#0c081a]/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 z-10 ${(isOptimizing || isRebooting) ? 'opacity-100' : 'opacity-0'}`}>
                        <span className={`font-orbitron text-sm mb-2 tracking-widest uppercase ${isRebooting ? 'text-red-500' : 'text-[#00ff66]'}`}>
                          {isRebooting ? 'Rebooting Node...' : 'Optimizing Node...'}
                        </span>
                        <div className="w-2/3 bg-black/50 h-1.5 rounded-full overflow-hidden border border-white/10">
                          <div className={`h-full transition-all duration-[3000ms] w-full ${isRebooting ? 'bg-red-500' : 'bg-[#00ff66]'}`} style={{ width: (isOptimizing || isRebooting) ? '100%' : '0%' }}></div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`status-dot ${dotClass}`}></span>
                            <h3 className="font-orbitron font-bold text-white tracking-wide">{node.name.toUpperCase()}</h3>
                            <span className="text-[10px] text-[#8b80a3] font-mono">[{node.id}]</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#8b80a3]">
                            <span>Status: <strong className={`${statusColor}`}>{node.status.toUpperCase()}</strong></span>
                            <span>Uptime: <strong className="text-white">{node.uptime}</strong></span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button onClick={() => optimizeNode(key)} disabled={isOptimizing || isRebooting} className="px-3 py-1.5 text-xs font-orbitron font-semibold bg-[#00ff66]/10 hover:bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/30 rounded transition-all duration-200 active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#00ff66] disabled:opacity-50 cursor-pointer">
                            OPTIMIZE
                          </button>
                          <button onClick={() => rebootNode(key)} disabled={isOptimizing || isRebooting} className="px-3 py-1.5 text-xs font-orbitron font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded transition-all duration-200 active:scale-95 focus:outline-none focus:ring-1 focus:ring-white/30 disabled:opacity-50 cursor-pointer">
                            REBOOT
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[#8b80a3]">CPU Load</span>
                            <span className="text-white font-mono">{node.cpu}%</span>
                          </div>
                          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                            <div className={`${cpuColor} h-full progress-bar-fill`} style={{ width: `${node.cpu}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[#8b80a3]">Memory Allocation</span>
                            <span className="text-white font-mono">{node.mem}%</span>
                          </div>
                          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                            <div className={`${memColor} h-full progress-bar-fill`} style={{ width: `${node.mem}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Right Column */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            {/* API Token Manager */}
            <div className="glass-card rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                  <svg className="w-5 h-5 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                  </svg>
                  <h2 className="font-orbitron text-lg font-bold tracking-wider text-white">API TOKEN MANAGER</h2>
                </div>

                <div className="mb-4">
                  <span className="text-xs text-[#8b80a3] uppercase tracking-wider block mb-2">Select Access Scopes</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'read', label: 'read:nodes' },
                      { id: 'write', label: 'write:nodes' },
                      { id: 'admin', label: 'admin:control' },
                      { id: 'logs', label: 'read:logs' }
                    ].map(scope => (
                      <label key={scope.id} className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                        <input type="checkbox" checked={scopes[scope.id as keyof typeof scopes]} onChange={e => setScopes(prev => ({ ...prev, [scope.id]: e.target.checked }))} className="rounded bg-black border-white/20 text-[#00ff66] focus:ring-0 focus:ring-offset-0" />
                        <span className="text-xs text-white font-mono">{scope.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={generateToken} disabled={isGeneratingToken} className="cursor-pointer w-full py-2.5 mb-4 font-orbitron font-bold text-xs tracking-widest bg-gradient-to-r from-[#00ff66] to-[#00f0ff] hover:from-[#00ff66]/90 hover:to-[#00f0ff]/90 text-black rounded shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all duration-200 active:scale-[0.98] focus:outline-none disabled:opacity-50">
                  GENERATE ACCESS TOKEN
                </button>
              </div>

              <div className="bg-black/40 p-3 rounded border border-white/10 flex items-center justify-between gap-2">
                <div className="overflow-x-auto whitespace-nowrap scrollbar-none flex-grow pr-2">
                  <code className={`font-mono text-xs select-all ${token.startsWith('cc_') ? 'text-[#00ff66] glow-text-green' : 'text-[#8b80a3]'}`}>{token}</code>
                </div>
                <button onClick={copyToken} disabled={!token.startsWith('cc_') || isGeneratingToken} className="p-1.5 text-[#8b80a3] hover:text-[#00ff66] disabled:opacity-30 disabled:hover:text-[#8b80a3] transition-colors focus:outline-none cursor-pointer" title="Copy to Clipboard">
                  {tokenCopied ? (
                     <svg className="w-5 h-5 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-9 4h4m-4 4h6m-6 4h6"></path></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Live Log Feed */}
            <div className="glass-card rounded-xl p-6 flex flex-col flex-grow justify-between min-h-[320px]">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#ffaa00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <h2 className="font-orbitron text-lg font-bold tracking-wider text-white">LIVE LOG FEED</h2>
                  </div>
                  
                  <div className="flex gap-1">
                    {(['all', 'critical', 'network'] as const).map(filter => (
                      <button key={filter} onClick={() => setActiveFilter(filter)} className={`cursor-pointer px-2 py-1 text-[10px] font-orbitron font-semibold rounded transition-all duration-150 border ${activeFilter === filter ? 'bg-[#00ff66]/20 text-[#00ff66] border-[#00ff66]/30' : 'bg-white/5 text-white border-white/10'}`}>
                        {filter.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-grow bg-black/40 rounded p-3 font-mono text-xs overflow-y-auto h-48 space-y-2 border border-white/5">
                {logs.filter(log => activeFilter === 'all' ? true : (activeFilter === 'critical' ? ['critical', 'warn'].includes(log.level) : log.level === activeFilter)).length === 0 ? (
                  <div className="text-[#8b80a3] italic text-center py-4">No logs matching filter.</div>
                ) : (
                  logs.filter(log => activeFilter === 'all' ? true : (activeFilter === 'critical' ? ['critical', 'warn'].includes(log.level) : log.level === activeFilter)).map(log => {
                    let badgeColor = 'text-[#00f0ff]';
                    let badgeText = 'INFO';
                    if (log.level === 'warn') { badgeColor = 'text-[#ffaa00]'; badgeText = 'WARN'; }
                    else if (log.level === 'critical') { badgeColor = 'text-red-500 font-bold'; badgeText = 'CRIT'; }
                    else if (log.level === 'network') { badgeColor = 'text-purple-400'; badgeText = 'NET'; }

                    return (
                      <div key={log.id} className="flex items-start gap-2 border-b border-white/5 pb-1.5 last:border-0">
                        <span className="text-[#8b80a3] shrink-0">[{log.timestamp}]</span>
                        <span className={`${badgeColor} shrink-0 font-bold font-orbitron text-[10px] tracking-wider`}>[{badgeText}]</span>
                        <span className="text-white/90 break-all">{log.message}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Toasts */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map(toast => {
            let borderColor = 'border-white/10';
            let iconColor = 'text-[#00f0ff]';
            if (toast.type === 'success') { borderColor = 'border-[#00ff66]/30'; iconColor = 'text-[#00ff66]'; }
            else if (toast.type === 'error') { borderColor = 'border-red-500/30'; iconColor = 'text-red-500'; }

            return (
              <div key={toast.id} className={`glass-card rounded-lg p-4 w-72 flex gap-3 items-start border ${borderColor} animate-slide-up pointer-events-auto bg-[#1e1437]/90`}>
                <div className={`${iconColor} shrink-0 mt-0.5`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-orbitron text-xs font-bold text-white tracking-wider uppercase">{toast.title}</h4>
                  <p className="text-xs text-[#8b80a3] mt-1">{toast.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
