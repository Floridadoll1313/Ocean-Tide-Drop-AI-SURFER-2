# Safe API Placeholder Setup

This repository is prepared for API integrations without storing live secrets in code.

## Safety rule

Never commit real API keys, tokens, webhooks, or embed secrets to GitHub. Add rotated values only in the hosting provider's environment variable dashboard.

## Zapier MCP placeholders

Install the SDK in the project when you are ready to use MCP:

```bash
npm install @modelcontextprotocol/sdk
```

Use these server-only environment variables:

```bash
ZAPIER_MCP_SERVER_URL=
ZAPIER_MCP_EMBED_SECRET=
```

The embed secret must stay server-side. Do not place it in any `VITE_` variable or frontend component.

## Other placeholders added to .env.example

- OpenAI / Gemini / Google API placeholders
- Supabase frontend and server placeholders
- Stripe placeholders for backend checkout only
- GitHub, Cloudflare, GitGuardian, Sonar, Render, Grafana, and MCP placeholders

## Current support flow

Ocean Tide Drop / AI Surfer public support should continue pointing visitors to the PayPal Tip Jar. Stripe secrets should not be used on the public frontend.
