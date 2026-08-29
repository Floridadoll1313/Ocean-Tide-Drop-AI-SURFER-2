import { describe, expect, it, vi } from "vitest";
import { handleRouteStatus } from "./route-status";

function request(path: string) {
  return new Request(`https://otdaisurfer.surf${path}`);
}

describe("handleRouteStatus", () => {
  it.each(["/", "/pricing", "/login", "/members/products/wave-scout"])(
    "keeps known application route %s successful",
    async (path) => {
      const next = vi.fn(async () => new Response("app shell", { status: 200 }));

      const response = await handleRouteStatus(request(path), next);

      expect(response.status).toBe(200);
      expect(await response.text()).toBe("app shell");
    },
  );

  it("returns the app shell with a real 404 status for unknown routes", async () => {
    const next = vi.fn(async () =>
      new Response("app shell", {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }),
    );

    const response = await handleRouteStatus(
      request("/__healthcheck-not-found__"),
      next,
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(await response.text()).toBe("app shell");
  });

  it("preserves static assets and existing error responses", async () => {
    const assetResponse = await handleRouteStatus(
      request("/assets/app.js"),
      async () => new Response("js", { status: 200 }),
    );
    const missingResponse = await handleRouteStatus(
      request("/missing.png"),
      async () => new Response("missing", { status: 404 }),
    );

    expect(assetResponse.status).toBe(200);
    expect(missingResponse.status).toBe(404);
  });
});
