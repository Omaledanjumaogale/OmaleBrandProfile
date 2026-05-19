import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";

// ── Distributed Query Caching ─────────────────────────────────────
// Manages ephemeral data storage for external API responses or 
// heavy calculations, minimizing redundant external network calls.

export const getCache = async (ctx: QueryCtx, key: string) => {
    const entry = await ctx.db
        .query("apiCache")
        .withIndex("by_key", (q) => q.eq("key", `cache:${key}`))
        .unique();

    if (!entry) return null;
    if (Date.now() > entry.expiresAt) return null;

    return entry.value;
};

export const setCache = async (ctx: MutationCtx, key: string, value: any, ttlMs = 60 * 60 * 1000) => {
    const existing = await ctx.db
        .query("apiCache")
        .withIndex("by_key", (q) => q.eq("key", `cache:${key}`))
        .unique();

    if (existing) {
        await ctx.db.patch(existing._id, {
            value,
            updatedAt: Date.now(),
            expiresAt: Date.now() + ttlMs
        });
    } else {
        await ctx.db.insert("apiCache", {
            key: `cache:${key}`,
            value,
            updatedAt: Date.now(),
            expiresAt: Date.now() + ttlMs
        });
    }
};
