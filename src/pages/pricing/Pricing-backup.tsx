import { useEffect } from "react";

export default function Pricing() {

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };

  }, []);


  return (

    <div className="min-h-screen bg-black text-white px-6 py-16">

      <h1
        className="
        text-5xl
        md:text-6xl
        font-black
        text-center
        text-cyan-400
        mb-12
        "
      >
        Choose Your AI Wave 🌊
      </h1>


      <p
        className="
        text-center
        text-xl
        text-cyan-100
        max-w-3xl
        mx-auto
        mb-12
        "
      >
        Select the AI power level that fits your business.
        Ride the wave from starter tools to complete AI transformation.
      </p>


      <div className="max-w-7xl mx-auto">

        <stripe-pricing-table
          pricing-table-id="prctbl_1TQw5yRwAZCPDqtylQB0Si0N"
          publishable-key="pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi"
        >
        </stripe-pricing-table>

      </div>

    </div>

  );
}