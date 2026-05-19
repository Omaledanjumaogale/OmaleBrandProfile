import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";

/**
 * Autonomous Garbage Collection (crons.ts)
 * Hooked auto-purging mechanics within Convex v8 engine crons to rigorously delete 
 * obsolete sessions preventing systemic DB bloats.
 */

export const purgeObsoleteSessions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const EXPIRE_WINDOW = 7 * 24 * 60 * 60 * 1000; // 7 days for sessions
    const LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours for rate limits

    // 1. Purge Sessions
    const obsoleteSessions = await ctx.db
      .query("sessions")
      .filter((q) => q.lt(q.field("lastActivity"), now - EXPIRE_WINDOW))
      .collect();

    for (const session of obsoleteSessions) {
      await ctx.db.delete(session._id);
    }

    // 2. Purge Rate Limits
    const obsoleteLimits = await ctx.db
      .query("rateLimits")
      .filter((q) => q.lt(q.field("windowStart"), now - LIMIT_WINDOW))
      .collect();

    for (const limit of obsoleteLimits) {
      await ctx.db.delete(limit._id);
    }

    const expiredCacheEntries = await ctx.db
      .query("apiCache")
      .withIndex("by_expiresAt", (q) => q.lt("expiresAt", now))
      .collect();

    for (const entry of expiredCacheEntries) {
      await ctx.db.delete(entry._id);
    }

    console.log(`[GC] Purged ${obsoleteSessions.length} sessions, ${obsoleteLimits.length} rate limit buckets, and ${expiredCacheEntries.length} cache records.`);
  },
});

const crons = cronJobs();

// Automated nightly execution at 01:00 AM UTC
crons.daily(
  "autonomous-garbage-collection",
  { hourUTC: 1, minuteUTC: 0 },
  internal.crons.purgeObsoleteSessions
);

export default crons;
