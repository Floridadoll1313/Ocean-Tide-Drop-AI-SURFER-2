# Ocean Tide Drop AI SURFER

Official source repository for the Ocean Tide Drop / AI Surfer marketing agency web app.

> Source of truth: `Floridadoll1313/Ocean-Tide-Drop-AI-SURFER-2`

## What this app is

Ocean Tide Drop AI SURFER is a cinematic React + Vite + TypeScript site for the AI Surfer marketing agency. It includes public brand pages, Ocean Tide Drop service pages, pricing, member access, AI assistant features, Firebase authentication, and Stripe checkout integration.

## Current stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS / custom CSS
- Express server in `server.ts`
- Firebase Auth + Firestore
- Firebase Admin SDK on the server
- Stripe checkout + webhook support
- Gemini API support through `@google/genai`
- GitHub Actions / SonarCloud workflow

## Main app files

```text
src/
  App.tsx                    Route map and page shell
  main.tsx                   Vite/React entry point
  index.css                  Global styles
  components/                Shared UI components
  hooks/useAuth.tsx          Firebase auth/user state
  lib/firebase.ts            Firebase browser client config
  pages/                     Public pages, member pages, ocean pages
server.ts                    Express API + production static server
vite.config.ts               Vite build config
.env.example                 Environment variable template
```

## Key routes

- `/` — Home
- `/services` — Services
- `/pricing` — Pricing
- `/members` — Members area
- `/members/monetization` — Member upgrade/monetization page
- `/tip-jar` — Tribute / Tip Jar page
- `/ocean` — Ocean Tide Drop service home
- `/ocean-services` — Ocean services
- `/ocean-reports` — Ocean reports
- `/ocean-cases` — Case studies
- `/ocean-roi` — ROI calculator
- `/ocean-contact` — Ocean contact
- `/surfer` and `/ai-surfer` — AI Surfer page
- `/support` — Support
- `/privacy` — Privacy policy
- `/terms` — Terms of service

Compatibility redirects are kept for older links such as `/tipjar`, `/dashboard`, `/ai-dashboard`, `/oas-6`, and `/ai-surfer-ocean-tide-drop`.

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Environment variables

Copy `.env.example` to a local `.env` file and fill in real provider values. Do not commit real secrets.

Required/expected values include:

```text
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
ADMIN_SECRET=
GEMINI_API_KEY=
STRIPE_PRICE_ID_DAWN_PATROL=
STRIPE_PRICE_ID_BREAKLINE=
STRIPE_PRICE_ID_HATTERAS_ISLAND=
STRIPE_PRICE_ID_CAPE_POINT=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Provider-side items to verify before accepting live payments:

- Firebase Authorized Domains include the production domain.
- Stripe live secret key, webhook secret, and price IDs belong to the intended Ocean Tide Drop account.
- Stripe webhook points to `/api/stripe/webhook` on the production host.
- Gemini API key is configured only in the server environment.
- Tip Jar/Tribute payment link is replaced with a confirmed PayPal or Stripe link before real collection.

## Deployment notes

This repo contains the app and server source. Cloudflare Pages, Firebase Hosting, or another host may still require project settings outside the repo.

Recommended production build command:

```bash
npm run build
```

Recommended output directory for static-only hosting:

```text
dist
```

If deploying the Express server, ensure the production platform runs `server.ts` through a TypeScript-capable runtime/build step, or compile the server before starting it.

## GitHub hygiene

- Keep this repo as the official production source.
- Keep real secrets out of GitHub.
- Use branches and pull requests for fixes.
- Archive or label older duplicate Ocean/AI Surfer experiment repos so this source of truth stays clear.

## Current readiness notes

See `docs/production-readiness-checklist.md` for the remaining production checklist.
See `docs/site-audit-2026-05-26.md` for the route/member/payment audit and fixes.
