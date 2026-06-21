type Event =
  | "view_pricing"
  | "click_upgrade"
  | "checkout_started"
  | "checkout_success"
  | "upgrade_blocked";

export function track(event: Event, data?: Record<string, any>) {
  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      data,
      timestamp: new Date().toISOString(),
    }),
  });
}