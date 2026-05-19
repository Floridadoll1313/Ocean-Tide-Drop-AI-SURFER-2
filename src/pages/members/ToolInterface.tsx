import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ToolSelector from "../../components/ToolSelector";
import { 
  Terminal, 
  Cpu, 
  Wand2, 
  Settings, 
  Play, 
  ArrowLeft, 
  Layers, 
  Activity,
  CheckCircle2,
  Loader2,
  Zap,
  RefreshCcw,
  Sparkles,
  Bell,
  FileText,
  Users,
  Trash2,
  Plus,
  Globe
} from "lucide-react";

interface Setting {
  id: string;
  label: string;
  type: 'range' | 'toggle';
  min?: number;
  max?: number;
  value: unknown;
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
  prompts?: string[];
}

const TOOLS: Record<string, ToolConfig> = {
  "brand-voice-architect": {
    id: "brand-voice-architect",
    name: "Brand Voice Architect",
    minTier: 'basic',
    icon: <Users className="w-12 h-12 text-cyan-300" />,
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
    prompts: [
      "Analyze this brand text and extract its core tone and vocabulary.",
      "Rewrite the underlying message to be more authoritative and visionary.",
      "Generate a 5-point brand voice guideline based on these values."
    ],
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
    icon: <Zap className="w-12 h-12 text-cyan-300" />,
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
    prompts: [
      "Create 3 high-converting ad variations for a premium B2B software.",
      "Write an urgent, FOMO-driven Facebook ad for an upcoming webinar.",
      "Analyze our competitor's ad copy and suggest a stronger counter-hook."
    ],
    settings: [
      { id: 'urgency', label: 'Conversion Velocity', type: 'range', min: 0, max: 100, value: 80 },
      { id: 'benefit-focus', label: 'Value Intensity', type: 'range', min: 0, max: 100, value: 90 },
      { id: 'emoji-support', label: 'Visual Punctuation', type: 'toggle', value: false }
    ]
  },
  "email-campaign-catalyst": {
    id: "email-campaign-catalyst",
    name: "Email Campaign Catalyst",
    minTier: "basic",
    icon: <Bell className="w-12 h-12 text-cyan-300" />,
    description: "Automated, click-optimized automated newsletter sequences nurture client check-ins and lock interest.",
    businessImpact: "Boosts transactional and newsletter open rates by up to 35% through optimal frequency matching.",
    details: [
      "Sequence Flow Calibration",
      "Dynamic Recipient Mapping",
      "AI Spam-filter Shielding",
      "CTA Resonance Optimization"
    ],
    color: "#ffffff",
    status: "Catalyst Online",
    actions: ["Generate Newsletter", "Create Welcome Flow", "A/B Subject Optimizer", "Nurture sequence"],
    prompts: [
      "Draft an engaging high-frequency agency newsletter template.",
      "Create a 3-part automated trust builder email sequence for new signups.",
      "Generate 10 highly engaging CTR email headlines."
    ],
    settings: [
      { id: 'persuasion', label: 'Persuasion Intensity', type: 'range', min: 0, max: 100, value: 85 },
      { id: 'frequency', label: 'Delivery Cadence Sync', type: 'range', min: 1, max: 30, value: 7 },
      { id: 'corporate-decorum', label: 'Corporate Decorum Guard', type: 'toggle', value: true }
    ]
  },
  "social-wave-blueprint": {
    id: "social-wave-blueprint",
    name: "Social Wave Blueprint",
    minTier: "basic",
    icon: <Sparkles className="w-12 h-12 text-cyan-300" />,
    description: "Generate viral local hooks, multi-platform post copies, and cinematic visual style concepts.",
    businessImpact: "Shifts creative planning time from days to instant, maximizing local market penetration.",
    details: [
      "Socio-linguistic Hook Tuning",
      "Network Specific Adapters",
      "Visual Metaphor Crafting",
      "Local Resonance Syncing",
      "Staggered Launch Sequences",
      "Multi-Channel Narrative Continuity",
      "Audience Engagement Triggers"
    ],
    color: "#ffffff",
    status: "Blueprints Synced",
    actions: [
      "Formulate Hook", 
      "Cross-Platform Thread", 
      "Visual Concept Board", 
      "Hashtag Optimizer",
      "Generate Ad Campaign Grid",
      "LinkedIn Thought Leadership Hook",
      "Instagram Reel Script & Visual Directions",
      "TikTok Hook Matrix"
    ],
    prompts: [
      "Write 5 viral hooks for B2B brand agency scaling on short-form videos.",
      "Craft a 5-post carousel narrative describing premium coastal craftsmanship.",
      "Deconstruct trending visual aesthetics and generate customized prompt guidelines.",
      "Synthesize a full 30-day conceptual local awareness campaign with hooks and visual directives.",
      "Draft a micro-influencer outreach script paired with a campaign visual style brief.",
      "Generate a multi-channel sequence focusing on high engagement and shareability."
    ],
    settings: [
      { id: 'viral-energy', label: 'Viral Amplitude', type: 'range', min: 0, max: 100, value: 90 },
      { id: 'platform-synergy', label: 'Platform Optimization Match', type: 'range', min: 1, max: 10, value: 7 },
      { id: 'engagement-boost', label: 'Engagement Boost', type: 'range', min: 0, max: 100, value: 75 },
      { id: 'visual-hook-intensity', label: 'Visual Hook Intensity', type: 'range', min: 0, max: 100, value: 85 },
      { id: 'strict-compliance', label: 'Algorithm Safe Mode', type: 'toggle', value: true }
    ]
  },
  "seo-strategy-voyager": {
    id: "seo-strategy-voyager",
    name: "SEO Strategy Voyager",
    minTier: 'premium',
    icon: <Globe className="w-12 h-12 text-[#00eaff]" />,
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
    prompts: [
      "Cluster these keywords based on search intent and funnel stage.",
      "Generate a content outline optimized for featured snippets.",
      "Identify content gaps between our site and typical market leaders."
    ],
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
    icon: <Settings className="w-12 h-12 text-[#00eaff]" />,
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
    prompts: [
      "Design a workflow connecting our payment gateway, CRM, and team chat.",
      "Suggest robust error-handling steps for a lead enrichment automation.",
      "Outline a self-healing automation logic for a broken API endpoint."
    ],
    settings: [
      { id: 'concurrency', label: 'Parallel Processing', type: 'range', min: 1, max: 50, value: 16 },
      { id: 'buffer', label: 'Memory Allocation', type: 'range', min: 1, max: 100, value: 64 },
      { id: 'auto-healing', label: 'Self-Healing Nodes', type: 'toggle', value: true }
    ]
  },
  "lead-qualifier-shield": {
    id: "lead-qualifier-shield",
    name: "Lead Qualifier Shield",
    minTier: "premium",
    icon: <Activity className="w-12 h-12 text-[#00eaff]" />,
    description: "Automatically screen, evaluate, score, and prioritize prospective inbound organic leads.",
    businessImpact: "Drastically reduces sales qualification time and filters high-value accounts automatically.",
    details: [
      "Revenue Feasibility Grading",
      "Inbound Sentiment Scan",
      "Intake Custom Scripting",
      "Operational Security Profiling"
    ],
    color: "#ffffff",
    status: "Shield Anchored",
    actions: ["Score Lead Feasibility", "Draft Intake Script", "Assess Revenue potential", "SLA Integrity Check"],
    prompts: [
      "Analyze customer details and construct a 1-10 priority classification metric.",
      "Outline high-touch qualifying callback questions matching budget thresholds.",
      "Formulate a friendly but direct filter reply setting premium minimum scopes."
    ],
    settings: [
      { id: 'sensitivity', label: 'Feasibility Margin', type: 'range', min: 1, max: 100, value: 70 },
      { id: 'complexity-gate', label: 'Compliance Rigor Threshold', type: 'range', min: 1, max: 10, value: 5 },
      { id: 'auto-escalation', label: 'Instant Priority Pager', type: 'toggle', value: true }
    ]
  },
  "proposal-draft-builder": {
    id: "proposal-draft-builder",
    minTier: "premium",
    name: "Proposal Draft Builder",
    icon: <FileText className="w-12 h-12 text-[#00eaff]" />,
    description: "Craft bulletproof custom commercial proposals instantly, complete with detailed statements of work.",
    businessImpact: "Guarantees a 62% win-rate lift on custom masterclass carpentry and digital contracts.",
    details: [
      "Dynamic Schedule of Values",
      "Resilience Statement Craft",
      "Custom Fee Structuring",
      "Liability Armor Framing"
    ],
    color: "#ffffff",
    status: "Builder Primed",
    actions: ["Draft Statement of Work", "Calibrate Fee Matrix", "Synthesize Cover Letter", "Construct SOW Scope"],
    prompts: [
      "Develop a 3-option modular price schedule menu for corporate digital transformations.",
      "Write a high-conviction cover letter highlighting resilient structural execution.",
      "Outline accurate milestones and strict timeline risk buffers."
    ],
    settings: [
      { id: 'scope-depth', label: 'Technical Granularity', type: 'range', min: 1, max: 100, value: 80 },
      { id: 'risk-margin', label: 'Contingency Inflation Shield', type: 'range', min: 0, max: 50, value: 15 },
      { id: 'legal-guard', label: 'Robust Indemnity Clauses', type: 'toggle', value: true }
    ]
  },
  "strategic-governance": {
    id: "strategic-governance",
    name: "Strategic Governance",
    minTier: 'enterprise',
    icon: <Cpu className="w-12 h-12 text-purple-400" />,
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
    prompts: [
      "Evaluate the risk/reward of launching a new software product in Q3.",
      "Draft a quarterly governance memo aligning team output.",
      "Analyze potential compliance bottlenecks when scaling to EU markets."
    ],
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
    icon: <Settings className="w-12 h-12 text-purple-400" />,
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
    prompts: [
      "Create a spec for an internal tool that scores sales calls.",
      "Outline the data schema needed for a real-time volatility tracker.",
      "Define frontend/backend requirements for a generated landing page engine."
    ],
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
  const [toolSettings, setToolSettings] = useState<Record<string, unknown>>({});
  const [logs, setLogs] = useState<string[]>(["Connection established.", "Initializing secure environment..."]);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [promptInput, setPromptInput] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);

  // Custom tool dynamic settings
  const [customSettings, setCustomSettings] = useState<Setting[]>([]);
  const [isAddingParam, setIsAddingParam] = useState(false);
  const [newParamLabel, setNewParamLabel] = useState("");
  const [newParamType, setNewParamType] = useState<'range' | 'toggle'>('range');
  const [newParamMin, setNewParamMin] = useState(1);
  const [newParamMax, setNewParamMax] = useState(100);
  const [newParamDefault, setNewParamDefault] = useState<unknown>(50);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, userTier]);

  useEffect(() => {
    if (tool) {
      setLogs(prev => [...prev, `${tool.name} module loaded successfully.`]);
      
      // Load custom dynamic settings from localStorage per tool id
      const stored = localStorage.getItem(`custom-settings-${tool.id}`);
      let parsedCustom: Setting[] = [];
      if (stored) {
        try {
          parsedCustom = JSON.parse(stored);
        } catch {
          parsedCustom = [];
        }
      }
      setCustomSettings(parsedCustom);

      // Initialize local settings map containing both default and custom settings
      const initialSettings: Record<string, unknown> = {};
      tool.settings.forEach(s => {
        initialSettings[s.id] = s.value;
      });
      parsedCustom.forEach(s => {
        initialSettings[s.id] = s.value;
      });

      setToolSettings(initialSettings);
      setPromptInput("");
      setAiResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolId]); // Use toolId to trigger re-initialization

  if (loading) return null;
  if (!user) return <Navigate to="/members" replace />;
  if (!tool) return <Navigate to="/members" replace />;

  const addCustomSetting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newParamLabel.trim()) return;

    const paramId = `custom-${Date.now()}`;
    const newSetting: Setting = {
      id: paramId,
      label: newParamLabel.trim(),
      type: newParamType,
      min: newParamType === 'range' ? newParamMin : undefined,
      max: newParamType === 'range' ? newParamMax : undefined,
      value: newParamDefault,
    };

    const updated = [...customSettings, newSetting];
    setCustomSettings(updated);
    localStorage.setItem(`custom-settings-${tool.id}`, JSON.stringify(updated));

    setToolSettings(prev => ({
      ...prev,
      [paramId]: newParamDefault
    }));

    setLogs(prev => [...prev, `Added customized dynamic config: ${newParamLabel}`]);

    // Reset Form
    setNewParamLabel("");
    setNewParamType("range");
    setNewParamMin(1);
    setNewParamMax(100);
    setNewParamDefault(50);
    setIsAddingParam(false);
  };

  const deleteCustomSetting = (id: string, label: string) => {
    const updated = customSettings.filter(s => s.id !== id);
    setCustomSettings(updated);
    localStorage.setItem(`custom-settings-${tool.id}`, JSON.stringify(updated));
    setLogs(prev => [...prev, `Removed dynamic parameter: ${label}`]);

    setToolSettings(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const runAction = async (action: string, overridePrompt?: string) => {
    const promptToUse = overridePrompt !== undefined ? overridePrompt : promptInput;

    if (!promptToUse.trim()) {
      setLogs(prev => [...prev, "Warning: Prompt input is empty. AI synthesis requires core data."]);
      return;
    }

    setActiveAction(action);
    setIsProcessing(true);
    setLogs(prev => [...prev, `Executing AI Synthesis for: ${action}...`]);
    setAiResult(null);

    // Human-friendly representation of current normal and custom strategic weights
    const settingsContextLines = Object.entries(toolSettings).map(([key, value]) => {
      const matched = [...tool.settings, ...customSettings].find(s => s.id === key);
      const label = matched ? matched.label : key;
      const displayVal = matched?.type === 'toggle' ? (value ? 'Active/ON' : 'Halted/OFF') : value;
      return `- ${label}: ${displayVal}`;
    }).join('\n');

    try {
      const response = await fetch("/api/ai/generate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `Action: ${action}\nTool: ${tool.name}\nInput: ${promptToUse}\n\n[Active Dynamic System Settings]:\n${settingsContextLines}`,
          systemInstruction: `You are the ${tool.name} module. Synthesize highly professional, robust, strategic, and tactical outcomes. You MUST strictly adhere to and reflect the active Dynamic System Settings parameters provided in the user context. Format the output with clear, bold markdown titles, sections, and itemized bullet points.`
        }),
      });

      if (!response.ok) throw new Error("AI Core Linkage Error");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      
      setAiResult("");

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunkStr = decoder.decode(value, { stream: true });
          const lines = chunkStr.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
                if (parsed.text) {
                  fullText += parsed.text;
                  setAiResult(fullText);
                }
              } catch {
                // Ignore parse errors from partial stream chunks
              }
            }
          }
        }
      }

      setLogs(prev => [...prev, `Success: AI output synthesized for ${action}.`]);

      // Persist the action and result
      if (user && fullText) {
        await addDoc(collection(db, "users", user.uid, "work"), {
          userId: user.uid,
          toolName: tool.name,
          action: action,
          result: fullText,
          timestamp: serverTimestamp()
        });
      }
    } catch (err: unknown) {
      console.error("AI Action Error:", err);
      setLogs(prev => [...prev, `Error: ${(err as Error).message}`]);
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <button 
            onClick={() => navigate('/members')}
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Return to Member Archive
          </button>

          <ToolSelector currentToolId={toolId} />
        </div>

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

              <p className="text-cyan-100 text-sm leading-relaxed mb-10 font-semibold">
                {tool.description}
              </p>

              <div className="space-y-10">
                <div className="p-6 bg-white/5 border-l-2 border-white/20">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-3">Business Impact</h4>
                  <p className="text-xs text-[#00eaff] font-bold leading-relaxed italic">"{tool.businessImpact}"</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">Detailed Capabilities</h4>
                  <ul className="space-y-3">
                    {tool.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs font-bold text-cyan-200">
                        <div className="w-1 h-1 bg-white opacity-20"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 pt-10 border-t border-white/5">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">Architecture Integrity</h3>
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
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-3">
                  <Terminal className="w-4 h-4" />
                  Execution Logs
                </h3>
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing || isProcessing}
                  className={`p-2 bg-white/5 border border-white/10 text-cyan-400 hover:text-white transition-all ${isRefreshing ? 'animate-spin text-white' : ''}`}
                  title="Manual Refresh"
                >
                  <RefreshCcw className="w-3 h-3" />
                </button>
              </div>
              <div className="font-mono text-[10px] space-y-4 h-64 overflow-y-auto custom-scrollbar pr-2">
                {logs.map((log, i) => (
                  <div key={i} className={log.startsWith('Error') ? 'text-red-500' : log.startsWith('Success') ? 'text-emerald-300' : 'text-cyan-200'}>
                    <span className="text-cyan-600 mr-3 px-1 border border-white/5">0{i+1}</span>
                    {log}
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-white animate-pulse">
                    <span className="text-cyan-600 mr-3 px-1 border border-white/5">--</span>
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
                    <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                      {activeTab === 'actions' ? 'Instruct AI Architecture' : 'Adjust Model Weightings'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center border border-white/10 p-1">
                  <button 
                    onClick={() => setActiveTab('actions')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'actions' ? 'bg-white text-black' : 'text-cyan-400 hover:text-white'}`}
                  >
                    Actions
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-white text-black' : 'text-cyan-400 hover:text-white'}`}
                  >
                    Settings
                  </button>
                </div>
              </div>

              {activeTab === 'actions' ? (
                <div className="flex-grow flex flex-col space-y-px bg-white/5 border border-white/10">
                  {/* AI INPUT AREA */}
                  <div className="p-10 bg-black border-b border-white/10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-6">Synthesis Input</h3>
                    <textarea 
                      placeholder="Enter core data, brand values, or strategic goals for AI processing..."
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-6 text-white text-sm font-medium focus:outline-none focus:border-white/20 transition-colors min-h-[120px] resize-none"
                    />
                    
                    {tool.prompts && tool.prompts.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300 mb-4">Suggested Commands</h4>
                        <div className="flex flex-wrap gap-2">
                          {tool.prompts.map((prompt, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setPromptInput(prompt);
                                runAction(tool.actions[0], prompt);
                              }}
                              className="text-left px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all text-xs text-cyan-300 hover:text-white rounded-sm flex items-center gap-2"
                            >
                              <Play className="w-3 h-3" />
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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
                        <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${activeAction === action ? 'text-white' : 'text-cyan-400'}`}>
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
                      <div className="prose prose-invert max-w-none text-cyan-100 text-sm font-medium leading-relaxed">
                        <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 m-0 border-none">{aiResult}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-grow space-y-6">
                  {/* Parameter Addition Header & Form */}
                  <div className="p-8 border border-dashed border-white/10 hover:border-white/20 rounded-sm bg-zinc-950/40 transition-all mb-10">
                    {!isAddingParam ? (
                      <button 
                        type="button"
                        onClick={() => setIsAddingParam(true)}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#00eaff] flex items-center justify-center gap-3 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Create Dynamic Setting Parameter
                      </button>
                    ) : (
                      <form onSubmit={addCustomSetting} className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#00eaff]">Create Dynamic Node Parameter</h4>
                          <button 
                            type="button" 
                            onClick={() => setIsAddingParam(false)}
                            className="text-xs text-zinc-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Parameter Name</label>
                              <input 
                                type="text"
                                placeholder="e.g. Generation Depth, Target Persona"
                                required
                                value={newParamLabel}
                                onChange={(e) => setNewParamLabel(e.target.value)}
                                className="w-full bg-black border border-white/10 focus:border-[#00eaff]/40 text-xs text-white p-3 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Input Control Representation</label>
                              <select
                                value={newParamType}
                                onChange={(e) => {
                                  const type = e.target.value as 'range' | 'toggle';
                                  setNewParamType(type);
                                  setNewParamDefault(type === 'range' ? 50 : true);
                                }}
                                className="w-full bg-black border border-white/10 focus:border-[#00eaff]/40 text-xs text-white p-3 focus:outline-none appearance-none font-sans"
                              >
                                <option value="range">Range Slider (1 - 100)</option>
                                <option value="toggle">Dynamic Switch (On / Off)</option>
                              </select>
                            </div>
                          </div>

                          {newParamType === "range" ? (
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[8px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Slider Min</label>
                                <input 
                                  type="number"
                                  value={newParamMin}
                                  onChange={(e) => setNewParamMin(parseInt(e.target.value) || 0)}
                                  className="w-full bg-black border border-white/10 text-xs text-white p-2.5 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Slider Max</label>
                                <input 
                                  type="number"
                                  value={newParamMax}
                                  onChange={(e) => setNewParamMax(parseInt(e.target.value) || 100)}
                                  className="w-full bg-black border border-white/10 text-xs text-white p-2.5 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Default Setup</label>
                                <input 
                                  type="number"
                                  value={newParamDefault as number}
                                  onChange={(e) => setNewParamDefault(parseInt(e.target.value) || 50)}
                                  className="w-full bg-black border border-white/10 text-xs text-white p-2.5 focus:outline-none"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Initial Selection State</label>
                              <div className="flex gap-4">
                                <button
                                  type="button"
                                  onClick={() => setNewParamDefault(true)}
                                  className={`px-6 py-2 border text-[10px] font-black uppercase tracking-wider transition-all ${newParamDefault ? 'bg-white text-black border-white' : 'border-white/20 text-white'}`}
                                >
                                  Active by Default
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setNewParamDefault(false)}
                                  className={`px-6 py-2 border text-[10px] font-black uppercase tracking-wider transition-all ${!newParamDefault ? 'bg-white text-black border-white' : 'border-white/20 text-white'}`}
                                >
                                  Halted by Default
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-4.5 bg-[#00eaff] hover:bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest transition-colors"
                        >
                          Mount New Dynamic Parameter
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Settings Render List */}
                  {[...tool.settings, ...customSettings].map((setting) => {
                    const isCustom = setting.id.startsWith("custom-");
                    return (
                      <div key={setting.id} className="p-10 bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors relative group">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                            <label className="text-xs font-black uppercase tracking-widest text-white">{setting.label}</label>
                            {isCustom && (
                              <span className="text-[8px] border border-[#00eaff]/30 bg-[#00eaff]/5 text-[#00eaff] font-bold tracking-widest uppercase px-2 py-0.5 font-sans">
                                dynamic node
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-white bg-white/10 px-3 py-1 uppercase tracking-widest">
                              {setting.type === 'toggle' ? (toolSettings[setting.id] ? 'Active' : 'Halted') : toolSettings[setting.id]}
                            </span>
                            {isCustom && (
                              <button
                                type="button"
                                onClick={() => deleteCustomSetting(setting.id, setting.label)}
                                className="text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-white/5 rounded-sm"
                                title="Delete Dynamic Setting"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {setting.type === 'range' ? (
                          <div className="relative pt-2">
                             <input 
                              type="range"
                              min={setting.min}
                              max={setting.max}
                              value={(toolSettings[setting.id] !== undefined ? toolSettings[setting.id] : setting.value) as number}
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
                    );
                  })}
                  
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
                        const defaultSettings: Record<string, unknown> = {};
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
                  <h4 className="text-[10px] font-black uppercase text-cyan-400 mb-1 tracking-widest">Network Latency</h4>
                  <p className="text-[10px] text-cyan-300 font-bold uppercase tracking-tighter">Peak Performance Mode Active</p>
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
