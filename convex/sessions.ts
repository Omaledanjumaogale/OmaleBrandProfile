import { v } from "convex/values";
import { mutation, type MutationCtx, customMutation } from "./_generated/server";

/**
 * Distributed Session Bindings (sessions.ts)
 * Designed with robust tracking logic tying heartbeat signals to client lifecycles 
 * mapping closely against Google/Firebase UIDs with heartbeat refreshes.
 */

/**
 * Higher-order mutation that ensures a valid session and refreshes its heartbeat.
 */
export const withSession = (handler: any) => {
    return async (ctx: MutationCtx, args: any) => {
        const { sessionId, firebaseUid } = args;
        
        if (!sessionId) {
            throw new Error("Session ID is required for this operation.");
        }

        const now = Date.now();
        const existing = await ctx.db
            .query("sessions")
            .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
            .unique();

        if (!existing) {
            await ctx.db.insert("sessions", {
                sessionId,
                email: firebaseUid || "anonymous",
                startTime: now,
                lastActivity: now,
                actionsCount: 1
            });
        } else {
            // Heartbeat update logic (debounce 5 mins to save ops)
            if (now - existing.lastActivity > 5 * 60 * 1000) {
                await ctx.db.patch(existing._id, {
                    lastActivity: now,
                    email: firebaseUid || existing.email,
                    actionsCount: existing.actionsCount + 1
                });
            }
        }

        return await handler(ctx, args);
    };
};

export const sessionTrackingMutation = async (
    ctx: MutationCtx,
    opts: { sessionId: string; firebaseUid?: string }
) => {
    const now = Date.now();
    const existing = await ctx.db
        .query("sessions")
        .withIndex("by_sessionId", (q) => q.eq("sessionId", opts.sessionId))
        .unique();

    if (!existing) {
        await ctx.db.insert("sessions", {
            sessionId: opts.sessionId,
            email: opts.firebaseUid || "anonymous",
            startTime: now,
            lastActivity: now,
            actionsCount: 1
        });
    } else {
        await ctx.db.patch(existing._id, {
            lastActivity: now,
            email: opts.firebaseUid ?? existing.email,
            actionsCount: (existing.actionsCount || 0) + 1
        });
    }
};
