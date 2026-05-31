# Backup And Recovery Runbook

## Primary Data Systems
- Convex production deployment
- Firebase Authentication identity store
- Cloudflare Pages deployment configuration

## Backup Expectations
- Export Convex production snapshots on a scheduled basis
- Export Firebase Auth users regularly
- Preserve deployment environment variables outside the application repo

## Recovery Procedure
1. Freeze writes by enabling maintenance mode.
2. Confirm the last known good Convex snapshot and Firebase export.
3. Restore Convex data into a recovery deployment.
4. Validate admin login, IAM application intake, and service request flows.
5. Re-point production only after smoke tests and audit-log checks pass.

## Recovery Verification
- `/api/ops/health` returns `ok`
- Admin login works with a known superadmin account
- Public application and service request submissions persist correctly
