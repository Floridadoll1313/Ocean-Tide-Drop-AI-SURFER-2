import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Waves,
  Sparkles,
  Bot,
  Clock,
  TrendingUp,
} from "lucide-react";

const questions = [
  {
    question: "What type of business do you own?",
    options: [
      "Service Business",
      "Retail",
      "Restaurant",
      "Construction",
      "Medical",
      "Other",
    ],
  },
  {
    question: "How big is your team?",
    options: [
      "Just Me",
      "2-5 People",
      "6-20 People",
      "21-50 People",
      "50+ People",
    ],
  },
  {
    question: "What takes up the most time?",
    options: [
      "Customer Support",
      "Marketing",
      "Scheduling",
      "Paperwork",
      "Sales Follow-Up",
    ],
  },
  {
    question: "How are you currently using AI?",
    options: [
      "Not Yet",
      "Trying It Out",
      "Sometimes",
      "Every Day",
    ],
  },
  {
    question: "What is your biggest goal?",
    options: [
      "Save Time",
      "Get More Customers",
      "Reduce Costs",
      "Grow Faster",
      "Improve Service",
    ],
  },
];

export default function WaveCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  const selectAnswer = (answer: string) => {
    const updated = [...answers];
    updated[step] = answer;
    setAnswers(updated);

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setComplete(true);
      }
    }, 400);
  };

  const score =
    65 +
    answers.filter((a) =>
      [
        "Trying It Out",
        "Sometimes",
        "Every Day",
        "Save Time",
        "Grow Faster",
      ].includes(a)
    ).length *
      5;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Ocean Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-700/40 via-blue-950 to-slate-950" />

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
        absolute
        bottom-0
        left-1/2
        -translate-x-1/2
        w-[120%]
        h-72
        bg-cyan-400/20
        blur-3xl
        rounded-full
        "
      />


      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">

        <div className="text-center mb-12">

          <Waves
            size={55}
            className="mx-auto text-cyan-300 mb-5"
          />

          <h1 className="
          text-5xl
          md:text-6xl
          font-black
          ">
            AI Wave Check™
          </h1>

          <p className="
          mt-5
          text-xl
          text-slate-300
          ">
            Discover how AI can help your business catch the next wave.
          </p>

        </div>


        {!complete && (

          <div>

            {/* Progress */}
            <div className="mb-10">

              <div className="flex justify-between text-sm text-cyan-300 mb-2">
                <span>
                  Wave {step + 1} of {questions.length}
                </span>

                <span>
                  {Math.round(
                    ((step + 1) / questions.length) * 100
                  )}
                  %
                </span>
              </div>

              <div className="
              h-3
              bg-white/10
              rounded-full
              overflow-hidden
              ">

                <motion.div
                  animate={{
                    width: `${((step + 1) / questions.length) * 100}%`,
                  }}
                  className="
                  h-full
                  bg-cyan-400
                  "
                />

              </div>

            </div>


            <AnimatePresence mode="wait">

              <motion.div
                key={step}
                initial={{
                  opacity:0,
                  x:50
                }}
                animate={{
                  opacity:1,
                  x:0
                }}
                exit={{
                  opacity:0,
                  x:-50
                }}
              >

                <div className="
                rounded-3xl
                bg-white/10
                backdrop-blur
                border
                border-white/20
                p-8
                ">

                  <h2 className="
                  text-3xl
                  font-bold
                  mb-8
                  ">
                    {questions[step].question}
                  </h2>


                  <div className="grid gap-4">

                    {questions[step].options.map(option => (

                      <button
                        key={option}
                        onClick={() =>
                          selectAnswer(option)
                        }
                        className="
                        rounded-2xl
                        bg-white/10
                        hover:bg-cyan-400
                        hover:text-slate-950
                        p-5
                        text-left
                        transition
                        font-semibold
                        "
                      >
                        {option}

                      </button>

                    ))}

                  </div>

                </div>


              </motion.div>

            </AnimatePresence>

          </div>

        )}


        {complete && (

          <motion.div
            initial={{
              opacity:0,
              scale:.8
            }}
            animate={{
              opacity:1,
              scale:1
            }}
            className="
            rounded-3xl
            bg-white/10
            backdrop-blur
            border
            border-white/20
            p-10
            text-center
            "
          >

            <Sparkles
              size={50}
              className="
              mx-auto
              text-cyan-300
              mb-5
              "
            />

            <h2 className="
            text-4xl
            font-black
            ">
              Your AI Wave Score™
            </h2>


            <div className="
            text-7xl
            font-black
            text-cyan-300
            my-8
            ">
              {score}
            </div>


            <h3 className="
            text-2xl
            font-bold
            ">
              You're Riding The Wave!
            </h3>


            <div className="
            grid
            md:grid-cols-3
            gap-5
            mt-10
            ">

              <div className="bg-white/10 rounded-2xl p-5">
                <Clock className="mx-auto text-cyan-300 mb-3"/>
                Hours Saved
                <strong className="block text-xl">
                  15+/week
                </strong>
              </div>


              <div className="bg-white/10 rounded-2xl p-5">
                <TrendingUp className="mx-auto text-cyan-300 mb-3"/>
                Growth
                <strong className="block text-xl">
                  High
                </strong>
              </div>


              <div className="bg-white/10 rounded-2xl p-5">
                <Bot className="mx-auto text-cyan-300 mb-3"/>
                AI Systems
                <strong className="block text-xl">
                  Ready
                </strong>
              </div>

            </div>


            <button
              className="
              mt-10
              bg-cyan-400
              text-slate-950
              rounded-full
              px-10
              py-4
              font-bold
              flex
              items-center
              gap-3
              mx-auto
              "
            >
              Get My AI Plan
              <ArrowRight />

            </button>


          </motion.div>

        )}

      </section>

    </main>
  );
}
