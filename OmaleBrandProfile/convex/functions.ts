import { mutation, query, internalMutation, action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// --- VALIDATION HELPERS ---
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// --- ORCHESTRATION WORKFLOWS ---

/**
 * Orchestration Workflow: Submit Service Request
 * Includes validation and background task scheduling
 */
export const submitServiceRequestWorkflow = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    serviceType: v.string(),
    description: v.string(),
    budget: v.optional(v.string()),
    sessionId: v.optional(v.string()), // For session tracking
  },
  handler: async (ctx, args) => {
    // 1. Validation
    if (!validateEmail(args.email)) {
      throw new Error("Invalid email format provided.");
    }
    if (args.fullName.length < 2) {
      throw new Error("Full name must be at least 2 characters.");
    }

    // 2. Data Insertion
    const requestId = await ctx.db.insert("serviceRequests", {
      fullName: args.fullName,
      email: args.email,
      company: args.company,
      serviceType: args.serviceType,
      description: args.description,
      budget: args.budget,
      status: "pending",
      createdAt: Date.now(),
    });

    // 3. Orchestrate Background Tasks
    await ctx.scheduler.runAfter(0, internal.functions.orchestrateBackgroundTasks, {
      type: "SERVICE_REQUEST_SUBMITTED",
      payload: { 
        requestId, 
        email: args.email, 
        fullName: args.fullName,
        sessionId: args.sessionId 
      }
    });

    return requestId;
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
    // Validation
    if (!validateEmail(args.email)) throw new Error("Invalid email.");
    if (args.nin.length < 10) throw new Error("Invalid NIN.");

    const applicationId = await ctx.db.insert("applications", {
      ...args,
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
    key: v.string(),
    value: v.any()
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .filter(q => q.eq(q.field("key"), args.key))
      .unique();
    
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt: Date.now() });
    } else {
      await ctx.db.insert("settings", { key: args.key, value: args.value, updatedAt: Date.now() });
    }
  }
});

export const getSettings = query({
  handler: async (ctx) => {
    return await ctx.db.query("settings").collect();
  }
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
