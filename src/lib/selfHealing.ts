export function selfHeal(systemState: {
  errorRate: number;
  uptime: number;
}) {
  if (systemState.errorRate > 0.1) {
    return {
      action: "rollback_last_deploy",
    };
  }

  if (systemState.uptime < 0.95) {
    return {
      action: "restart_services",
    };
  }

  return {
    action: "stable",
  };
}