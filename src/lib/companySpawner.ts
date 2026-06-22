export function spawnCompany(trigger: {
  userDemand: number;
  revenueSignal: number;
}) {
  const companies = [];

  if (trigger.userDemand > 80) {
    companies.push("AI automation studio");
  }

  if (trigger.revenueSignal > 1000) {
    companies.push("AI marketing optimizer SaaS");
  }

  if (trigger.userDemand > 90 && trigger.revenueSignal > 2000) {
    companies.push("Autonomous content generator platform");
  }

  return {
    spawnedCompanies: companies,
    status: "active_creation_cycle",
  };
}