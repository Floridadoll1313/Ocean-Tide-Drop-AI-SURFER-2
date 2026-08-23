import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("homepage Free AI Wave Check", () => {
  it("lets visitors start the free Wave Check from the homepage", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(html).toContain('href="/wave-check"');
    expect(html).toContain("Get My Free AI Wave Check™");
  });
});
