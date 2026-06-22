import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Billing() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const openPortal = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: user?.stripeCustomerId, // IMPORTANT: must exist in DB
        }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Billing portal not configured");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to open billing portal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="max-w-md w-full bg-white/5 border border-cyan-500/20 rounded-2xl p-8 text-center space-y-6">

        <h1 className="text-3xl font-black text-cyan-400">
          Billing Control Center
        </h1>

        <p className="text-white/60 text-sm">
          Manage your subscription, payment method, and upgrades.
        </p>

        <button
          onClick={openPortal}
          disabled={loading}
          className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition"
        >
          {loading ? "Loading..." : "Open Stripe Billing Portal"}
        </button>
      </div>
    </div>
  );
}