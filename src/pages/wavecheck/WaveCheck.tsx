import { motion } from "framer-motion";
import { useState } from "react";

export default function WaveCheck() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center"
      >
        {!started ? (
          <>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              🌊 AI Wave Check
            </h1>

            <p className="text-xl text-cyan-200 mb-8">
              Discover where your business is on the AI wave
              and find the next automation opportunities waiting below the surface.
            </p>

            <button
              onClick={() => setStarted(true)}
              className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold text-lg hover:scale-105 transition"
            >
              Catch My Wave 🏄‍♀️
            </button>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-4">
              🌊 Wave 1: Your AI Journey Begins
            </h2>

            <p className="text-lg text-cyan-200">
              We are mapping your business current and future AI potential.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}