import { useEffect } from "react";
import { bootAI } from "./services/ai";
console.log("ENV OBJECT:", import.meta.env);
console.log("GEMINI KEY:", import.meta.env.VITE_GEMINI_API_KEY);
export default function App() {
  useEffect(() => {
    bootAI();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-xl font-bold">
        🌊 AI Surfer Running
      </h1>
    </div>
  );
}
