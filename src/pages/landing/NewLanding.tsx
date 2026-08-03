// src/pages/landing/NewLanding.tsx

import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, Users, BarChart3, Waves } from "lucide-react";
import { Link } from "react-router-dom";

// 1. Import your downloaded photo from assets
import newLandingHero from "../../assets/images/new_landing_hero.png";

import OceanBackground from "../../components/landing/OceanBackground";
import Navbar from "../../components/landing/Navbar";
import SunriseGlow from "../../components/landing/SunriseGlow";
import BioluminescentParticles from "../../components/landing/BioluminescentParticles";

export default function NewLanding() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <OceanBackground />
      <SunriseGlow />
      <BioluminescentParticles />
      <Navbar />

      {/* HERO SECTION */}
      <section
        className="relative z-10 min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(2,12,30,.55),
              rgba(2,12,30,.90)
            ),
            url(${newLandingHero})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ... Hero Content ... */}
      </section>
    </div>
  );
}
