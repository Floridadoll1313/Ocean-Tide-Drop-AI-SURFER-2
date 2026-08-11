import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

type TideMode = "auto" | "high" | "low";

type TideInfo = {
  overlay: string;
};

function getTideInfo(mode: TideMode): TideInfo {
  if (mode === "high") {
    return {
      overlay: "bg-cyan-950/10",
    };
  }

  if (mode === "low") {
    return {
      overlay: "bg-slate-950/35",
    };
  }

  return {
    overlay: "bg-slate-950/20",
  };
}

export default function MembersLayout() {
  const [tideMode] = useState<TideMode>("auto");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const tide = getTideInfo(tideMode);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        setAuthenticated(!!session);
        setLoading(false);
      } catch (error) {
        console.error("Members authentication check failed:", error);

        if (!mounted) return;

        setAuthenticated(false);
        setLoading(false);
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setAuthenticated(!!session);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-950
          text-white
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-5
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
              border-cyan-300/20
              border-t-cyan-300
            "
          />

          <h1 className="text-xl font-bold">
            Checking your Surfer access...
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Catching the next wave 🌊
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-fixed
        bg-no-repeat
        text-white
      "
      style={{
        backgroundImage:
          'url("/OTD-AI-Surfer-Members-bg.png")',
      }}
    >
      <div
        className={`
          min-h-screen
          p-4
          md:p-6
          ${tide.overlay}
        `}
      >
        <div className="flex gap-6">
          <aside
            className="
              hidden
              md:flex
              w-80
              flex-col
              rounded-3xl
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              p-6
              shadow-2xl
              h-fit
            "
          >
            <div className="mb-6">
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Ocean Tide Drop
              </div>

              <h2 className="mt-2 text-2xl font-black">
                AI SURFER
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Members Command Deck
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="text-xs uppercase tracking-widest text-white/50">
                Status
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />

                <span className="text-sm font-semibold">
                  Surfer Online
                </span>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0 bg-transparent">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}