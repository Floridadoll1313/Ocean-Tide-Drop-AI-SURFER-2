# Wave Audit Full Report Delivery Plan

**Goal:** Unlock a useful full Wave Report immediately, preserve every submission with an idempotent receipt, and stop displaying a false save failure after a successful database write.

**Architecture:** Keep report generation deterministic in the React app so it works without an AI or email bill. Store the audit using a client-generated UUID, retry once with the same receipt, and treat a duplicate receipt as proof that the first save arrived. This preserves idempotency without granting public read access. The result screen renders the complete report and offers copy/download controls; email delivery remains a later server-side enhancement once a verified sender is connected.

**Tech stack:** React 19, TypeScript, Vitest, Supabase Postgres/PostgREST.

## Task 1: Define the full report

- Add failing tests for category-specific recommendations, a 30-day plan, measurable signals, and portable report text.
- Implement a pure report builder and formatter.
- Add a full-report presentation component with copy and download controls.

## Task 2: Make capture idempotent

- Add failing tests for normalized payloads, stable submission receipts, one safe retry, and an honest uncertain state.
- Replace the one-shot insert with an idempotent upsert keyed by `submission_id`.
- Add a migration for the unique receipt and report/delivery metadata.

## Task 3: Integrate the result experience

- Unlock the report after the email form even if confirmation remains uncertain.
- Show saved/uncertain status without blocking access to the report.
- Remove the unsupported promise that an email is already on the way.

## Task 4: Verify and release

- Run focused tests, the complete test suite, lint, and production build.
- Review the final diff for security, accessibility, and scope.
- Apply the production migration, open the delivery PR, and merge after checks pass.
