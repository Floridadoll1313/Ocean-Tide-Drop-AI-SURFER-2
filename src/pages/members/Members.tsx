import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../lib/firebase";
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import PageWrapper from "../../components/PageWrapper";
import Chat from "../../components/Chat";
import ToolSelector from "../../components/ToolSelector";
import { Loader2, Zap, Rocket, Terminal, BarChart3, Users, Globe, Cpu, Activity, LayoutDashboard, Settings, Bell, Sparkles, DollarSign, Calendar, FileText, Clock } from "lucide-react";

interface ToolWork {
  id: string;
  toolName: string;
  action: string;
  result: string;
  timestamp: Timestamp;
}

export default function Members() {
  const { user, userData, loading, error, loginWithGoogle, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const [isDemoSession, setIsDemoSession] = useState(false);
  const [demoTier, setDemoTier] = useState<'basic' | 'premium' | 'enterprise'>('premium');

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("favoriteTools");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("recentlyUsedTools");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    let updated: string[];
    if (favorites.includes(toolId)) {
      updated = favorites.filter(id => id !== toolId);
    } else {
      updated = [...favorites, toolId];
    }
    setFavorites(updated);
    localStorage.setItem("favoriteTools", JSON.stringify(updated));
  };
  
  const [launchingTool, setLaunchingTool] = useState<string | null>(null);
  const [recentWork, setRecentWork] = useState<ToolWork[]>([]);
  
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const [isInIframe] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    }
    return false;
  });

  const activeUser = user || (isDemoSession ? { uid: "demo-user", displayName: "AI Surfer Demo" } : null);
  const userTier = isDemoSession ? demoTier : (userData?.tier || 'none');

  const handleAIGenerate = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    setAiResponse("");
    try {
      const systemInstruction = "You are an integrated AI assistant inside the AI Surfer platform. Reply assuming the persona of 'AI Surfer Interface': confident, brilliant, high-conviction, and sea-salted with professional strategic flair.";
      const res = await fetch("/api/ai/generate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, systemInstruction })
      });
      if (!res.ok) {
        throw new Error("Generation failed");
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let fullText = "";
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
                if (parsed.error) throw new Error(parsed.error);
                if (parsed.text) {
                  fullText += parsed.text;
                  setAiResponse(fullText);
                }
              } catch {
                // Ignore parsing errors
              }
            }
          }
        }
      }
      
      // Also log this as a transmission!
      if (activeUser) {
        if (user && !isDemoSession) {
          addDoc(collection(db, "users", user.uid, "work"), {
            userId: user.uid,
            toolName: "AI Core Terminal",
            action: "Transmit Prompt",
            result: "Received optimal response sequence.",
            timestamp: serverTimestamp()
          }).catch(err => console.error("Error saving work:", err));
        } else {
          const demoLog: ToolWork = {
            id: `transmission-${Date.now()}`,
            toolName: "AI Core Terminal",
            action: "Transmit Prompt",
            result: "Generated custom AI response.",
            timestamp: { toDate: () => new Date() } as unknown as Timestamp
          };
          setRecentWork(prev => [demoLog, ...prev]);
        }
      }
    } catch (err: unknown) {
      setAiResponse(`[ERROR]: ${(err as Error).message}`);
    } finally {
      setAiLoading(false);
    }
  };

  // Fixed line below: removed 'export' keyword
  const TOOLS = [
    // BASIC TOOLS
    { name: "Brand Voice Architect", minTier: 'basic', icon: <Users className="w-6 h-6 text-cyan-300" />, description: "AI-driven tone synthesis and elite-grade consistent brand positioning copy." },
    { name: "AI Ad Copy Engine", minTier: 'basic', icon: <Zap className="w-6 h-6 text-cyan-300" />, description: "High-frequency high-conversion copy optimized for all digital channels." },
    { name: "Email Campaign Catalyst", minTier: 'basic', icon: <Bell className="w-6 h-6 text-cyan-300" />, description: "Automated, click-optimized automated newsletter sequences and client check-ins." },
    { name: "Social Wave Blueprint", minTier: 'basic', icon: <Sparkles className="w-6 h-6 text-cyan-300" />, description: "Generate viral local hooks, post copies, and visual aesthetic ideas." },
    
    // PREMIUM TOOLS
    { name: "SEO Strategy Voyager", minTier: 'premium', icon: <Globe className="w-6 h-6 text-[#00eaff]" />, description: "Dominate search frequencies globally and out-rank competitors locally." },
    { name: "Workflow Automator", minTier: 'premium', icon: <Terminal className="w-6 h-6 text-[#00eaff]" />, description: "Connect your web forms directly to custom AI backend processing streams." },
    { name: "Lead Qualifier Shield", minTier: 'premium', icon: <Activity className="w-6 h-6 text-[#00eaff]" />, description: "Automatically screen, score, and prioritize prospective inbound clients." },
    { name: "Proposal Draft Builder", minTier: 'premium', icon: <FileText className="w-6 h-6 text-[#00eaff]" />, description: "Craft bulletproof high-conviction custom commercial proposals instantly." },
    
    // ENTERPRISE TOOLS
    { name: "Strategic Governance", minTier: 'enterprise', icon: <Cpu className="w-6 h-6 text-purple-400" />, description: "AI-led executive dashboards, business decisions, and predictive models." },
    { name: "Custom Tool Builder", minTier: 'enterprise', icon: <Settings className="w-6 h-6 text-purple-400" />, description: "Deploy bespoke custom AI engines engineered specifically to your company API." }
  ];

  const favoriteToolsList = TOOLS.filter(t => {
    const tId = t.name.toLowerCase().replace(/ /g, '-');
    return favorites.includes(tId);
  });

  const recentToolsList = recentlyUsed
    .map(rId => TOOLS.find(t => t.name.toLowerCase().replace(/ /g, '-') === rId))
    .filter((t): t is typeof TOOLS[0] => !!t);

  const hasAccess = (minTier: string) => {
    if (userTier === 'enterprise') return true;
    if (userTier === 'premium') return minTier !== 'enterprise';
    if (userTier === 'basic') return minTier === 'basic';
    return false;
  };

  useEffect(() => {
    if (!user || isDemoSession) return;
    
    const q = query(
      collection(db, "users", user.uid, "work"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const work = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ToolWork[];
      setRecentWork(work);
    });

    return () => unsubscribe();
  }, [user, isDemoSession]);

  const handleLaunch = async (toolName: string) => {
    if (!activeUser) return;
    const toolId = toolName.toLowerCase().replace(/ /g, '-');
    setLaunchingTool(toolName);

    // Save under recentlyUsed list
    try {
      const storedRecents = localStorage.getItem("recentlyUsedTools");
      let recents: string[] = storedRecents ? JSON.parse(storedRecents) : [];
      recents = [toolId, ...recents.filter(id => id !== toolId)].slice(0, 4);
      localStorage.setItem("recentlyUsedTools", JSON.stringify(recents));
      setRecentlyUsed(recents);
    } catch (e) {
      console.warn("localStorage error:", e);
    }
    
    // Persist the launch as "Work"
    try {
      if (user && !isDemoSession) {
        await addDoc(collection(db, "users", user.uid, "work"), {
          userId: user.uid,
          toolName: toolName,
          action: "Launch Module",
          result: `Synchronized ${toolName} with AI Core`,
          timestamp: serverTimestamp()
        });
      } else {
        const demoLog: ToolWork = {
          id: `launch-${Date.now()}-${toolId}`,
          toolName,
          action: "Launch Module",
          result: `Synchronized ${toolName} with AI Core (Demo)`,
          timestamp: { toDate: () => new Date() } as unknown as Timestamp
        };
        setRecentWork(prev => [demoLog, ...prev]);
      }
    } catch (err) {
      console.error("Error saving work:", err);
    }

    setTimeout(() => {
      setLaunchingTool(null);
      navigate(`/members/tool/${toolId}`);
    }, 2000);
  };

  if (loading) {
    return (
      <PageWrapper maxWidth="max-w-7xl" showHero={false}>
        <div className="w-full text-left py-10 px-6 animate-pulse">
          <div className="h-16 w-64 bg-cyan-400/20 rounded-md mb-12"></div>
          <div className="flex gap-4 mb-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-24 bg-white/5 rounded-full"></div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-white/5 rounded-3xl border border-white/5"></div>
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!activeUser) {
    return (
      <PageWrapper>
        {/* Sleek Top Join Bar */}
        <div className="w-full flex justify-end items-center px-6 pt-4 relative z-30 max-w-2xl mx-auto -mb-4 gap-3">
          <button
            onClick={() => loginAsGuest()}
            className="px-4 py-3 rounded-xl bg-black border border-white/10 text-[#8b80a3] font-black uppercase text-[10px] tracking-[0.2em] hover:text-white transition-all cursor-pointer"
          >
            <span>👤 Guest Mode</span>
          </button>
          <button
            onClick={() => loginWithGoogle(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase text-[10px] tracking-[0.2em] hover:brightness-110 md:hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
          >
            <span>✨ Join Now</span>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-12 text-center max-w-2xl mx-auto border border-cyan-500/10 bg-zinc-950/40 rounded-[3rem] backdrop-blur-md relative mt-12 py-20 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

          <span className="text-[10px] bg-cyan-400/15 border border-cyan-400/30 text-cyan-400 font-bold uppercase tracking-[0.4em] px-4 py-2 rounded-full mb-8 z-10">
