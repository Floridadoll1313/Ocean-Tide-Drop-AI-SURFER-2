export function recoveryAction(user: {
  daysInactive: number;
  tier: string;
}) {
  if (user.daysInactive > 7) {
    return {
      channel: "email + whatsapp",
      message: "We saved your AI system — come back and unlock it",
    };
  }

  if (user.daysInactive > 3) {
    return {
      channel: "email",
      message: "Your AI tools are waiting for you",
    };
  }

  return {
    channel: "none",
    message: "",
  };
}