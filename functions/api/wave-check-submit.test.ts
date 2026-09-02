import { afterEach, describe, expect, it, vi } from "vitest";
import { handleWaveCheckSubmit } from "./wave-check-submit";

const submission = {
  submission_id: "123e4567-e89b-42d3-a456-426614174000",
  email: "surfer@example.com",
  answers: { businessType: "service" },
  score: 93,
  top_category: "Lead & Sales Follow-Up",
  opportunities: ["Follow up faster"],
  recommended_agent: "Sales Rider",
  confidence_label: "High opportunity",
  source: "wave-audit" as const,
  report_version: 1,
};

describe("handleWaveCheckSubmit", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("authenticates the Supabase REST request with the active legacy anon JWT", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await handleWaveCheckSubmit(new Request("https://example.test/api/wave-check-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    }));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = init.headers as Record<string, string>;
    expect(headers.apikey).toMatch(/^eyJ/);
    expect(headers.Authorization).toBe(`Bearer ${headers.apikey}`);
  });
});
