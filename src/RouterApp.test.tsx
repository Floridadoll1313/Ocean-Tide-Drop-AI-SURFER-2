import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RouterApp from "./RouterApp";
import { AuthProvider } from "./context/AuthContext";

describe("shared site branding", () => {
  it.each(["/wave-check", "/login"])(
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

  it("renders the approved AI Surfer landing page at the site root", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <RouterApp />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(html).toContain("Ride the Wave.");
    expect(html).toContain("Grow with AI.");
    expect(html).toContain("THE AI SURFER PRODUCT WAVE");
    expect(html).toContain('aria-label="Ocean Tide Drop AI SURFER home"');
    expect(html).not.toContain('aria-label="Ocean Tide Drop AI Surfer brand"');
    expect(html.match(/Launch wave/g)).toHaveLength(1);
  });

  it("opens a dedicated password-recovery screen from the email link", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/reset-password"]}>
        <AuthProvider>
          <RouterApp />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(html).toContain("Set a New Password");
    expect(html).toContain("Choose a secure new password for your AI-Surfer account.");
  });

  it("renders the dedicated pricing experience at /pricing", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/pricing"]}>
        <AuthProvider>
          <RouterApp />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(html).toContain("Choose Your AI Wave");
    expect(html).toContain("AI Surfer Memberships");
    expect(html).not.toContain("AI for your business, without the tech headache.");
    expect(html.match(/LAUNCH WEEK SPECIAL/g)).toHaveLength(1);
  });

  it("renders a clear not-found page for unknown public routes", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/__healthcheck-not-found__"]}>
        <AuthProvider>
          <RouterApp />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(html).toContain("404");
    expect(html).toContain("That wave drifted out to sea.");
    expect(html).toContain('href="/"');
    expect(html).not.toContain("AI for your business, without the tech headache.");
  });
});
