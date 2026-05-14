import { mutation, query, internalMutation, action } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { internal } from "./_generated/api";
import { rateLimitMutation } from "./rateLimit";
import { sessionTrackingMutation } from "./sessions";
import { withAuditLog } from "./triggers";

// ── Multi-Platform Identity Sync ──────────────────────────────────
// Ensures that every Firebase user has a local platform record
// with independent subscription management and roles.

export const syncUser = mutation({
  args: {
    firebaseUid: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_firebaseUid", (q) => q.eq("firebaseUid", args.firebaseUid))
      .unique();

    const userData = {
      firebaseUid: args.firebaseUid,
      email: args.email,
      name: args.name,
      image: args.image,
      lastLogin: Date.now(),
    };

    let userId;
    if (existing) {
      userId = existing._id;
      await ctx.db.patch(existing._id, userData);
    } else {
      userId = await ctx.db.insert("users", {
        ...userData,
        role: "user",
        plan: "free",
        subscriptionStatus: "active", // Default access for E-WIN platform
      });
      
      // Log new platform user
      await ctx.db.insert("auditLogs", {
        action: "USER_REGISTERED",
        payload: { firebaseUid: args.firebaseUid, email: args.email },
        timestamp: Date.now(),
      });
    }

    // Track session
    if (args.sessionId) {
      await sessionTrackingMutation(ctx, { 
        sessionId: args.sessionId, 
        firebaseUid: args.firebaseUid 
      });
    }

    return userId;
  },
});

export const getUserByFirebaseUid = query({
  args: { firebaseUid: v.string() },
  handler: async (ctx, { firebaseUid }) => {
    return ctx.db
      .query("users")
      .withIndex("by_firebaseUid", (q) => q.eq("firebaseUid", firebaseUid))
      .unique();
  },
});

// ── Enterprise Authorization Middleware ───────────────────────────

async function checkPlatformAccess(ctx: any, firebaseUid: string) {
    const user = await ctx.db
        .query("users")
        .withIndex("by_firebaseUid", (q: any) => q.eq("firebaseUid", firebaseUid))
        .unique();
    
    if (!user) throw new Error("Unauthorized: User not found in this platform.");
    if (user.isLocked) throw new Error("Unauthorized: Account is locked.");
    if (user.subscriptionStatus !== "active") throw new Error("Unauthorized: Subscription required.");
    
    return user;
}

// ── Refactored Mutations with Enterprise Safeguards ───────────────

export const submitServiceRequest = mutation({
  args: {
    fullName: v.string(), 
    email: v.string(), 
    serviceType: v.string(), 
    budget: v.string(),
    description: v.string(),
    sessionId: v.optional(v.string()),
    firebaseUid: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 1. Rate Limiting
    const ok = await rateLimitMutation(ctx, { 
        key: `service:${args.email}`, 
        max: 5, 
        window: 60 * 60 * 1000 // 5 per hour
    });
    if (!ok) throw new Error("Rate limit exceeded. Please try again later.");

    // 2. Session Tracking
    if (args.sessionId) {
        await sessionTrackingMutation(ctx, { 
            sessionId: args.sessionId, 
            firebaseUid: args.firebaseUid 
        });
    }

    // 3. Execution with Audit Trigger
    return await withAuditLog(ctx, "SERVICE_REQUEST_SUBMITTED", args, async () => {
        const id = await ctx.db.insert("serviceRequests", {
            fullName: args.fullName,
            email: args.email,
            serviceType: args.serviceType,
            budget: args.budget,
            description: args.description,
            status: "pending",
            createdAt: Date.now(),
        });

        // Async Email Notification
        await ctx.scheduler.runAfter(0, internal.functions.dispatchEmail, {
            to: "danjumaumar.ogale@gmail.com",
            subject: `New Service Request: ${args.serviceType}`,
            body: `New request from ${args.fullName} (${args.email})\n\nDescription: ${args.description}`,
            replyTo: args.email,
        });

        return id;
    });
  },
});

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
    firebaseUid: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const ok = await rateLimitMutation(ctx, { 
        key: `apply:${args.email}`, 
        max: 2, 
        window: 24 * 60 * 60 * 1000 // 2 per day
    });
    if (!ok) throw new Error("You have already submitted an application recently.");

    const existing = await ctx.db
      .query("applications")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) throw new Error("An application already exists for this email.");

    return await withAuditLog(ctx, "IAM_APPLICATION_SUBMITTED", { email: args.email }, async () => {
        const id = await ctx.db.insert("applications", {
            ...args,
            status: "pending",
            createdAt: Date.now(),
        });

        await ctx.scheduler.runAfter(0, internal.functions.dispatchEmail, {
            to: args.email,
            subject: "Application Received — I-AM Network",
            body: `Hello ${args.fullName}, your application is now under review.`,
        });

        return id;
    });
  },
});

// ── Email Action (Resend) ─────────────────────────────────────────

export const dispatchEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    body: v.string(),
    replyTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const key = process.env.RESEND_API_KEY;
    if (!key) return;
    
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "E-WIN Platform <noreply@ewinproject.org>",
        to: [args.to],
        subject: args.subject,
        text: args.body,
        reply_to: args.replyTo,
      }),
    });
  },
});

// ── Admin Queries (Paginated) ─────────────────────────────────────

export const getApplicationsPaginated = query({
  args: { paginationOpts: paginationOptsValidator, status: v.optional(v.string()) },
  handler: async (ctx, { paginationOpts, status }) => {
    if (status) {
      return ctx.db.query("applications")
        .withIndex("by_status", (q) => q.eq("status", status as any))
        .order("desc").paginate(paginationOpts);
    }
    return ctx.db.query("applications").order("desc").paginate(paginationOpts);
  },
});

export const getUsers = query({
  handler: async (ctx) => ctx.db.query("users").order("desc").collect(),
});

export const getAuditLogs = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) =>
    ctx.db.query("auditLogs").order("desc").paginate(paginationOpts),
});

// ── Admin Actions ──────────────────────────────────────────────────

export const updateApplicationStatus = mutation({
  args: { id: v.id("applications"), status: v.string(), adminEmail: v.string() },
  handler: async (ctx, { id, status, adminEmail }) => {
    await withAuditLog(ctx, "ADMIN_APP_STATUS_UPDATE", { id, status, adminEmail }, async () => {
        await ctx.db.patch(id, { status: status as any, updatedAt: Date.now() });
    });
  },
});

export const updateSetting = mutation({
  args: { key: v.string(), value: v.any(), adminEmail: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await withAuditLog(ctx, "ADMIN_SETTING_UPDATE", args, async () => {
        const existing = await ctx.db.query("settings").withIndex("by_key", (q) => q.eq("key", args.key)).unique();
        if (existing) {
          await ctx.db.patch(existing._id, { value: args.value, updatedAt: Date.now() });
        } else {
          await ctx.db.insert("settings", { key: args.key, value: args.value, updatedAt: Date.now() });
        }
    });
  },
});

export const getSetting = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const s = await ctx.db.query("settings").withIndex("by_key", (q) => q.eq("key", key)).unique();
    return s?.value ?? true;
  },
});
