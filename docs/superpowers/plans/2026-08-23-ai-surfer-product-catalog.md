# AI Surfer Product Catalog Implementation Plan

## Goal
Turn the approved AI Surfer product ladder into a polished, reusable catalog section on the main site while preserving the existing Stripe checkout flow.

## Scope
1. Add a reusable `ProductCatalog` React component.
2. Organize products by DISCOVER → DIAGNOSE → PLAN → IMPLEMENT → TRANSFORM.
3. Use the official package artwork paths as the image contract, with a graceful visual fallback until the binary assets are synced into the web repo.
4. Keep existing pricing and Stripe checkout behavior unchanged.
5. Add member-product links where appropriate without removing the current public checkout CTA.
6. Keep Customer Care Cove out of the visual catalog until its official artwork exists.
7. Verify TypeScript/build compatibility through the repository CI after the feature branch is pushed.

## Product data
- AEO Wave Audit — DISCOVER
- AI Opportunity Report — DIAGNOSE
- AEO Blueprint — PLAN
- Automation Blueprint — PLAN
- Wave Scout — IMPLEMENT
- Sales Rider — IMPLEMENT
- Content Creator — IMPLEMENT
- Automation Architect — IMPLEMENT
- Big Kahuna — TRANSFORM

## Asset contract
The component will reference `/packages/<slug>.jpg` paths. The source artwork currently lives in the user's persistent `/packages` Library folder. The repository needs the corresponding binary assets copied into `public/packages/` before production deployment for the images to render.

## Safety / compatibility
- No Stripe IDs or payment logic changes.
- No authentication or routing changes required.
- Existing launch promotion remains intact.
