import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const authMocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  resetPasswordForEmail: vi.fn(),
  signInWithOAuth: vi.fn(),
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
}));

vi.mock("../../lib/supabase", () => ({
  supabase: { auth: authMocks },
}));

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}${location.hash}`}</div>;
}

async function renderLogin(from: string) {
  const { default: Login } = await import("./Login");
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(
      <MemoryRouter initialEntries={[{ pathname: "/login", state: { from } }]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>,
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  return { container, root };
}

afterEach(() => {
  vi.clearAllMocks();
  window.sessionStorage.clear();
  document.body.replaceChildren();
});

describe("Login return navigation", () => {
  it("returns an existing session to the complete protected URL", async () => {
    authMocks.getSession.mockResolvedValue({
      data: { session: { user: { id: "surfer-1" } } },
      error: null,
    });

    const { container, root } = await renderLogin(
      "/launch-desk?tab=plan#risks",
    );

    expect(container.querySelector('[data-testid="location"]')?.textContent).toBe(
      "/launch-desk?tab=plan#risks",
    );

    await act(async () => root.unmount());
  });

  it("rejects an external return URL and falls back to members", async () => {
    authMocks.getSession.mockResolvedValue({
      data: { session: { user: { id: "surfer-1" } } },
      error: null,
    });

    const { container, root } = await renderLogin("https://example.com/phishing");

    expect(container.querySelector('[data-testid="location"]')?.textContent).toBe(
      "/members",
    );

    await act(async () => root.unmount());
  });
});
