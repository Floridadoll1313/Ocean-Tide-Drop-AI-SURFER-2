export default function Login() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login 🌊</h1>

        <input
          className="w-full p-3 mb-4 bg-slate-800 rounded"
          placeholder="Email"
        />

        <input
          className="w-full p-3 mb-6 bg-slate-800 rounded"
          placeholder="Password"
          type="password"
        />

        <button className="w-full bg-blue-600 p-3 rounded">
          Sign In
        </button>
      </div>
    </div>
  );
}