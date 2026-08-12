import { describe, expect, it } from "vitest";
import { calculateWaveAuditResult } from "./scoring";
import type { WaveAuditAnswers } from "./types";

const baseAnswers: WaveAuditAnswers = {
  businessType: "service",
  teamSize: "2-10",
  timeDrain: "repetitive",
  lostOpportunity: "leads",
  aiPriority: "sales",
};

describe("calculateWaveAuditResult", () => {
  it("keeps the score between 0 and 100", () => {
    const result = calculateWaveAuditResult(baseAnswers);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("maps lead-loss and sales-priority answers to Sales Rider", () => {
    const result = calculateWaveAuditResult({
      ...baseAnswers,
      lostOpportunity: "leads",
      aiPriority: "sales",
    });
    expect(result.recommendedAgent).toBe("Sales Rider");
    expect(result.topCategory).toBe("Lead & Sales Follow-Up");
  });

  it("maps repetitive workflow answers to Automation Architect", () => {
    const result = calculateWaveAuditResult({
      ...baseAnswers,
      timeDrain: "repetitive",
      lostOpportunity: "operations",
      aiPriority: "automation",
    });
    expect(result.recommendedAgent).toBe("Automation Architect");
  });

  it("uses Big Kahuna when multiple high-impact areas are selected", () => {
    const result = calculateWaveAuditResult({
      businessType: "multi-location",
      teamSize: "51+",
      timeDrain: "multiple",
      lostOpportunity: "multiple",
      aiPriority: "multiple",
    });
    expect(result.recommendedAgent).toBe("Big Kahuna");
  });
});
