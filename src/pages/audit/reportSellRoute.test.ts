import { describe, expect, it } from "vitest";
import { getReportSellRoute } from "./reportSellRoute";

describe("getReportSellRoute", () => {
  it.each([
    ["Wave Scout", "/products/wave-scout", "See How Wave Scout Can Help"],
    ["Sales Rider", "/products/sales-rider", "Fix My Sales Follow-Up"],
    ["Content Creator", "/products/content-creator", "Build My Authority Content"],
    ["Customer Care Cove", "/products/customer-care-cove", "Improve My Customer Support"],
    ["Automation Architect", "/products/automation-architect", "Map My Automation Plan"],
    ["Big Kahuna", "/products/big-kahuna", "Talk Strategy With Big Kahuna"],
  ])("routes %s to its focused solution page", (recommendation, path, cta) => {
    expect(getReportSellRoute(recommendation)).toEqual({ path, cta });
  });

  it("falls back to members for an unknown recommendation", () => {
    expect(getReportSellRoute("Something New")).toEqual({
      path: "/members",
      cta: "Help Me Implement This",
    });
  });
});
