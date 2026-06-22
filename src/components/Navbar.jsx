import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, userData } = useAuth();

  const tier = userData?.tier || "free";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

        {/* 🌊 LOGO */}
        <Link
          to="/"
          className="font-black text-xl text-cyan-400 hover:text-cyan-300 transition"
        >
          Ocean Tide Drop AI SURFER
        </Link>

        {/* 🌊 NAV LINKS */}
        <div className="hidden md:flex items-center gap-5">

          <Link
            to="/"
            className="text-white/80 hover:text-cyan-300 transition"
          >
            Home
          </Link>

          <Link
            to="/pricing"
            className="text-white/80 hover:text-cyan-300 transition"
          >
            Pricing
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className="text-white/80 hover:text-cyan-300 transition"
            >
              Dashboard
            </Link>
          )}

          {(tier === "bronze" ||
            tier === "wave" ||
            tier === "tsunami" ||
            tier === "premium" ||
            tier === "enterprise") && (
            <Link
              to="/tools"
              className="text-white/80 hover:text-cyan-300 transition"
            >
              AI Tools
            </Link>
          )}

          {(tier === "wave" ||
            tier === "tsunami" ||
            tier === "premium" ||
            tier === "enterprise") && (
            <Link
              to="/members"
              className="text-white/80 hover:text-cyan-300 transition"
            >
              Members
            </Link>
          )}

          {(tier === "tsunami" ||
            tier === "enterprise") && (
            <Link
              to="/command-center"
              className="text-white/80 hover:text-cyan-300 transition"
            >
              Command Center
            </Link>
          )}
        </div>

        {/* 🌊 RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-3">

          {user && (
            <div
              className="
                px-3 py-1
                rounded-full
                text-xs
                font-bold
                uppercase
                bg-cyan-500/20
                border border-cyan-400/30
                text-cyan-300
              "
            >
              {tier}
            </div>
          )}

          {user ? (
            <>
              <Link
                to="/billing"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Billing
              </Link>

              <button
                onClick={logout}
                className="
                  px-4 py-2
                  rounded-xl
                  bg-white/10
                  hover:bg-white/20
                  transition
                "
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="
                px-5 py-2
                rounded-xl
                bg-cyan-400
                text-black
                font-bold
                hover:bg-cyan-300
                transition
              "
            >
              Join the Wave 🌊
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}