import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md p-6 border border-slate-800 rounded-xl">

        <h1 className="text-3xl font-bold mb-6">🌊 Login</h1>

        <input
          className="w-full p-3 rounded bg-slate-900 border border-slate-700 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full p-3 bg-cyan-500 text-black rounded">
          Login (demo)
        </button>

      </div>
    </div>
  );
}