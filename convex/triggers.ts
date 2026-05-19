import type { MutationCtx } from "./_generated/server";
import { buildAuditActor } from "./auth";

/**
 * Zero-Latency Lifecycle Triggers (triggers.ts)
 * Emulated SQL row-level auditing triggers leveraging generic hook overlays 
 * for high-sensitivity operations tracking and immutable logging.
 */

export async function withAuditLog(
    ctx: MutationCtx, 
    action: string, 
    payload: any, 
    handler: () => Promise<any>,
    actor?: Parameters<typeof buildAuditActor>[0]
) {
    const timestamp = Date.now();
    const auditActor = buildAuditActor(actor);
    const adminEmail = auditActor.adminEmail;
    const sessionId = payload?.sessionId || "platform";

    try {
        const result = await handler();

        await ctx.db.insert("auditLogs", {
            action,
            payload,
            timestamp,
            adminEmail,
            actorUid: auditActor.actorUid,
            actorRole: auditActor.actorRole,
            platformKey: auditActor.platformKey,
            sessionId
        });

        return result;
    } catch (error) {
        await ctx.db.insert("auditLogs", {
            action: `${action}_FAILED`,
            payload: { ...payload, error: String(error) },
            timestamp,
            adminEmail,
            actorUid: auditActor.actorUid,
            actorRole: auditActor.actorRole,
            platformKey: auditActor.platformKey,
            sessionId
        });
        throw error;
    }
}
