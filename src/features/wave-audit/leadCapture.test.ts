import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveWaveAuditLead } from "./leadCapture";

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
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("posts a normalized lead to the same-origin Wave Check endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: "saved",
      submissionId: payload.submissionId,
    }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(saveWaveAuditLead({ ...payload, email: " Surfer@Example.COM " })).resolves.toEqual({
      status: "saved",
      submissionId: payload.submissionId,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/wave-check-submit", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
      }),
    }));
  });

  it("retries a lost response with the same receipt", async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        status: "saved",
        submissionId: payload.submissionId,
      }), { status: 200, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(saveWaveAuditLead(payload)).resolves.toEqual({
      status: "saved",
      submissionId: payload.submissionId,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]).toEqual(fetchMock.mock.calls[1]);
  });

  it("returns an honest uncertain state after two failed attempts", async () => {
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockRejectedValueOnce(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", fetchMock);

    await expect(saveWaveAuditLead(payload)).resolves.toEqual({
      status: "uncertain",
      submissionId: payload.submissionId,
      message: "We couldn't confirm the online save. Please try again so your Wave Check is not lost.",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
