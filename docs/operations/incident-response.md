# Incident Response

## Severity Levels
- `SEV-1`: Production outage, broken admin auth, or data integrity risk
- `SEV-2`: Major degraded functionality with available workaround
- `SEV-3`: Minor degradation or operational warning

## Immediate Response
1. Confirm issue via `/api/ops/health` and admin monitoring.
2. Toggle maintenance mode if public flows are unsafe.
3. Capture timestamp, affected routes, and user impact summary.
4. Review recent audit logs and deployment changes.
5. Route alerts to the configured observability webhook destination.

## Recovery Checklist
- Fix or roll back the triggering change
- Re-run `pnpm test`, `pnpm check`, and `pnpm build`
- Validate `/admin/login`, `/admin`, `/apply`, and `/services`
- Publish a post-incident summary including root cause and prevention steps
