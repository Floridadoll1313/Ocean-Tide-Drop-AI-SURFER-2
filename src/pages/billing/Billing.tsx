import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Billing() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);

  const openPortal = async () => {
    if (!user) return;

    if (!userData?.stripeCustomerId) {
      alert("No Stripe customer found. Please complete checkout first.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: userData.stripeCustomerId,
          email: user.email,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Server error");
      }

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("No billing portal URL returned from server");
      }
    } catch (err) {
      console.error("Billing portal error:", err);
      alert("Failed to open billing portal");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-white/60">Please log in to access billing.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="max-w-md w-full bg-white/5 border border-cyan-500/20 rounded-2xl p-8 text-center space-y-6">

        <h1 className="text-3xl font-black text-cyan-400">
          Billing Control Center
        </h1>

        <p className="text-white/60 text-sm">
          Manage subscription, payment method, upgrades
        </p>

        <div className="text-xs text-white/40">
          Signed in as: {user.email}
        </div>

        <button
          onClick={openPortal}
          disabled={loading}
          className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Open Stripe Billing Portal"}
        </button>
      </div>
    </div>
  );
}