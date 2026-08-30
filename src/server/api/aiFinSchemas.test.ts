import { describe, expect, it } from "vitest";
import { aiFinAuditStartSchema } from "./aiFinAudits";
import { aiFinLeadSchema } from "./aiFinLeads";

describe("AI Fin request schemas", () => {
  it("accepts an audit start with a website", () => {
    const result = aiFinAuditStartSchema.safeParse({
      businessName: "Ocean Test Co",
      website: "https://example.com",
      source: "homepage_chat",
    });

    expect(result.success).toBe(true);
  });

  it("accepts an audit start without a website when a business identifier is provided", () => {
    const result = aiFinAuditStartSchema.safeParse({
      businessName: "Ocean Test Co",
      businessIdentifier: "Ocean Test Co, Charleston SC",
      source: "ai-fin",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an audit start with no lookup target", () => {
    const result = aiFinAuditStartSchema.safeParse({
      businessName: "Ocean Test Co",
      source: "aeo_page",
    });

    expect(result.success).toBe(false);
  });

  it("requires explicit consent for lead capture", () => {
    const baseLead = {
      contactName: "Test Surfer",
      businessName: "Ocean Test Co",
      email: "test@example.com",
      primaryProblem: "We lose leads after hours.",
      recommendedProduct: "Sales Rider",
      recommendedPackage: "Wave Starter",
      leadStage: "HOT",
      urgency: "High",
      conversationSummary: "Needs faster lead follow-up.",
      source: "ai-fin",
    };

    expect(aiFinLeadSchema.safeParse(baseLead).success).toBe(false);
    expect(
      aiFinLeadSchema.safeParse({ ...baseLead, consentToFollowUp: true }).success,
    ).toBe(true);
  });
});
