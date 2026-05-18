import { v } from "convex/values";
import { mutation, query, action, internalAction } from "./_generated/server";

/**
 * Super Admin Authentication Logic
 * This module manages the verification of super admin credentials against 
 * environment variables, ensuring secure access to the administrative portal.
 */

export const verifyAdminCredentials = mutation({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        // Hardcoded Super Admin Credentials (as requested for the enterprise-grade portal)
        const HARDCODED_EMAIL = "Omaledanjumaogale@gmail.com";
        const HARDCODED_PASSWORD = "Omale51566122%%%";

        const adminEmail = process.env.SUPER_ADMIN_EMAIL || HARDCODED_EMAIL;
        const adminPassword = process.env.SUPER_ADMIN_PASSWORD || HARDCODED_PASSWORD;

        if (args.email === adminEmail && args.password === adminPassword) {
            // In a real production app, we would generate a JWT or a session record here.
            // For now, we'll return a success signal that the frontend can use to set a secure cookie.
            return {
                success: true,
                message: "Authentication successful.",
                token: process.env.ADMIN_SESSION_SECRET // This serves as our session proof
            };
        }

        return {
            success: false,
            message: "Invalid super admin credentials."
        };
    },
});

/**
 * Validates if a provided token matches the admin secret.
 */
export const validateAdminSession = query({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        return args.token === process.env.ADMIN_SESSION_SECRET;
    }
});

/**
 * Send a global system broadcast
 */
export const sendBroadcast = mutation({
    args: {
        title: v.string(),
        message: v.string(),
        type: v.enum(["info", "warning", "critical", "update"]),
        target: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const timestamp = Date.now();
        await ctx.db.insert("broadcasts", {
            ...args,
            timestamp,
            active: true
        });

        // Log this action
        await ctx.db.insert("auditLogs", {
            action: "SYSTEM_BROADCAST_SENT",
            payload: args,
            timestamp,
            adminEmail: "super-admin"
        });

        return { success: true };
    }
});

/**
 * List active broadcasts
 */
export const getBroadcasts = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("broadcasts")
            .order("desc")
            .collect();
    }
});

/**
 * Get Platform-wide Statistics
 */
export const getPlatformStats = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        const apps = await ctx.db.query("applications").collect();
        const requests = await ctx.db.query("serviceRequests").collect();
        
        return {
            totalUsers: users.length,
            pendingApps: apps.filter(a => a.status === 'pending').length,
            activeRequests: requests.filter(r => r.status === 'pending' || r.status === 'contacted').length,
            systemHealth: 99.9 // This could be dynamic based on logs or heartbeats
        };
    }
});
