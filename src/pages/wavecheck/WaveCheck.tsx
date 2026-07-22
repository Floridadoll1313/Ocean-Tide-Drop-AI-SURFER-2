import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const questions = [
  {
    question: "What best describes your business right now?",
    answers: [
      "🌱 Just starting out",
      "🚀 Growing and looking for efficiency",
      "⚙️ Already using some automation",
      "🌊 Ready for advanced AI systems",
    ],
  },
  {
    question: "How are you currently handling repetitive tasks?",
    answers: [
      "✋ Mostly manual work",
      "📋 Some tools and templates",
      "🤖 A few automations",
      "🧠 AI is part of our workflow",
    ],
  },
  {
    question: "What is your biggest AI goal?",
    answers: [
      "⏰ Save time",
      "👥 Get more customers",
      "⚙️ Improve operations",
      "🌊 Build a complete AI-powered business",
    ],
  },
];

export default function WaveCheck() {
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const sendActionPlan = async () => {
    const email = window.prompt(
      "Where should we send your AI Action Plan?"
    );

    if (!email) return;

    const aiLevel =
      score <= 5
        ? "Beginner Wave"
        : score <= 9
        ? "Rising AI Swell"
        : "Tsunami AI Ready";

    const { error } = await supabase.from("leads").insert([
      {
        email,
        ai_score: score,
        ai_level: aiLevel,
        source: "WaveCheck",
      },
    ]);

    if (error) {
      console.error("Lead save error:", error);
      alert("The wave got choppy. Please try again.");
      return;
    }

    alert("🌊 Your AI Action Plan is on the way!");
  };
  function chooseAnswer(index: number) {
    const newScore = score + index + 1;
    setScore(newScore);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full text-center"
      >
        {!started && (
          <>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              🌊 AI Wave Check
            </h1>

            <p className="text-xl text-cyan-200 mb-8">
              Discover your business AI readiness level.
            </p>

            <button
              onClick={() => setStarted(true)}
              className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold text-lg"
            >
              Catch My Wave 🏄‍♀️
            </button>
          </>
        )}

        {started && !finished && (
          <>
            <p className="text-cyan-300 mb-4">
              Wave Check {questionIndex + 1} of {questions.length}
            </p>

            <h2 className="text-3xl font-bold mb-8">
              {questions[questionIndex].question}
            </h2>

            <div className="grid gap-4">
              {questions[questionIndex].answers.map((answer, index) => (
                <button
                  key={answer}
                  onClick={() => chooseAnswer(index)}
                  className="p-4 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-black transition"
                >
                  {answer}
                </button>
              ))}
            </div>
          </>
        )}

        {finished && (
          <>
            <h2 className="text-5xl font-bold mb-6">
              🌊 Your AI Wave Report
            </h2>

            <p className="text-3xl text-cyan-300 mb-4">
              {score} / 12
            </p>

            <h3 className="text-3xl font-bold mb-4">
              {score <= 5
                ? "🌱 Beginner Wave"
                : score <= 9
                ? "🚀 Rising AI Swell"
                : "🌊 Tsunami AI Ready"}
            </h3>

            <p className="text-lg text-cyan-100">
              Your AI journey has been mapped. The next wave is waiting.
            </p>

      <button
  onClick={sendActionPlan}
  className="mt-8 px-8 py-4 rounded-full bg-cyan-400 text-black font-bold"
>
  📩 Send My AI Action Plan
</button>
          </>
        )}
      </motion.div>
    </div>
  );
}