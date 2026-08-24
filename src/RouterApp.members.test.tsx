import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RouterApp from "./RouterApp";

vi.mock("./context/AuthContext", () => ({
  useAuth: () => ({
    session: { user: { id: "surfer-1", email: "surfer@example.com" } },
    user: { id: "surfer-1", email: "surfer@example.com" },
    loading: false,
    signOut: vi.fn(),
  }),
}));

describe("members route", () => {
  it("shows the dashboard to an authenticated surfer without a second broken gate", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/members"]}>
        <RouterApp />
      </MemoryRouter>,
    );

    expect(html).toContain("Welcome to your AI-Surfer Dashboard.");
    expect(html).not.toContain("Verifying your membership");
  });
});
