export function FounderSwarm(opportunities: string[]) {
  return opportunities.map((idea) => ({
    founderAI: `agent-${Math.random().toString(36).slice(2, 8)}`,
    startup: idea,
    stage: "auto_prototyping",
    confidence: Math.floor(Math.random() * 40 + 60),
  }));
}