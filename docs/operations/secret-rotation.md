# Secret Rotation

## Secrets In Scope
- `ADMIN_SESSION_SECRET`
- Firebase Admin SDK service account credentials
- `WEB_PUSH_VAPID_PRIVATE_KEY`
- `RESEND_API_KEY`
- `OBSERVABILITY_WEBHOOK_URL`
- `UPTIME_WEBHOOK_URL`

## Rotation Procedure
1. Add the new secret to the target environment without removing the old one.
2. Deploy and validate `/api/ops/health`.
3. Confirm admin login, push subscription registration, and outbound notifications.
4. Remove the old secret after validation passes.

## Rotation Frequency
- Session and push secrets: quarterly
- Service account keys: every 90 days or immediately after suspicion of exposure
- Webhook endpoints and API keys: every 90 days or after provider-side compromise notice
