import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function AuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // 🌊 LOADING STATE (premium feel)
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        
        {/* glow */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-500 blur-3xl opacity-20 rounded-full" />

        <div className="text-center relative z-10">
          <div className="text-2xl font-bold mb-3">
            🌊 Syncing Ocean Tide Network
          </div>

          <div className="text-white/60 text-sm">
            Verifying access to AI systems...
          </div>

          <div className="mt-6 animate-pulse text-cyan-400">
            ● Connecting AI agents
          </div>
        </div>
      </div>
    );
  }

  // 🔒 NOT LOGGED IN (upgrade to SaaS gate)
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">

        {/* glow background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[600px] h-[600px] bg-cyan-500 blur-3xl top-[-200px] left-[-200px]" />
          <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-3xl bottom-[-200px] right-[-200px]" />
        </div>

        <div className="relative z-10 text-center max-w-md px-6">

          <div className="text-3xl font-bold mb-3">
            🔒 Members Only System
          </div>

          <p className="text-white/60 text-sm mb-6">
            You’re trying to access the Ocean Tide AI revenue engine.
            This system is reserved for active members only.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">

            <div className="text-sm text-white/60 mb-2">
              Access includes:
            </div>

            <ul className="text-left text-sm text-white/50 space-y-1">
              <li>🌊 AI lead generation system</li>
              <li>⚡ Automated sales engine</li>
              <li>📈 Revenue dashboard</li>
              <li>🤖 AI agent orchestration</li>
            </ul>

            <div className="mt-6">
              <a
                href="/login"
                className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl"
              >
                Unlock Access
              </a>
            </div>

            <div className="text-xs text-white/30 mt-3">
              Takes less than 30 seconds
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🌊 AUTHORIZED ACCESS
  return children;
}
