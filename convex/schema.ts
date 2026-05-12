import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    tokenIdentifier: v.string(),
    trustScore: v.number(),
    lastLogin: v.number(),
    isLocked: v.optional(v.boolean()),
    status: v.optional(v.union(v.literal("active"), v.literal("suspended"), v.literal("pending"))),
  }).index("by_token", ["tokenIdentifier"]).index("by_email", ["email"]),

  transactions: defineTable({
    userId: v.id("users"),
    amount: v.string(),
    type: v.string(),
    status: v.string(),
    date: v.number(),
    description: v.string(),
  }).index("by_user", ["userId"]),

  metrics: defineTable({
    userId: v.id("users"),
    totalEarnings: v.string(),
    activeProjects: v.number(),
    courseProgress: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  announcements: defineTable({
    title: v.string(),
    content: v.string(),
    icon: v.string(),
    category: v.string(),
    createdAt: v.number(),
  }),

  applications: defineTable({
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
    reviewedBy: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),

  serviceRequests: defineTable({
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
    status: v.union(
      v.literal("pending"),
      v.literal("contacted"),
      v.literal("completed"),
      v.literal("archived")
    ),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),

  auditLogs: defineTable({
    action: v.string(),
    payload: v.any(),
    timestamp: v.number(),
    adminEmail: v.optional(v.string()),
  }),

  sessions: defineTable({
    sessionId: v.string(),
    email: v.optional(v.string()),
    startTime: v.number(),
    lastActivity: v.number(),
    actionsCount: v.number(),
  }).index("by_sessionId", ["sessionId"]),

  tasks: defineTable({
    assigneeId: v.id("applications"),
    title: v.string(),
    description: v.string(),
    deadline: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("submitted"),
      v.literal("completed")
    ),
    report: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_assignee", ["assigneeId"]).index("by_status", ["status"]),

  broadcasts: defineTable({
    message: v.string(),
    sender: v.string(),
    timestamp: v.number(),
  }),

  settings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  // Rate limiting: track recent submissions per email
  rateLimits: defineTable({
    key: v.string(),       // e.g. "submit_service:email@example.com"
    count: v.number(),
    windowStart: v.number(),
  }).index("by_key", ["key"]),
});
