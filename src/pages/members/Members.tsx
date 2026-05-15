import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loader2, Zap, Rocket, Terminal } from "lucide-react";

export default function Members() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [launchingTool, setLaunchingTool] = useState<string | null>(null);

  const handleLaunch = (toolName: string) => {
    const toolId = toolName.toLowerCase().replace(/ /g, '-');
    setLaunchingTool(toolName);
    setTimeout(() => {
      setLaunchingTool(null);
      navigate(`/members/tool/${toolId}`);
    }, 2000);
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 rounded-full border-4 border-[#00eaff] border-t-transparent animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">Access Denied</h1>
          <p className="text-white/60 mb-8 max-w-md">You must be signed in to enter the Members Beach Access.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper maxWidth="max-w-7xl" showHero={false}>
      <div className="flex flex-col items-center justify-center p-6 py-10 w-full relative">
        {/* Launching Overlay */}
        {launchingTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center p-12 glass-card rounded-[3rem] border border-[#00eaff]/30">
              <Loader2 className="w-16 h-16 text-[#00eaff] animate-spin mb-6" />
              <h2 className="text-2xl font-black italic uppercase text-white mb-2 tracking-tighter">Launching {launchingTool}</h2>
              <p className="text-[#00eaff] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Establishing Neural Link...</p>
            </div>
          </div>
        )}

        <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-4 text-[#00eaff] drop-shadow-[0_0_20px_#00eaff]">Members Beach Access</h1>
        <p className="text-white/60 mb-16 max-w-md text-center text-sm uppercase tracking-widest">Welcome to the shore, {user.displayName || "Surfer"}.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-white/5 flex flex-col h-full hover:border-[#00eaff]/50 transition-all duration-500 group">
            <div className="mb-6 p-4 rounded-3xl bg-[#00eaff]/5 border border-[#00eaff]/10 w-fit group-hover:bg-[#00eaff]/10 transition-colors">
              <Terminal className="w-8 h-8 text-[#00eaff]" />
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Exclusive Tools</h3>
            <p className="text-white/70 text-sm mb-10 flex-grow leading-relaxed">Access to advance automation templates and AI models tailored for cinematic surfers.</p>
            <button 
              onClick={() => {
                const toolsSection = document.getElementById('tools-gallery');
                if (toolsSection) {
                  toolsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-4 rounded-2xl bg-[#00eaff]/10 border border-[#00eaff]/30 text-[#00eaff] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00eaff]/20 transition-all"
            >
              Go to Toolbox
            </button>
          </div>
          
          <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-white/5 flex flex-col h-full hover:border-white/30 transition-all duration-500 group">
            <div className="mb-6 p-4 rounded-3xl bg-white/5 border border-white/10 w-fit group-hover:bg-white/10 transition-colors">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-black italic uppercase text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Community</h3>
            <p className="text-white/70 text-sm mb-10 flex-grow leading-relaxed">Join the private discord and connect with other mythic brand builders.</p>
            <a 
              href="https://discord.com/channels/@me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 text-center rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              Join Discord
            </a>
          </div>
        </div>

        {/* TOOLS GALLERY SECTION */}
        <div id="tools-gallery" className="mt-40 w-full max-w-4xl scroll-mt-32 pb-20">
          <div className="flex flex-col items-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00eaff]/10 border border-[#00eaff]/20 text-[10px] font-black uppercase tracking-[0.3em] text-[#00eaff] mb-6">
              <Zap className="w-3 h-3 fill-[#00eaff]" />
              Authorized Personnel Only
            </div>
            <h2 className="text-5xl md:text-6xl font-black italic uppercase text-white tracking-tighter text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Exclusive <span className="text-[#00eaff]">Toolbox</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Workflow Automator", status: "Session Ready", icon: "✦", description: "Batch template synchronization" },
              { name: "AI Script Generator", status: "Model Loaded", icon: "▣", description: "Cinematic narrative engine" },
              { name: "Cinematic Tuner", status: "Optimization Active", icon: "✺", description: "Color frequency modulator" }
            ].map((tool, idx) => (
              <button 
                key={idx} 
                onClick={() => handleLaunch(tool.name)}
                className="glass-card p-8 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center text-center group hover:bg-white/10 hover:border-[#00eaff]/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl text-[#00eaff] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">{tool.icon}</div>
                <h4 className="text-xl font-black italic uppercase tracking-tight text-white mb-2">{tool.name}</h4>
                <p className="text-white/40 text-[10px] mb-6 uppercase tracking-wider">{tool.description}</p>
                <div className="w-full pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="px-3 py-1.5 rounded-full bg-[#00eaff]/5 border border-[#00eaff]/10 text-[9px] font-black uppercase tracking-widest text-[#00eaff] animate-pulse">
                    {tool.status}
                  </div>
                  <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] group-hover:text-[#00eaff] transition-colors">Click to Launch</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
