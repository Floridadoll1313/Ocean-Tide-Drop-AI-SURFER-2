# Site Audit Repair Report — 2026-05-26

## Scope
Checked the OceanTideDrop AI SURFER source for broken routes, navigation mismatches, members-area access issues, and payment/subscription safety issues. The live domain could not be fetched by the secure checker, so this repair was made from the current GitHub source.

## Errors found and fixed

### 1. Broken compatibility routes
Older/bookmarked paths were missing from the current router and could land visitors on a blank/404 experience.

Fixed by adding safe routes/redirects for:

- `/tip-jar` → live Tip Jar page
- `/tipjar` → redirects to `/tip-jar`
- `/dashboard` → redirects to `/members`
- `/ai-dashboard` → redirects to `/members`
- `/oas-6` → redirects to `/members`
- `/ai-surfer` → AI Surfer page
- `/ai-surfer-ocean-tide-drop` → redirects to `/ocean`
- `*` fallback → homepage

### 2. Members-area default access was too permissive
New Firestore user documents were being created with `tier: 'basic'` even when `subscriptionStatus` was `none`. That could make a brand-new sign-in look like a basic member.

Fixed by:

- Adding `tier: 'none'` as a valid account state.
- Creating new users with `subscriptionStatus: 'none'` and `tier: 'none'`.
- Normalizing loaded user data so inactive/canceled users resolve to `tier: 'none'`.

### 3. Pricing page had a public sandbox subscription bypass
The pricing page could fall back to a direct Firestore upgrade flow if Stripe checkout failed.

Fixed by:

- Removing the direct Firestore activation modal.
- Removing client-side subscription upgrade writes from the pricing page.
- Showing a clear checkout-configuration error instead of upgrading an account when Stripe is missing.
- Keeping checkout routed through `/api/stripe/create-checkout-session` only.

### 4. Members Monetization page had a sandbox upgrade fallback
The members monetization page also allowed a direct Firestore activation fallback if Stripe checkout failed.

Fixed by:

- Removing direct subscription writes from the monetization page.
- Keeping upgrades behind verified Stripe checkout only.
- Showing a safe error if Stripe price IDs or checkout setup are missing.

## Notes still requiring provider-side verification

These cannot be fully verified from source alone:

- Firebase Authorized Domains should include `otdaisurfer.surf`.
- Stripe live price IDs must be configured for the intended Ocean Tide Drop Stripe account.
- PayPal Tip Jar needs a real PayPal.me/QR/link confirmed before replacing the current interactive console behavior.
- The live domain should be checked in-browser after deploy because this checker could not fetch the domain directly.

## Files changed

- `src/App.tsx`
- `src/hooks/useAuth.tsx`
- `src/pages/pricing/Pricing.tsx`
- `src/pages/members/Monetization.tsx`
- `docs/site-audit-2026-05-26.md`
