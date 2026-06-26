import { useState } from "react";
import { supabase } from "../../utils/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-800">

        <h1 className="text-3xl font-bold mb-2">
          🌊 Welcome Back
        </h1>

        <p className="text-slate-400 mb-6">
          Enter your email to ride the AI surfboard login wave.
        </p>

        {!sent ? (
          <>
            <input
              type="email"
              placeholder="you@ocean.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              onClick={handleLogin}
              disabled={loading || !email}
              className="w-full mt-4 p-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 transition"
            >
              {loading ? "Sending wave..." : "Send Magic Link"}
            </button>

            {error && (
              <p className="text-red-400 mt-3 text-sm">
                ⚠️ {error}
              </p>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="text-cyan-400 text-5xl mb-4">🌊</div>
            <p className="text-lg font-semibold">
              Check your email!
            </p>
            <p className="text-slate-400 mt-2">
              We sent you a magic link to ride in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}