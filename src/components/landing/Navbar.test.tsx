import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";

const authState = vi.hoisted(() => ({
  loading: false,
  user: null as null | { id: string; email: string },
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    loading: authState.loading,
    user: authState.user,
  }),
}));

describe("landing Navbar", () => {
  it("sends an authenticated surfer to their dashboard instead of asking them to enter again", () => {
    authState.user = { id: "surfer-1", email: "surfer@example.com" };

    const html = renderToStaticMarkup(<MemoryRouter><Navbar /></MemoryRouter>);

    expect(html).toContain("My Dashboard");
    expect(html).not.toContain("Enter Harbor");
  });

  it("offers the harbor login to a signed-out visitor", () => {
    authState.user = null;

    const html = renderToStaticMarkup(<MemoryRouter><Navbar /></MemoryRouter>);

    expect(html).toContain("Enter Harbor");
  });
});
