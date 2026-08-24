import { existsSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProductCatalog from "./ProductCatalog";

describe("ProductCatalog artwork", () => {
  it("ships a distinct image for every product card", () => {
    const html = renderToStaticMarkup(<ProductCatalog />);
    const imageSources = Array.from(
      html.matchAll(/<img[^>]+src="([^"]+)"[^>]+class="product-card__image"/g),
      (match) => match[1],
    );

    expect(imageSources).toHaveLength(9);
    expect(new Set(imageSources).size).toBe(9);

    for (const imageSource of imageSources) {
      expect(
        existsSync(path.join(process.cwd(), "public", imageSource)),
        `Missing catalog artwork: ${imageSource}`,
      ).toBe(true);
    }
  });

  it("gives every product its own Ocean Crew level badge", () => {
    const html = renderToStaticMarkup(<ProductCatalog />);
    const badgeSources = Array.from(
      html.matchAll(/<img[^>]+src="([^"]+)"[^>]+class="product-card__badge"/g),
      (match) => match[1],
    );

    expect(badgeSources).toHaveLength(9);
    expect(new Set(badgeSources).size).toBe(9);
    expect(html.match(/level badge/g)).toHaveLength(9);

    for (const badgeSource of badgeSources) {
      expect(
        existsSync(path.join(process.cwd(), "public", badgeSource)),
        `Missing Ocean Crew badge: ${badgeSource}`,
      ).toBe(true);
    }
  });
});
