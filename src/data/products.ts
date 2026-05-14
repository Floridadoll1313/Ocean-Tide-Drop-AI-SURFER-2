export interface Product {
  name: string;
  slug: string;
  price: string;
  alt: string;
  image: string;
  narrative: string;
  features: string[];
  color: string;
  iconName: string;
  popular?: boolean;
}

export const products: Product[] = [
  {
    name: "Dawn Patrol",
    slug: "dawn-patrol",
    price: "$97",
    alt: "Dawn Patrol Surf Tier",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800",
    narrative:
      "Your cinematic entry point. A clean landing, AI‑assisted content, and your first automated workflows.",
    features: [
      "Cinematic landing page",
      "AI‑assisted content engine",
      "Starter automations",
      "Brand color tuning",
    ],
    color: "text-white/80",
    iconName: "waves"
  },
  {
    name: "Breakline",
    slug: "breakline",
    price: "$197",
    alt: "Breakline Surf Tier",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    narrative:
      "A multi‑page experience with deeper automations and a tuned content engine that moves with your brand.",
    features: [
      "Multi‑page site",
      "Advanced automations",
      "Content engine tuning",
      "Brand story expansion",
    ],
    color: "text-cyan-400",
    iconName: "zap",
    popular: true,
  },
  {
    name: "Hatteras Island",
    slug: "hatteras-island",
    price: "$297",
    alt: "Hatteras Island Surf Tier",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    narrative:
      "High‑touch creative systems, evolving brand identity, and ongoing cinematic refinement.",
    features: [
      "Ongoing creative direction",
      "Cinematic brand evolution",
      "AI content pipelines",
      "Monthly experiments",
    ],
    color: "text-purple-400",
    iconName: "flame"
  },
  {
    name: "Cape Point",
    slug: "cape-point",
    price: "$497",
    alt: "Cape Point Surf Tier",
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&q=80&w=800",
    narrative:
      "Full‑stack automation, AI‑driven content pipelines, and mythic brand architecture built for scale.",
    features: [
      "Full automation suite",
      "AI‑driven content pipelines",
      "Mythic brand architecture",
      "Founder‑first creative systems",
    ],
    color: "text-blue-400",
    iconName: "crown"
  },
];
