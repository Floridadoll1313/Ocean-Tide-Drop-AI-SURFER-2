import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveWaveAuditLead } from "./leadCapture";

const { insert } = vi.hoisted(() => ({ insert: vi.fn() }));

vi.mock("../../lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({ insert })),
  },
}));

const payload = {
  email: "surfer@example.com",
  answers: {
    businessType: "service",
    teamSize: "2-10",
    timeDrain: "repetitive",
    lostOpportunity: "leads",
    aiPriority: "sales",
  },
  result: {
    score: 82,
    topCategory: "Lead & Sales Follow-Up",
    opportunities: ["Faster lead response", "Automated follow-up"],
    recommendedAgent: "Sales Rider" as const,
    confidenceLabel: "High opportunity",
  },
  source: "wave-audit" as const,
  submissionId: "5ed95f2f-1321-4aa8-bc88-f8f952cc6975",
};

describe("saveWaveAuditLead", () => {
  beforeEach(() => insert.mockReset());

  it("stores a normalized lead under a stable idempotency receipt", async () => {
    insert.mockResolvedValueOnce({ data: null, error: null, count: null, status: 201, statusText: "Created" });

    await expect(saveWaveAuditLead({ ...payload, email: " Surfer@Example.COM " })).resolves.toEqual({
      status: "saved",
      submissionId: payload.submissionId,
    });
    expect(insert).toHaveBeenCalledWith({
      submission_id: payload.submissionId,
      email: "surfer@example.com",
      answers: payload.answers,
      score: 82,
      top_category: "Lead & Sales Follow-Up",
      opportunities: ["Faster lead response", "Automated follow-up"],
      recommended_agent: "Sales Rider",
      confidence_label: "High opportunity",
      source: "wave-audit",
      report_version: 1,
    });
  });

  it("retries a lost response with the same receipt", async () => {
    insert
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce({
        data: null,
        error: { code: "23505", message: "duplicate key value violates unique constraint" },
        count: null,
        status: 409,
        statusText: "Conflict",
      });

    await expect(saveWaveAuditLead(payload)).resolves.toEqual({
      status: "saved",
      submissionId: payload.submissionId,
    });
    expect(insert).toHaveBeenCalledTimes(2);
    expect(insert.mock.calls[0]).toEqual(insert.mock.calls[1]);
  });

  it("returns an honest uncertain state without blocking the unlocked report", async () => {
    insert
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockRejectedValueOnce(new TypeError("Failed to fetch"));

    const result = await saveWaveAuditLead(payload);
    expect(result).toEqual({
      status: "uncertain",
      submissionId: payload.submissionId,
      message: "Your full report is unlocked below. We couldn't confirm the online save, so keep your receipt and try again later.",
    });
    expect(insert).toHaveBeenCalledTimes(2);
  });
});
