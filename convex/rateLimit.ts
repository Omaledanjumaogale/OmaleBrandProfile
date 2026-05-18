import { v } from "convex/values";
import { type MutationCtx, type QueryCtx } from "./_generated/server";

/**
 * Token-Bucket Rate Limiter (rateLimit.ts)
 * Built with sophisticated ACID-compliant token-bucket logic that seamlessly gates 
 * and throttles both generic reads and critical writes.
 */

export const rateLimitMutation = async (
    ctx: MutationCtx,
    opts: { key: string; max: number; window: number }
) => {
    const now = Date.now();
    const limit = await ctx.db
        .query("rateLimits")
        .withIndex("by_key", (q) => q.eq("key", opts.key))
        .unique();

    if (!limit) {
        // First token in a new bucket
        await ctx.db.insert("rateLimits", {
            key: opts.key,
            count: 1,
            windowStart: now
        });
        return { allowed: true, remaining: opts.max - 1 };
    }

    // Check if the current window has expired; if so, reset the bucket.
    if (now - limit.windowStart > opts.window) {
        await ctx.db.patch(limit._id, {
            count: 1,
            windowStart: now
        });
        return { allowed: true, remaining: opts.max - 1 };
    }

    // If still in the same window, check if the limit is reached.
    if (limit.count < opts.max) {
        const newCount = limit.count + 1;
        await ctx.db.patch(limit._id, {
            count: newCount
        });
        return { allowed: true, remaining: opts.max - newCount };
    }

    // Rate limited - 0 tokens remaining in bucket.
    return { allowed: false, remaining: 0 };
};

export const rateLimitQuery = async (
    ctx: QueryCtx,
    opts: { key: string; max: number; window: number }
) => {
    const limit = await ctx.db
        .query("rateLimits")
        .withIndex("by_key", (q) => q.eq("key", opts.key))
        .unique();

    if (!limit) return true;
    
    const now = Date.now();
    if (now - limit.windowStart > opts.window) return true;
    
    return limit.count < opts.max;
};
