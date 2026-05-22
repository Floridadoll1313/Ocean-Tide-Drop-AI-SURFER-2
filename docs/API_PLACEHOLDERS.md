# Safe API / Secret Setup

This repository is prepared for API integrations without storing live secrets in code.

## Safety rule

Never commit real API keys, tokens, webhooks, or embed secrets to GitHub. Put real values only in the hosting provider's environment variable or secret dashboard.

If a value was pasted into chat, a public issue, a commit, or any frontend file, treat it as exposed. You can still test the site first if you choose, but plan to rotate the exposed values after testing.

## Where each value belongs

### Cloudflare Pages — frontend build variables

Use Cloudflare Pages settings for build-time variables that the browser is allowed to see. These must be restricted in their provider dashboards.

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_GOOGLE_API_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_STRIPE_PRICE_ID=
```

Do not put server-only secrets in any variable that starts with `VITE_`.

### Cloudflare Worker — backend secrets

Use Worker secrets / variables for backend-only values. These are read by backend code, not React client code.

```bash
OPENAI_API_KEY=
GEMINI_API_KEY=
GOOGLE_API_KEY=
ANTHROPIC_API_KEY=
ZAPIER_MCP_SERVER_URL=
ZAPIER_MCP_EMBED_SECRET=
STRIPE_SECRET_KEY=
STRIPE_RESTRICTED_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_DAWN_PATROL=
STRIPE_PRICE_ID_BREAKLINE=
STRIPE_PRICE_ID_HATTERAS_ISLAND=
STRIPE_PRICE_ID_CAPE_POINT=
SUPABASE_SERVICE_ROLE_KEY=
GITHUB_TOKEN=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
GITGUARDIAN_API_KEY=
SONAR_TOKEN=
SONAR_HOST_URL=
RENDER_API_KEY=
GRAFANA_TOKEN=
MCP_API_KEY=
ADMIN_SECRET=
NODE_ENV=production
```

The Zapier MCP embed secret, Stripe secret key, Stripe webhook secret, Supabase service role key, OpenAI key, GitHub token, Cloudflare token, and security-tool tokens must stay server-side only.

### Vercel — only if this project is deployed there too

If Vercel is also connected, add the same values in Vercel Project Settings → Environment Variables:

- frontend/build variables: `VITE_*`
- backend/server variables: OpenAI, Gemini, Stripe secret/webhook, Supabase service role, Zapier MCP, GitHub, Cloudflare, GitGuardian, Sonar, Render, Grafana, MCP, and admin values

Mark secrets as sensitive when Vercel offers that option.

## Current support flow

Ocean Tide Drop / AI Surfer public support should continue pointing visitors to the PayPal Tip Jar. Stripe secrets should not be used on the public frontend.

## Local development

For local testing only, use `.env` or `.dev.vars`. These files are now ignored by git, while `.env.example` remains safe to commit as a placeholder list.
