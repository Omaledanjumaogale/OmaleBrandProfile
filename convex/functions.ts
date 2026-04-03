import { mutation, query, internalMutation, action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// --- VALIDATION & SANITIZATION HELPERS ---
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const sanitizeInput = (str: string) => {
  if (!str) return "";
  // Basic XSS prevention: remove HTML tags and trim whitespace
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const sanitizeObject = (obj: any) => {
  const sanitized: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitized[key] = sanitizeInput(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
};

// --- ORCHESTRATION WORKFLOWS ---

export const submitServiceRequest = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    whatsappNumber: v.string(),
    mobileNumber: v.string(),
    address: v.string(),
    stateOfResidence: v.string(),
    lgaOfResidence: v.string(),
    serviceType: v.string(),
    budget: v.string(),
    description: v.string(),
    company: v.optional(v.string()),
    bestTimeToReach: v.string(),
    urgency: v.string(),
    preferredCommunication: v.string(),
    needType: v.string(),
  },
  handler: async (ctx, args) => {
    // Enterprise-Grade Sanitization
    const sanitizedArgs = sanitizeObject(args);
    
    // Validation
    if (!validateEmail(sanitizedArgs.email)) throw new Error("Invalid email format.");
    if (sanitizedArgs.fullName.length < 2) throw new Error("Name is too short.");

    return await ctx.db.insert("serviceRequests", {
      ...sanitizedArgs,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

/**
 * Orchestration Workflow: Submit IAM Application
 */
export const submitApplicationWorkflow = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    mobileNumber: v.string(),
    whatsappNumber: v.string(),
    stateOfOrigin: v.string(),
    lgaOfOrigin: v.string(),
    stateOfResidence: v.string(),
    lgaOfResidence: v.string(),
    nin: v.string(),
    academicBackground: v.string(),
    workingExperience: v.string(),
    skills: v.string(),
    motivationalStatement: v.string(),
    monthlyEarningsTarget: v.string(),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Enterprise-Grade Sanitization
    const sanitizedArgs = sanitizeObject(args);

    // Validation
    if (!validateEmail(sanitizedArgs.email)) throw new Error("Invalid email.");
    if (sanitizedArgs.nin.length < 10) throw new Error("Invalid NIN format.");

    const applicationId = await ctx.db.insert("applications", {
      ...sanitizedArgs,
      status: "pending",
      createdAt: Date.now(),
    });

    await ctx.scheduler.runAfter(0, internal.functions.orchestrateBackgroundTasks, {
      type: "IAM_APPLICATION_SUBMITTED",
      payload: { 
        applicationId, 
        email: args.email, 
        fullName: args.fullName,
        sessionId: args.sessionId 
      }
    });

    return applicationId;
  },
});

/**
 * Internal Orchestrator for Background Jobs & Audit Logs
 */
export const orchestrateBackgroundTasks = internalMutation({
  args: {
    type: v.string(),
    payload: v.any(),
  },
  handler: async (ctx, args) => {
    const { type, payload } = args;
    
    // 1. Audit Logging
    await ctx.db.insert("auditLogs", {
      action: type,
      payload,
      timestamp: Date.now(),
    });

    // 2. Handle Session Tracking Logic
    if (payload.sessionId) {
      const existingSession = await ctx.db
        .query("sessions")
        .withIndex("by_sessionId", (q) => q.eq("sessionId", payload.sessionId))
        .unique();
      
      if (existingSession) {
        await ctx.db.patch(existingSession._id, {
          lastActivity: Date.now(),
          actionsCount: existingSession.actionsCount + 1
        });
      } else {
        await ctx.db.insert("sessions", {
          sessionId: payload.sessionId,
          startTime: Date.now(),
          lastActivity: Date.now(),
          actionsCount: 1,
          email: payload.email
        });
      }
    }
  },
});

// --- CRON JOBS / SCHEDULED TASKS ---

/**
 * Cleanup function for old sessions (to be run via Cron)
 */
export const cleanupOldSessions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const oldSessions = await ctx.db
      .query("sessions")
      .filter((q) => q.lt(q.field("lastActivity"), thirtyDaysAgo))
      .collect();
    
    for (const session of oldSessions) {
      await ctx.db.delete(session._id);
    }
  },
});

// --- QUERIES (STABLE & CACHED) ---

export const getApplications = query({
  handler: async (ctx) => {
    return await ctx.db.query("applications").order("desc").collect();
  },
});

export const getServiceRequests = query({
  handler: async (ctx) => {
    return await ctx.db.query("serviceRequests").order("desc").collect();
  },
});

export const getAuditLogs = query({
  handler: async (ctx) => {
    return await ctx.db.query("auditLogs").order("desc").take(100);
  },
});

export const getActiveSessions = query({
  handler: async (ctx) => {
    return await ctx.db.query("sessions").order("desc").collect();
  },
});

// --- ADMIN SETTINGS & MANAGEMENT ---

export const getSetting = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();
    return setting?.value ?? true; // Default to true if not set
  },
});

export const updateSetting = mutation({
  args: { key: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt: Date.now() });
    } else {
      await ctx.db.insert("settings", { key: args.key, value: args.value, updatedAt: Date.now() });
    }
  },
});

// --- TASKS MANAGEMENT ---

export const createTask = mutation({
  args: { assigneeId: v.id("applications"), title: v.string(), description: v.string(), deadline: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const getTasksForUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("applications")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (!user) return [];
    return await ctx.db
      .query("tasks")
      .withIndex("by_assignee", (q) => q.eq("assigneeId", user._id))
      .order("desc")
      .collect();
  },
});

export const getTasksForAdmin = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

export const updateTaskStatus = mutation({
  args: { taskId: v.id("tasks"), status: v.string(), report: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const { taskId, ...updates } = args;
    await ctx.db.patch(taskId, updates);
  },
});

// --- BROADCASTS ---

export const createBroadcast = mutation({
  args: { message: v.string(), sender: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("broadcasts", { ...args, timestamp: Date.now() });
  },
});

export const getLatestBroadcasts = query({
  handler: async (ctx) => {
    return await ctx.db.query("broadcasts").order("desc").take(10);
  },
});

export const getHistory = query({
  handler: async (ctx) => {
    const requests = await ctx.db
      .query("serviceRequests")
      .filter((q) => q.or(q.eq(q.field("status"), "archived"), q.eq(q.field("status"), "completed")))
      .collect();
    const apps = await ctx.db
      .query("applications")
      .filter((q) => q.or(q.eq(q.field("status"), "approved"), q.eq(q.field("status"), "declined")))
      .collect();
    return [...requests, ...apps].sort((a, b) => b.createdAt - a.createdAt);
  },
});

// --- BACKWARD COMPATIBILITY & PATCHING ---

export const updateApplicationStatus = mutation({
  args: {
    id: v.id("applications"),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const updateServiceRequestStatus = mutation({
  args: {
    id: v.id("serviceRequests"),
    status: v.union(v.literal("pending"), v.literal("contacted"), v.literal("completed"), v.literal("archived")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
