# Production Readiness Checklist

This checklist tracks what is present in GitHub and what still needs provider-side verification before Ocean Tide Drop AI SURFER is treated as production-ready.

## Official repository

Use this repository as the source of truth:

```text
Floridadoll1313/Ocean-Tide-Drop-AI-SURFER-2
```

Older Ocean Tide Drop / AI Surfer experiment repositories should be archived, renamed, or clearly labeled so future deployments point to the correct codebase.

## GitHub status

- [x] Core React/Vite/TypeScript source is present.
- [x] Express server entry is present in `server.ts`.
- [x] Firebase browser config is present and environment-variable aware.
- [x] Stripe checkout and webhook server routes are present.
- [x] Gemini API server routes are present.
- [x] `.env.example` exists.
- [x] `.gitignore` protects `.env` files and common secret file types.
- [x] Route/member/payment audit report exists at `docs/site-audit-2026-05-26.md`.
- [ ] `package-lock.json` is not present yet. Generate it from a trusted local/dev environment with `npm install` and commit it for reproducible builds.
- [ ] Deployment config such as `firebase.json`, `wrangler.toml`, or Cloudflare Pages project settings is not stored in this repo. Confirm the active hosting provider configuration outside GitHub.

## Provider-side settings to verify

### Firebase

- [ ] Production domain is listed in Firebase Authorized Domains.
- [ ] Firestore security rules match the intended member access model.
- [ ] Firebase Admin credentials are configured only in the server/hosting environment.
- [ ] Google sign-in works from the live production domain.

### Stripe

- [ ] `STRIPE_SECRET_KEY` is a live key for the intended Ocean Tide Drop account.
- [ ] `STRIPE_WEBHOOK_SECRET` matches the live webhook endpoint.
- [ ] Stripe webhook endpoint points to `/api/stripe/webhook`.
- [ ] Price IDs are set for:
  - `STRIPE_PRICE_ID_DAWN_PATROL`
  - `STRIPE_PRICE_ID_BREAKLINE`
  - `STRIPE_PRICE_ID_HATTERAS_ISLAND`
  - `STRIPE_PRICE_ID_CAPE_POINT`
- [ ] Test a successful checkout and verify Firestore user tier updates only from Stripe webhook events.
- [ ] Test a canceled checkout and verify no member upgrade is granted.

### Gemini

- [ ] `GEMINI_API_KEY` is configured in the server environment.
- [ ] The key is not exposed in client-side code.
- [ ] AI generation endpoints are rate-limit aware for production usage.

### Tip Jar / Tribute payments

- [ ] Confirm the real PayPal, Stripe Payment Link, or other donation URL.
- [ ] Replace simulated/interactive console behavior with the confirmed live payment link before collecting real payments.

### Hosting / deployment

- [ ] Confirm whether production runs static `dist` only or the Express server in `server.ts`.
- [ ] If static-only, ensure API routes are provided separately by serverless functions or another backend.
- [ ] If Express server, ensure the platform can run or compile TypeScript server code.
- [ ] Confirm build command: `npm run build`.
- [ ] Confirm output directory for static hosting: `dist`.
- [ ] Confirm environment variables are configured in the host dashboard, not committed to GitHub.

## GitHub Actions / CI

The workflow file may need GitHub App workflow-write permission before it can be updated by automation.

Recommended CI steps:

```text
npm install
npm run lint
npm run build
```

Do not run `npm test` unless a `test` script is added to `package.json`.

## Merge order

1. Merge the route/member/payment fix PR.
2. Deploy to staging or production.
3. Verify live routes and login/checkout flows in a browser.
4. Commit a generated `package-lock.json` from a clean trusted environment.
5. Clean up or archive duplicate repos after confirming the production deployment source.
