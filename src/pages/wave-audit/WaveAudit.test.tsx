import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import WaveAudit from "./WaveAudit";

describe("WaveAudit", () => {
  it("starts with the first business question and hides email capture", () => {
    const html = renderToString(<WaveAudit />);

    expect(html).toContain("What type of business do you run?");
    expect(html).toContain("Question 1 of 5");
    expect(html).not.toContain("Unlock My Full AI Wave Report");
  });
});
