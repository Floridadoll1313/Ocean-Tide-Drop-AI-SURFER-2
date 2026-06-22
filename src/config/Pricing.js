export const PRICING = {
  free: {
    label: "Starter Tide",
    price: 0,
    tier: "free",
    stripePriceId: null,
    level: 0,
    features: [
      "Basic AI starter access",
      "Limited preview tools",
      "Community-level insights",
    ],
  },

  bronze: {
    label: "Builder Wave",
    price: 29,
    tier: "bronze",
    stripePriceId: "price_bronze_placeholder",
    level: 1,
    features: [
      "AI workflow templates",
      "Starter automation systems",
      "Email capture tools",
    ],
  },

  wave: {
    label: "Growth Wave",
    price: 99,
    tier: "wave",
    stripePriceId: "price_wave_placeholder",
    level: 2,
    features: [
      "Full AI business system",
      "Automation + revenue pipelines",
      "Prompt + tool library",
      "Dashboard + analytics",
    ],
  },

  tsunami: {
    label: "Tsunami Elite",
    price: 250,
    tier: "tsunami",
    stripePriceId: "price_tsunami_placeholder",
    level: 3,
    features: [
      "Enterprise AI architecture",
      "White-label automation systems",
      "Priority scaling support",
      "Advanced integrations + APIs",
    ],
  },
};