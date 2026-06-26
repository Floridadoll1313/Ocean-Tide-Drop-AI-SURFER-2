/**
 * 🌊 Ocean Tide Pricing Core
 * Central access control system
 */

export const PRICING = {
  free: {
    accessLevel: 0,
    name: "Free",
  },
  bronze: {
    accessLevel: 1,
    name: "Bronze",
  },
  wave: {
    accessLevel: 2,
    name: "Wave",
  },
  tsunami: {
    accessLevel: 3,
    name: "Tsunami",
  },
  enterprise: {
    accessLevel: 4,
    name: "Enterprise",
  },
} as const;