export function triggerUnlock(tier: string) {
  window.dispatchEvent(
    new CustomEvent("tier-unlocked", {
      detail: {
        tier,
        time: Date.now(),
      },
    })
  );
}