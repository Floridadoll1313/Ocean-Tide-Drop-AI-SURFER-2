import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const useAuthMock = vi.hoisted(() => vi.fn());

vi.mock("../context/AuthContext", () => ({
  useAuth: useAuthMock,
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...actual,
    Navigate: ({ state }: { state?: { from?: string } }) => (
      <div data-testid="redirect">{state?.from ?? "missing"}</div>
    ),
  };
});

async function renderRoute(initialEntry: string) {
  const { default: ProtectedRoute } = await import("./ProtectedRoute");
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <ProtectedRoute>
          <div data-testid="protected">Member product</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );
  });

  return { container, root };
}

afterEach(() => {
  useAuthMock.mockReset();
  document.body.replaceChildren();
});

describe("ProtectedRoute", () => {
  it("preserves the complete requested member URL when redirecting to login", async () => {
    useAuthMock.mockReturnValue({ loading: false, session: null });
    const { container, root } = await renderRoute(
      "/members/products/wave-scout?tab=setup#questions",
    );

    expect(container.innerHTML, "rendered html").toContain('data-testid="redirect"');
    expect(container.querySelector('[data-testid="redirect"]')?.textContent).toBe(
      "/members/products/wave-scout?tab=setup#questions",
    );

    await act(async () => root.unmount());
  });

  it("renders protected content for an authenticated session", async () => {
    useAuthMock.mockReturnValue({
      loading: false,
      session: { user: { id: "surfer-1" } },
    });
    const { container, root } = await renderRoute(
      "/members/products/wave-scout",
    );

    expect(container.querySelector('[data-testid="protected"]')?.textContent).toBe(
      "Member product",
    );

    await act(async () => root.unmount());
  });
});
