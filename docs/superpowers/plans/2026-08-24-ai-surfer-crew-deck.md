# AI SURFER Crew Deck Implementation Plan

> **Execution note:** Implement this plan inline with test-driven development. Complete each task's red/green/refactor cycle and verify the checkpoint before moving on.

**Goal:** Deliver the approved six-agent Crew Deck on the live Ocean Tide Drop AI SURFER site with shared business context, current web research, Supabase persistence, tier enforcement, and approval-gated email.

**Architecture:** The React/Vite members area calls same-origin Cloudflare Pages Functions. The Functions validate the Supabase JWT, enforce tier and usage rules, and run six focused OpenAI Agents SDK agents. Supabase stores member-owned profiles, projects, messages, sources, assets, approvals, usage, and delivery state under direct `auth.uid()` Row Level Security. Big Kahuna uses the other five agents as bounded tools. Resend executes only an immutable, approved email snapshot.

**Current official guidance checked:** [OpenAI Agents SDK](https://developers.openai.com/api/docs/guides/agents), [OpenAI orchestration](https://developers.openai.com/api/docs/guides/agents/orchestration), [OpenAI guardrails and approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals), [Cloudflare Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/), [Cloudflare Pages bindings](https://developers.cloudflare.com/pages/functions/bindings/), and [Cloudflare human-in-the-loop patterns](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/).

---

## Task 1: Pin the runtime and add Cloudflare test scaffolding

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `wrangler.jsonc`
- Create: `functions/_shared/env.ts`
- Create: `tests/crewEnv.test.ts`
- Modify: `.env.example`

**Step 1: Write the failing environment test**

Add tests asserting that the environment parser:

- requires `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, and `FROM_EMAIL`;
- defaults `OPENAI_MODEL` to `gpt-5.6-terra`;
- never serializes secret values in thrown errors.

**Step 2: Run the test to verify red**

Run: `npm test -- tests/crewEnv.test.ts --run`  
Expected: FAIL because `functions/_shared/env.ts` does not exist.

**Step 3: Add dependencies and configuration**

- Pin `@openai/agents` to the lockfile-resolved version rather than `latest`.
- Add `resend` as a production dependency; the repository already imports it but does not declare it.
- Add `wrangler` and `@cloudflare/workers-types` as development dependencies.
- Configure `wrangler.jsonc` with the Pages build directory, compatibility date `2026-08-24`, generated types, and observability.
- Do not hardcode secrets.
- Implement a typed environment parser.
- Document the server bindings in `.env.example` without values.

**Step 4: Run green verification**

Run: `npm test -- tests/crewEnv.test.ts --run && npm run build`  
Expected: PASS.

**Step 5: Commit**

`git add package.json package-lock.json wrangler.jsonc functions/_shared/env.ts tests/crewEnv.test.ts .env.example && git commit -m "chore: configure Crew Engine runtime"`

---

## Task 2: Centralize the six-agent catalog and entitlements

**Files:**
- Create: `src/crew/catalog.ts`
- Create: `src/crew/types.ts`
- Create: `src/crew/entitlements.ts`
- Create: `tests/crewCatalog.test.ts`
- Modify: `src/pages/members/MembersDashboard.tsx`
- Modify: `src/pages/members/MemberProduct.tsx`
- Modify: `src/pages/members/MemberProduct.test.tsx`

**Step 1: Write failing catalog tests**

Assert:

- exactly six crew agents exist with stable slugs;
- all tier names match the live catalog;
- Starter Access unlocks Wave Scout and Sales Rider;
- Innovator Tier adds Content Creator and Customer Care Cove;
- Console Tier adds Automation Architect;
- Full Takeover and Owner unlock Big Kahuna and all six;
- Member unlocks none;
- Owner does not require a `public.users` tier row.

**Step 2: Run red**

Run: `npm test -- tests/crewCatalog.test.ts src/pages/members/MemberProduct.test.tsx --run`  
Expected: FAIL because the shared catalog does not exist.

**Step 3: Implement the shared catalog**

Move crew names, slugs, icons, descriptions, minimum tiers, guided starters, and rank mapping into typed shared configuration. Make dashboard and product access use the same source of truth. Preserve the three non-crew plan/report products in the existing product registry.

**Step 4: Run green**

Run: `npm test -- tests/crewCatalog.test.ts src/pages/members/MemberProduct.test.tsx --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/crew src/pages/members/MembersDashboard.tsx src/pages/members/MemberProduct.tsx src/pages/members/MemberProduct.test.tsx tests/crewCatalog.test.ts && git commit -m "refactor: centralize Crew Deck entitlements"`

---

## Task 3: Add the tenant-safe Supabase Crew schema

**Files:**
- Create: `supabase/migrations/202608240001_create_crew_deck.sql`
- Create: `supabase/tests/crew_deck_rls.sql`
- Create: `src/crew/database.types.ts`
- Create: `docs/crew-deck/DATA_MODEL.md`

**Step 1: Write the SQL validation script first**

The validation must fail until the migration exists and assert:

- every tenant table has RLS enabled;
- every tenant policy resolves ownership using `auth.uid() = auth_id`;
- anonymous reads and writes are denied;
- one business profile per `auth_id`;
- approval execution and outbound idempotency keys are unique;
- tier entitlement rows contain the approved agent mapping;
- usage reservation rejects locked agents and exhausted allowances.

**Step 2: Create the migration**

Create:

- `business_profiles`
- `crew_projects`
- `agent_runs`
- `agent_messages`
- `research_sources`
- `crew_leads`
- `content_assets`
- `approval_requests`
- `outbound_messages`
- `usage_events`
- `crew_plan_entitlements`

Use UUID primary keys, `auth_id uuid not null references auth.users(id) on delete cascade`, timestamps, explicit status checks, indexes for user/project/date access, and JSONB only where the shape is intentionally variable.

Add functions:

- `reserve_crew_run(agent_slug text)` for atomic tier and monthly usage enforcement;
- `release_failed_crew_run(run_id uuid)` so a run that produces no useful result does not consume allowance;
- `approve_email(approval_id uuid, expected_version integer)` to atomically snapshot the draft;
- `claim_approved_email(approval_id uuid, idempotency_key text)` to prevent duplicate execution.

The functions must use `auth.uid()`, fixed `search_path`, strict input validation, and least-privilege grants.

**Step 3: Apply on a Supabase preview branch**

Create a Supabase branch, apply the migration there, and run the validation SQL. Do not apply to production yet.

Expected: all RLS, constraint, RPC, and cross-tenant checks PASS.

**Step 4: Generate TypeScript types**

Generate project types and commit the Crew table subset in `src/crew/database.types.ts`.

**Step 5: Commit**

`git add supabase src/crew/database.types.ts docs/crew-deck/DATA_MODEL.md && git commit -m "feat: add tenant-safe Crew Deck schema"`

---

## Task 4: Build authenticated Cloudflare request context

**Files:**
- Create: `functions/_shared/auth.ts`
- Create: `functions/_shared/http.ts`
- Create: `functions/_shared/supabase.ts`
- Create: `tests/crewAuth.test.ts`

**Step 1: Write failing auth tests**

Cover:

- missing authorization header → 401;
- expired or invalid JWT → 401;
- valid JWT → authenticated `authId`;
- owner role comes only from verified JWT app metadata;
- non-owner tier comes from the caller's own `public.users.auth_id` row;
- missing tier row falls back to Member;
- error responses do not expose tokens or internal provider messages.

Mock Supabase network calls at the fetch boundary.

**Step 2: Run red**

Run: `npm test -- tests/crewAuth.test.ts --run`  
Expected: FAIL.

**Step 3: Implement**

Create a request-scoped Supabase client using the public project URL, anon key, and caller bearer token. Validate with `auth.getUser(token)`; do not trust a decoded JWT without verification. Return typed JSON and SSE helpers with request IDs generated by `crypto.randomUUID()`.

Do not use module-level mutable request state.

**Step 4: Run green**

Run: `npm test -- tests/crewAuth.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add functions/_shared tests/crewAuth.test.ts && git commit -m "feat: authenticate Crew Engine requests"`

---

## Task 5: Implement business-profile and project repositories

**Files:**
- Create: `src/server/crew/schemas.ts`
- Create: `functions/_shared/repositories/businessProfiles.ts`
- Create: `functions/_shared/repositories/projects.ts`
- Create: `functions/api/crew/profile.ts`
- Create: `functions/api/crew/projects.ts`
- Create: `tests/crewProfileApi.test.ts`
- Create: `tests/crewProjectsApi.test.ts`

**Step 1: Write failing API tests**

Profile tests:

- GET returns only caller-owned profile;
- PUT validates website, email, required fields, and maximum lengths;
- first PUT creates one profile;
- later PUT updates the same profile;
- cross-user identifiers in payload are ignored/rejected.

Project tests:

- list returns caller-owned projects newest first;
- create rejects locked agent slugs;
- create stores the selected agent and title;
- reading another user's project returns 404, not a data leak.

**Step 2: Run red**

Run: `npm test -- tests/crewProfileApi.test.ts tests/crewProjectsApi.test.ts --run`  
Expected: FAIL.

**Step 3: Implement repositories and routes**

Use Zod schemas and caller-scoped Supabase operations. Keep HTTP handlers thin and repositories independently testable.

**Step 4: Run green**

Run: `npm test -- tests/crewProfileApi.test.ts tests/crewProjectsApi.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/server/crew/schemas.ts functions/_shared/repositories functions/api/crew tests/crewProfileApi.test.ts tests/crewProjectsApi.test.ts && git commit -m "feat: add Crew profile and project APIs"`

---

## Task 6: Build deterministic tools and research normalization

**Files:**
- Create: `src/server/crew/context.ts`
- Create: `src/server/crew/tools/businessContext.ts`
- Create: `src/server/crew/tools/sourceNormalizer.ts`
- Create: `src/server/crew/tools/leadTools.ts`
- Create: `src/server/crew/tools/contentTools.ts`
- Create: `src/server/crew/tools/approvalTools.ts`
- Create: `tests/crewTools.test.ts`
- Create: `tests/crewSources.test.ts`

**Step 1: Write failing tool tests**

Assert:

- every tool uses the run context `authId`, never a model-supplied owner ID;
- URLs are normalized and non-HTTP(S) sources rejected;
- duplicate sources collapse by canonical URL;
- unsupported claims remain labeled unverified;
- lead save rejects sensitive-person fields and missing source;
- content save preserves agent, project, and version;
- email-draft tool creates a pending approval but cannot send;
- tool output omits internal keys and credentials.

**Step 2: Run red**

Run: `npm test -- tests/crewTools.test.ts tests/crewSources.test.ts --run`  
Expected: FAIL.

**Step 3: Implement**

Create small deterministic functions, then wrap the allowed ones with the Agents SDK `tool()` helper. Use hosted `webSearchTool()` for live research and normalize its URL annotations into `research_sources`.

No tool may send email. The agent can only create a draft approval.

**Step 4: Run green**

Run: `npm test -- tests/crewTools.test.ts tests/crewSources.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/server/crew tests/crewTools.test.ts tests/crewSources.test.ts && git commit -m "feat: add sourced Crew Engine tools"`

---

## Task 7: Define Wave Scout and Sales Rider

**Files:**
- Create: `src/server/crew/agents/sharedInstructions.ts`
- Create: `src/server/crew/agents/waveScout.ts`
- Create: `src/server/crew/agents/salesRider.ts`
- Create: `src/server/crew/agents/outputSchemas.ts`
- Create: `tests/crewSalesAgents.test.ts`

**Step 1: Write failing definition and behavior tests**

Verify:

- stable names and model configuration;
- both agents return the standard result sections;
- Wave Scout requires source-backed public-business research before saving leads;
- Sales Rider cannot invoke delivery;
- outreach cannot claim prior contact or invented results;
- every email draft becomes an approval request.

Use deterministic fake-model fixtures; do not call OpenAI in unit tests.

**Step 2: Run red**

Run: `npm test -- tests/crewSalesAgents.test.ts --run`  
Expected: FAIL.

**Step 3: Implement**

Use `gpt-5.6-terra` by default with an environment override. Give each agent only the tools it needs. Use structured Zod outputs where the SDK supports the desired streaming contract.

**Step 4: Run green**

Run: `npm test -- tests/crewSalesAgents.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/server/crew/agents tests/crewSalesAgents.test.ts && git commit -m "feat: add Wave Scout and Sales Rider agents"`

---

## Task 8: Define Content Creator and Customer Care Cove

**Files:**
- Create: `src/server/crew/agents/contentCreator.ts`
- Create: `src/server/crew/agents/customerCareCove.ts`
- Create: `tests/crewContentCareAgents.test.ts`

**Step 1: Write failing tests**

Cover:

- Content Creator uses business voice and separates creative copy from factual claims;
- it refuses invented testimonials, statistics, partnerships, and results;
- Customer Care Cove escalates legal, billing, refund, safety, privacy, abuse, and missing-policy cases;
- it cannot promise credits, refunds, or deadlines without saved policy authority;
- support email drafts require approval.

**Step 2: Run red**

Run: `npm test -- tests/crewContentCareAgents.test.ts --run`  
Expected: FAIL.

**Step 3: Implement the agents**

Use shared instructions plus narrow specialist rules and tools.

**Step 4: Run green**

Run: `npm test -- tests/crewContentCareAgents.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/server/crew/agents tests/crewContentCareAgents.test.ts && git commit -m "feat: add content and customer care agents"`

---

## Task 9: Define Automation Architect and Big Kahuna coordination

**Files:**
- Create: `src/server/crew/agents/automationArchitect.ts`
- Create: `src/server/crew/agents/bigKahuna.ts`
- Create: `src/server/crew/agents/index.ts`
- Create: `tests/crewStrategyAgents.test.ts`

**Step 1: Write failing tests**

Cover:

- Automation Architect labels recommendations separately from completed integrations;
- workflow plans include trigger, steps, data, approval points, failure path, and manual fallback;
- time-saving estimates expose assumptions;
- Big Kahuna has the other five specialists as bounded `agent.asTool()` capabilities;
- Big Kahuna remains responsible for the final coordinated answer;
- specialist tools still enforce the caller's tier;
- Big Kahuna cannot invoke an email send or bypass approval.

**Step 2: Run red**

Run: `npm test -- tests/crewStrategyAgents.test.ts --run`  
Expected: FAIL.

**Step 3: Implement**

Follow the official manager-agent pattern. Keep direct specialist entry available; Big Kahuna is coordination, not a mandatory router.

**Step 4: Run green**

Run: `npm test -- tests/crewStrategyAgents.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/server/crew/agents tests/crewStrategyAgents.test.ts && git commit -m "feat: add Automation Architect and Big Kahuna"`

---

## Task 10: Add the authenticated streaming run endpoint

**Files:**
- Create: `functions/api/crew/run.ts`
- Create: `functions/_shared/crewRunner.ts`
- Create: `functions/_shared/repositories/runs.ts`
- Create: `tests/crewRunApi.test.ts`
- Create: `tests/fixtures/agent-stream.ts`

**Step 1: Write failing streaming tests**

Verify:

- anonymous request → 401;
- locked agent → 403 with upgrade tier;
- exhausted usage → 429 with allowance details;
- valid request reserves usage atomically;
- stream emits `run_started`, `research_progress` or `tool_progress`, `text_delta`, `source`, and `final`;
- final output, messages, sources, and usage are persisted;
- no-useful-output failure releases the reservation;
- disconnect does not leave a mutable global run;
- error envelopes do not contain secrets.

**Step 2: Run red**

Run: `npm test -- tests/crewRunApi.test.ts --run`  
Expected: FAIL.

**Step 3: Implement**

- Set the OpenAI key from the request environment with the SDK-supported configuration helper.
- Use HTTP Responses transport, not outbound WebSocket transport.
- Run with the selected specialist and request-scoped context.
- Map SDK stream events into a stable newline-delimited or SSE application contract.
- Stream directly; do not buffer unbounded model output.
- Manually flush OpenAI tracing at the end of a Cloudflare request if the installed SDK requires it.
- Persist the final run state and partial failure details.

**Step 4: Run green**

Run: `npm test -- tests/crewRunApi.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add functions/api/crew/run.ts functions/_shared/crewRunner.ts functions/_shared/repositories/runs.ts tests/crewRunApi.test.ts tests/fixtures/agent-stream.ts && git commit -m "feat: stream authenticated Crew agent runs"`

---

## Task 11: Implement immutable approval and Resend execution

**Files:**
- Create: `functions/api/crew/approvals.ts`
- Create: `functions/api/crew/approvals/[id]/approve.ts`
- Create: `functions/api/crew/approvals/[id]/send.ts`
- Create: `functions/_shared/email.ts`
- Create: `functions/_shared/repositories/approvals.ts`
- Modify: `src/server/email.ts`
- Create: `tests/crewApprovalApi.test.ts`
- Create: `tests/crewEmail.test.ts`

**Step 1: Write failing approval tests**

Verify:

- list returns caller-owned approvals only;
- draft editing increments version and invalidates prior approval;
- approve requires the expected current version;
- send rejects Draft, Pending, Cancelled, Sent, and cross-tenant records;
- approved snapshot is immutable;
- two sends with the same or different concurrent request IDs produce one provider call;
- delivery success stores provider ID and Sent status;
- provider failure stores Failed status without exposing provider secrets;
- retry requires an explicit user action and cannot duplicate a successful send.

**Step 2: Run red**

Run: `npm test -- tests/crewApprovalApi.test.ts tests/crewEmail.test.ts --run`  
Expected: FAIL.

**Step 3: Implement**

Use Resend server-side. Send from the verified `FROM_EMAIL`, set the member's verified profile email as `reply_to`, and include the required footer. The endpoint must atomically claim the approved snapshot before calling Resend.

Keep application-level durable approvals instead of storing a transient Agents SDK `RunState`; the agent only creates drafts and the explicit API performs the side effect.

**Step 4: Run green**

Run: `npm test -- tests/crewApprovalApi.test.ts tests/crewEmail.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add functions/api/crew/approvals functions/_shared/email.ts functions/_shared/repositories/approvals.ts src/server/email.ts tests/crewApprovalApi.test.ts tests/crewEmail.test.ts && git commit -m "feat: add approval-gated email delivery"`

---

## Task 12: Build the browser Crew API client

**Files:**
- Create: `src/lib/crewApi.ts`
- Create: `src/hooks/useCrewStream.ts`
- Create: `src/crew/events.ts`
- Create: `tests/crewClient.test.ts`

**Step 1: Write failing client tests**

Cover:

- attaches current Supabase access token;
- handles 401, 403, 429, validation, and server errors;
- parses fragmented SSE/NDJSON safely;
- emits progress, source, delta, final, and error events;
- preserves local draft on auth expiry;
- never retries a send automatically.

**Step 2: Run red**

Run: `npm test -- tests/crewClient.test.ts --run`  
Expected: FAIL.

**Step 3: Implement**

Use same-origin `/api/crew` by default and an optional `VITE_CREW_API_URL` only for local development. Keep all secrets server-side.

**Step 4: Run green**

Run: `npm test -- tests/crewClient.test.ts --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/lib/crewApi.ts src/hooks/useCrewStream.ts src/crew/events.ts tests/crewClient.test.ts && git commit -m "feat: add Crew Deck API client"`

---

## Task 13: Build one-time business onboarding

**Files:**
- Create: `src/pages/members/BusinessProfile.tsx`
- Create: `src/pages/members/BusinessProfile.test.tsx`
- Create: `src/components/crew/BusinessProfileForm.tsx`
- Create: `src/components/crew/FieldError.tsx`
- Modify: `src/RouterApp.tsx`

**Step 1: Write failing UI tests**

Cover:

- signed-in member without profile is guided to onboarding;
- required fields and email/URL errors are clear;
- save creates profile and returns to Crew Deck;
- editing retains existing data;
- failed save keeps entered values;
- owner follows the same profile rules.

**Step 2: Run red**

Run: `npm test -- src/pages/members/BusinessProfile.test.tsx --run`  
Expected: FAIL.

**Step 3: Implement**

Add `/members/business` inside the protected MembersLayout. Use accessible labels, mobile-first form layout, and existing ocean visual language.

**Step 4: Run green**

Run: `npm test -- src/pages/members/BusinessProfile.test.tsx --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/pages/members/BusinessProfile.tsx src/pages/members/BusinessProfile.test.tsx src/components/crew src/RouterApp.tsx && git commit -m "feat: add Crew business onboarding"`

---

## Task 14: Build the shared Crew Deck

**Files:**
- Create: `src/pages/members/CrewDeck.tsx`
- Create: `src/pages/members/CrewDeck.test.tsx`
- Create: `src/components/crew/AgentCard.tsx`
- Create: `src/components/crew/UsageMeter.tsx`
- Create: `src/components/crew/RecentProjects.tsx`
- Create: `src/components/crew/PendingApprovals.tsx`
- Create: `src/pages/members/crew-deck.css`
- Modify: `src/RouterApp.tsx`
- Modify: `src/pages/members/MembersDashboard.tsx`

**Step 1: Write failing UI tests**

Verify:

- all six agents render;
- exact approved tier mapping controls open/locked state;
- Owner sees all six;
- locked cards show required tier and pricing route;
- remaining monthly runs and emails are visible;
- pending approvals and recent projects render;
- missing profile routes to onboarding;
- card clicks open the selected agent workspace.

**Step 2: Run red**

Run: `npm test -- src/pages/members/CrewDeck.test.tsx src/RouterApp.members.test.tsx --run`  
Expected: FAIL.

**Step 3: Implement**

Add `/members/crew`. Update the dashboard's crew cards to open the Crew Deck or direct specialist route. Preserve the members background and central site logo.

**Step 4: Run green**

Run: `npm test -- src/pages/members/CrewDeck.test.tsx src/RouterApp.members.test.tsx --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/pages/members/CrewDeck.tsx src/pages/members/CrewDeck.test.tsx src/pages/members/crew-deck.css src/components/crew src/RouterApp.tsx src/pages/members/MembersDashboard.tsx && git commit -m "feat: add shared AI SURFER Crew Deck"`

---

## Task 15: Build the specialist workspace and sourced results

**Files:**
- Create: `src/pages/members/AgentWorkspace.tsx`
- Create: `src/pages/members/AgentWorkspace.test.tsx`
- Create: `src/components/crew/TaskComposer.tsx`
- Create: `src/components/crew/AgentActivity.tsx`
- Create: `src/components/crew/ResultSections.tsx`
- Create: `src/components/crew/SourceList.tsx`
- Create: `src/components/crew/ProjectHistory.tsx`
- Modify: `src/RouterApp.tsx`
- Modify: `src/pages/members/MemberProduct.tsx`

**Step 1: Write failing workspace tests**

Cover:

- route accepts only six known slugs;
- locked access never mounts the composer;
- guided starter and custom task submission;
- live progress and text deltas;
- source links with titles and retrieval state;
- final standard sections;
- revision request and project continuation;
- partial result plus clear research error;
- page refresh restores saved history;
- no approval button appears for ordinary copy/download assets;
- product cards route to the real specialist workspace instead of `/wave-audit`.

**Step 2: Run red**

Run: `npm test -- src/pages/members/AgentWorkspace.test.tsx src/pages/members/MemberProduct.test.tsx --run`  
Expected: FAIL.

**Step 3: Implement**

Add `/members/crew/:agentSlug`. Keep a responsive two-panel desktop layout and stacked mobile layout. Sanitize/render structured output without unsafe HTML.

**Step 4: Run green**

Run: `npm test -- src/pages/members/AgentWorkspace.test.tsx src/pages/members/MemberProduct.test.tsx --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/pages/members/AgentWorkspace.tsx src/pages/members/AgentWorkspace.test.tsx src/components/crew src/RouterApp.tsx src/pages/members/MemberProduct.tsx src/pages/members/MemberProduct.test.tsx && git commit -m "feat: add real specialist workspaces"`

---

## Task 16: Build approval preview, send confirmation, and activity

**Files:**
- Create: `src/pages/members/ApprovalQueue.tsx`
- Create: `src/pages/members/ApprovalQueue.test.tsx`
- Create: `src/components/crew/EmailPreview.tsx`
- Create: `src/components/crew/DeliveryStatus.tsx`
- Modify: `src/RouterApp.tsx`
- Modify: `src/pages/members/CrewDeck.tsx`

**Step 1: Write failing UI tests**

Verify:

- only caller-owned pending drafts render;
- full recipient, subject, body, sender, reply-to, and footer are visible;
- editing returns item to Pending and invalidates approval;
- Approve is separate from Send;
- Approve & Send requires a final confirmation;
- busy state prevents double click;
- successful duplicate response displays the original Sent record;
- failure is visible and offers explicit retry;
- screen-reader status announces Sending, Sent, and Failed.

**Step 2: Run red**

Run: `npm test -- src/pages/members/ApprovalQueue.test.tsx --run`  
Expected: FAIL.

**Step 3: Implement**

Add `/members/crew/approvals` and link it from the Crew Deck and agent results.

**Step 4: Run green**

Run: `npm test -- src/pages/members/ApprovalQueue.test.tsx --run`  
Expected: PASS.

**Step 5: Commit**

`git add src/pages/members/ApprovalQueue.tsx src/pages/members/ApprovalQueue.test.tsx src/components/crew src/RouterApp.tsx src/pages/members/CrewDeck.tsx && git commit -m "feat: add member approval queue"`

---

## Task 17: Add accessibility, responsive polish, and brand assets

**Files:**
- Modify: `src/pages/members/crew-deck.css`
- Modify: `src/components/members/MembersLayout.tsx`
- Modify: `src/components/crew/*.tsx`
- Create: `tests/crewAccessibility.test.tsx`

**Step 1: Write failing accessibility tests**

Assert:

- one visible page heading;
- cards and tabs have accessible names and keyboard states;
- progress uses non-disruptive live regions;
- form errors are associated with fields;
- color is not the only locked/status signal;
- approval confirmation has focus management;
- source links identify external destinations.

**Step 2: Run red**

Run: `npm test -- tests/crewAccessibility.test.tsx --run`  
Expected: FAIL.

**Step 3: Implement polish**

Use the established dark ocean background, cyan and pink highlights, readable contrast, restrained motion, reduced-motion support, and layouts tested at 360px, 768px, and desktop widths.

**Step 4: Run green and build**

Run: `npm test -- tests/crewAccessibility.test.tsx --run && npm run build`  
Expected: PASS.

**Step 5: Commit**

`git add src/pages/members/crew-deck.css src/components/members/MembersLayout.tsx src/components/crew tests/crewAccessibility.test.tsx && git commit -m "style: polish accessible Crew Deck experience"`

---

## Task 18: Add CI, local verification, and production runbooks

**Files:**
- Modify: `.github/workflows/ci.yml`
- Modify: `.github/workflows/deploy.yml`
- Create: `scripts/verify-crew-runtime.mjs`
- Create: `docs/crew-deck/README.md`
- Create: `docs/crew-deck/VALIDATION.md`
- Modify: `.env.example`

**Step 1: Add a failing CI/runtime validation**

CI must run:

- all Vitest tests;
- TypeScript/Vite build;
- Wrangler dry-run or Pages Functions build validation;
- secret-pattern scan;
- migration file validation.

The live verification script must require an explicit owner token and test recipient from environment variables; it must never print either.

**Step 2: Run the complete local suite**

Run: `npm test -- --run && npm run build && npx wrangler pages functions build --outdir /tmp/crew-functions`  
Expected: PASS after configuration is complete.

**Step 3: Document setup**

Document:

- required Cloudflare secrets and non-secret bindings;
- local Pages + Functions development;
- Supabase migration and rollback;
- model override;
- OpenAI tracing limitations on Workers and manual flush;
- Resend verified sender/reply-to behavior;
- owner-preview verification;
- tier-launch switch;
- incident rollback and email-disable procedure.

**Step 4: Commit**

`git add .github scripts docs/crew-deck .env.example && git commit -m "docs: add Crew Deck deployment and verification"`

---

## Task 19: Security and quality review checkpoint

**Files:**
- Review all Crew Deck files and migration
- Modify only files required by findings

**Step 1: Run the full suite**

`npm test -- --run`  
Expected: PASS.

**Step 2: Run build/runtime validation**

`npm run build`  
`npx wrangler pages functions build --outdir /tmp/crew-functions`  
Expected: PASS.

**Step 3: Run targeted security checks**

Verify:

- no key appears in browser bundle;
- every API route calls the verified auth helper;
- every agent slug passes server entitlement checks;
- all data access is caller-scoped;
- RLS denies cross-tenant reads/writes;
- URL changes cannot unlock agents;
- outbound email requires immutable approval;
- repeated send cannot call Resend twice;
- logs exclude secrets and complete sensitive message bodies;
- CORS and content types are intentional;
- no mutable request state exists at module scope.

**Step 4: Run code/security workflows on the PR**

Open a feature PR and wait for CI Pipeline, Deploy Pipeline, Code Quality, Security Scanning, and CodeQL. Fix any scoped findings and rerun.

**Step 5: Commit review fixes**

`git add <reviewed-files> && git commit -m "fix: address Crew Deck review findings"`

---

## Task 20: Owner Preview deployment and real end-to-end verification

**Files:**
- Modify: `docs/crew-deck/VALIDATION.md` with non-secret results
- Modify: `docs/crew-deck/README.md` only if deployment behavior differs

**Step 1: Apply the reviewed migration to production**

Apply the exact committed migration with the Supabase migration tool. Confirm tables, functions, policies, and entitlements after application.

**Step 2: Configure Cloudflare**

Confirm, without printing values:

- `OPENAI_API_KEY` reuses the existing live OpenAI secret;
- `OPENAI_MODEL=gpt-5.6-terra`;
- `SUPABASE_URL`;
- `SUPABASE_ANON_KEY`;
- `RESEND_API_KEY`;
- `FROM_EMAIL`;
- owner-preview feature flag.

If the Resend sender is not verified, stop email verification and report the exact blocker rather than substituting an unverified sender.

**Step 3: Deploy Owner Preview**

Deploy with member-tier execution disabled and both owner accounts enabled through their verified owner app metadata.

**Step 4: Run real owner flow**

Verify in production:

1. Sign in as an owner.
2. Complete/update one business profile.
3. Open each of the six agents.
4. Run one live Wave Scout research task and confirm at least one valid stored source.
5. Run Big Kahuna and confirm bounded specialist coordination.
6. Create a Sales Rider email draft.
7. Review, approve, and send to an owner-controlled recipient.
8. Repeat the send request and confirm no second email is sent.
9. Refresh and confirm project, source, approval, usage, and delivery history persist.
10. Check mobile layout.

**Step 5: Record evidence**

Record timestamps, request IDs, provider IDs in redacted form, pass/fail status, and any limitations in `docs/crew-deck/VALIDATION.md`. Do not store tokens, email bodies, or secrets.

**Step 6: Member launch decision**

Keep member-tier execution disabled until owner preview passes. Once approved, enable the approved tier mapping and monitor agent failures, usage, approval activity, and email delivery.

**Step 7: Final commit**

`git add docs/crew-deck/VALIDATION.md docs/crew-deck/README.md && git commit -m "docs: record Crew Deck production validation"`

---

## Final acceptance checklist

- [ ] Six specialists run inside one Crew Deck.
- [ ] One member business profile supplies shared context.
- [ ] Current web research renders and persists clickable sources.
- [ ] All data is isolated by verified Supabase identity and RLS.
- [ ] Tier mapping matches the approved product ladder.
- [ ] Owner accounts have complete access.
- [ ] Big Kahuna coordinates bounded specialist work.
- [ ] Work, messages, sources, leads, assets, approvals, usage, and delivery persist.
- [ ] No external email can occur without explicit member approval.
- [ ] Approved email snapshots are immutable and duplicate send is prevented.
- [ ] All unit, API, UI, build, Worker, security, and real production checks pass.
- [ ] Owner Preview passes before member-tier launch.
