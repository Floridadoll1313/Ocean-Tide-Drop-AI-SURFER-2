import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RouterApp from "./RouterApp";
import { AuthProvider } from "./context/AuthContext";

describe("shared site branding", () => {
  it.each(["/", "/wave-check", "/login"])(
    "keeps the centered Ocean Tide Drop emblem above %s",
    (route) => {
      const html = renderToStaticMarkup(
        <MemoryRouter initialEntries={[route]}>
          <AuthProvider>
            <RouterApp />
          </AuthProvider>
        </MemoryRouter>,
      );

      const headerPosition = html.indexOf('aria-label="Ocean Tide Drop AI Surfer brand"');
      const routeContentPosition = html.indexOf('data-site-route-content="true"');

      expect(headerPosition).toBeGreaterThanOrEqual(0);
      expect(routeContentPosition).toBeGreaterThan(headerPosition);
      expect(html).toContain('data-site-emblem="true"');
      expect(html).toContain('src="/ocean_tide_logo.png"');
    },
  );
});
