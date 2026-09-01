import { useEffect } from "react";
import { SERVICES } from "../../data/services";

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


      {/* MEMBERSHIP WAVES */}
      <section className="max-w-7xl mx-auto mb-24">

        <h2
          className="
            text-4xl
            font-black
            text-center
            text-white
            mb-8
          "
        >
          🌊 AI Surfer Memberships
        </h2>


        <stripe-pricing-table
          pricing-table-id="prctbl_1TwRnIEx9w41hLckfB0wV11N"
          publishable-key="pk_live_51SFQuHEx9w41hLckWLwm52Xdx3ucTtA5JjM6aSii095qUrtZno1DlnwVj7QBcBqpP69Eg5zqbbq7sjRpLwf90RKD00V29PDYcm"
        >
        </stripe-pricing-table>


      </section>



      {/* PREMIUM AI BUILDS */}
      <section id="premium-builds" className="max-w-7xl mx-auto scroll-mt-10">


        <h2
          className="
            text-4xl
            md:text-5xl
            font-black
            text-center
            text-cyan-400
            mb-6
          "
        >
          ⚡ Build Your AI System
        </h2>


        <p
          className="
            text-center
            text-lg
            text-cyan-100
            max-w-3xl
            mx-auto
            mb-12
          "
        >
          Premium AI systems designed, built, and launched for businesses ready
          to automate, scale, and surf the next wave of technology.
        </p>



        <div
          className="
            grid
            md:grid-cols-2
            gap-8
          "
        >

          {Object.entries(SERVICES).map(([key, service]) => (

            <div
              key={key}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-sm
                p-8
              "
            >


              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >
                {service.label}
              </h3>



              <p
                className="
                  text-4xl
                  font-black
                  text-cyan-400
                  mb-6
                "
              >
                ${service.price}

                <span
                  className="
                    text-sm
                    text-white/50
                    ml-2
                  "
                >
                  one-time
                </span>

              </p>



              <ul
                className="
                  space-y-3
                  text-white/80
                  mb-8
                "
              >

                {service.features.map((feature) => (

                  <li key={feature}>
                    ✓ {feature}
                  </li>

                ))}

              </ul>



              <a
                href={service.stripeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block
                  text-center
                  rounded-xl
                  bg-cyan-400
                  text-black
                  py-3
                  font-bold
                  hover:bg-cyan-300
                  transition
                "
              >
                Build My System 🌊
              </a>


            </div>

          ))}


        </div>


      </section>


    </div>
  );
}