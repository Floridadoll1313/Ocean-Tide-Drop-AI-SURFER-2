export type ImplementationOffer =
  | {
      kind: "checkout";
      label: string;
      price: number;
      checkoutUrl: string;
      cta: string;
    }
  | {
      kind: "high-touch";
      label: string;
      cta: string;
      path: string;
    };

const AGENT_CHECKOUT = "https://buy.stripe.com/aFa3cv3tx6hc0Uydcb4gg08";
const AUTOMATION_CHECKOUT = "https://buy.stripe.com/5kQ6oH5BFgVQ5aO0pp4gg06";

const OFFERS: Record<string, ImplementationOffer> = {
  "aeo-blueprint": { kind: "high-touch", label: "AEO Strategy & Implementation", cta: "Start My AEO Implementation", path: "/pricing#premium-builds" },
  "wave-scout": { kind: "checkout", label: "AI Agent Systems", price: 2500, checkoutUrl: AGENT_CHECKOUT, cta: "Build My Wave Scout System" },
  "sales-rider": { kind: "checkout", label: "AI Agent Systems", price: 2500, checkoutUrl: AGENT_CHECKOUT, cta: "Build My Sales Rider System" },
  "content-creator": { kind: "checkout", label: "AI Agent Systems", price: 2500, checkoutUrl: AGENT_CHECKOUT, cta: "Build My Content System" },
  "customer-care-cove": { kind: "checkout", label: "AI Agent Systems", price: 2500, checkoutUrl: AGENT_CHECKOUT, cta: "Build My Customer Care System" },
  "automation-architect": { kind: "checkout", label: "Automation & AI Workflow Systems", price: 2500, checkoutUrl: AUTOMATION_CHECKOUT, cta: "Build My Automation System" },
  "big-kahuna": { kind: "high-touch", label: "Big Kahuna Strategy & Implementation", cta: "Start My Big Kahuna Plan", path: "/pricing#premium-builds" },
};

export function getImplementationOffer(slug?: string): ImplementationOffer | null {
  if (!slug) return null;
  return OFFERS[slug] ?? null;
}
