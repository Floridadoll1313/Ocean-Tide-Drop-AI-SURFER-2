import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
  RefreshCcw,
  Sparkles
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
  businessImpact: string;
  details: string[];
  color: string;
  status: string;
  actions: string[];
  settings: Setting[];
  minTier: 'basic' | 'premium' | 'enterprise';
}

const TOOLS: Record<string, ToolConfig> = {
  "brand-voice-architect": {
    id: "brand-voice-architect",
    name: "Brand Voice Architect",
    minTier: 'basic',
    icon: <Bot className="w-12 h-12" />,
    description: "Define and scale your brand's unique linguistic architecture. AI-driven tone synthesis and consistency across all touchpoints.",
    businessImpact: "Increases brand recognition by 40% through unified messaging across global markets.",
    details: [
      "Semantic Tone Mapping",
      "Linguistic Guardrails",
      "Multi-channel Synchronization",
      "Emotional Resonance Analysis"
    ],
    color: "#ffffff",
    status: "Tone Loaded",
    actions: ["Analyze Brand Voice", "Generate Style Guide", "Rewrite Content", "Detect Inconsistency"],
    settings: [
      { id: 'creativity', label: 'Linguistic Resonance', type: 'range', min: 0, max: 100, value: 75 },
      { id: 'formality', label: 'Semantic Authority', type: 'range', min: 0, max: 100, value: 50 },
      { id: 'auto-correct', label: 'Real-time Tone Guard', type: 'toggle', value: true }
    ]
  },
  "ai-ad-copy-engine": {
    id: "ai-ad-copy-engine",
    name: "AI Ad Copy Engine",
    minTier: 'basic',
    icon: <Zap className="w-12 h-12" />,
    description: "High-frequency conversion copy for Google, Meta, and LinkedIn. Engineered to resonate with specific audience frequencies.",
    businessImpact: "Proven to increase CTR by 2.4x while reducing creative production time by 80%.",
    details: [
      "Dynamic Hook Generation",
      "CTR Prediction Scoring",
      "Persona-aligned Narrative",
      "Platform-specific Optimization"
    ],
    color: "#ffffff",
    status: "Frequency Synced",
    actions: ["Generate Ad Suite", "A/B Variation Flow", "Predict CTR", "Competitor Analysis"],
    settings: [
      { id: 'urgency', label: 'Conversion Velocity', type: 'range', min: 0, max: 100, value: 80 },
      { id: 'benefit-focus', label: 'Value Intensity', type: 'range', min: 0, max: 100, value: 90 },
      { id: 'emoji-support', label: 'Visual Punctuation', type: 'toggle', value: false }
    ]
  },
  "seo-strategy-voyager": {
    id: "seo-strategy-voyager",
    name: "SEO Strategy Voyager",
    minTier: 'premium',
    icon: <Terminal className="w-12 h-12" />,
    description: "Dominate search engine frequencies. Automated keyword clustering, backlink architecture, and semantic content mapping.",
    businessImpact: "Achieve top 3 rankings for competitive keywords within 60 days using semantic clustering.",
    details: [
      "Intent-based Clustering",
      "Semantic GAP Discovery",
      "Automated Internal Linking",
      "SERP Volatility Tracking"
    ],
    color: "#ffffff",
    status: "Crawl Active",
    actions: ["Keyword Mapping", "GAP Analysis", "On-Page Audit", "Link Prophet"],
    settings: [
      { id: 'depth', label: 'Scan Depth', type: 'range', min: 1, max: 50, value: 25 },
      { id: 'intent-focus', label: 'Search Intent Focus', type: 'range', min: 1, max: 10, value: 8 },
      { id: 'real-time-data', label: 'Live SERP Sync', type: 'toggle', value: true }
    ]
  },
  "workflow-automator": {
    id: "workflow-automator",
    name: "Workflow Automator",
    minTier: 'premium',
    icon: <Settings className="w-12 h-12" />,
    description: "The engine room of your agency. Connect disparate marketing systems into a single, high-frequency pipeline.",
    businessImpact: "Saves $4k+/month in operational costs by consolidating 50+ manual task sequences.",
    details: [
      "Node Architecture Sync",
      "API Bridge Management",
      "Throughput Optimization",
      "Self-healing Logic"
    ],
    color: "#ffffff",
    status: "Engine: Online",
    actions: ["Sync Nodes", "Bridge APIs", "Monitor Health", "Optimize Throughput"],
    settings: [
      { id: 'concurrency', label: 'Parallel Processing', type: 'range', min: 1, max: 50, value: 16 },
      { id: 'buffer', label: 'Memory Allocation', type: 'range', min: 1, max: 100, value: 64 },
      { id: 'auto-healing', label: 'Self-Healing Nodes', type: 'toggle', value: true }
    ]
  },
  "strategic-governance": {
    id: "strategic-governance",
    name: "Strategic Governance",
    minTier: 'enterprise',
    icon: <Cpu className="w-12 h-12" />,
    description: "AI-led business decisions and governance. Strategic alignment across your entire digital empire.",
    businessImpact: "Reduces strategic decision lag by 70% while improving capital allocation accuracy.",
    details: [
      "Capital Allocation Alpha",
      "Risk Frequency Analysis",
      "Governance Node Sync",
      "Bespoke Protocol Mapping"
    ],
    color: "#ffffff",
    status: "Guardian Active",
    actions: ["Analyze Risk", "Optimize Capital", "Sync Governance", "Generate Protocol"],
    settings: [
      { id: 'risk-tolerance', label: 'Risk Aperture', type: 'range', min: 1, max: 100, value: 15 },
      { id: 'governance-speed', label: 'Response Velocity', type: 'range', min: 1, max: 100, value: 90 },
      { id: 'auto-pilot', label: 'Autonomous Compliance', type: 'toggle', value: true }
    ]
  },
  "custom-tool-builder": {
    id: "custom-tool-builder",
    name: "Custom Tool Builder",
    minTier: 'enterprise',
    icon: <Sparkles className="w-12 h-12" />,
    description: "Bespoke AI solutions built for your ecosystem. Craft the exact tools your business needs to dominate.",
    businessImpact: "Unlocks 10x ROI by building unique software assets tailored to your specific market frequency.",
    details: [
      "Bespoke Neural Models",
      "Custom API Bridges",
      "Private UI Environments",
      "Legacy System Mapping"
    ],
    color: "#ffffff",
    status: "Forge Ready",
    actions: ["Initiate Forge", "Map Logic Gate", "Bridge Custom API", "Sync Neural Core"],
    settings: [
      { id: 'complexity', label: 'Neural Complexity', type: 'range', min: 1, max: 10, value: 7 },
      { id: 'io-speed', label: 'Data Throughput', type: 'range', min: 1, max: 100, value: 100 },
      { id: 'private-mode', label: 'Stealth Deployment', type: 'toggle', value: true }
    ]
  }
};

export default function ToolInterface() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const { user, userData, loading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'actions' | 'settings'>('actions');
  const [toolSettings, setToolSettings] = useState<Record<string, any>>({});
  const [logs, setLogs] = useState<string[]>(["Connection established.", "Initializing secure environment..."]);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [promptInput, setPromptInput] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);

  const tool = toolId ? TOOLS[toolId] : null;

  const userTier = userData?.tier || 'none';

  const hasAccess = (minTier: string) => {
    if (userTier === 'enterprise') return true;
    if (userTier === 'premium') return minTier !== 'enterprise';
    if (userTier === 'basic') return minTier === 'basic';
    return false;
  };

  useEffect(() => {
    if (tool && !hasAccess(tool.minTier)) {
      navigate('/members');
    }
  }, [tool, userTier]);

  useEffect(() => {
    if (tool) {
      setLogs(prev => [...prev, `${tool.name} module loaded successfully.`]);
      // Initialize local settings
      const initialSettings: Record<string, any> = {};
      tool.settings.forEach(s => {
        initialSettings[s.id] = s.value;
      });
      setToolSettings(initialSettings);
      setPromptInput("");
      setAiResult(null);
    }
  }, [toolId]); // Use toolId here to re-init on navigation

  if (loading) return null;
  if (!user) return <Navigate to="/members" replace />;
  if (!tool) return <Navigate to="/members" replace />;

  const runAction = async (action: string) => {
    if (!promptInput.trim()) {
      setLogs(prev => [...prev, "Warning: Prompt input is empty. AI synthesis requires core data."]);
      return;
    }

    setActiveAction(action);
    setIsProcessing(true);
    setLogs(prev => [...prev, `Executing AI Synthesis for: ${action}...`]);
    setAiResult(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `Action: ${action}\nTool: ${tool.name}\nInput: ${promptInput}\nSettings: ${JSON.stringify(toolSettings)}`,
          systemInstruction: `You are the ${tool.name} module. Provide highly professional, structured, and strategic output for the given action and input. Format the response with clear headings and bullet points where appropriate.`
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "AI Core Linkage Error");

      setAiResult(data.result);
      setLogs(prev => [...prev, `Success: AI output synthesized for ${action}.`]);

      // Persist the action and result
      if (user) {
        await addDoc(collection(db, "users", user.uid, "work"), {
          userId: user.uid,
          toolName: tool.name,
          action: action,
          result: data.result,
          timestamp: serverTimestamp()
        });
      }
    } catch (err: any) {
      console.error("AI Action Error:", err);
      setLogs(prev => [...prev, `Error: ${err.message}`]);
    } finally {
      setIsProcessing(false);
      setActiveAction(null);
    }
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
      <div className="w-full px-6 py-10 relative">
        {/* SOULFUL DECORATION */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <button 
          onClick={() => navigate('/members')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-[10px] font-black uppercase tracking-widest group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Return to Member Archive
        </button>

        <div className="grid lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {/* Left Column: Tool Info */}
          <div className="lg:col-span-1 space-y-px">
            <div className="bg-black p-12 relative overflow-hidden group">
              <div 
                className="absolute inset-x-0 top-0 h-[1px] bg-white opacity-20" 
              />
              
              <div className="mb-10 p-6 bg-white/5 border border-white/10 w-fit text-white">
                {tool.icon}
              </div>

              <h1 className="text-4xl font-black uppercase text-white mb-4 tracking-tighter leading-none">
                {tool.name}
              </h1>
              
              <div 
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-white"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                {tool.status}
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-medium">
                {tool.description}
              </p>

              <div className="space-y-10">
                <div className="p-6 bg-white/5 border-l-2 border-white/20">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-3">Business Impact</h4>
                  <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">"{tool.businessImpact}"</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Detailed Capabilities</h4>
                  <ul className="space-y-3">
                    {tool.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-zinc-500">
                        <div className="w-1 h-1 bg-white opacity-20"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 pt-10 border-t border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Architecture Integrity</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10 overflow-hidden">
                      <div className="h-full bg-white w-[99%]" />
                    </div>
                    <span className="text-[10px] font-black text-white">99%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black p-12 border-t border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 flex items-center gap-3">
                  <Terminal className="w-4 h-4" />
                  Execution Logs
                </h3>
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing || isProcessing}
                  className={`p-2 bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-all ${isRefreshing ? 'animate-spin text-white' : ''}`}
                  title="Manual Refresh"
                >
                  <RefreshCcw className="w-3 h-3" />
                </button>
              </div>
              <div className="font-mono text-[10px] space-y-4 h-64 overflow-y-auto custom-scrollbar pr-2">
                {logs.map((log, i) => (
                  <div key={i} className={log.startsWith('Error') ? 'text-red-500' : log.startsWith('Success') ? 'text-zinc-300' : 'text-zinc-600'}>
                    <span className="text-zinc-800 mr-3 px-1 border border-white/5">0{i+1}</span>
                    {log}
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-white animate-pulse">
                    <span className="text-zinc-800 mr-3 px-1 border border-white/5">--</span>
                    Synthesizing output...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Settings */}
          <div className="lg:col-span-2 bg-black border-l border-white/5">
            <div className="p-12 h-full flex flex-col">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
                <div>
                  <h2 className="text-4xl font-black uppercase text-white mb-2 tracking-tighter">
                    {activeTab === 'actions' ? 'Controls' : 'Parameters'}
                  </h2>
                  <div className="flex items-center gap-4">
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                      {activeTab === 'actions' ? 'Instruct AI Architecture' : 'Adjust Model Weightings'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center border border-white/10 p-1">
                  <button 
                    onClick={() => setActiveTab('actions')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'actions' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Actions
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Settings
                  </button>
                </div>
              </div>

              {activeTab === 'actions' ? (
                <div className="flex-grow flex flex-col space-y-px bg-white/5 border border-white/10">
                  {/* AI INPUT AREA */}
                  <div className="p-10 bg-black border-b border-white/10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Synthesis Input</h3>
                    <textarea 
                      placeholder="Enter core data, brand values, or strategic goals for AI processing..."
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-6 text-white text-sm font-medium focus:outline-none focus:border-white/20 transition-colors min-h-[120px] resize-none"
                    />
                  </div>

                  {/* AI ACTIONS GRID */}
                  <div className="grid sm:grid-cols-2 gap-px bg-white/10">
                    {tool.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => runAction(action)}
                        disabled={isProcessing}
                        className={`
                          relative overflow-hidden group p-10 transition-all duration-500 text-left bg-black
                          ${activeAction === action 
                            ? 'bg-zinc-900 border-white' 
                            : 'hover:bg-zinc-900'
                          }
                          ${isProcessing && activeAction !== action ? 'opacity-30 cursor-not-allowed' : ''}
                        `}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <div className={`p-4 border ${activeAction === action ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white'}`}>
                            {i === 0 ? <Wand2 className="w-5 h-5" /> : i === 1 ? <Layers className="w-5 h-5" /> : i === 2 ? <Cpu className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </div>
                          {activeAction === action ? (
                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                          ) : (
                            <div className="w-1.5 h-1.5 bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">{action}</h3>
                        <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${activeAction === action ? 'text-white' : 'text-zinc-600'}`}>
                          {isProcessing && activeAction === action ? 'Synthesizing' : 'Launch Module'}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* AI RESULT DISPLAY */}
                  {aiResult && (
                    <div className="p-10 bg-zinc-900 border-t border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Synthesized Output</h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="prose prose-invert max-w-none text-zinc-300 text-sm font-medium leading-relaxed">
                        <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 m-0 border-none">{aiResult}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-grow space-y-6">
                  {tool.settings.map((setting) => (
                    <div key={setting.id} className="p-10 bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-8">
                        <label className="text-xs font-black uppercase tracking-widest text-white">{setting.label}</label>
                        <span className="text-[10px] font-black text-white bg-white/10 px-3 py-1 uppercase tracking-widest">
                          {setting.type === 'toggle' ? (toolSettings[setting.id] ? 'Active' : 'Halted') : toolSettings[setting.id]}
                        </span>
                      </div>
                      
                      {setting.type === 'range' ? (
                        <div className="relative pt-2">
                           <input 
                            type="range"
                            min={setting.min}
                            max={setting.max}
                            value={toolSettings[setting.id] || setting.value}
                            onChange={(e) => {
                              setToolSettings(prev => ({ ...prev, [setting.id]: parseInt(e.target.value) }));
                              setLogs(prev => [...prev, `Param shifted: ${setting.label} -> ${e.target.value}`]);
                            }}
                            className="w-full h-[2px] bg-white/20 appearance-none cursor-pointer accent-white"
                          />
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            const newValue = !toolSettings[setting.id];
                            setToolSettings(prev => ({ ...prev, [setting.id]: newValue }));
                            setLogs(prev => [...prev, `State toggled: ${setting.label} -> ${newValue ? 'ON' : 'OFF'}`]);
                          }}
                          className={`w-12 h-6 border transition-all relative ${toolSettings[setting.id] ? 'bg-white border-white' : 'bg-transparent border-white/20'}`}
                        >
                          <div className={`absolute top-1 w-3.5 h-3.5 transition-all ${toolSettings[setting.id] ? 'left-7 bg-black' : 'left-1 bg-white'}`} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-12 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => {
                        setLogs(prev => [...prev, "Syncing local parameters with AI core..."]);
                        setIsProcessing(true);
                        setTimeout(() => {
                          setIsProcessing(false);
                          setLogs(prev => [...prev, "Parameters locked and synced."]);
                        }, 1000);
                      }}
                      disabled={isProcessing}
                      className="flex-1 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all disabled:opacity-50"
                    >
                      {isProcessing ? 'Syncing Architecture' : 'Apply Parameters'}
                    </button>
                    <button 
                      onClick={() => {
                        const defaultSettings: Record<string, any> = {};
                        tool.settings.forEach(s => { defaultSettings[s.id] = s.value; });
                        setToolSettings(defaultSettings);
                        setLogs(prev => [...prev, "Parameters restored to base configuration."]);
                      }}
                      className="px-10 py-5 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
                    >
                      Restore
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-20 pt-10 border-t border-white/5 flex items-center gap-8">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-white opacity-40" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[10px] font-black uppercase text-zinc-600 mb-1 tracking-widest">Network Latency</h4>
                  <p className="text-[10px] text-zinc-800 font-bold uppercase tracking-tighter">Peak Performance Mode Active</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white tracking-widest">0.002s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
