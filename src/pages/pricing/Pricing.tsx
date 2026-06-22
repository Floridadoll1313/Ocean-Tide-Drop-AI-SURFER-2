export const PRICING = {
  free: {
    label: "Starter Tide",
    price: 0,
    tier: "free",
    stripePriceId: null,
    accessLevel: 0,
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
    stripePriceId: "price_bronze_wave",
    accessLevel: 1,
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
    stripePriceId: "price_growth_wave",
    accessLevel: 2,
    featured: true,
    features: [
      "Full AI business system",
      "Automation + revenue pipelines",
      "Prompt + tool library",
      "Dashboard + analytics",
      "Priority AI upgrades",
    ],
  },

  tsunami: {
    label: "Tsunami Pro",
    price: 250,
    tier: "tsunami",
    stripePriceId: "price_tsunami_pro",
    accessLevel: 3,
    features: [
      "Everything in Growth Wave",
      "Advanced AI agents",
      "Multi-client automation layer",
      "Revenue tracking engine",
      "Priority support channel",
    ],
  },

  enterprise: {
    label: "Ocean Dominion",
    price: 750,
    tier: "enterprise",
    stripePriceId: "price_enterprise_ocean",
    accessLevel: 4,
    features: [
      "Custom AI infrastructure",
      "White-label systems",
      "Dedicated deployment pipeline",
      "Full automation architecture",
      "1:1 build support",
    ],
  },
};