import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ session: null, loading: false }),
}));

import ProtectedRoute from "./ProtectedRoute";

const submissionId = "5ed95f2f-1321-4aa8-bc88-f8f952cc6975";

function LoginStateProbe() {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "missing";
  return <div>{from}</div>;
}

beforeEach(() => {
  window.sessionStorage.clear();
});

describe("ProtectedRoute AEO checkout handoff", () => {
  it("moves the tab-scoped submission id into the auth return URL", () => {
    window.sessionStorage.setItem(
      "ai-surfer:aeo-checkout-context",
      JSON.stringify({ submissionId, email: "surfer@example.com" }),
    );

    const html = renderToString(
      <MemoryRouter initialEntries={["/audit/checkout"]}>
        <Routes>
          <Route
            path="/audit/checkout"
            element={
              <ProtectedRoute>
                <div>checkout</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginStateProbe />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(html).toContain(`/audit/checkout?submission_id=${submissionId}`);
  });
});
