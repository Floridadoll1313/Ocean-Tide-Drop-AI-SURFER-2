export function chooseFunnel(user: any) {
  const variant = Math.random() > 0.5 ? "A" : "B";

  return {
    variant,
    funnel:
      variant === "A"
        ? "fast_checkout"
        : "nurture_education_flow",
  };
}