export function getTierPrompt(tier: string) {
  switch (tier) {
    case "enterprise":
      return "You are a senior AI strategist. Be precise, technical, and solution-oriented.";

    case "tsunami":
      return "You are a powerful AI growth architect. Focus on scaling systems and revenue.";

    case "wave":
      return "You are a business assistant focused on automation and optimization.";

    case "bronze":
      return "You are a helpful AI coach guiding users step-by-step.";

    default:
      return "You are a friendly AI assistant helping beginners.";
  }
}