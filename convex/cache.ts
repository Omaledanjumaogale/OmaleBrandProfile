import { v } from "convex/values";
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server";

// ── Distributed Query Caching ─────────────────────────────────────
// Manages ephemeral data storage for external API responses or 
// heavy calculations, minimizing redundant external network calls.

export const getCache = async (ctx: QueryCtx, key: string) => {
    const entry = await ctx.db
        .query("settings") // Reusing settings table or create apiCache
        .withIndex("by_key", (q) => q.eq("key", `cache:${key}`))
        .unique();

    if (!entry) return null;
    
    // Check TTL (assuming 1 hour default if not specified)
    const TTL = 60 * 60 * 1000;
    if (Date.now() - entry.updatedAt > TTL) return null;

    return entry.value;
};

export const setCache = async (ctx: MutationCtx, key: string, value: any) => {
    const existing = await ctx.db
        .query("settings")
        .withIndex("by_key", (q) => q.eq("key", `cache:${key}`))
        .unique();

    if (existing) {
        await ctx.db.patch(existing._id, {
            value,
            updatedAt: Date.now()
        });
    } else {
        await ctx.db.insert("settings", {
            key: `cache:${key}`,
            value,
            updatedAt: Date.now()
        });
    }
};
