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
  }).index("by_token", ["tokenIdentifier"]),

  transactions: defineTable({
    userId: v.id("users"),
    amount: v.string(),
    type: v.string(), // e.g., "E-Deals", "AkademyX", "DealxHire"
    status: v.string(), // e.g., "Completed", "Pending", "Failed"
    date: v.number(),
    description: v.string(),
  }).index("by_user", ["userId"]),

  metrics: defineTable({
    userId: v.id("users"),
    totalEarnings: v.string(),
    activeProjects: v.number(),
    courseProgress: v.number(), // 0 to 100
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
  }).index("by_status", ["status"]).index("by_email", ["email"]),

  serviceRequests: defineTable({
    fullName: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    serviceType: v.string(), // App Dev, AI, etc.
    description: v.string(),
    budget: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("contacted"), v.literal("completed"), v.literal("archived")),
    createdAt: v.number(),
  }).index("by_status", ["status"]).index("by_email", ["email"]),

  auditLogs: defineTable({
    action: v.string(),
    payload: v.any(),
    timestamp: v.number(),
  }),

  sessions: defineTable({
    sessionId: v.string(),
    email: v.optional(v.string()),
    startTime: v.number(),
    lastActivity: v.number(),
    actionsCount: v.number(),
  }).index("by_sessionId", ["sessionId"]),

  tasks: defineTable({
    assigneeId: v.id("applications"), // The approved IAM applicant
    title: v.string(),
    description: v.string(),
    deadline: v.number(),
    status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("submitted"), v.literal("completed")),
    report: v.optional(v.string()), // Report submitted by user
    createdAt: v.number(),
  }).index("by_assignee", ["assigneeId"]),

  broadcasts: defineTable({
    message: v.string(),
    sender: v.string(),
    timestamp: v.number(),
  }),

  settings: defineTable({
    key: v.string(), // "maintenance_mode", "registration_open", etc.
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
