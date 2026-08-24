import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import FullWaveReport from "./FullWaveReport";

describe("FullWaveReport", () => {
  it("renders the unlocked report and portable report controls", () => {
    const html = renderToString(
      <MemoryRouter>
        <FullWaveReport
          email="surfer@example.com"
          submissionId="5ed95f2f-1321-4aa8-bc88-f8f952cc6975"
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

    expect(html).toContain("Your Full AI Wave Report");
    expect(html).toContain("30-Day Wave Plan");
    expect(html).toContain("Copy Report");
    expect(html).toContain("Download Report");
    expect(html).toContain("Saved securely");
    expect(html).not.toContain("on the way");
  });
});
