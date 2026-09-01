import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import FullWaveReport from "./FullWaveReport";

const submissionId = "5ed95f2f-1321-4aa8-bc88-f8f952cc6975";

describe("FullWaveReport paid checkout context", () => {
  it("carries the saved submission into the protected checkout URL", () => {
    const html = renderToString(
      <MemoryRouter>
        <FullWaveReport
          email="surfer@example.com"
          submissionId={submissionId}
          saveStatus="saved"
          answers={{
            businessType: "ecommerce",
            teamSize: "solo",
            timeDrain: "multiple",
            lostOpportunity: "leads",
            aiPriority: "sales",
          }}
          result={{
            score: 99,
            topCategory: "Lead & Sales Follow-Up",
            opportunities: ["Faster response", "Consistent follow-up"],
            recommendedAgent: "Sales Rider",
            confidenceLabel: "High opportunity",
          }}
        />
      </MemoryRouter>,
    );

    expect(html).toContain(
      `href="/audit/checkout?submission_id=${submissionId}"`,
    );
  });
});
