export function mapRevenueSignal(event: {
  action: string;
  tier: string;
  page: string;
}) {
  const scoreMap: Record<string, number> = {
    view_locked: 5,
    click_upgrade: 25,
    checkout_start: 60,
    checkout_success: 100,
  };

  return {
    signal: event.action,
    value: scoreMap[event.action] || 1,
    segment: event.tier,
    page: event.page,
  };
}