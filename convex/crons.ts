import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Clean up old sessions and rate limit records every day at midnight UTC
crons.daily(
  "cleanup-old-sessions",
  { hourUTC: 0, minuteUTC: 0 },
  internal.functions.cleanupOldSessions
);

export default crons;
