/* eslint-disable react-hooks/purity */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../lib/firebase";
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import PageWrapper from "../../components/PageWrapper";
import Chat from "../../components/Chat";
import ToolSelector from "../../components/ToolSelector";
import { Loader2, Zap, Rocket, Terminal, BarChart3, Users, Globe, Cpu, Activity, LayoutDashboard, Settings, Bell, Sparkles, DollarSign, Calendar, FileText } from "lucide-react";

interface ToolWork {
  id: string;
  toolName: string;
  action: string;
  result: string;
  timestamp: Timestamp;
}

export default function Members() {
  const { user, userData, loading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isDemoSession, setIsDemoSession] = useState(false);
  const [demoTier, setDemoTier] = useState<'basic' | 'premium' | 'enterprise'>('premium');
  
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
      <PageWrapper>
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (!activeUser) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center p-12 text-center max-w-2xl mx-auto border border-cyan-500/10 bg-zinc-950/40 rounded-[3rem] backdrop-blur-md relative mt-12 py-20 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

          <span className="text-[10px] bg-cyan-400/15 border border-cyan-400/30 text-cyan-400 font-bold uppercase tracking-[0.4em] px-4 py-2 rounded-full mb-8 z-10">
            AI Surfer Portal_
          </span>

          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-4 z-10 font-orbitron">
            MEMBERS AREA
          </h1>
          <p className="text-white/90 mb-8 max-w-md text-sm leading-relaxed z-10 font-medium">
            Access to our proprietary AI suite, workflow automatons, and storm-resilient strategic engines is reserved for active members.
          </p>

          {isInIframe && (
            <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 p-6 rounded-xl mb-10 max-w-lg mx-auto text-[11px] font-medium tracking-wide z-10 text-left">
              <div className="font-bold uppercase tracking-widest text-orange-400 mb-2 flex items-center gap-2">
                <span>⚠️ PREVIEW MODE CONSTRAINT</span>
              </div>
              The Google Sign-In popup may be blocked inside this iframe preview. 
              <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-300">
                <li>Click <strong>AI Surfer Demo Sandbox</strong> below to enter instantly.</li>
                <li>Or open this app in a <strong>new tab</strong> (using the arrow icon at the top-right of your screen) to use Sign In.</li>
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-6 z-10">
            <button 
              onClick={loginWithGoogle}
              className="px-8 py-4 bg-white text-black hover:bg-cyan-400 hover:text-black font-black uppercase text-xs tracking-[0.2em] transition-all transform hover:scale-105 shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:shadow-cyan-400/20"
            >
              🔒 Sign In With Google
            </button>
            <button 
              onClick={() => setIsDemoSession(true)}
              className="px-8 py-4 bg-cyan-500/10 text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black font-black uppercase text-xs tracking-[0.2em] transition-all transform hover:scale-105"
            >
              🌊 AI Surfer Demo Sandbox
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="flex flex-col w-full relative">
        {/* SOULFUL DECORATION */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Launching Overlay */}
        {launchingTool && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center p-16 bg-black border border-cyan-400/30 rounded-sm">
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-8" />
              <h2 className="text-3xl font-black uppercase text-white mb-2 tracking-tighter">Synchronizing {launchingTool}</h2>
              <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Initializing AI Architecture...</p>
            </div>
          </div>
        )}

        {/* DEMO CONTROLLER HUD */}
        {isDemoSession && (
          <div className="bg-cyan-950/40 border border-cyan-400/30 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-6xl mx-auto mb-12 backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
             <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
                <div>
                  <span className="text-xs font-black uppercase text-cyan-400 tracking-widest block">Sandbox Simulator Active</span>
                  <p className="text-[10px] font-bold text-white/90 uppercase tracking-wider mt-0.5">Simulating an active premium subscription to AI Surfer Tools</p>
                </div>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-white uppercase tracking-widest mr-2">Level:</span>
                {(['basic', 'premium', 'enterprise'] as const).map((tier) => (
                   <button
                     key={tier}
                     onClick={() => setDemoTier(tier)}
                     className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg border ${userTier === tier ? 'bg-[#00eaff] text-black border-[#00eaff] shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'bg-white/5 text-cyan-200 border-white/10 hover:text-white hover:border-cyan-400/50'}`}
                   >
                     {tier === 'basic' ? 'Basic' : tier === 'premium' ? 'Premium 2' : 'Enterprise 2'}
                   </button>
                ))}
             </div>
          </div>
        )}

        {/* DASHBOARD HEADER */}
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4 font-black text-cyan-400 tracking-[0.4em] uppercase text-xs">
              <span>AI Surfer Core Interface</span>
              <div className="h-2 w-2 rounded-full bg-[#00eaff] animate-pulse shadow-[0_0_10px_#00eaff]"></div>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
              Command <span className="text-soul-gradient">Center.</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-sm backdrop-blur-md">
             <div className="px-6 py-3 md:border-r border-white/10 text-center w-full sm:w-auto">
                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block mb-1">Account Level</span>
                <span className="text-xs font-black uppercase tracking-widest text-white">
                   {userTier === 'none' ? 'Visitor' : userTier === 'basic' ? 'Basic Member' : userTier === 'premium' ? 'Premium 2' : 'Enterprise 2'}
                </span>
             </div>
             <div className="px-6 py-3 md:border-r border-white/10 text-center w-full sm:w-auto">
                <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block mb-1">Status</span>
                <span className="text-xs font-black uppercase text-[#00eaff] tracking-widest">AI Core Synchronized</span>
             </div>
             <div className="px-6 py-2 flex items-center justify-center w-full sm:w-auto">
                <ToolSelector onLaunchTool={handleLaunch} isDemoSession={isDemoSession} demoTier={demoTier} />
             </div>
          </div>
        </div>

        {/* MONETIZATION & GROWTH SHOCK */}
        <div className="mb-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
           <div 
             onClick={() => navigate('/members/monetization')}
             className="bg-glass-colorful border border-white/10 p-10 rounded-sm hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden accent-glow-cyan"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                 <DollarSign className="w-12 h-12 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 block mb-4">Phase Deployment</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Monetization <span className="text-soul-gradient italic font-serif lowercase">Blueprint.</span></h3>
              <p className="text-white text-[11px] font-bold uppercase tracking-widest leading-loose">Access the high-frequency roadmap to architecting your business revenue streams.</p>
           </div>
           
           <div 
             onClick={() => navigate('/members/sync')}
             className="bg-white/5 border border-white/10 p-10 rounded-sm hover:border-[#00eaff]/50 transition-all cursor-pointer group relative accent-glow-cyan"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                 <Calendar className="w-12 h-12 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00eaff] block mb-4">Neural Workspace</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Neural <span className="text-soul-gradient italic font-serif lowercase">Sync.</span></h3>
              <p className="text-white text-[11px] font-bold uppercase tracking-widest leading-loose">Synchronize your Google Calendar and Tasks for unified strategic management.</p>
           </div>

           <div 
             onClick={() => navigate('/pricing')}
             className="bg-white/5 border border-orange-500/20 p-10 rounded-sm hover:border-orange-500/50 transition-all cursor-pointer group relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                 <Zap className="w-12 h-12 text-orange-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 block mb-4">Stripe Access</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Premium <br /><span className="text-orange-400 italic font-serif lowercase">Gateway.</span></h3>
              <p className="text-white text-[11px] font-bold uppercase tracking-widest leading-loose">Manage your subscription and unlock high-ticket AI modules.</p>
           </div>
        </div>

        {/* DASHBOARD TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-cyan-500/20 border border-cyan-500/20 mb-20 overflow-hidden rounded-xl">
           {[
             { label: "Surfer Network Health", val: "99.9% Online", icon: <Activity className="w-4 h-4 text-[#00eaff]" /> },
             { label: "AI Transmission Speeds", val: "24.5 GB/s", icon: <Cpu className="w-4 h-4 text-purple-400" /> },
             { label: "Global Node Reach", val: "128 Nodes", icon: <Globe className="w-4 h-4 text-emerald-400" /> },
             { label: "Local Strategic Lift", val: "Maximized", icon: <BarChart3 className="w-4 h-4 text-orange-400" /> }
           ].map((stat, i) => (
             <div key={i} className="bg-black p-8 group hover:bg-zinc-900 transition-all">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-cyan-400 transition-colors">{stat.icon}</div>
                   <span className="text-[10px] font-bold text-cyan-400">NODE_ {i+1}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-200 block mb-1">{stat.label}</span>
                <span className="text-2xl font-black text-white">{stat.val}</span>
             </div>
           ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT: PRIMARY TOOLS */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-20">
              {[
                { 
                  tierId: 'basic', 
                  tierName: 'Basic Membership Tools', 
                  tools: TOOLS.filter(t => t.minTier === 'basic') 
                },
                { 
                  tierId: 'premium', 
                  tierName: 'Premium 2 Level Tools', 
                  tools: TOOLS.filter(t => t.minTier === 'premium') 
                },
                { 
                  tierId: 'enterprise', 
                  tierName: 'Enterprise 2 Level Tools', 
                  tools: TOOLS.filter(t => t.minTier === 'enterprise') 
                }
              ].map((group) => (
                <div key={group.tierId}>
                  <div className="flex items-center gap-6 mb-8">
                     <h2 className="text-xl font-black uppercase tracking-widest text-[#00eaff]/90">{group.tierName}</h2>
                     <div className="h-px flex-1 bg-cyan-400/20"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cyan-500/10 border border-cyan-500/10">
                    {group.tools.map((tool, idx) => {
                      const accessible = hasAccess(tool.minTier);
                      return (
                        <button 
                          key={idx} 
                          onClick={() => accessible ? handleLaunch(tool.name) : navigate('/pricing')}
                          className={`bg-black p-10 flex flex-col items-start text-left group transition-all duration-500 overflow-hidden relative ${!accessible ? 'opacity-40 grayscale cursor-default hover:bg-zinc-950' : 'hover:bg-zinc-900 cursor-pointer'}`}
                        >
                          {!accessible && (
                            <div className="absolute top-4 right-4 bg-cyan-500/10 px-3 py-1.5 rounded-sm border border-cyan-400/30 flex items-center gap-2">
                               <LayoutDashboard className="w-3 h-3 text-[#00eaff]" />
                               <span className="text-[8px] font-black uppercase text-[#00eaff] tracking-widest">Locked</span>
                            </div>
                          )}
                          <div className="mb-8 transition-colors duration-500">
                            {tool.icon}
                          </div>
                          <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">{tool.name}</h4>
                          <p className="text-white/90 text-sm mb-8 font-medium leading-relaxed font-sans">{tool.description}</p>
                          
                          <div className="mt-auto flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors">
                              {accessible ? 'Launch Module →' : 'Upgrade your wave to Unlock →'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-cyan-500/20">
               <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8">AI Core Terminal</h2>
               <div className="bg-black border border-cyan-500/20 p-6 rounded-sm mb-12">
                 <textarea 
                   className="w-full bg-white/5 border border-cyan-500/30 p-4 text-sm text-white focus:outline-none focus:border-[#00eaff] transition-colors resize-none rounded-sm mb-4"
                   rows={4}
                   placeholder="Enter your prompt here..."
                   value={aiPrompt}
                   onChange={(e) => setAiPrompt(e.target.value)}
                 />
                 <button 
                   onClick={handleAIGenerate}
                   disabled={aiLoading || !aiPrompt}
                   className="w-full bg-[#00eaff]/10 text-[#00eaff] border border-[#00eaff]/50 px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#00eaff]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                 >
                   {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                   {aiLoading ? "Processing..." : "Transmit to AI"}
                 </button>
                 
                 {aiResponse && (
                   <div className="mt-6 p-4 bg-white/5 border border-cyan-500/20 rounded-sm text-sm text-cyan-100 whitespace-pre-wrap font-mono leading-relaxed">
                     {aiResponse}
                   </div>
                 )}
               </div>
            </div>

            <div className="pt-8 border-t border-cyan-500/20">
               <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8">Recent Transmissions</h2>
               <div className="space-y-1">
                  {recentWork.length === 0 ? (
                    <div className="p-10 text-center border border-dashed border-cyan-500/20 rounded-sm group hover:border-cyan-400/40 transition-all cursor-pointer" onClick={() => handleLaunch("System Health Scan")}>
                       <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:text-white transition-colors">No transmissions detected. Click to Initialize AI Core →</span>
                    </div>
                  ) : (
                    recentWork.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-6 bg-white/5 border border-cyan-500/10 hover:bg-white/10 transition-all cursor-pointer group rounded-sm">
                         <div className="flex items-center gap-6">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-white transition-all shadow-[0_0_10px_cyan]"></div>
                            <div>
                               <span className="text-[10px] font-black uppercase text-white block mb-0.5">{log.toolName}</span>
                               <span className="text-xs uppercase text-cyan-100 font-bold tracking-widest group-hover:text-white transition-colors">{log.result}</span>
                            </div>
                         </div>
                         <span className="text-[9px] font-black text-cyan-400">{log.timestamp ? new Date(log.timestamp.toDate()).toLocaleTimeString() : 'syncing...'}</span>
                      </div>
                    ))
                  )}
               </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="space-y-12">
             <Chat />

             <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#00eaff] mb-6">Network Access</h3>
                <div className="space-y-4">
                   <a 
                     href="https://discord.com" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center justify-between p-6 bg-black border border-cyan-500/20 hover:bg-zinc-900 transition-all group rounded-xl"
                   >
                     <div className="flex items-center gap-4">
                        <Rocket className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
                        <span className="text-xs font-black uppercase text-white">Private Discord</span>
                     </div>
                     <span className="text-[10px] font-black text-[#00eaff]">Join →</span>
                   </a>
                   <div className="p-6 bg-black border border-cyan-500/20 flex items-center justify-between rounded-xl">
                      <div className="flex items-center gap-4">
                         <Settings className="w-5 h-5 text-cyan-400" />
                         <span className="text-xs font-black uppercase text-white">API Keys</span>
                      </div>
                      <span className="px-2 py-1 bg-cyan-500/10 text-[8px] font-black uppercase text-[#00eaff] rounded border border-cyan-400/30">Internal Only</span>
                   </div>
                </div>
             </div>

             <div className="pt-8 border-t border-cyan-500/10 text-center">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-400">AI Surfer Marketing Agency © 2026</span>
             </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
