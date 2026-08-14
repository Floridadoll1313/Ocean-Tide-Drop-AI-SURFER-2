# AI Wave Audit Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing AI Surfer landing experience into a revenue-focused Ocean Hybrid AI funnel centered on a five-question free AI Wave Audit that produces an immediate score, captures the lead for a full report, and recommends the next paid AI Surfer offer.

**Architecture:** Keep the existing React 19 + Vite + TypeScript application and reusable ocean visual components. Move the audit scoring rules into a pure library module, build the audit UI as a focused page/component, and connect the existing Supabase client through a small lead-capture helper so presentation is independent from persistence. Replace stale launch-focused landing content with the new revenue funnel while preserving useful members/shop routes and the existing AI Surfer visual system.

**Tech Stack:** React 19, TypeScript, Vite 8, React Router 7, Tailwind CSS 3, Framer Motion, Lucide React, Supabase JS.

## Global Constraints

- Use the existing Ocean Tide Drop AI SURFER logo at `/ocean_tide_logo.png` as the brand anchor.
- Use the approved Ocean Hybrid AI visual direction: deep-ocean blues, turquoise/cyan UI accents, warm sunrise/gold accents, restrained futuristic glows/grids, subtle wave motion.
- The hero headline is `Find the AI Opportunities Hiding in Your Business`.
- The primary CTA is `Get My Free AI Wave Audit →`.
- The audit contains exactly five questions.
- Show the score and teaser result before requesting email.
- Describe `AI Opportunity Score™` as a practical estimate based on answers, not a scientific measurement.
- Recommend exactly one primary AI Surfer product/agent in the result.
- Never expose server-only credentials in browser code.
- Preserve the existing members/shop experience and reusable landing components unless a change directly supports this funnel.
- Remove stale August 10, 2026 launch countdown behavior from the production landing experience.
- Keep scoring data structured so a later server-side/AI scoring service can replace the local implementation without changing the audit UI contract.

---

## File Map

- Create: `src/features/wave-audit/types.ts` for shared audit answer/result types.
- Create: `src/features/wave-audit/scoring.ts` for pure local scoring and agent recommendation rules.
- Create: `src/features/wave-audit/scoring.test.ts` for deterministic unit coverage of score bounds, category mapping, and recommendations.
- Create: `src/features/wave-audit/leadCapture.ts` for the Supabase lead persistence boundary.
- Create: `src/features/wave-audit/leadCapture.test.ts` for success/failure behavior using a mocked Supabase client.
- Create: `src/pages/wave-audit/WaveAudit.tsx` for the five-step scanner, teaser result, email gate, and full-report conversion state.
- Create: `src/pages/wave-audit/WaveAudit.test.tsx` for the user journey and key rendering states.
- Modify: `src/pages/landing/NewLanding.tsx` to become the revenue-focused landing page and launch the audit CTA instead of the expired countdown/member-first journey.
- Modify: `src/App.tsx` to route `/` to the new landing experience and `/wave-check` or `/wave-audit` to the audit page without removing the existing checkout behavior that other pages depend on.
- Modify: `src/components/landing/Navbar.tsx` only where necessary to make the primary navigation point toward the new funnel while preserving Pricing, Members, and Login destinations.
- Modify: `src/index.css` only for small, reusable Ocean Hybrid AI utility animations/styles that cannot be expressed cleanly with existing Tailwind classes.

---

### Task 1: Create the Wave Audit domain types and deterministic scoring engine

**Files:**
- Create: `src/features/wave-audit/types.ts`
- Create: `src/features/wave-audit/scoring.ts`
- Test: `src/features/wave-audit/scoring.test.ts`

**Interfaces:**
- `WaveAuditAnswers` contains `businessType`, `teamSize`, `timeDrain`, `lostOpportunity`, and `aiPriority` as string values.
- `AuditAgent` is one of `Wave Scout`, `Sales Rider`, `Content Creator`, `Customer Care Cove`, `Automation Architect`, or `Big Kahuna`.
- `WaveAuditResult` contains `score: number`, `topCategory: string`, `opportunities: string[]`, `recommendedAgent: AuditAgent`, and `confidenceLabel: string`.
- `calculateWaveAuditResult(answers: WaveAuditAnswers): WaveAuditResult` is a pure function with no browser, network, or Supabase dependency.

- [ ] **Step 1: Write failing score tests**

```ts
import { describe, expect, it } from "vitest";
import { calculateWaveAuditResult } from "./scoring";
import type { WaveAuditAnswers } from "./types";

const baseAnswers: WaveAuditAnswers = {
  businessType: "service",
  teamSize: "2-10",
  timeDrain: "repetitive",
  lostOpportunity: "leads",
  aiPriority: "sales",
};

describe("calculateWaveAuditResult", () => {
  it("keeps the score between 0 and 100", () => {
    const result = calculateWaveAuditResult(baseAnswers);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("maps lead-loss and sales-priority answers to Sales Rider", () => {
    const result = calculateWaveAuditResult({
      ...baseAnswers,
      lostOpportunity: "leads",
      aiPriority: "sales",
    });
    expect(result.recommendedAgent).toBe("Sales Rider");
    expect(result.topCategory).toBe("Lead & Sales Follow-Up");
  });

  it("maps repetitive workflow answers to Automation Architect", () => {
    const result = calculateWaveAuditResult({
      ...baseAnswers,
      timeDrain: "repetitive",
      lostOpportunity: "operations",
      aiPriority: "automation",
    });
    expect(result.recommendedAgent).toBe("Automation Architect");
  });

  it("uses Big Kahuna when multiple high-impact areas are selected", () => {
    const result = calculateWaveAuditResult({
      businessType: "multi-location",
      teamSize: "51+",
      timeDrain: "multiple",
      lostOpportunity: "multiple",
      aiPriority: "multiple",
    });
    expect(result.recommendedAgent).toBe("Big Kahuna");
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
npm test -- --run src/features/wave-audit/scoring.test.ts
```

Expected: FAIL because `types.ts` and `scoring.ts` do not yet exist.

- [ ] **Step 3: Implement the minimal typed domain model**

```ts
export type AuditAgent =
  | "Wave Scout"
  | "Sales Rider"
  | "Content Creator"
  | "Customer Care Cove"
  | "Automation Architect"
  | "Big Kahuna";

export interface WaveAuditAnswers {
  businessType: string;
  teamSize: string;
  timeDrain: string;
  lostOpportunity: string;
  aiPriority: string;
}

export interface WaveAuditResult {
  score: number;
  topCategory: string;
  opportunities: string[];
  recommendedAgent: AuditAgent;
  confidenceLabel: string;
}
```

- [ ] **Step 4: Implement scoring as a pure rules engine**

Use weighted answer maps and a small set of helper functions. The implementation must normalize the score to `0..100`, choose the highest-scoring category, return one or two human-readable opportunity strings, and select one agent. The special `multiple` path must allow `Big Kahuna` to win when the answer set indicates several high-impact areas.

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```bash
npm test -- --run src/features/wave-audit/scoring.test.ts
```

Expected: PASS for every test.

- [ ] **Step 6: Commit**

```bash
git add src/features/wave-audit/types.ts src/features/wave-audit/scoring.ts src/features/wave-audit/scoring.test.ts
git commit -m "feat: add AI Wave Audit scoring engine"
```

---

### Task 2: Add the Supabase lead-capture boundary

**Files:**
- Create: `src/features/wave-audit/leadCapture.ts`
- Test: `src/features/wave-audit/leadCapture.test.ts`

**Interfaces:**
- `LeadCapturePayload` contains `email`, `answers`, `result`, and `source`.
- `saveWaveAuditLead(payload: LeadCapturePayload): Promise<{ ok: true } | { ok: false; message: string }>`.
- The implementation consumes the existing `supabase` client from `src/lib/supabase.ts` and writes through one well-defined table operation.

- [ ] **Step 1: Write the failing lead-capture tests**

```ts
import { describe, expect, it, vi } from "vitest";
import { saveWaveAuditLead } from "./leadCapture";

const insert = vi.fn();

vi.mock("../../lib/supabase", () => ({
  supabase: {
    from: vi.fn(() => ({
      insert,
    })),
  },
}));

describe("saveWaveAuditLead", () => {
  it("returns ok when Supabase accepts the lead", async () => {
    insert.mockResolvedValueOnce({ error: null });

    const result = await saveWaveAuditLead({
      email: "surfer@example.com",
      answers: {
        businessType: "service",
        teamSize: "2-10",
        timeDrain: "repetitive",
        lostOpportunity: "leads",
        aiPriority: "sales",
      },
      result: {
        score: 82,
        topCategory: "Lead & Sales Follow-Up",
        opportunities: ["Faster lead response", "Automated follow-up"],
        recommendedAgent: "Sales Rider",
        confidenceLabel: "High opportunity",
      },
      source: "wave-audit",
    });

    expect(result).toEqual({ ok: true });
  });

  it("returns a retryable error without throwing", async () => {
    insert.mockResolvedValueOnce({ error: { message: "duplicate" } });

    const result = await saveWaveAuditLead({
      email: "surfer@example.com",
      answers: {
        businessType: "service",
        teamSize: "2-10",
        timeDrain: "repetitive",
        lostOpportunity: "leads",
        aiPriority: "sales",
      },
      result: {
        score: 70,
        topCategory: "Lead & Sales Follow-Up",
        opportunities: ["Faster lead response"],
        recommendedAgent: "Sales Rider",
        confidenceLabel: "Good opportunity",
      },
      source: "wave-audit",
    });

    expect(result.ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
npm test -- --run src/features/wave-audit/leadCapture.test.ts
```

Expected: FAIL because the capture module does not yet exist.

- [ ] **Step 3: Implement the persistence adapter**

Use a single insert call shaped approximately as:

```ts
const { error } = await supabase.from("wave_audit_leads").insert({
  email: payload.email.trim().toLowerCase(),
  answers: payload.answers,
  score: payload.result.score,
  top_category: payload.result.topCategory,
  opportunities: payload.result.opportunities,
  recommended_agent: payload.result.recommendedAgent,
  source: payload.source,
});
```

Catch unexpected exceptions and return `{ ok: false, message: "We couldn't save your report yet. Your results are still safe here. Please try again." }`.

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```bash
npm test -- --run src/features/wave-audit/leadCapture.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/wave-audit/leadCapture.ts src/features/wave-audit/leadCapture.test.ts
git commit -m "feat: add Wave Audit lead capture adapter"
```

---

### Task 3: Build the Wave Audit user experience

**Files:**
- Create: `src/pages/wave-audit/WaveAudit.tsx`
- Test: `src/pages/wave-audit/WaveAudit.test.tsx`

**Interfaces:**
- `WaveAudit` renders the five-question flow, calculates a result locally, shows the teaser before email, and persists the lead only after the user submits an email.
- It accepts no required props so the route can mount it directly.

- [ ] **Step 1: Write failing journey tests**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import WaveAudit from "./WaveAudit";

describe("WaveAudit", () => {
  it("starts with the first business question", () => {
    render(<WaveAudit />);
    expect(screen.getByText("What type of business do you run?")).toBeInTheDocument();
  });

  it("requires all five answers before showing the result", async () => {
    const user = userEvent.setup();
    render(<WaveAudit />);

    for (let index = 0; index < 5; index += 1) {
      const option = screen.getAllByRole("button")[1];
      await user.click(option);
      if (index < 4) {
        expect(screen.getByText(/Question/)).toBeInTheDocument();
      }
    }

    expect(screen.getByText(/AI Opportunity Score/)).toBeInTheDocument();
    expect(screen.getByText(/Unlock My Full AI Wave Report/)).toBeInTheDocument();
  });

  it("does not ask for email before the teaser is visible", () => {
    render(<WaveAudit />);
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
npm test -- --run src/pages/wave-audit/WaveAudit.test.tsx
```

Expected: FAIL because the page is not implemented.

- [ ] **Step 3: Implement the scanner shell**

Use five question definitions with typed keys. Track `step`, `answers`, `result`, `email`, `submitting`, and `submitError`. Each question should render as a simple tap/click card set. Do not expose the email field until `step === 5` and `result !== null`.

- [ ] **Step 4: Implement the teaser result**

The result state must visibly include:

```tsx
<div>
  <p>AI Opportunity Score™</p>
  <strong>{result.score}/100</strong>
  <p>A practical estimate based on the answers you provided.</p>
  <h3>Your Biggest Wave: {result.topCategory}</h3>
  {result.opportunities.map((item) => <p key={item}>{item}</p>)}
  <p>Recommended AI Surfer Agent: {result.recommendedAgent}</p>
</div>
```

The design should use the existing ocean components and Tailwind visual language rather than introducing a second design system.

- [ ] **Step 5: Add the post-teaser email gate**

Render an email form only after the teaser is visible. On submit, validate the browser email constraint, call `saveWaveAuditLead`, retain the result regardless of persistence success, and then show a full-report success state. On failure, show a retry message and keep the result visible.

- [ ] **Step 6: Add the paid Wave Audit upsell**

After successful email submission, show a primary CTA such as `Book Your Paid Wave Audit →`. Route it to the existing pricing/checkout path or a clearly labeled placeholder destination already supported by the application. Do not invent a new payment backend in this task.

- [ ] **Step 7: Add responsive and accessibility behavior**

Use semantic labels, visible focus states, keyboard-operable answer buttons, progress text such as `Question 3 of 5`, and mobile-first spacing. Keep the page usable at narrow widths without horizontal scrolling.

- [ ] **Step 8: Run the focused test and verify it passes**

Run:

```bash
npm test -- --run src/pages/wave-audit/WaveAudit.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/pages/wave-audit/WaveAudit.tsx src/pages/wave-audit/WaveAudit.test.tsx
 git commit -m "feat: build five-question AI Wave Audit"
```

---

### Task 4: Rebuild the landing page around the funnel

**Files:**
- Modify: `src/pages/landing/NewLanding.tsx`
- Modify: `src/index.css` only if the page needs one or two reusable animation utilities.

**Interfaces:**
- Landing page keeps importing `OceanBackground`, `SunriseGlow`, `BioluminescentParticles`, `Navbar`, and `ChatAgent` where useful.
- The primary CTA links to `/wave-audit`.

- [ ] **Step 1: Remove stale launch-specific state and copy**

Delete the expired countdown hook and any founding-member launch messaging tied to August 10, 2026. Do not replace it with another artificial deadline unless it is backed by a real campaign state.

- [ ] **Step 2: Replace the hero copy with the approved business outcome**

Use:

```tsx
<h1>Find the AI Opportunities Hiding in Your Business</h1>
<p>
  Discover where AI can help you capture more leads, follow up faster,
  reduce repetitive work, improve customer care, and create more content.
</p>
<Link to="/wave-audit">Get My Free AI Wave Audit →</Link>
<a href="#how-it-works">See How AI Surfer Works</a>
```

- [ ] **Step 3: Make the first post-hero section explain the value, not the technology**

Create five concise outcome cards for leads, sales, repetitive workflows, customer care, and content. Mention the AI Surfer agent ecosystem only after the outcome is clear.

- [ ] **Step 4: Add an explainer section for the funnel**

Show the three-step path:

```text
1. Scan your business
2. See your AI Opportunity Score™
3. Get your personalized next step
```

Add the disclaimer that the score is a practical estimate based on answers.

- [ ] **Step 5: Add the six-agent product bridge**

Present the six approved agents as a concise product ecosystem, with the audit naturally positioned as the first step into the ecosystem. Avoid pricing claims that have not been finalized.

- [ ] **Step 6: Replace the final member-first CTA with the audit CTA**

Use `Get My Free AI Wave Audit →` as the dominant final CTA. Keep the Members link available as a secondary path.

- [ ] **Step 7: Keep the supplied logo central to the visual hierarchy**

Reuse the existing Navbar logo path `/ocean_tide_logo.png`, already referenced by `Navbar.tsx`, and do not create a second competing logo treatment.

- [ ] **Step 8: Run the full test suite and build**

Run:

```bash
npm test -- --run
npm run build
```

Expected: all tests pass and `vite build` exits successfully.

- [ ] **Step 9: Commit**

```bash
git add src/pages/landing/NewLanding.tsx src/index.css
 git commit -m "feat: convert landing page to AI Wave Audit funnel"
```

---

### Task 5: Wire routing without breaking existing application behavior

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/landing/Navbar.tsx` only if route labels/links need adjustment.
- Test: `src/App.test.tsx` if the repository already supports application-level routing tests; otherwise add a focused route test next to the app entry.

**Interfaces:**
- `/` renders `NewLanding`.
- `/wave-audit` renders `WaveAudit`.
- `/wave-check` redirects to `/wave-audit` if that legacy path is already referenced by the existing landing page.
- Existing `/pricing`, `/members`, `/login`, and checkout-related behavior remain reachable.

- [ ] **Step 1: Add a route-level failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("application routes", () => {
  it("renders the Wave Audit at /wave-audit", () => {
    window.history.pushState({}, "", "/wave-audit");
    render(
      <MemoryRouter initialEntries={["/wave-audit"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/What type of business do you run/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the route test and verify the expected failure**

Run:

```bash
npm test -- --run src/App.test.tsx
```

Expected: FAIL until the route is wired.

- [ ] **Step 3: Replace the current monolithic App checkout render with route-aware rendering while preserving checkout functionality**

Refactor only enough to make routing explicit. Existing checkout logic can move into a local `CheckoutPage` component in the same file if that is the smallest safe change. Do not delete the checkout flow.

- [ ] **Step 4: Wire the approved routes**

Use `Routes` and `Route` from `react-router-dom` so `/` maps to `NewLanding`, `/wave-audit` maps to `WaveAudit`, and the legacy `/wave-check` path redirects to `/wave-audit`.

- [ ] **Step 5: Verify navigation manually in the test suite**

Run:

```bash
npm test -- --run
```

Expected: all existing and new tests pass.

- [ ] **Step 6: Build the application**

Run:

```bash
npm run build
```

Expected: Vite build succeeds with no TypeScript compilation errors.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/components/landing/Navbar.tsx src/App.test.tsx
 git commit -m "feat: route AI Wave Audit into the main app"
```

---

### Task 6: Production verification and funnel acceptance check

**Files:**
- Modify only the files required to fix verified test/build issues from earlier tasks.

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: no new lint errors introduced by the funnel work.

- [ ] **Step 2: Run the complete test suite**

```bash
npm test -- --run
```

Expected: all tests pass.

- [ ] **Step 3: Run the production build**

```bash
npm run build
```

Expected: successful production bundle.

- [ ] **Step 4: Acceptance-check the live funnel behavior**

Verify this exact sequence:

```text
/ → Get My Free AI Wave Audit → five questions → score/teaser → email gate → full-report success → paid Wave Audit CTA
```

Verify that an intentional Supabase failure still leaves the score visible and gives the user a retry path.

- [ ] **Step 5: Verify stale countdown messaging is gone**

Search the landing code for `2026-08-10`, `WE LAUNCH TONIGHT`, and `Founding Member spots are limited`. Expected: no production landing references remain.

- [ ] **Step 6: Verify secrets are not present in browser code**

Search the new funnel files for `service_role`, `SECRET`, or server-only credentials. Expected: none.

- [ ] **Step 7: Commit final verification fixes**

```bash
git status
git add <only-files-fixed-during-verification>
git commit -m "test: verify AI Wave Audit funnel"
```

## Self-Review Checklist

- Spec coverage: landing, five-question scanner, local score, teaser-before-email, Supabase capture, error retention, agent recommendation, paid Wave Audit CTA, responsive Ocean Hybrid AI visuals, and reuse of existing architecture are all represented above.
- Placeholder scan: no `TBD`, `TODO`, or hand-wavy implementation step is required.
- Type consistency: `WaveAuditAnswers`, `WaveAuditResult`, `AuditAgent`, and `saveWaveAuditLead` are defined before downstream tasks consume them.
- Scope: this plan intentionally excludes a new payment backend, AI inference provider, CRM integration, and full SaaS rewrite. Those are later waves.
