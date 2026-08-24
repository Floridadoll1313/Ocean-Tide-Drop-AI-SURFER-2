# AI SURFER Crew Deck Design

**Date:** 2026-08-24  
**Status:** Approved for implementation planning

## Goal

Turn the six Ocean Tide Drop AI SURFER products into a secure, sellable multi-agent workspace for one primary business per membership. Members use a single Crew Deck, choose a specialist, receive live sourced research and ready-to-use work, and explicitly approve any email before it is sent.

The first release builds all six agents together on one shared runtime:

- Wave Scout
- Sales Rider
- Content Creator
- Customer Care Cove
- Automation Architect
- Big Kahuna

## Product principles

1. One shared workspace is simpler than six disconnected products.
2. Each specialist has a clear job, inputs, outputs, and tool boundaries.
3. All agents share the member's business profile, saved work, research, leads, and approvals.
4. Live web research must include source links and clearly label uncertainty.
5. Human approval is mandatory before any external action.
6. The browser never receives OpenAI, Resend, Supabase service-role, or other server secrets.
7. Membership access is enforced on the server, not only hidden in the interface.
8. Owner accounts keep complete preview and diagnostic access.
9. The existing Ocean Tide Drop visual system, authentication, pricing, and product catalog remain the foundation.

## Member experience

### Onboarding

A signed-in member completes one primary business profile containing:

- Business name and website
- Industry and location
- Products or services
- Ideal customer
- Primary offers
- Brand voice
- Business goals
- Preferred contact and reply-to email
- Optional business facts, constraints, and uploaded reference material

The profile becomes shared context for all six agents and can be edited later.

### Crew Deck

The Crew Deck shows six agent cards or tabs, membership access state, recent projects, pending approvals, and current usage. Locked agents display their required membership and a route to the existing pricing page.

For an unlocked agent, the member can:

1. Start from a guided task or enter a custom request.
2. Review the business context the agent will use.
3. Watch live research and progress updates.
4. Receive a structured result with source links.
5. Request revisions or save the result.
6. Copy or download assets.
7. Place supported emails in the approval queue.
8. Preview the recipient, subject, body, sender identity, and reply-to address.
9. Explicitly select **Approve & Send**.
10. See delivery status and a permanent activity record.

### Standard result structure

Each specialist returns:

- Quick Wave Summary
- Findings and opportunities
- Recommended actions
- Ready-to-use assets
- Research sources
- Approval requests
- Best next step

## Agent responsibilities

### Wave Scout

**Purpose:** Find qualified business opportunities, prospects, competitors, and AI-visibility gaps.

**Primary outputs:**

- Sourced market and competitor findings
- Public-business prospect list
- Qualification and opportunity scores with reasons
- AI visibility and discoverability gaps
- Recommended next actions
- Leads that can be handed to Sales Rider

**Guardrails:**

- Use public business information only.
- Do not collect sensitive personal information.
- Do not invent contact data.
- Preserve the source URL and research timestamp for material claims.
- Label weak matches and uncertainty.

### Sales Rider

**Purpose:** Turn qualified opportunities into personalized, approval-gated outreach and follow-up.

**Primary outputs:**

- Lead-specific talking points
- Personalized outreach drafts
- Multi-step follow-up sequences
- Subject-line options
- Call notes and next-step recommendations
- Approval requests for supported emails

**Guardrails:**

- Never send automatically.
- Do not claim prior contact, results, relationships, or offers that are absent from the saved context.
- Show the exact recipient, subject, body, sender, and reply-to before approval.
- Respect suppression, unsubscribe, bounce, and previous-send state.
- Prevent duplicate delivery with an idempotency key.

### Content Creator

**Purpose:** Create consistent, business-aligned marketing assets.

**Primary outputs:**

- Campaign concepts
- Social posts
- Articles and outlines
- Marketing emails
- Offer copy
- Content calendars
- Repurposing plans

**Guardrails:**

- Distinguish researched facts from creative copy.
- Do not fabricate testimonials, statistics, partnerships, or customer results.
- Use the saved brand voice and business facts.
- First-release assets are copyable and downloadable; social publishing is not included.

### Customer Care Cove

**Purpose:** Help members respond to customers while preserving a human, accurate voice.

**Primary outputs:**

- Customer-response drafts
- FAQ and knowledge-base content
- Issue summaries
- Escalation recommendations
- Approval requests for supported email replies

**Guardrails:**

- Never send automatically.
- Escalate safety, legal, billing, refund, abuse, privacy, and uncertain policy cases.
- Do not promise refunds, credits, deadlines, or policy exceptions without explicit business rules.
- Cite the member's saved policies when available and state when information is missing.

### Automation Architect

**Purpose:** Convert repetitive business work into practical implementation plans.

**Primary outputs:**

- Current-state workflow maps
- Trigger/action/data-flow designs
- Recommended tools and integration boundaries
- Failure and recovery paths
- Human approval checkpoints
- Time-saving estimates with stated assumptions
- Prioritized implementation plans

**Guardrails:**

- Do not claim an integration is active until verified.
- Separate recommendations from completed implementation.
- Include manual fallback and error handling.
- Keep credentials and secrets out of generated plans and browser-visible data.

### Big Kahuna

**Purpose:** Create an overall AI growth strategy and coordinate work across specialists.

**Primary outputs:**

- Business opportunity portfolio
- Prioritized 30/60/90-day strategy
- Cross-agent project plans
- Delegated specialist assignments
- Expected value, effort, risk, and dependency analysis
- Executive progress summaries

**Guardrails:**

- Big Kahuna may coordinate specialists but cannot bypass membership, data, or approval controls.
- State assumptions behind financial or time-saving estimates.
- Do not present delegated work as complete until the specialist run finishes.
- Keep one clear owner decision at each approval checkpoint.

## Recommended architecture

### Shared Crew Engine

Use one authenticated server runtime with six focused agent definitions and shared deterministic tools. Big Kahuna can coordinate bounded specialist runs, while members can open any unlocked specialist directly.

The existing Launch Desk code provides reusable patterns for:

- OpenAI Agents SDK agent definitions
- Zod-validated tool inputs
- Server-side secret handling
- Progressive streaming
- Deterministic preflight tools
- Structured error events
- Agent tracing

The Crew Engine must be adapted to the live Cloudflare deployment instead of relying on the current local-only Express process.

### Runtime responsibilities

The server layer will:

- Verify the Supabase access token on every request
- Resolve the member and tier
- Enforce agent entitlements and usage allowances
- Load only that member's business context
- Execute the selected specialist and approved tools
- Perform live web research
- Stream progress and output
- Persist projects, runs, sources, assets, leads, and approvals
- Execute approved email delivery
- Record usage, errors, approval events, and delivery status

The frontend will never call OpenAI or Resend directly.

### Cloudflare deployment

The production API will run in a Cloudflare Worker-compatible server boundary connected to the existing Pages application. New Worker configuration will:

- Use a current compatibility date
- Enable Node compatibility when required by selected packages
- Store secrets using Cloudflare secret bindings
- Stream responses without buffering unbounded model output
- Avoid mutable request state at module scope
- Use explicit error handling
- Enable structured logs and observability
- Keep post-response work attached to the runtime lifecycle

Current Cloudflare documentation and package types must be retrieved and validated before Worker implementation.

### Persistence

Supabase remains the member and business source of truth. Proposed tables:

- `business_profiles`
- `crew_projects`
- `agent_runs`
- `agent_messages`
- `research_sources`
- `leads`
- `content_assets`
- `approval_requests`
- `outbound_messages`
- `usage_events`

Every tenant-owned record includes `auth_id` or a profile-owned foreign key. Row Level Security restricts members to their own records. Server-side service access is limited to validated operations after the caller's identity and entitlement are established.

Data model constraints should enforce:

- One primary business profile per membership in the first release
- Unique approval execution tokens
- Idempotent outbound email execution
- Valid agent and project relationships
- Immutable approval and delivery audit fields where appropriate
- Safe cascading or restricted deletion behavior

### Shared tools

The Crew Engine should expose small, deterministic tools rather than a broad unrestricted capability:

- Load approved business profile context
- Search the web and normalize sources
- Save research findings
- Create or update a lead
- Create a content asset
- Create an approval request
- Check membership and usage allowance
- Queue and execute an approved email
- Read relevant project history
- Hand a bounded task to a specialist agent

Tool schemas use Zod and reject missing, malformed, cross-tenant, or unauthorized input.

## Live research

Research combines member-provided information with current public web sources. Each material research record stores:

- URL
- Page or source title
- Retrieved timestamp
- Claim or excerpt summary
- Agent run
- Confidence or relevance indicator where useful

The UI shows clickable sources beside the findings they support. Agents must not present unsupported web claims as verified facts. Failed, blocked, or incomplete research is visible to the member.

## Human approval and email

### Approval states

An email action moves through:

- Draft
- Pending approval
- Approved
- Sending
- Sent
- Failed
- Cancelled

Only an authenticated member action can transition a pending email to approved. Approval records include member identity, timestamp, message snapshot, and execution identifier. Editing an approved draft invalidates that approval and requires a new approval.

### Initial email delivery

The existing Resend-oriented server email foundation will be completed and secured. Initial approved messages send from a verified Ocean Tide Drop AI SURFER sender and use the member's verified contact email as reply-to.

Before sending, the member sees:

- Recipient name and address
- Subject
- Complete message body
- Sending identity
- Reply-to address
- Any required compliance footer

The send endpoint revalidates authentication, tier, allowance, approval state, recipient, and idempotency before delivery. Delivery provider identifiers and final status are saved. Failed sends remain visible and do not silently retry in a way that can duplicate delivery.

The first release does not include Gmail OAuth, CRM writes, social publishing, or fully autonomous workflows.

## Membership access

| Membership | Crew access |
|---|---|
| Member | Crew Deck preview and upgrade path; no paid agent runs |
| Starter Access | Wave Scout and Sales Rider |
| Innovator Tier | Adds Content Creator and Customer Care Cove |
| Console Tier | Adds Automation Architect |
| Full Takeover | Adds Big Kahuna and the complete crew |
| Owner | Complete access for both approved owner accounts |

Access is enforced in both UI presentation and the server API. Changing a URL or request payload cannot unlock an agent.

Monthly agent and email allowances will be stored as configurable plan entitlements rather than scattered UI constants. The Crew Deck shows remaining usage before a run. Exact commercial allowances can be adjusted without redesigning the agent runtime.

## Error handling

- Invalid input returns a clear field-level message.
- Expired authentication asks the member to sign in again without losing local draft text.
- Locked-agent requests return an entitlement response and upgrade path.
- Usage-limit responses explain the allowance and renewal or upgrade path.
- Research failures preserve partial sourced work and identify the failed step.
- Model errors produce a safe retry state without charging duplicate usage when no useful run completed.
- Email failures remain in the activity log with a safe retry control.
- Duplicate approval or send requests return the existing result instead of sending again.
- Server logs use structured identifiers and never log credentials or full sensitive message bodies.

## Verification strategy

### Deterministic tests

- Agent entitlement mapping
- Usage allowance calculations
- Business-profile and task validation
- Lead normalization and source preservation
- Cross-tenant authorization rejection
- Approval state transitions
- Approval invalidation after editing
- Email idempotency and duplicate prevention
- Customer Care escalation rules
- Content factual-claim safeguards
- Big Kahuna delegation boundaries

### API integration tests

- Supabase-authenticated agent request
- Rejected anonymous, expired, locked-tier, and cross-tenant requests
- Streaming progress, model deltas, final output, and error envelopes
- Persistence of runs, sources, and assets
- Approval creation and execution
- Resend success and failure state handling

### Frontend tests

- Business-profile onboarding
- Crew Deck tier states
- Guided task submission
- Streaming activity
- Sourced result rendering
- Revision and saved-history flow
- Approval preview
- Approve-and-send confirmation
- Mobile layout and accessible interaction
- Error recovery without losing drafts

### Real verification

Before completion, use the configured production-like secrets to verify:

1. A real owner-authenticated specialist run.
2. Live web research with at least one valid stored and rendered source.
3. Streaming progress and model output.
4. Saved project and run history.
5. A real approved test email to an owner-controlled recipient.
6. Duplicate-send protection against a repeated execution request.
7. Owner access to all agents and correct locked states for lower-tier test accounts.

Mocked tests, a successful build, or a health endpoint do not replace the real agent and email checks.

## Rollout

### Stage 1: Owner Preview

- Enable complete crew access for both owner accounts.
- Validate all six specialists.
- Test real research, persistence, approvals, email, usage display, and mobile behavior.
- Collect corrections while member-tier users remain behind the feature gate.

### Stage 2: Member Launch

- Enable the approved tier mapping.
- Connect locked states to the existing pricing page.
- Monitor agent failures, email delivery, usage, and approval activity.
- Adjust configurable allowances based on observed cost and value.

## Success criteria

The design is complete when:

- All six agents are available inside one shared Crew Deck.
- Each specialist performs its defined job with shared business context.
- Live research presents valid source links.
- Work and history persist per member.
- Membership enforcement works at the API boundary.
- No outbound email can occur without explicit approval.
- Duplicate email delivery is prevented.
- Owner accounts can test the full crew.
- The live site passes automated and real production-workflow verification.
- Existing authentication, pricing, product catalog, and visual brand remain intact.

## Non-goals for the first release

- Multiple businesses per membership
- Autonomous outreach or publishing
- Gmail or Microsoft mailbox OAuth
- CRM writes
- Social-media publishing
- Arbitrary third-party workflow execution
- Sensitive-person lead collection
- Fully autonomous Big Kahuna decisions
- Replacing the existing Supabase authentication or Stripe pricing system
