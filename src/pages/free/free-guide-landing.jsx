import { useState } from "react";

export default function FreeGuideLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Replace this with Supabase / Firebase / Mailchimp later
    console.log("Captured email:", email);

    setSubmitted(true);
  };

  if (submitted) {
    return <ThankYouPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-md max-w-xl w-full rounded-2xl shadow-xl p-8 space-y-6 text-center">

        <h1 className="text-3xl font-bold">
          🌊 Free AI Business Starter Guide
        </h1>

        <p className="text-gray-600">
          Learn how to use AI to automate tasks, save hours, and start building income systems online.
        </p>

        {/* Email Capture */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your email to get instant access"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Get Instant Access 🚀
          </button>
        </form>

        <p className="text-xs text-gray-400">
          No spam. Just tools, systems, and ocean-level growth 🌊
        </p>
      </div>
    </div>
  );
}