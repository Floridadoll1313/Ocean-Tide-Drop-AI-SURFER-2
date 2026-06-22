export function triggerDeployment(reason: string) {
  console.log("🚀 Deploying update:", reason);

  // webhook to Vercel / Netlify / Cloudflare
  return {
    status: "deployment_triggered",
    reason,
  };
}