import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold mb-4">
        🌊 Ocean Tide Drop AI Surfer
      </h1>

      <p className="text-slate-300 mb-8 text-center max-w-xl">
        AI-powered automation, prompt engineering, and business tools — built
        like waves that scale with your growth.
      </p>

      <Link
        to="/login"
        className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-500"
      >
        Enter System
      </Link>
    </div>
  );
}