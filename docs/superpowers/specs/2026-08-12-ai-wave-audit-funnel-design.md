# AI Wave Audit Funnel Design

## Goal
Transform the existing AI Surfer landing experience into a revenue-focused Ocean Hybrid AI funnel centered on a free AI Wave Audit. The first conversion is the audit lead, not membership signup.

## Core journey
Landing Page → 5-question Wave Scanner → Instant AI Opportunity Score™ → Teaser Wave Map → Email capture for full report → Personalized recommendation → Paid Wave Audit → Implementation offer → AI Surfer membership/SaaS.

## Visual direction
Use the existing Ocean Tide Drop AI SURFER logo as the brand anchor. The experience combines deep-ocean blues, turquoise/cyan interface accents, warm sunrise/gold accents drawn from the logo, subtle wave motion, restrained futuristic grids/glows, and AI/data signal effects. The result should feel premium, credible, technological, and distinctly ocean-themed.

## Landing page
The hero leads with the business outcome:

> Find the AI Opportunities Hiding in Your Business

Primary CTA: `Get My Free AI Wave Audit →`
Secondary CTA: `See How AI Surfer Works`

The page should explain outcomes rather than AI model details, emphasizing leads, sales, customer care, content, and repetitive work.

## Wave Scanner
Use five questions:
1. What type of business do you run?
2. How big is your team?
3. What takes up the most time every week?
4. Where are you losing the most opportunities?
5. What would you most like AI to improve first?

Questions should be business-focused and quick to answer. The initial implementation may calculate the score locally so the funnel is not blocked by an external AI service.

## Scoring and recommendations
Display an `AI Opportunity Score™`, explicitly described as a practical estimate based on the user's answers rather than a scientific measurement.

Generate a teaser result containing:
- Overall score
- Top opportunity category
- One or two high-level wave opportunities
- A recommended AI Surfer agent

Map opportunities to the existing product ecosystem:
- Wave Scout → lead generation and opportunity discovery
- Sales Rider → sales follow-up and conversion
- Content Creator → content and marketing production
- Customer Care Cove → customer support and FAQ handling
- Automation Architect → repetitive workflows and integrations
- Big Kahuna → multi-area transformation

## Lead capture
Reveal the teaser score before requesting the email. Ask for the email to unlock/send the full AI Wave Report. Capture the lead through the existing Supabase integration where practical.

## Report and upsell
The report should include the score, strongest opportunities, recommended agent, and a practical next step. The primary post-report CTA should be the paid Wave Audit. The recommendation should naturally route the user toward the corresponding AI Surfer service/product.

## Existing codebase strategy
Build on the current React + Vite + TypeScript application rather than replacing the site wholesale. Preserve reusable ocean visual components, navbar, existing routing, Supabase client, and useful members/shop components. Remove or replace stale launch-specific messaging such as the expired August 10, 2026 countdown.

## Data and architecture
Keep scoring logic isolated from presentation so the local rules can later be replaced with a server-side or AI-generated scoring service without rewriting the UI. Keep lead capture and scoring payloads structured for later analytics, reporting, and CRM integration.

## Error handling
If lead submission fails, the user should still retain the locally generated result and receive a clear retry message. Do not expose secrets or server-only credentials in the client.

## Success criteria
- Hero CTA clearly starts the free Wave Audit.
- Audit is completable in five questions.
- A score and teaser result appear immediately after completion.
- Email is requested only after the teaser is shown.
- Lead data is persisted through the available Supabase path when configured.
- Result recommends one AI Surfer product/agent.
- Primary upsell leads toward the paid Wave Audit.
- Landing experience is responsive and visually aligned with the supplied Ocean Tide Drop AI SURFER logo.
- Existing application architecture remains stable and reusable.
