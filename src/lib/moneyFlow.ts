export function trackMoneyFlow(event: {
  type: string;
  value?: number;
}) {
  const flow = {
    event: type,
    revenueImpact: event.value || 0,
    timestamp: Date.now(),
  };

  window.dispatchEvent(
    new CustomEvent("money-flow", { detail: flow })
  );

  console.log("💰 MONEY FLOW:", flow);
}