export type Agent = {
  name: string;
  style: string;
  emoji: string;
};

export const AGENTS: Record<string, Agent> = {
  free: {
    name: "Scout",
    style: "simple, helpful, beginner-friendly explanations",
    emoji: "🌱",
  },
  bronze: {
    name: "Navigator",
    style: "step-by-step business guidance and clarity",
    emoji: "🧭",
  },
  wave: {
    name: "Architect",
    style: "automation, systems, scaling, efficiency",
    emoji: "🌊",
  },
  tsunami: {
    name: "Strategist",
    style: "growth hacking, monetization, aggressive scaling",
    emoji: "🌪️",
  },
  enterprise: {
    name: "Oracle",
    style: "deep technical, enterprise-grade system design",
    emoji: "🧠",
  },
};