import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RouterApp from "./RouterApp";

vi.mock("./context/AuthContext", () => ({
  useAuth: () => ({
    session: { user: { id: "surfer-1", email: "surfer@example.com", app_metadata: { role: "owner" } } },
    user: { id: "surfer-1", email: "surfer@example.com", app_metadata: { role: "owner" } },
    loading: false,
    signOut: vi.fn(),
  }),
}));

describe("members route", () => {
  it("shows the dashboard over the members command-deck background", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/members"]}>
        <RouterApp />
      </MemoryRouter>,
    );

    expect(html).toContain("Welcome to your AI-Surfer Dashboard.");
    expect(html).toContain(
      'background-image:url(&quot;/OTD-AI-Surfer-Members-bg.png&quot;)',
    );
    expect(html).toContain("<strong>Owner</strong>");
    expect(html).not.toContain("Verifying your membership");
  });

  it("opens a product for an authenticated surfer without asking them to sign in again", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/members/products/wave-scout"]}>
        <RouterApp />
      </MemoryRouter>,
    );

    expect(html).toContain("Loading your product access");
    expect(html).toContain(
      'background-image:url(&quot;/OTD-AI-Surfer-Members-bg.png&quot;)',
    );
    expect(html).not.toContain("Verifying your membership");
    expect(html).not.toContain("Members only");
    expect(html).not.toContain("Sign in");
  });
});
