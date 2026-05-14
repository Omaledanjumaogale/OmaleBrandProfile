import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ── Multi-Platform Identity Model ─────────────────────────────────
  // Users are identified globally by their firebaseUid.
  // Each platform (this Convex instance) manages its own roles and status.
  users: defineTable({
    firebaseUid: v.string(), // The global identity key from Firebase
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    plan: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
    subscriptionStatus: v.union(v.literal("active"), v.literal("inactive"), v.literal("pending")),
    lastLogin: v.number(),
    isLocked: v.optional(v.boolean()),
  })
    .index("by_firebaseUid", ["firebaseUid"])
    .index("by_email", ["email"]),

  // ── Platform Specific Data (E-WIN) ────────────────────────────────
  
  applications: defineTable({
    userId: v.optional(v.id("users")), // Linked to the local platform user
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
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
    assignedTasks: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"])
    .index("by_userId", ["userId"]),

  serviceRequests: defineTable({
    userId: v.optional(v.id("users")),
    fullName: v.string(),
    email: v.string(),
    serviceType: v.string(),
    budget: v.string(),
    description: v.string(),
    status: v.union(v.literal("pending"), v.literal("contacted"), v.literal("completed"), v.literal("archived")),
    createdAt: v.number(),
  }).index("by_status", ["status"]),

  // ── Enterprise Infrastructure Tables ─────────────────────────────
  
  auditLogs: defineTable({
    action: v.string(),
    payload: v.any(),
    timestamp: v.number(),
    adminEmail: v.optional(v.string()),
    sessionId: v.optional(v.string()),
  }).index("by_timestamp", ["timestamp"]),

  sessions: defineTable({
    sessionId: v.string(),
    email: v.optional(v.string()), // Stores firebaseUid or email
    startTime: v.number(),
    lastActivity: v.number(),
    actionsCount: v.number(),
  }).index("by_sessionId", ["sessionId"]),

  rateLimits: defineTable({
    key: v.string(),
    count: v.number(),
    windowStart: v.number(),
  }).index("by_key", ["key"]),

  settings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  tasks: defineTable({
    assigneeId: v.id("applications"),
    title: v.string(),
    description: v.string(),
    deadline: v.number(),
    status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("submitted"), v.literal("completed")),
    createdAt: v.number(),
  }).index("by_assignee", ["assigneeId"]),

  broadcasts: defineTable({
    title: v.string(),
    message: v.string(),
    type: v.union(v.literal("info"), v.literal("warning"), v.literal("critical"), v.literal("update")),
    target: v.optional(v.string()),
    timestamp: v.number(),
    active: v.boolean(),
  }).index("by_active", ["active"]),
});
