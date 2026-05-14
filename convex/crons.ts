import { cronJobs } from "convex/server";
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
    const EXPIRE_WINDOW = 48 * 60 * 60 * 1000; // 48 hours for sessions
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

    console.log(`[GC] Purged ${obsoleteSessions.length} sessions and ${obsoleteLimits.length} rate limit buckets.`);
  },
});

const crons = cronJobs();

// Automated nightly execution at 01:00 AM UTC
crons.daily(
  "autonomous-garbage-collection",
  { hourUTC: 1, minuteUTC: 0 },
  purgeObsoleteSessions
);

export default crons;
