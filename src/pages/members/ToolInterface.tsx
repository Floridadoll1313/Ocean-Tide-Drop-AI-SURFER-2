import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { 
  Terminal, 
  Cpu, 
  Wand2, 
  Settings, 
  Play, 
  ArrowLeft, 
  Bot, 
  Layers, 
  Activity,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Zap,
  RefreshCcw
} from "lucide-react";

interface Setting {
  id: string;
  label: string;
  type: 'range' | 'toggle';
  min?: number;
  max?: number;
  value: any;
}

interface ToolConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  status: string;
  actions: string[];
  settings: Setting[];
}

const TOOLS: Record<string, ToolConfig> = {
  "workflow-automator": {
    id: "workflow-automator",
    name: "Workflow Automator",
    icon: <Terminal className="w-12 h-12" />,
    description: "Orchestrate complex automation sequences with cinematic precision. Sync templates, batch process assets, and automate your entire creative pipeline.",
    color: "#00eaff",
    status: "Neural Link: Active",
    actions: ["Initialize Pipeline", "Sync Templates", "Deploy Batch", "Analyze Efficiency"],
    settings: [
      { id: 'batch-size', label: 'Batch Processing Depth', type: 'range', min: 1, max: 100, value: 50 },
      { id: 'auto-sync', label: 'Autonomous Template Sync', type: 'toggle', value: true },
      { id: 'priority-mode', label: 'High-Frequency Priority', type: 'toggle', value: false }
    ]
  },
  "ai-script-generator": {
    id: "ai-script-generator",
    name: "AI Script Generator",
    icon: <Bot className="w-12 h-12" />,
    description: "Harness the power of mythic large language models to generate cinematic scripts, brand narratives, and creative copy aligned with your frequency.",
    color: "#ff5E00",
    status: "Model: GPT-Surfer-9000",
    actions: ["Generate Scene", "Character Probe", "Dialogue Refinement", "Lore Expansion"],
    settings: [
      { id: 'creativity-index', label: 'Mythic Resonance (Creativity)', type: 'range', min: 0, max: 100, value: 85 },
      { id: 'narrative-depth', label: 'Lore Complexity Depth', type: 'range', min: 1, max: 10, value: 7 },
      { id: 'cinematic-filter', label: 'Noir Aesthetic Filter', type: 'toggle', value: true }
    ]
  },
  "cinematic-tuner": {
    id: "cinematic-tuner",
    name: "Cinematic Tuner",
    icon: <Settings className="w-12 h-12" />,
    description: "Fine-tune your visual frequency. Modulate color spaces, adjust sensory depth, and optimize cinematic output for maximum resonance.",
    color: "#ec4899",
    status: "Calibration: Optimized",
    actions: ["Frequency Scan", "Depth Modulation", "Color Balancing", "Export Preset"],
    settings: [
      { id: 'vibrancy-tuning', label: 'Neon Saturation Pulse', type: 'range', min: 0, max: 200, value: 120 },
      { id: 'sensory-depth', label: 'Spatial Resonance Depth', type: 'range', min: 0, max: 100, value: 45 },
      { id: 'analog-warmth', label: 'Analog Flux Simulation', type: 'toggle', value: true }
    ]
  }
};

export default function ToolInterface() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'actions' | 'settings'>('actions');
  const [toolSettings, setToolSettings] = useState<Record<string, any>>({});
  const [logs, setLogs] = useState<string[]>(["Connection established.", "Initializing secure environment..."]);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const tool = toolId ? TOOLS[toolId] : null;

  useEffect(() => {
    if (tool) {
      setLogs(prev => [...prev, `${tool.name} module loaded successfully.`]);
      // Initialize local settings
      const initialSettings: Record<string, any> = {};
      tool.settings.forEach(s => {
        initialSettings[s.id] = s.value;
      });
      setToolSettings(initialSettings);
    }
  }, [toolId]); // Use toolId here to re-init on navigation

  if (loading) return null;
  if (!user) return <Navigate to="/members" replace />;
  if (!tool) return <Navigate to="/members" replace />;

  const runAction = (action: string) => {
    setActiveAction(action);
    setIsProcessing(true);
    setLogs(prev => [...prev, `Executing: ${action}...`]);

    // Simulate process with potential for failure
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15; // 85% success rate
      
      if (isSuccess) {
        setLogs(prev => [
          ...prev, 
          `Success: ${action} completed at ${new Date().toLocaleTimeString()}.`, 
          "System standing by for next instruction."
        ]);
      } else {
        const errorDetails: Record<string, { message: string, suggestion: string }> = {
          "Initialize Pipeline": {
            message: "Critical bottleneck detected in parallel processing lanes.",
            suggestion: "Check 'Batch Processing Depth' in settings and ensure it's below 80 for high-load initializations."
          },
          "Sync Templates": {
            message: "Template hash mismatch on remote node cluster.",
            suggestion: "Initialize global system refresh and verify 'Autonomous Template Sync' is enabled."
          },
          "Deploy Batch": {
            message: "Insufficient resource allocation for requested volume.",
            suggestion: "Lower 'Batch Processing Depth' or wait for the current neural link to stabilize."
          },
          "Analyze Efficiency": {
            message: "Sensor feedback loop timeout in sector 7G.",
            suggestion: "Recalibrate 'High-Frequency Priority' and initiate a manual refresh."
          },
          "Generate Scene": {
            message: "Narrative divergence exceeds allowable mythic resonance thresholds.",
            suggestion: "Adjust 'Mythic Resonance (Creativity)' index to a more stable value (60-75)."
          },
          "Character Probe": {
            message: "Identity resolution failure in the collective subconscious.",
            suggestion: "Increase 'Lore Complexity Depth' to allow for deeper identity mapping."
          },
          "Dialogue Refinement": {
            message: "Syntactic frequency clash detected with Noir Aesthetic Filter.",
            suggestion: "Temporarily disable 'Noir Aesthetic Filter' or adjust 'Mythic Resonance'."
          },
          "Lore Expansion": {
            message: "Expansion buffer overflow in temporal memory banks.",
            suggestion: "Clear current session command log or decrease 'Lore Complexity Depth'."
          },
          "Frequency Scan": {
            message: "Interference from external analog flux simulation.",
            suggestion: "Disable 'Analog Flux Simulation' before performing a deep frequency scan."
          },
          "Depth Modulation": {
            message: "Spatial resonance feedback loop detected.",
            suggestion: "Lower 'Spatial Resonance Depth' to prevent sensory overload."
          },
          "Color Balancing": {
            message: "Saturation pulse out of sync with neon frequency peaks.",
            suggestion: "Adjust 'Neon Saturation Pulse' and ensure all nodes are calibrated."
          },
          "Export Preset": {
            message: "Preset validation failure: checksum mismatch.",
            suggestion: "Perform a system refresh and verify all tunes have been applied."
          }
        };

        const error = errorDetails[action] || { 
          message: "Neural interference detected during execution.", 
          suggestion: "Recalibrating frequency... please retry the operation." 
        };

        setLogs(prev => [
          ...prev, 
          `Error: ${error.message}`, 
          `Troubleshooting: ${error.suggestion}`
        ]);
      }
      
      setIsProcessing(false);
      setActiveAction(null);
    }, 1500);
  };

  const handleGenerateMarketingCopy = () => {
    setIsProcessing(true);
    setActiveAction("marketing-copy");
    setLogs(prev => [...prev, "Generating marketing copy..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "Marketing copy generated successfully."]);
      setIsProcessing(false);
      setActiveAction(null);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLogs(prev => [...prev, "Initiating global system refresh...", "Scanning neural pathways..."]);
    
    setTimeout(() => {
      setIsRefreshing(false);
      setLogs(prev => [...prev, "System state synchronized.", "All tools calibrated to optimal frequency."]);
    }, 2000);
  };

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="w-full px-6 py-10">
        <button 
          onClick={() => navigate('/members')}
          className="flex items-center gap-2 text-white/40 hover:text-[#00eaff] transition-colors mb-12 text-xs font-black uppercase tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Beach Access
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column: Tool Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-10 rounded-[3rem] border-2 border-white/5 bg-white/5 relative overflow-hidden group">
              <div 
                className="absolute inset-x-0 top-0 h-1" 
                style={{ backgroundColor: tool.color, boxShadow: `0 0 20px ${tool.color}` }}
              />
              
              <div className="mb-8 p-6 rounded-[2rem] bg-white/5 border border-white/10 w-fit" style={{ color: tool.color }}>
                {tool.icon}
              </div>

              <h1 className="text-4xl font-black italic uppercase text-white mb-4 tracking-tighter leading-none">
                {tool.name}
              </h1>
              
              <div 
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
                style={{ color: tool.color, borderColor: `${tool.color}33` }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: tool.color }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: tool.color }}></span>
                </span>
                {tool.status}
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-10">
                {tool.description}
              </p>

              <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">System Integrity</h3>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00eaff] w-[98%]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#00eaff]">98%</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-black/40">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Live Command Log
                </h3>
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing || isProcessing}
                  className={`p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-[#00eaff] hover:border-[#00eaff]/30 transition-all ${isRefreshing ? 'animate-spin text-[#00eaff]' : ''}`}
                  title="Manual Refresh"
                >
                  <RefreshCcw className="w-3 h-3" />
                </button>
              </div>
              <div className="font-mono text-[10px] space-y-2 h-48 overflow-y-auto custom-scrollbar pr-2">
                {logs.map((log, i) => (
                  <div key={i} className={log.startsWith('Error') ? 'text-red-400' : log.startsWith('Success') ? 'text-green-400' : 'text-white/60'}>
                    <span className="text-white/20 mr-2">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                    {log}
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-[#00eaff] animate-pulse">
                    <span className="text-white/20 mr-2">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                    Processing buffer...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Settings */}
          <div className="lg:col-span-2">
            <div className="glass-card p-10 rounded-[3rem] border border-white/10 bg-white/5 h-full flex flex-col">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-black italic uppercase text-white mb-1">
                    {activeTab === 'actions' ? 'Command Center' : 'System Configuration'}
                  </h2>
                  <div className="flex items-center gap-3">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">
                      {activeTab === 'actions' ? 'Execute authenticated instructions' : 'Calibrate module parameters'}
                    </p>
                    <div className="hidden md:flex items-center gap-2 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: tool.color }} />
                      <span className="text-[8px] font-black uppercase tracking-tighter opacity-60">Status: Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-1.5 rounded-2xl bg-black/40 border border-white/5">
                  <button 
                    onClick={() => setActiveTab('actions')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'actions' ? 'bg-[#00eaff] text-black shadow-[0_0_15px_rgba(0,234,255,0.3)]' : 'text-white/40 hover:text-white'}`}
                  >
                    Actions
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-[#00eaff] text-black shadow-[0_0_15px_rgba(0,234,255,0.3)]' : 'text-white/40 hover:text-white'}`}
                  >
                    Settings
                  </button>
                </div>
              </div>

              {activeTab === 'actions' ? (
                <div className="grid sm:grid-cols-2 gap-6 flex-grow">
                  {tool.actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => runAction(action)}
                      disabled={isProcessing}
                      className={`
                        relative overflow-hidden group p-8 rounded-[2rem] border-2 transition-all duration-500 text-left
                        ${activeAction === action 
                          ? 'bg-[#00eaff] border-[#00eaff] text-black' 
                          : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 text-white'
                        }
                        ${isProcessing && activeAction !== action ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl ${activeAction === action ? 'bg-black/20' : 'bg-white/5'}`}>
                          {i === 0 ? <Wand2 className="w-6 h-6" /> : i === 1 ? <Layers className="w-6 h-6" /> : i === 2 ? <Cpu className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </div>
                        {activeAction === action ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-black italic uppercase tracking-tight mb-2">{action}</h3>
                      <p className={`text-[9px] uppercase tracking-widest ${activeAction === action ? 'text-black/60' : 'text-white/40'}`}>
                        {isProcessing && activeAction === action ? 'Executing Command...' : 'Ready for instruction'}
                      </p>

                      {/* Hover Effect Light */}
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Zap className="w-4 h-4 text-[#00eaff]" />
                      </div>
                    </button>
                  ))}

                  {/* GENERATE MARKETING COPY BUTTON */}
                  <button
                    onClick={handleGenerateMarketingCopy}
                    disabled={isProcessing}
                    className={`
                      relative overflow-hidden group p-8 rounded-[2rem] border-2 transition-all duration-500 text-left
                      ${activeAction === 'marketing-copy' 
                        ? 'bg-[#ff5E00] border-[#ff5E00] text-black shadow-[0_0_20px_rgba(255,94,0,0.4)]' 
                        : 'bg-white/5 border-[#ff5E00]/10 hover:border-[#ff5E00]/30 hover:bg-[#ff5E00]/5 text-white'
                      }
                      ${isProcessing && activeAction !== 'marketing-copy' ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl ${activeAction === 'marketing-copy' ? 'bg-black/20' : 'bg-[#ff5E00]/10 border border-[#ff5E00]/20'}`}>
                        <Zap className={`w-6 h-6 ${activeAction === 'marketing-copy' ? 'text-black' : 'text-[#ff5E00]'}`} />
                      </div>
                      {activeAction === 'marketing-copy' ? (
                        <Loader2 className="w-5 h-5 animate-spin text-black" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#ff5E00] shadow-[0_0_10px_#ff5E00]" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-black italic uppercase tracking-tight mb-2">Generate Marketing Copy</h3>
                    <p className={`text-[9px] uppercase tracking-widest ${activeAction === 'marketing-copy' ? 'text-black/60' : 'text-white/40'}`}>
                      {isProcessing && activeAction === 'marketing-copy' ? 'Transmitting...' : 'Initiate Outreach Wave'}
                    </p>

                    {/* Hover Effect Light */}
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Wand2 className="w-4 h-4 text-[#ff5E00]/30" />
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex-grow space-y-8">
                  {tool.settings.map((setting) => (
                    <div key={setting.id} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-6">
                        <label className="text-sm font-black italic uppercase tracking-tight text-white">{setting.label}</label>
                        <span className="text-[10px] font-mono font-bold text-[#00eaff] bg-[#00eaff]/10 px-2 py-0.5 rounded border border-[#00eaff]/20">
                          {setting.type === 'toggle' ? (toolSettings[setting.id] ? 'ENABLED' : 'DISABLED') : toolSettings[setting.id]}
                        </span>
                      </div>
                      
                      {setting.type === 'range' ? (
                        <input 
                          type="range"
                          min={setting.min}
                          max={setting.max}
                          value={toolSettings[setting.id] || setting.value}
                          onChange={(e) => {
                            setToolSettings(prev => ({ ...prev, [setting.id]: parseInt(e.target.value) }));
                            setLogs(prev => [...prev, `Updated ${setting.label} to ${e.target.value}`]);
                          }}
                          className="w-full h-1.5 bg-black/40 rounded-full appearance-none cursor-pointer accent-[#00eaff]"
                        />
                      ) : (
                        <button 
                          onClick={() => {
                            const newValue = !toolSettings[setting.id];
                            setToolSettings(prev => ({ ...prev, [setting.id]: newValue }));
                            setLogs(prev => [...prev, `${setting.label} ${newValue ? 'Enabled' : 'Disabled'}`]);
                          }}
                          className={`w-14 h-7 rounded-full transition-all relative ${toolSettings[setting.id] ? 'bg-[#00eaff]' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-xl transition-all ${toolSettings[setting.id] ? 'left-8' : 'left-1'}`} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-8 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => {
                        setLogs(prev => [...prev, "Syncing configuration with cloud nodes..."]);
                        setIsProcessing(true);
                        setTimeout(() => {
                          setIsProcessing(false);
                          setLogs(prev => [...prev, "Configuration synchronized successfully."]);
                        }, 1000);
                      }}
                      disabled={isProcessing}
                      className="flex-1 py-4 rounded-2xl bg-[#00eaff] text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(0,234,255,0.2)] disabled:opacity-50"
                    >
                      {isProcessing ? 'Syncing...' : 'Apply Config'}
                    </button>
                    <button 
                      onClick={() => {
                        const defaultSettings: Record<string, any> = {};
                        tool.settings.forEach(s => { defaultSettings[s.id] = s.value; });
                        setToolSettings(defaultSettings);
                        setLogs(prev => [...prev, "System settings reset to defaults."]);
                      }}
                      className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-12 p-6 rounded-3xl bg-[#00eaff]/5 border border-[#00eaff]/10 flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#00eaff]/20 flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6 text-[#00eaff]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black uppercase text-[#00eaff] mb-1">Neural Latency</h4>
                  <p className="text-[10px] text-white/40 uppercase">Optimized for sub-millisecond response across all frequencies.</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-white">4ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
