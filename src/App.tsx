import { useEffect } from "react";
import { bootAI } from "./services/ai";

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
