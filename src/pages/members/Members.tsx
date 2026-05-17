import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../lib/firebase";
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import PageWrapper from "../../components/PageWrapper";
import Chat from "../../components/Chat";
import { Loader2, Zap, Rocket, Terminal, BarChart3, Users, Globe, Cpu, Activity, LayoutDashboard, Settings, Bell, Sparkles, DollarSign } from "lucide-react";

interface ToolWork {
  id: string;
  toolName: string;
  action: string;
  result: string;
  timestamp: Timestamp;
}

export default function Members() {
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();
  const [launchingTool, setLaunchingTool] = useState<string | null>(null);
  const [recentWork, setRecentWork] = useState<ToolWork[]>([]);

  const userTier = userData?.tier || 'none';

  const TOOLS = [
    { name: "Brand Voice Architect", minTier: 'basic', icon: <Users className="w-6 h-6" />, description: "AI-driven tone synthesis and brand consistency." },
    { name: "AI Ad Copy Engine", minTier: 'basic', icon: <Zap className="w-6 h-6" />, description: "High-frequency conversion copy for all platforms." },
    { name: "SEO Strategy Voyager", minTier: 'premium', icon: <Globe className="w-6 h-6" />, description: "Dominate search frequencies globally." },
    { name: "Workflow Automator", minTier: 'premium', icon: <Terminal className="w-6 h-6" />, description: "Connect and scale internal processes." },
    { name: "Strategic Governance", minTier: 'enterprise', icon: <Cpu className="w-6 h-6" />, description: "AI-led business decisions and governance." },
    { name: "Custom Tool Builder", minTier: 'enterprise', icon: <Settings className="w-6 h-6" />, description: "Bespoke AI solutions built for your ecosystem." }
  ];

  const hasAccess = (minTier: string) => {
    if (userTier === 'enterprise') return true;
    if (userTier === 'premium') return minTier !== 'enterprise';
    if (userTier === 'basic') return minTier === 'basic';
    return false;
  };

  useEffect(() => {
    if (!user) return;
    
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
  }, [user]);

  const handleLaunch = async (toolName: string) => {
    if (!user) return;
    const toolId = toolName.toLowerCase().replace(/ /g, '-');
    setLaunchingTool(toolName);
    
    // Persist the launch as "Work"
    try {
      await addDoc(collection(db, "users", user.uid, "work"), {
        userId: user.uid,
        toolName: toolName,
        action: "Launch Module",
        result: `Synchronized ${toolName} with AI Core`,
        timestamp: serverTimestamp()
      });
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

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-4">Access Denied</h1>
          <p className="text-zinc-600 mb-8 max-w-md uppercase text-[10px] font-black tracking-widest">Authenticated credentials required for archive entry.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="flex flex-col w-full relative">
        {/* SOULFUL DECORATION */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Launching Overlay */}
        {launchingTool && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center p-16 bg-black border border-white/10 rounded-sm">
              <Loader2 className="w-12 h-12 text-white animate-spin mb-8" />
              <h2 className="text-3xl font-black uppercase text-white mb-2 tracking-tighter">Synchronizing {launchingTool}</h2>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Initializing AI Architecture...</p>
            </div>
          </div>
        )}

        {/* DASHBOARD HEADER */}
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Authorized Session</span>
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00eaff]"></div>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
              Command <span className="text-soul-gradient">Center.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-sm backdrop-blur-md">
             <div className="px-6 py-3 border-r border-white/10 text-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Account Level</span>
                <span className={`text-xs font-black uppercase tracking-widest ${userTier === 'none' ? 'text-zinc-500' : 'text-soul-gradient'}`}>
                   {userTier === 'none' ? 'Visitor' : userData?.tier === 'basic' ? 'Basic Member' : userData?.tier === 'premium' ? 'Premium 2' : 'Enterprise 2'}
                </span>
             </div>
             <div className="px-6 py-3 text-center">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block mb-1">Status</span>
                <span className="text-xs font-black uppercase text-white tracking-widest">AI Core Synchronized</span>
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
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-loose">Access the high-frequency roadmap to architecting your business revenue streams.</p>
           </div>
           
           <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:border-purple-500/50 transition-all cursor-pointer group relative accent-glow-purple">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                 <Sparkles className="w-12 h-12 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 block mb-4">AI Core Status</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Growth <span className="text-soul-gradient italic font-serif lowercase">Resonance.</span></h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-loose">Real-time analysis of your digital presence and scale potential.</p>
           </div>

           <div 
             onClick={() => navigate('/pricing')}
             className="bg-white/5 border border-orange-500/20 p-10 rounded-sm hover:border-orange-500/50 transition-all cursor-pointer group relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all">
                 <Zap className="w-12 h-12 text-orange-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 block mb-4">Stripe Access</span>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">Premium <br /><span className="text-orange-500 italic font-serif lowercase">Gateway.</span></h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-loose">Manage your subscription and unlock high-ticket AI modules.</p>
           </div>
        </div>

        {/* DASHBOARD TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-20 overflow-hidden">
           {[
             { label: "Network Health", val: "99.9%", icon: <Activity className="w-4 h-4" /> },
             { label: "AI Throughput", val: "24.5 GB/s", icon: <Cpu className="w-4 h-4" /> },
             { label: "Global Reach", val: "128 Nodes", icon: <Globe className="w-4 h-4" /> },
             { label: "Market Resonance", val: "High", icon: <BarChart3 className="w-4 h-4" /> }
           ].map((stat, i) => (
             <div key={i} className="bg-black p-8 group hover:bg-zinc-900 transition-all">
                <div className="flex items-center justify-between mb-4">
                   <div className="text-zinc-600 group-hover:text-white transition-colors">{stat.icon}</div>
                   <span className="text-[10px] font-bold text-zinc-700">LVL {i+1}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-1">{stat.label}</span>
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
                  tierName: 'Basic Membership', 
                  tools: TOOLS.filter(t => t.minTier === 'basic') 
                },
                { 
                  tierId: 'premium', 
                  tierName: 'Premium 2', 
                  tools: TOOLS.filter(t => t.minTier === 'premium') 
                },
                { 
                  tierId: 'enterprise', 
                  tierName: 'Enterprise 2', 
                  tools: TOOLS.filter(t => t.minTier === 'enterprise') 
                }
              ].map((group) => (
                <div key={group.tierId}>
                  <div className="flex items-center gap-6 mb-8">
                     <h2 className="text-xl font-black uppercase tracking-widest text-white/40">{group.tierName}</h2>
                     <div className="h-px flex-1 bg-white/5"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                    {group.tools.map((tool, idx) => {
                      const accessible = hasAccess(tool.minTier);
                      return (
                        <button 
                          key={idx} 
                          onClick={() => accessible ? handleLaunch(tool.name) : navigate('/pricing')}
                          className={`bg-black p-10 flex flex-col items-start text-left group transition-all duration-500 overflow-hidden relative ${!accessible ? 'opacity-40 grayscale cursor-default hover:bg-zinc-950' : 'hover:bg-zinc-900 cursor-pointer'}`}
                        >
                          {!accessible && (
                            <div className="absolute top-4 right-4 bg-white/5 px-2 py-1 rounded-sm flex items-center gap-2">
                               <LayoutDashboard className="w-3 h-3 text-zinc-600" />
                               <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Locked</span>
                            </div>
                          )}
                          <div className={`${!accessible ? 'text-zinc-900 group-hover:text-zinc-700' : 'text-zinc-800 group-hover:text-white'} mb-8 transition-colors duration-500`}>{tool.icon}</div>
                          <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">{tool.name}</h4>
                          <p className="text-zinc-600 text-[11px] mb-8 font-bold uppercase tracking-wider leading-relaxed">{tool.description}</p>
                          
                          <div className="mt-auto flex items-center gap-4">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${!accessible ? 'text-soul-gradient' : 'text-zinc-700 group-hover:text-white'} transition-colors`}>
                              {accessible ? 'Launch Module →' : 'Upgrade to Unlock →'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5">
               <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8">Recent Transmissions</h2>
               <div className="space-y-1">
                  {recentWork.length === 0 ? (
                    <div className="p-10 text-center border border-dashed border-white/10 rounded-sm group hover:border-white/20 transition-all cursor-pointer" onClick={() => handleLaunch("System Health Scan")}>
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">No transmissions detected. Click to Initialize AI Core →</span>
                    </div>
                  ) : (
                    recentWork.map((log, i) => (
                      <div key={log.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group rounded-sm">
                         <div className="flex items-center gap-6">
                            <div className="w-2 h-2 rounded-full bg-white opacity-20 group-hover:opacity-100 transition-all shadow-[0_0_10px_white]"></div>
                            <div>
                               <span className="text-[10px] font-black uppercase text-white block mb-0.5">{log.toolName}</span>
                               <span className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest group-hover:text-zinc-300 transition-colors">{log.result}</span>
                            </div>
                         </div>
                         <span className="text-[9px] font-black text-zinc-700">{log.timestamp ? new Date(log.timestamp.toDate()).toLocaleTimeString() : 'syncing...'}</span>
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
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-600 mb-6">Network Access</h3>
                <div className="space-y-4">
                   <a 
                     href="https://discord.com" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center justify-between p-6 bg-black border border-white/10 hover:bg-zinc-900 transition-all group"
                   >
                     <div className="flex items-center gap-4">
                        <Rocket className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                        <span className="text-xs font-black uppercase text-white">Private Discord</span>
                     </div>
                     <span className="text-[10px] font-black text-zinc-700">Join →</span>
                   </a>
                   <div className="p-6 bg-black border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <Settings className="w-5 h-5 text-zinc-500" />
                         <span className="text-xs font-black uppercase text-white">API Keys</span>
                      </div>
                      <span className="px-2 py-1 bg-white/10 text-[8px] font-black uppercase text-zinc-500">Internal Only</span>
                   </div>
                </div>
             </div>

             <div className="pt-8 border-t border-white/5 text-center">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700">Ocean Tide Drop AI Surfer Marketing Agency © 2024</span>
             </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
