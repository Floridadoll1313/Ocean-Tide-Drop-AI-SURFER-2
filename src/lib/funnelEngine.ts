export function adjustFunnel(user: any) {
  if (user.intentScore > 80) {
    return {
      funnel: "fast_track_checkout",
      steps: 1,
    };
  }

  if (user.intentScore > 40) {
    return {
      funnel: "standard_nurture",
      steps: 3,
    };
  }

  return {
    funnel: "education_mode",
    steps: 5,
  };
}