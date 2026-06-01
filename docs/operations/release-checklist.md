# Release Checklist

## Pre-Release
- Environment variables configured for Firebase Admin, Convex, VAPID, email, and observability
- `pnpm test`
- `pnpm check`
- `pnpm build`
- `pnpm test:e2e`
- `/api/ops/health` returns healthy status in target environment

## Functional Smoke Test
- Public routes render: `/`, `/platforms`, `/apply`, `/services`, `/faq`
- Admin login route loads and rejects invalid session payloads correctly
- Protected admin routes redirect unauthenticated users
- Broadcast, settings, and user-management permissions match role expectations

## Governance
- Accessibility audit reviewed
- Backup snapshot created
- Rollback target identified
- Incident contacts and webhook endpoints verified
