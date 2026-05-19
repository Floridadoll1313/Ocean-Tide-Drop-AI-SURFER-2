import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { 
  Search, 
  X, 
  Sparkles, 
  Globe, 
  Settings, 
  Activity, 
  FileText, 
  Cpu, 
  Users, 
  Zap, 
  Bell, 
  Lock, 
  Unlock,
  ChevronRight,
  Command
} from "lucide-react";

// Synchronized tooling database
export interface ToolMetadata {
  id: string;
  name: string;
  minTier: "basic" | "premium" | "enterprise";
  description: string;
  icon: React.ReactNode;
}

export const SIDEBAR_TOOLS: ToolMetadata[] = [
  { 
    id: "brand-voice-architect", 
    name: "Brand Voice Architect", 
    minTier: "basic", 
    icon: <Users className="w-5 h-5 text-cyan-300" />, 
    description: "AI-driven tone synthesis and brand positioning consistency." 
  },
  { 
    id: "ai-ad-copy-engine", 
    name: "AI Ad Copy Engine", 
    minTier: "basic", 
    icon: <Zap className="w-5 h-5 text-cyan-300" />, 
    description: "High-frequency high-conversion copy optimized for all channels." 
  },
  { 
    id: "email-campaign-catalyst", 
    name: "Email Campaign Catalyst", 
    minTier: "basic", 
    icon: <Bell className="w-5 h-5 text-cyan-300" />, 
    description: "Automated, click-optimized automated newsletter sequences." 
  },
  { 
    id: "social-wave-blueprint", 
    name: "Social Wave Blueprint", 
    minTier: "basic", 
    icon: <Sparkles className="w-5 h-5 text-cyan-300" />, 
    description: "Generate viral local hooks and cinematic visual style specs." 
  },
  { 
    id: "seo-strategy-voyager", 
    name: "SEO Strategy Voyager", 
    minTier: "premium", 
    icon: <Globe className="w-5 h-5 text-[#00eaff]" />, 
    description: "Dominate search engine frequencies and cluster keywords." 
  },
  { 
    id: "workflow-automator", 
    name: "Workflow Automator", 
    minTier: "premium", 
    icon: <Settings className="w-5 h-5 text-[#00eaff]" />, 
    description: "Connect standard web forms into automated AI pipelines." 
  },
  { 
    id: "lead-qualifier-shield", 
    name: "Lead Qualifier Shield", 
    minTier: "premium", 
    icon: <Activity className="w-5 h-5 text-[#00eaff]" />, 
    description: "Automatically screen, score, and prioritize prospective clients." 
  },
  { 
    id: "proposal-draft-builder", 
    name: "Proposal Draft Builder", 
    minTier: "premium", 
    icon: <FileText className="w-5 h-5 text-[#00eaff]" />, 
    description: "Craft bulletproof high-conviction proposal drafts instantly." 
  },
  { 
    id: "strategic-governance", 
    name: "Strategic Governance", 
    minTier: "enterprise", 
    icon: <Cpu className="w-5 h-5 text-purple-400" />, 
    description: "AI-led strategy execution and compliance risk analysis." 
  },
  { 
    id: "custom-tool-builder", 
    name: "Custom Tool Builder", 
    minTier: "enterprise", 
    icon: <Settings className="w-5 h-5 text-purple-400" />, 
    description: "Deploy bespoke company-specific neural tools and API endpoints." 
  }
];

interface ToolSelectorProps {
  currentToolId?: string;
  onLaunchTool?: (toolName: string) => void;
  isDemoSession?: boolean;
  demoTier?: "basic" | "premium" | "enterprise";
}

export default function ToolSelector({ 
  currentToolId, 
  onLaunchTool, 
  isDemoSession, 
  demoTier 
}: ToolSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { userData } = useAuth();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeTier = isDemoSession ? (demoTier || "premium") : (userData?.tier || "none");

  const hasAccess = (minTier: string) => {
    if (activeTier === "enterprise") return true;
    if (activeTier === "premium") return minTier !== "enterprise";
    if (activeTier === "basic") return minTier === "basic";
    return false;
  };

  // Setup Keyboard Shortcuts: CMD/Ctrl+K to open, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) setSearchQuery("");
          return !prev;
        });
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Autofocus search input when sidebar opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const filteredTools = SIDEBAR_TOOLS.filter(tool => {
    const q = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.minTier.toLowerCase().includes(q)
    );
  });

  const handleToolClick = (tool: ToolMetadata) => {
    if (!hasAccess(tool.minTier)) {
      // Trigger subscription focus or display alert gracefully inside UI
      alert(`The "${tool.name}" requires a ${tool.minTier.toUpperCase()} level subscription. Currently in simulator/tier "${activeTier}".`);
      return;
    }

    setIsOpen(false);

    if (onLaunchTool) {
      onLaunchTool(tool.name);
    } else {
      navigate(`/members/tool/${tool.id}`);
    }
  };

  return (
    <>
      {/* FLOATABLE / REUSABLE QUICK LAUNCH COMPONENT TRIGGER */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setSearchQuery("");
            setIsOpen(true);
          }}
          className="flex items-center gap-3 px-5 py-3 bg-[#00eaff]/10 hover:bg-[#00eaff]/20 border border-[#00eaff]/30 text-[#00eaff] rounded-sm text-xs font-black uppercase tracking-widest cursor-pointer transition-all duration-300 relative overflow-hidden group shadow-[0_0_15px_rgba(0,234,255,0.05)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
          <Command className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
          <span>Quick Wave Switcher</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 bg-black/60 border border-white/10 text-[9px] font-bold rounded text-white/70 tracking-normal ml-3 font-mono">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* SEARCHABLE SIDEBAR DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-crosshair"
            />

            {/* Slide-over Container */}
            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-zinc-950 border-l border-[#00eaff]/20 text-white z-[110] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Decorative side accent lines */}
              <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-[#00eaff] via-[#00eaff]/20 to-purple-500/10 pointer-events-none" />

              {/* Sidebar Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                    <span className="text-soul-gradient italic font-serif lowercase">switcher</span>
                    <span>Systems</span>
                  </h3>
                  <p className="text-[9px] font-black tracking-widest uppercase text-[#00eaff] mt-1 font-mono">
                    Current Frequency: {activeTier.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white rounded-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Real-time Search Filter Input */}
              <div className="p-6 border-b border-white/5 bg-zinc-900/40 relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-10 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Filter AI tools (e.g. ad copy, seo, code)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-sm py-4.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-[#00eaff]/40 transition-colors placeholder:text-zinc-600 font-medium"
                />
              </div>

              {/* Tools List Component */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => {
                    const accessible = hasAccess(tool.minTier);
                    const isCurrent = currentToolId === tool.id;

                    return (
                      <motion.div
                        key={tool.id}
                        onClick={() => handleToolClick(tool)}
                        whileHover={{ scale: accessible ? 1.01 : 1 }}
                        className={`group relative border p-4.5 rounded-sm transition-all duration-300 flex items-start gap-4 ${
                          isCurrent
                            ? "bg-[#00eaff]/5 border-[#00eaff]/40 shadow-[0_0_15px_rgba(0,234,255,0.05)] cursor-default"
                            : accessible
                            ? "bg-black/60 border-white/5 hover:border-[#00eaff]/20 hover:bg-zinc-900/60 cursor-pointer"
                            : "bg-black/45 border-white/5 opacity-40 cursor-not-allowed"
                        }`}
                      >
                        {/* Selected Tool State Indicators */}
                        {isCurrent && (
                          <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#00eaff]" />
                        )}

                        {/* Icon Wrapper */}
                        <div className={`p-3 border shrink-0 ${
                          isCurrent 
                            ? "bg-black border-[#00eaff]/30" 
                            : accessible 
                            ? "bg-white/5 border-white/10 group-hover:border-white/20" 
                            : "bg-black border-white/5"
                        }`}>
                          {tool.icon}
                        </div>

                        {/* Title & Desc */}
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm font-extrabold uppercase tracking-tight truncate ${
                              isCurrent ? "text-[#00eaff]" : "text-white"
                            }`}>
                              {tool.name}
                            </h4>
                            {!accessible ? (
                              <Lock className="w-3 h-3 text-red-400 flex-shrink-0" />
                            ) : (
                              isCurrent && (
                                <Unlock className="w-3 h-3 text-[#00eaff] flex-shrink-0" />
                              )
                            )}
                          </div>
                          
                          <p className="text-xs text-zinc-400 font-medium leading-relaxed font-sans line-clamp-2">
                            {tool.description}
                          </p>

                          {/* Detail badges */}
                          <div className="flex items-center gap-3 mt-3">
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                              tool.minTier === "enterprise"
                                ? "bg-purple-950/40 border-purple-500/30 text-purple-400"
                                : tool.minTier === "premium"
                                ? "bg-cyan-950/40 border-cyan-500/30 text-cyan-400"
                                : "bg-zinc-900 border-zinc-700 text-zinc-300"
                            }`}>
                              {tool.minTier}
                            </span>

                            {isCurrent && (
                              <span className="text-[8px] font-bold uppercase tracking-widest text-[#00eaff] font-mono">
                                Active Wave
                              </span>
                            )}
                          </div>
                        </div>

                        {accessible && !isCurrent && (
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white shrink-0 self-center transition-all group-hover:translate-x-1" />
                        )}
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-zinc-500 text-sm font-medium"> No matching waves discovered.</p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 px-4 py-2 bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-[#00eaff] hover:bg-[#00eaff] hover:text-black transition-colors"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-white/5 bg-black text-center">
                <p className="text-[8px] font-black tracking-[0.2em] text-zinc-600 uppercase">
                  AI Surfer Core Switcher Node v2.1
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
