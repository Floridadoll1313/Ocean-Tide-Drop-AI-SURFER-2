# AI Surfer / Ocean Tide Drop

AI Surfer / Ocean Tide Drop is a neon-ocean React application for AI-powered services, memberships, pricing, Google Workspace tooling, Stripe subscriptions, and Firebase-backed member experiences.

The app is built as a Vite single-page application with an Express server that provides API routes and serves the Vite app in development or the built `dist/` app in production.

## Tech stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS 4 via `@tailwindcss/vite`
- React Router
- Firebase Auth / Firestore / Storage / Messaging
- Google GenAI server API integration
- Google Workspace REST API helpers
- Stripe Checkout and webhooks
- Vitest test runner

## Repository structure

```text
.
├── index.html                 # Vite HTML entrypoint and SEO/social metadata
├── server.ts                  # Express API server + Vite middleware/static hosting
├── package.json               # npm scripts and dependency declarations
├── vite.config.ts             # Vite React/Tailwind configuration
├── vitest.config.ts           # Vitest configuration
├── eslint.config.js           # ESLint flat config
├── firestore.rules            # Firestore security rules
├── public/                    # Static files served from the site root
└── src/
    ├── main.tsx               # React bootstrap only
    ├── App.tsx                # Auth provider, router, and route table
    ├── index.css              # Global Tailwind import, theme tokens, utilities, animations
    ├── components/            # Shared UI and app-shell components
    ├── hooks/                 # Custom React hooks, especially useAuth
    ├── lib/                   # Service client setup such as Firebase and Supabase
    ├── pages/                 # Route-level page components
    ├── services/              # API helper modules, including Google Workspace helpers
    ├── assets/                # Imported images/assets
    └── __tests__/             # Vitest tests
```

## Important files

### `src/main.tsx`

Bootstraps the React app. Keep this file side-effect free: it should import React, `App`, global CSS, and render the app into `#root`.

### `src/App.tsx`

The main SPA route map. New top-level pages should usually be added here and then linked from the shared navigation when appropriate.

### `src/components/PageWrapper.tsx`

The primary app shell used by pages. It provides the fixed sidebar, navigation links, search shortcut, theme toggle, auth/profile controls, and global visual treatment.

### `src/hooks/useAuth.tsx`

Firebase Auth context. It tracks the current user, Firestore user profile, Google OAuth access token, loading state, errors, Google login, anonymous guest login, and logout.

### `src/lib/firebase.ts`

Central Firebase browser-client setup. Firebase config is read from Vite environment variables, not from a hard-coded config file.

### `server.ts`

Express server for backend concerns:

- Gemini content generation endpoints
- Streaming Gemini endpoint
- Stripe webhook handling
- Stripe Checkout session creation
- Dynamic pricing tier seeding in Firestore
- Development Vite middleware
- Production static asset serving

### `src/services/googleWorkspaceService.ts`

Google Workspace helper functions that use an OAuth access token to call Calendar, Tasks, Chat, Sheets, Slides, Docs, Gmail, Keep, Drive, and Forms APIs.

## App areas

### Public marketing pages

Most public pages live under `src/pages/*`, including home, services, contact, gallery, reviews, legal pages, shop, lore, ocean service pages, and support pages.

### Members area

Members routes are defined in `src/App.tsx`:

- `/members`
- `/members/monetization`
- `/members/sync`
- `/members/tool/:toolId`

Tool access is tier-gated in `src/components/ToolSelector.tsx` using `basic`, `premium`, and `enterprise` tiers from the authenticated user profile.

### Pricing and subscriptions

Pricing tiers are read from Firestore via server routes, seeded by `server.ts` if the `pricing_tiers` collection is empty, and connected to Stripe Checkout through `/api/create-checkout-session` and `/api/stripe/create-checkout-session`.

Stripe webhooks update Firestore user subscription fields and write payment records.

### AI features

The browser entrypoint does not call AI APIs directly. AI generation should go through the Express endpoints in `server.ts`:

- `POST /api/ai/generate`
- `POST /api/ai/generate-stream`

### Firebase data

The active Firebase setup is `src/lib/firebase.ts`. Do not reintroduce hard-coded Firebase config files under `src/`. Use Vite environment variables instead.

## Environment variables

Create a local `.env` file as needed. Exact values depend on your Firebase, Stripe, Gemini, and Supabase projects.

```bash
# Firebase browser client
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Gemini server API
GEMINI_API_KEY=

# Stripe server integration
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_DAWN_PATROL=
STRIPE_PRICE_ID_BREAKLINE=
STRIPE_PRICE_ID_HATTERAS_ISLAND=
STRIPE_PRICE_ID_CAPE_POINT=

# Supabase client, currently optional unless you wire Supabase-backed features
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Development

Install dependencies:

```bash
npm install
```

Run the Express + Vite development server:

```bash
npm run dev
```

Build the production app:

```bash
npm run build
```

Preview a production build with Vite:

```bash
npm run preview
```

Run tests:

```bash
npm test -- --run
```

Run coverage:

```bash
npm run test:coverage
```

Run linting:

```bash
npm run lint
```

## Testing notes

Vitest is configured in `vitest.config.ts` with:

- globals enabled
- `jsdom` environment
- V8 coverage provider
- text and lcov coverage reports

The current test folder contains starter tests. Add focused tests for routing, auth-gated UI, pricing checkout behavior, and Google Workspace service error handling as those areas evolve.

## Deployment notes

Production mode serves the built Vite output from `dist/` through `server.ts`. Make sure your deployment platform:

1. Installs npm dependencies.
2. Runs `npm run build`.
3. Starts the server with the appropriate Node command for your platform.
4. Provides Firebase, Gemini, and Stripe environment variables.
5. Configures Stripe webhooks to point at `/api/stripe/webhook`.

## Conventions for future changes

- Keep browser bootstrap code in `src/main.tsx` minimal and side-effect free.
- Add route-level screens under `src/pages/` and register them in `src/App.tsx`.
- Put reusable UI in `src/components/`.
- Put provider/client setup in `src/lib/`.
- Put external API wrappers in `src/services/`.
- Keep secrets out of committed source files; use environment variables.
- Prefer server API routes for secret-bearing integrations such as Gemini and Stripe.
