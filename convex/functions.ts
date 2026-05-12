import { mutation, query, internalMutation, action } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { internal } from "./_generated/api";

// ── Validation & Sanitization ──────────────────────────────────────

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitize = (str: string) =>
  typeof str === "string" ? str.replace(/<[^>]*>?/gm, "").trim() : str;

const sanitizeObj = <T extends Record<string, unknown>>(obj: T): T => {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === "string" ? sanitize(v) : v;
  }
  return out as T;
};

// ── Rate Limiting ──────────────────────────────────────────────────

const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX       = 3;          // max submissions per window

async function checkRateLimit(ctx: any, key: string) {
  const now = Date.now();
  const existing = await ctx.db
    .query("rateLimits")
    .withIndex("by_key", (q: any) => q.eq("key", key))
    .unique();

  if (existing) {
    if (now - existing.windowStart < RATE_WINDOW_MS) {
      if (existing.count >= RATE_MAX) {
        throw new Error("Too many submissions. Please wait a minute and try again.");
      }
      await ctx.db.patch(existing._id, { count: existing.count + 1 });
    } else {
      // Reset window
      await ctx.db.patch(existing._id, { count: 1, windowStart: now });
    }
  } else {
    await ctx.db.insert("rateLimits", { key, count: 1, windowStart: now });
  }
}

// ── Submit Service Request ─────────────────────────────────────────

export const submitServiceRequest = mutation({
  args: {
    fullName: v.string(), email: v.string(), whatsappNumber: v.string(),
    mobileNumber: v.string(), address: v.string(), stateOfResidence: v.string(),
    lgaOfResidence: v.string(), serviceType: v.string(), budget: v.string(),
    description: v.string(), company: v.optional(v.string()),
    bestTimeToReach: v.string(), urgency: v.string(),
    preferredCommunication: v.string(), needType: v.string(),
  },
  handler: async (ctx, args) => {
    const clean = sanitizeObj(args);
    if (!validateEmail(clean.email)) throw new Error("Invalid email address.");
    if (clean.fullName.length < 2) throw new Error("Name is too short.");

    await checkRateLimit(ctx, `service:${clean.email}`);

    const id = await ctx.db.insert("serviceRequests", {
      ...clean,
      status: "pending",
      createdAt: Date.now(),
    });

    // Trigger email notification
    await ctx.scheduler.runAfter(0, internal.functions.sendServiceRequestEmail, {
      fullName: clean.fullName,
      email: clean.email,
      serviceType: clean.serviceType,
      description: clean.description,
    });

    return id;
  },
});

// ── Submit IAM Application ─────────────────────────────────────────

export const submitApplicationWorkflow = mutation({
  args: {
    fullName: v.string(), email: v.string(), mobileNumber: v.string(),
    whatsappNumber: v.string(), stateOfOrigin: v.string(), lgaOfOrigin: v.string(),
    stateOfResidence: v.string(), lgaOfResidence: v.string(), nin: v.string(),
    academicBackground: v.string(), workingExperience: v.string(), skills: v.string(),
    motivationalStatement: v.string(), monthlyEarningsTarget: v.string(),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const clean = sanitizeObj(args);
    if (!validateEmail(clean.email)) throw new Error("Invalid email address.");
    if (clean.nin.length < 10) throw new Error("NIN must be at least 10 digits.");

    await checkRateLimit(ctx, `application:${clean.email}`);

    // Prevent duplicate applications
    const existing = await ctx.db
      .query("applications")
      .withIndex("by_email", (q) => q.eq("email", clean.email))
      .unique();
    if (existing) throw new Error("An application already exists for this email.");

    const applicationId = await ctx.db.insert("applications", {
      ...clean,
      status: "pending",
      createdAt: Date.now(),
    });

    await ctx.scheduler.runAfter(0, internal.functions.orchestrateBackgroundTasks, {
      type: "IAM_APPLICATION_SUBMITTED",
      payload: { applicationId, email: clean.email, fullName: clean.fullName, sessionId: clean.sessionId },
    });

    await ctx.scheduler.runAfter(0, internal.functions.sendApplicationConfirmEmail, {
      fullName: clean.fullName,
      email: clean.email,
    });

    return applicationId;
  },
});

// ── Internal: Background Orchestrator ─────────────────────────────

export const orchestrateBackgroundTasks = internalMutation({
  args: { type: v.string(), payload: v.any() },
  handler: async (ctx, { type, payload }) => {
    await ctx.db.insert("auditLogs", { action: type, payload, timestamp: Date.now() });

    if (payload?.sessionId) {
      const session = await ctx.db
        .query("sessions")
        .withIndex("by_sessionId", (q) => q.eq("sessionId", payload.sessionId))
        .unique();
      if (session) {
        await ctx.db.patch(session._id, {
          lastActivity: Date.now(),
          actionsCount: session.actionsCount + 1,
        });
      } else {
        await ctx.db.insert("sessions", {
          sessionId: payload.sessionId,
          startTime: Date.now(),
          lastActivity: Date.now(),
          actionsCount: 1,
          email: payload.email,
        });
      }
    }
  },
});

// ── Internal: Email Sending via Resend ────────────────────────────

export const sendServiceRequestEmail = internalMutation({
  args: { fullName: v.string(), email: v.string(), serviceType: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    // Schedule the actual HTTP call as an action
    await ctx.scheduler.runAfter(0, internal.functions.dispatchEmail, {
      to: "danjumaumar.ogale@gmail.com",
      subject: `New Service Request: ${args.serviceType} from ${args.fullName}`,
      body: `New service request received.\n\nName: ${args.fullName}\nEmail: ${args.email}\nService: ${args.serviceType}\n\n${args.description}`,
      replyTo: args.email,
    });
  },
});

export const sendApplicationConfirmEmail = internalMutation({
  args: { fullName: v.string(), email: v.string() },
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(0, internal.functions.dispatchEmail, {
      to: args.email,
      subject: "I-AM Network — Application Received ✅",
      body: `Dear ${args.fullName},\n\nThank you for applying to the I-AM Network. Your application has been received and is under review.\n\nExpected review time: 3–5 business days.\n\nBest regards,\nE-WIN Project Team`,
      replyTo: "noreply@ewinproject.org",
    });
  },
});

export const dispatchEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    body: v.string(),
    replyTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — email not sent");
      return;
    }
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "E-WIN Project <noreply@ewinproject.org>",
        to: [args.to],
        subject: args.subject,
        text: args.body,
        reply_to: args.replyTo,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Resend email failed:", err);
    }
  },
});

// ── Cleanup old sessions ───────────────────────────────────────────

export const cleanupOldSessions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const old = await ctx.db
      .query("sessions")
      .filter((q) => q.lt(q.field("lastActivity"), cutoff))
      .collect();
    for (const s of old) await ctx.db.delete(s._id);

    // Also clean up rate limit records older than 1 hour
    const rlCutoff = Date.now() - 60 * 60 * 1000;
    const oldRl = await ctx.db
      .query("rateLimits")
      .filter((q) => q.lt(q.field("windowStart"), rlCutoff))
      .collect();
    for (const r of oldRl) await ctx.db.delete(r._id);
  },
});

// ── Paginated Queries ─────────────────────────────────────────────

export const getApplicationsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, status }) => {
    if (status) {
      return ctx.db
        .query("applications")
        .withIndex("by_status", (q) => q.eq("status", status as any))
        .order("desc")
        .paginate(paginationOpts);
    }
    return ctx.db.query("applications").order("desc").paginate(paginationOpts);
  },
});

export const getServiceRequestsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, status }) => {
    if (status) {
      return ctx.db
        .query("serviceRequests")
        .withIndex("by_status", (q) => q.eq("status", status as any))
        .order("desc")
        .paginate(paginationOpts);
    }
    return ctx.db.query("serviceRequests").order("desc").paginate(paginationOpts);
  },
});

export const getAuditLogsPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) =>
    ctx.db.query("auditLogs").order("desc").paginate(paginationOpts),
});

// ── Simple Queries (kept for backward compat / small datasets) ─────

export const getApplications = query({
  handler: async (ctx) => ctx.db.query("applications").order("desc").take(200),
});

export const getServiceRequests = query({
  handler: async (ctx) => ctx.db.query("serviceRequests").order("desc").take(200),
});

export const getAuditLogs = query({
  handler: async (ctx) => ctx.db.query("auditLogs").order("desc").take(100),
});

export const getActiveSessions = query({
  handler: async (ctx) => ctx.db.query("sessions").order("desc").take(100),
});

// Check IAM application by email (used by dashboard layout server guard)
export const getApplicationByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) =>
    ctx.db.query("applications").withIndex("by_email", (q) => q.eq("email", email)).unique(),
});

// ── Settings ───────────────────────────────────────────────────────

export const getSetting = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const s = await ctx.db.query("settings").withIndex("by_key", (q) => q.eq("key", key)).unique();
    return s?.value ?? true;
  },
});

export const updateSetting = mutation({
  args: { key: v.string(), value: v.any() },
  handler: async (ctx, { key, value }) => {
    const existing = await ctx.db.query("settings").withIndex("by_key", (q) => q.eq("key", key)).unique();
    if (existing) {
      await ctx.db.patch(existing._id, { value, updatedAt: Date.now() });
    } else {
      await ctx.db.insert("settings", { key, value, updatedAt: Date.now() });
    }
  },
});

// ── Tasks ──────────────────────────────────────────────────────────

export const createTask = mutation({
  args: {
    assigneeId: v.id("applications"),
    title: v.string(),
    description: v.string(),
    deadline: v.number(),
  },
  handler: async (ctx, args) =>
    ctx.db.insert("tasks", { ...args, status: "pending", createdAt: Date.now() }),
});

export const getTasksForUser = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db.query("applications").withIndex("by_email", (q) => q.eq("email", email)).unique();
    if (!user) return [];
    return ctx.db.query("tasks").withIndex("by_assignee", (q) => q.eq("assigneeId", user._id)).order("desc").collect();
  },
});

export const getTasksForAdmin = query({
  handler: async (ctx) => ctx.db.query("tasks").order("desc").take(200),
});

export const updateTaskStatus = mutation({
  args: {
    taskId: v.id("tasks"),
    status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("submitted"), v.literal("completed")),
    report: v.optional(v.string()),
  },
  handler: async (ctx, { taskId, status, report }) => {
    const patch: Record<string, unknown> = { status };
    if (report !== undefined) patch.report = report;
    await ctx.db.patch(taskId, patch);
  },
});

// ── Broadcasts ─────────────────────────────────────────────────────

export const createBroadcast = mutation({
  args: { message: v.string(), sender: v.string() },
  handler: async (ctx, args) =>
    ctx.db.insert("broadcasts", { ...args, timestamp: Date.now() }),
});

export const getLatestBroadcasts = query({
  handler: async (ctx) => ctx.db.query("broadcasts").order("desc").take(10),
});

// ── Status Updates ─────────────────────────────────────────────────

export const updateApplicationStatus = mutation({
  args: {
    id: v.id("applications"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
    adminEmail: v.optional(v.string()),
  },
  handler: async (ctx, { id, status, adminEmail }) => {
    await ctx.db.patch(id, { status, updatedAt: Date.now(), reviewedBy: adminEmail });
    await ctx.db.insert("auditLogs", {
      action: `APPLICATION_${status.toUpperCase()}`,
      payload: { id, adminEmail },
      timestamp: Date.now(),
      adminEmail,
    });
  },
});

export const updateServiceRequestStatus = mutation({
  args: {
    id: v.id("serviceRequests"),
    status: v.union(v.literal("pending"), v.literal("contacted"), v.literal("completed"), v.literal("archived")),
    adminEmail: v.optional(v.string()),
  },
  handler: async (ctx, { id, status, adminEmail }) => {
    await ctx.db.patch(id, { status, updatedAt: Date.now() });
    await ctx.db.insert("auditLogs", {
      action: `REQUEST_${status.toUpperCase()}`,
      payload: { id, adminEmail },
      timestamp: Date.now(),
      adminEmail,
    });
  },
});

export const getHistory = query({
  handler: async (ctx) => {
    const [requests, apps] = await Promise.all([
      ctx.db.query("serviceRequests")
        .filter((q) => q.or(q.eq(q.field("status"), "archived"), q.eq(q.field("status"), "completed")))
        .order("desc").take(100),
      ctx.db.query("applications")
        .filter((q) => q.or(q.eq(q.field("status"), "approved"), q.eq(q.field("status"), "declined")))
        .order("desc").take(100),
    ]);
    return [...requests, ...apps].sort((a, b) => b.createdAt - a.createdAt);
  },
});

// ── User Management ───────────────────────────────────────────────

export const getUsers = query({
  handler: async (ctx) => ctx.db.query("users").order("desc").collect(),
});

export const updateUserRole = mutation({
  args: { id: v.id("users"), role: v.union(v.literal("user"), v.literal("admin")), adminEmail: v.optional(v.string()) },
  handler: async (ctx, { id, role, adminEmail }) => {
    await ctx.db.patch(id, { role });
    await ctx.db.insert("auditLogs", {
      action: `USER_ROLE_UPDATED`,
      payload: { id, role, adminEmail },
      timestamp: Date.now(),
      adminEmail,
    });
  },
});

export const toggleUserLock = mutation({
  args: { id: v.id("users"), isLocked: v.boolean(), adminEmail: v.optional(v.string()) },
  handler: async (ctx, { id, isLocked, adminEmail }) => {
    await ctx.db.patch(id, { isLocked });
    await ctx.db.insert("auditLogs", {
      action: isLocked ? "USER_LOCKED" : "USER_UNLOCKED",
      payload: { id, adminEmail },
      timestamp: Date.now(),
      adminEmail,
    });
  },
});

export const updateUserStatus = mutation({
  args: { 
    id: v.id("users"), 
    status: v.union(v.literal("active"), v.literal("suspended"), v.literal("pending")),
    adminEmail: v.optional(v.string()) 
  },
  handler: async (ctx, { id, status, adminEmail }) => {
    await ctx.db.patch(id, { status });
    await ctx.db.insert("auditLogs", {
      action: `USER_STATUS_${status.toUpperCase()}`,
      payload: { id, adminEmail },
      timestamp: Date.now(),
      adminEmail,
    });
  },
});
