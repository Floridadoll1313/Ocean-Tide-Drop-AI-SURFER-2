import { Navigate } from "react-router-dom";

/**
 * 🌊 Tier hierarchy (SaaS access ladder)
 */
const TIERS = {
  free: 0,
  bronze: 1,
  wave: 2,
  tsunami: 3,
};

export default function ProtectedRoute({
  children,
  userTier = "free",
  requiredTier = "bronze",
}) {
  const userLevel = TIERS[userTier] ?? 0;
  const requiredLevel = TIERS[requiredTier] ?? 1;

  /**
   * 🔒 Not enough access → block route
   */
  if (userLevel < requiredLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="max-w-md text-center space-y-4 border border-white/10 p-6 rounded-xl">
          
          <h1 className="text-2xl font-bold">
            🌊 Access Locked
          </h1>

          <p className="text-gray-400">
            This area is locked behind your current tide level.
          </p>

          <div className="text-sm text-gray-500">
            Current tier: <b>{userTier}</b> <br />
            Required tier: <b>{requiredTier}</b>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-blue-500 rounded"
          >
            Return to Home
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Upgrade your plan to unlock deeper ocean systems 🌊
          </p>
        </div>
      </div>
    );
  }

  /**
   * 🔓 Access granted
   */
  return children;
}