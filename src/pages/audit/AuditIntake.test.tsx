import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import AuditIntake from "./AuditIntake";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ session: { access_token: "test-token" } }),
}));

describe("AuditIntake", () => {
  it("renders the paid AEO audit intake shell", () => {
    const html = renderToStaticMarkup(<AuditIntake />);
    expect(html).toContain("Paid AEO Wave Audit Intake");
    expect(html).toContain("Verifying your paid audit");
  });
});
