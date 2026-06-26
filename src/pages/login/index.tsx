export default function Login() {
  return (
    <div className="min-h-screen text-white p-10 bg-slate-950">
      <h1 className="text-4xl font-bold mb-6">🔐 Login</h1>

      <div className="max-w-md p-6 bg-slate-900 rounded-xl">
        <input
          className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
          placeholder="Password"
        />

        <button className="w-full p-3 bg-cyan-500 text-black font-bold rounded">
          Login
        </button>
      </div>
    </div>
  );
}