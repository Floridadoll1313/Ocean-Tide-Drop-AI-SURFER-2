import { Link } from "react-router-dom";
import { PRICING } from "../../data/pricing";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-black text-center mb-12 text-cyan-400">
        Choose Your AI Wave 🌊
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {Object.entries(PRICING).map(([key, plan]) => (

          <div
            key={key}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >

            <h2 className="text-2xl font-bold">
              {plan.label}
            </h2>

            <p className="text-4xl font-black mt-4">
              ${plan.price}
              <span className="text-sm text-white/50">
                /month
              </span>
            </p>

            <ul className="mt-6 space-y-2 text-white/70">
              {plan.features.map((feature) => (
                <li key={feature}>
                  ✓ {feature}
                </li>
              ))}
            </ul>

            <Link
              to={`/pricing/${key}`}
              className="block mt-8 text-center rounded-xl bg-cyan-400 text-black py-3 font-bold"
            >
              Choose {plan.label}
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}
