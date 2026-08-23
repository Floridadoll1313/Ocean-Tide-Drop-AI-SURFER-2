# AI Surfer Product Catalog Design

## Goal
Turn the existing AI Surfer product artwork and product ladder into a coherent, sales-oriented catalog section on the public website, using the official package artwork as the visual source of truth.

## Product Architecture
The catalog follows the customer journey:

1. **DISCOVER**
   - AEO Wave Audit™
2. **DIAGNOSE**
   - AI Opportunity Report™
3. **PLAN**
   - AEO Blueprint™
   - Automation Blueprint™
4. **IMPLEMENT**
   - Wave Scout™
   - Sales Rider™
   - Content Creator™
   - Automation Architect™
5. **TRANSFORM**
   - Big Kahuna™

Customer Care Cove remains intentionally unlisted until official package artwork is available.

## UX
- Present the five stages as a visual progression rather than an undifferentiated grid.
- Each product card includes official artwork, product name, category, concise benefit-led description, and a primary CTA.
- CTAs should route naturally to the existing public product/member flows rather than inventing new checkout behavior.
- Preserve the existing launch offer and Stripe checkout behavior.
- Keep the public page responsive and accessible on mobile and desktop.

## Visual Direction
- Reuse the existing Ocean Tide Drop AI SURFER visual language: dark oceanic background, cyan/blue accents, rounded cards, strong typography, and restrained motion.
- Use official product artwork from the Library `/packages` folder as source material. Repository asset paths should be explicit and stable.
- Avoid fabricating missing product artwork.

## Technical Direction
- Add product catalog data as typed, reusable configuration rather than embedding repeated copy directly in JSX.
- Keep the existing `RouterApp` routing structure unless a dedicated catalog route is required by the existing architecture.
- Prefer a focused product catalog component over further increasing the size of `src/App.tsx`.
- Preserve existing Stripe API calls and pricing tiers.
- Add or update tests for catalog data, required stages, product slugs, and rendering behavior where the repository's current test setup supports it.

## Acceptance Criteria
- All nine listed products appear in the intended ladder stages.
- Every listed product points to an official package asset or an explicitly mapped repository asset.
- Customer Care Cove is not shown without official artwork.
- Product descriptions are concise, business-focused, and consistent in voice.
- Existing pricing and checkout behavior remains intact.
- `npm run build` and relevant tests pass.
- No secrets or payment credentials are added to source control.
