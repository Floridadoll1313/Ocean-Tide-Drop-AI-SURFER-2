import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import WaveAudit from "./WaveAudit";

describe("WaveAudit", () => {
  it("starts with the first business question and hides email capture", () => {
    const html = renderToString(
      <MemoryRouter>
        <WaveAudit />
      </MemoryRouter>,
    );

    expect(html).toContain("What type of business do you run?");
    expect(html).toMatch(/Question\s*<!-- -->1<!-- -->\s*of\s*<!-- -->5/);
    expect(html).not.toContain("Unlock My Full AI Wave Report");
  });
});
