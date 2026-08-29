type Next = () => Promise<Response>;

const EXACT_APP_ROUTES = new Set([
  "/",
  "/pricing",
  "/wave-audit",
  "/wave-check",
  "/login",
  "/reset-password",
  "/launch-desk",
  "/members",
  "/dashboard",
  "/ai-dashboard",
]);

function isKnownRoute(pathname: string): boolean {
  if (EXACT_APP_ROUTES.has(pathname)) return true;
  if (pathname.startsWith("/members/")) return true;
  if (pathname.startsWith("/api/")) return true;
  return /\/[^/]+\.[^/]+$/.test(pathname);
}

export async function handleRouteStatus(request: Request, next: Next): Promise<Response> {
  const response = await next();
  const pathname = new URL(request.url).pathname;

  if (response.status !== 200 || isKnownRoute(pathname)) return response;

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: 404,
    statusText: "Not Found",
    headers,
  });
}
