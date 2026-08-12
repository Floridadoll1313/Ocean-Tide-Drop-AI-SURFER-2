import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveWaveAuditLead } from "./leadCapture";

const insert = vi.fn();

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
};

describe("saveWaveAuditLead", () => {
  beforeEach(() => insert.mockReset());

  it("returns ok when Supabase accepts the lead", async () => {
    insert.mockResolvedValueOnce({ error: null });

    await expect(saveWaveAuditLead(payload)).resolves.toEqual({ ok: true });
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({
      email: "surfer@example.com",
      score: 82,
      recommended_agent: "Sales Rider",
      source: "wave-audit",
    }));
  });

  it("returns a retryable error without throwing", async () => {
    insert.mockResolvedValueOnce({ error: { message: "duplicate" } });

    const result = await saveWaveAuditLead(payload);
    expect(result.ok).toBe(false);
  });

  it("handles unexpected Supabase exceptions", async () => {
    insert.mockRejectedValueOnce(new Error("network down"));

    const result = await saveWaveAuditLead(payload);
    expect(result.ok).toBe(false);
  });
});
