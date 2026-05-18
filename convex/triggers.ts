import { v } from "convex/values";
import { mutation, type MutationCtx } from "./_generated/server";

/**
 * Zero-Latency Lifecycle Triggers (triggers.ts)
 * Emulated SQL row-level auditing triggers leveraging generic hook overlays 
 * for high-sensitivity operations tracking and immutable logging.
 */

export async function withAuditLog(
    ctx: MutationCtx, 
    action: string, 
    payload: any, 
    handler: () => Promise<any>
) {
    const timestamp = Date.now();
    // Safely extract metadata from payload if it exists
    const adminEmail = payload?.adminEmail || payload?.firebaseUid || "system";
    const sessionId = payload?.sessionId || "platform";

    try {
        const result = await handler();

        await ctx.db.insert("auditLogs", {
            action,
            payload,
            timestamp,
            adminEmail,
            sessionId
        });

        return result;
    } catch (error) {
        await ctx.db.insert("auditLogs", {
            action: `${action}_FAILED`,
            payload: { ...payload, error: String(error) },
            timestamp,
            adminEmail,
            sessionId
        });
        throw error;
    }
}
