import { readFile } from "node:fs/promises";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import { describe, expect, it } from "vitest";

describe("global stylesheet build", () => {
  it("emits the reset and responsive utility styles used by the Wave Check", async () => {
    const source = await readFile("src/index.css", "utf8");
    const result = await postcss([
      tailwindcss({
        content: [
          {
            raw: '<main class="min-h-screen bg-slate-950 text-white md:text-6xl"></main>',
            extension: "html",
          },
        ],
      }),
    ]).process(source, { from: "src/index.css" });

    expect(result.css).toContain("box-sizing: border-box");
    expect(result.css).toMatch(/\.min-h-screen\s*\{[^}]*min-height: 100vh/s);
    expect(result.css).toMatch(/@media \(min-width: 768px\)[\s\S]*\.md\\:text-6xl/);
  });
});
