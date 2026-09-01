import { describe, expect, it } from "vitest";
import { getImplementationOffer } from "./implementationOffer";

describe("getImplementationOffer", () => {
  it.each([
    ["wave-scout", "AI Agent Systems", 2500, "https://buy.stripe.com/aFa3cv3tx6hc0Uydcb4gg08"],
    ["sales-rider", "AI Agent Systems", 2500, "https://buy.stripe.com/aFa3cv3tx6hc0Uydcb4gg08"],
    ["content-creator", "AI Agent Systems", 2500, "https://buy.stripe.com/aFa3cv3tx6hc0Uydcb4gg08"],
    ["customer-care-cove", "AI Agent Systems", 2500, "https://buy.stripe.com/aFa3cv3tx6hc0Uydcb4gg08"],
    ["automation-architect", "Automation & AI Workflow Systems", 2500, "https://buy.stripe.com/5kQ6oH5BFgVQ5aO0pp4gg06"],
  ])("maps %s to its existing paid implementation offer", (slug, label, price, checkoutUrl) => {
    expect(getImplementationOffer(slug)).toMatchObject({
      kind: "checkout",
      label,
      price,
      checkoutUrl,
    });
  });

  it("gives AEO Blueprint a high-touch implementation path", () => {
    expect(getImplementationOffer("aeo-blueprint")).toEqual({
      kind: "high-touch",
      label: "AEO Strategy & Implementation",
      cta: "Start My AEO Implementation",
      path: "/pricing#premium-builds",
    });
  });

  it("keeps Big Kahuna as a high-touch implementation path", () => {
    expect(getImplementationOffer("big-kahuna")).toEqual({
      kind: "high-touch",
      label: "Big Kahuna Strategy & Implementation",
      cta: "Start My Big Kahuna Plan",
      path: "/pricing#premium-builds",
    });
  });

  it("returns null for an unknown product", () => {
    expect(getImplementationOffer("not-a-product")).toBeNull();
  });
});
