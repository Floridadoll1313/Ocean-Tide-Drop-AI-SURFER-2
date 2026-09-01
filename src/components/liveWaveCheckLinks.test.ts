import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("live Wave Check links", () => {
  it.each([
    "../pages/home/SitesLanding.tsx",
    "./ProductCatalog.tsx",
  ])("%s routes the AEO Wave Audit CTA to the working live path", (relativePath) => {
    const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
    const aeoProduct = source.slice(
      source.indexOf('name: "AEO Wave Audit'),
      source.indexOf("featured: true", source.indexOf("AEO Wave Audit"))
    ) || source.slice(
      source.indexOf("name: 'AEO Wave Audit"),
      source.indexOf("featured: true", source.indexOf("AEO Wave Audit"))
    );

    expect(aeoProduct).toContain("/wave-check");
    expect(aeoProduct).not.toContain("/wave-audit");
  });
});
