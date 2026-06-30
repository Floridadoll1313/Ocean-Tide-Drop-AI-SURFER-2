import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Members() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [launchingTool, setLaunchingTool] = useState<string | null>(null);

  useEffect(() => {
    // simulate auth/session load
    setTimeout(() => {
      setLoading(false);
      // setActiveUser({ id: "demo" }); // enable if needed
    }, 800);
  }, []);

  const loginAsGuest = () => {
    setActiveUser({ id: "guest" });
  };

  const loginWithGoogle = () => {
    setActiveUser({ id: "google-user" });
  };

  const handleSaveWork = async (toolId: string) => {
    try {
      console.log("Saving work for:", toolId);
    } catch (err) {
      console.error("Error saving work:", err);
    }

    setTimeout(() => {
      setLaunchingTool(null);
      navigate(`/members/tool/${toolId}`);
    }, 2000);
  };

  // 🌊 LOADING STATE
  if (loading) {
    return (
      <div className="w-full text-left py-10 px-6 animate-pulse">
        <div className="h-16 w-64 bg-cyan-400/20 rounded-md mb-12"></div>

        <div className="flex gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-white/5 rounded-full" />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-white/5 rounded-3xl border border-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  // 🌊 NOT LOGGED IN STATE
  if (!activeUser) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 text-center bg-black">
        <div className="max-w-2xl border border-cyan-500/10 bg-zinc-950/40 rounded-[3rem] backdrop-blur-md p-10 relative overflow-hidden">

          <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          <span className="text-[10px] text-cyan-400 uppercase tracking-[0.4em]">
            AI Surfer Portal
          </span>

          <h1 className="text-4xl font-black uppercase text-white mt-6">
            MEMBERS AREA
          </h1>

          <p className="text-white/80 mt-4 mb-8 text-sm">
            Access is reserved for active members.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={loginAsGuest}
              className="px-4 py-2 rounded-xl bg-black border border-white/10 text-white"
            >
              Guest Mode
            </button>

            <button
              onClick={loginWithGoogle}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🌊 MAIN MEMBERS UI (SAFE WRAPPER)
  return (
    <div className="w-full min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Members Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          onClick={() => handleSaveWork("tool-1")}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          Launch Tool 1
        </button>

        <button
          onClick={() => handleSaveWork("tool-2")}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          Launch Tool 2
        </button>

        <button
          onClick={() => handleSaveWork("tool-3")}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          Launch Tool 3
        </button>
      </div>
    </div>
  );
}
