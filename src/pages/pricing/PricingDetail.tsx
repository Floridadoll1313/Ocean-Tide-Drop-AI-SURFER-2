import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PageWrapper from "../../components/PageWrapper";
import { PRICING } from "../../data/pricing";


export default function PricingDetail() {

  const { slug } = useParams<{ slug: string }>();

  const tierId = slug || "free";

  const tier = PRICING[tierId as keyof typeof PRICING];

  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const { user, loginWithGoogle } = useAuth();



  if (!tier) {

    return (
      <PageWrapper maxWidth="max-w-7xl" showHero={false}>
        <div className="text-white text-center p-10">
          <h1 className="text-4xl font-bold">
            Plan not found 🌊
          </h1>

          <Link
            to="/pricing"
            className="text-cyan-400 mt-5 inline-block"
          >
            Return to Pricing
          </Link>
        </div>
      </PageWrapper>
    );

  }



  const handleSubscribe = async () => {


    if (tier.price === 0) {

      window.location.href = "/login";
      return;

    }



    if (!user) {

      try {

        await loginWithGoogle();

      } catch {

        alert(
          "Please login before continuing checkout 🌊"
        );

      }

      return;

    }



    setLoadingCheckout(true);



    try {


      const response = await fetch(
        "/api/create-checkout-session",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },


          body: JSON.stringify({

            userId: user.id,

            email: user.email,

            tierId,

            stripePriceId:
              tier.stripePriceId,

          }),

        }
      );



      const data = await response.json();



      if (response.ok && data.url) {

        window.location.href = data.url;

      } else {

        alert(
          "Stripe checkout is not configured yet."
        );

      }



    } catch (error) {


      console.error(
        "Checkout error:",
        error
      );


      alert(
        "Checkout failed. Please try again."
      );


    } finally {

      setLoadingCheckout(false);

    }

  };




  return (

    <PageWrapper maxWidth="max-w-7xl" showHero={false}>

      <div className="
        min-h-[70vh]
        flex
        items-center
        justify-center
        bg-black
        p-8
      ">


        <div className="
          max-w-xl
          w-full
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-10
          text-center
          shadow-[0_0_50px_rgba(0,255,255,0.25)]
        ">


          <h1 className="
            text-5xl
            font-black
            text-cyan-400
            mb-4
          ">
            {tier.label}
          </h1>



          <p className="
            text-4xl
            font-bold
            text-white
          ">
            ${tier.price}

            <span className="
              text-sm
              text-white/50
            ">
              /month
            </span>

          </p>




          <div className="
            mt-8
            space-y-3
            text-white/70
          ">

            {tier.features.map(
              (feature) => (

                <div key={feature}>
                  ✔ {feature}
                </div>

              )
            )}

          </div>




          <button

            onClick={handleSubscribe}

            disabled={loadingCheckout}

            className="
              mt-10
              w-full
              rounded-2xl
              bg-cyan-400
              py-4
              font-bold
              text-black
              hover:scale-105
              transition
            "

          >

            {loadingCheckout
              ? "Launching..."
              : tier.price === 0
              ? "Start Free"
              : "Subscribe & Unlock"
            }


          </button>




          <Link

            to="/pricing"

            className="
              block
              mt-6
              text-white/50
              hover:text-white
            "

          >

            ← Back to Pricing

          </Link>



        </div>


      </div>


    </PageWrapper>

  );

}