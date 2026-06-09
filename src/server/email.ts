import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({
  email,
  tier,
  name,
}: {
  email: string;
  tier: string;
  name?: string;
}) {
  return await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: email,
    subject: "🌊 Welcome to Ocean Tide Drop AI",
    html: `
      <div style="font-family:Arial;padding:20px">
        <h1>Welcome to the Tide 🌊</h1>
        <p>Hey ${name || "Creator"},</p>

        <p>Your system is now ACTIVE.</p>

        <p><b>Tier:</b> ${tier}</p>

        <p>Your AI onboarding has begun. Your workflows, systems, and automation layer are being prepared.</p>

        <br/>

        <p>— Ocean Tide Drop AI SURFER</p>
      </div>
    `,
  });
}