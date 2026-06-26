import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    alert(`Login flow placeholder for: ${email}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          className="w-full p-3 rounded bg-slate-800 mb-4"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-3 rounded hover:bg-blue-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
}