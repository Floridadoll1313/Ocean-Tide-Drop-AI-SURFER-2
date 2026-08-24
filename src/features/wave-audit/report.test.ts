import { describe, expect, it } from "vitest";
import { buildWaveAuditReport, formatWaveAuditReport } from "./report";

const answers = {
  businessType: "ecommerce",
  teamSize: "solo",
  timeDrain: "multiple",
  lostOpportunity: "leads",
  aiPriority: "sales",
};

const result = {
  score: 99,
  topCategory: "Lead & Sales Follow-Up",
  opportunities: [
    "Turn more incoming interest into qualified conversations and sales.",
    "Automate repetitive handoffs, admin, and workflow steps that drain team time.",
  ],
  recommendedAgent: "Sales Rider" as const,
  confidenceLabel: "High opportunity",
};

describe("buildWaveAuditReport", () => {
  it("turns a lead-focused audit into a practical 30-day action report", () => {
    const report = buildWaveAuditReport(answers, result);

    expect(report.headline).toBe("Your Biggest Wave: Lead & Sales Follow-Up");
    expect(report.businessSnapshot).toContain("solo e-commerce business");
    expect(report.priorityActions).toHaveLength(3);
    expect(report.plan.map((phase) => phase.window)).toEqual([
      "Days 1–7",
      "Days 8–14",
      "Days 15–30",
    ]);
    expect(report.metrics).toEqual([
      "Lead response time",
      "Qualified conversations started",
      "Follow-up conversion rate",
    ]);
    expect(report.agent.name).toBe("Sales Rider");
    expect(report.firstRecommendation).toContain("automatic first response");
  });

  it("formats a complete portable report with its receipt", () => {
    const report = buildWaveAuditReport(answers, result);
    const text = formatWaveAuditReport(report, "5ed95f2f-1321-4aa8-bc88-f8f952cc6975");

    expect(text).toContain("OCEAN TIDE DROP AI SURFER — AI WAVE REPORT");
    expect(text).toContain("AI Opportunity Score: 99/100");
    expect(text).toContain("30-DAY WAVE PLAN");
    expect(text).toContain("Receipt: 5ed95f2f-1321-4aa8-bc88-f8f952cc6975");
  });
});
