import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            🌊
          </div>

          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-3">
            Enter your email and ride the AI Surfer wave.
          </p>

        </div>


        {!sent ? (
          <>

            <label className="block text-sm text-slate-400 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                p-3
                rounded-lg
                bg-slate-800
                text-white
                border
                border-slate-700
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
              "
            />


            <button
              onClick={handleLogin}
              disabled={loading}
              className="
                w-full
                mt-5
                p-3
                rounded-lg
                bg-cyan-500
                text-black
                font-bold
                hover:bg-cyan-400
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Sending wave..."
                : "Send Magic Login Link"}
            </button>


            {error && (
              <div className="mt-4 text-red-400 text-sm text-center">
                ⚠️ {error}
              </div>
            )}

          </>
        ) : (

          <div className="text-center">

            <div className="text-6xl mb-4">
              📬
            </div>

            <h2 className="text-xl font-semibold">
              Check Your Email
            </h2>

            <p className="text-slate-400 mt-3">
              We sent you a magic link. Click it to enter your AI Surfer dashboard.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}
