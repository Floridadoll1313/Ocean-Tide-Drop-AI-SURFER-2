// src/pages/landing/NewLanding.tsx

import newLandingHero from "../../assets/images/new-landing-hero.png";

export default function NewLanding() {
  return (
    // ...
    <section
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(2,12,30,.55),
            rgba(2,12,30,.90)
          ),
          url(${newLandingHero})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* ... */}
    </section>
  );
}
