export function getAutoMessage(intent: number) {
  if (intent > 80) {
    return {
      type: "urgent",
      message: "Your workflow is near full capacity. Upgrade now to avoid limits.",
    };
  }

  if (intent > 50) {
    return {
      type: "soft",
      message: "You're unlocking advanced features. Want full access?",
    };
  }

  return {
    type: "neutral",
    message: "Explore premium AI systems when you're ready.",
  };
}