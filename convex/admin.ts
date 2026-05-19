import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
        const now = Date.now();
        const users = await ctx.db.query("users").collect();
        const apps = await ctx.db.query("applications").collect();
        const requests = await ctx.db.query("serviceRequests").collect();
        const sessions = await ctx.db.query("sessions").collect();
        const broadcasts = await ctx.db.query("broadcasts").collect();

        const pendingApps = apps.filter(a => a.status === 'pending').length;
        const activeRequests = requests.filter(r => r.status === 'pending' || r.status === 'contacted').length;
        const activeSessions = sessions.filter(s => now - s.lastActivity <= 30 * 60 * 1000).length;
        const lockedUsers = users.filter(u => u.isLocked).length;
        const criticalBroadcasts = broadcasts.filter(b => b.active && b.type === 'critical').length;
        const healthPenalty = Math.min(22, lockedUsers * 2 + criticalBroadcasts * 5 + Math.max(0, activeRequests - 12));
        const systemHealth = Math.max(78, 100 - healthPenalty);
        
        return {
            totalUsers: users.length,
            pendingApps,
            activeRequests,
            activeSessions,
            lockedUsers,
            criticalBroadcasts,
            systemHealth,
            updatedAt: now
        };
    }
});

export const getMonitoringSnapshot = query({
	args: {},
	handler: async (ctx) => {
		const now = Date.now();
		const users = await ctx.db.query("users").collect();
		const applications = await ctx.db.query("applications").collect();
		const serviceRequests = await ctx.db.query("serviceRequests").collect();
		const sessions = await ctx.db.query("sessions").collect();
		const broadcasts = await ctx.db.query("broadcasts").collect();
		const auditLogs = await ctx.db.query("auditLogs").order("desc").take(20);
		const settings = await ctx.db.query("settings").collect();

		const activeSessions = sessions.filter((session) => now - session.lastActivity <= 30 * 60 * 1000);
		const requests24h = serviceRequests.filter((request) => now - request.createdAt <= 24 * 60 * 60 * 1000);
		const applications7d = applications.filter((application) => now - application.createdAt <= 7 * 24 * 60 * 60 * 1000);
		const auditEvents24h = auditLogs.filter((log) => now - log.timestamp <= 24 * 60 * 60 * 1000);
		const lockedUsers = users.filter((user) => user.isLocked).length;
		const pendingApplications = applications.filter((application) => application.status === 'pending').length;
		const openRequests = serviceRequests.filter(
			(request) => request.status === 'pending' || request.status === 'contacted'
		).length;
		const activeBroadcasts = broadcasts.filter((broadcast) => broadcast.active).length;
		const integrations = {
			convex: true,
			firebase: Boolean(process.env.PUBLIC_FIREBASE_API_KEY && process.env.PUBLIC_FIREBASE_PROJECT_ID),
			email: Boolean(process.env.RESEND_API_KEY),
			adminAuth: Boolean(
				process.env.SUPER_ADMIN_EMAIL &&
				process.env.SUPER_ADMIN_PASSWORD &&
				process.env.ADMIN_SESSION_SECRET
			)
		};
		const integrationFailures = Object.values(integrations).filter((value) => !value).length;
		const healthScore = Math.max(
			72,
			100 -
				lockedUsers * 2 -
				Math.min(10, openRequests) -
				Math.min(6, integrationFailures * 3)
		);

		return {
			generatedAt: now,
			healthScore,
			metrics: [
				{
					name: 'Audit Events (24h)',
					value: auditEvents24h.length,
					detail: `${requests24h.length} service requests and ${applications7d.length} applications in current review window`
				},
				{
					name: 'Active Sessions',
					value: activeSessions.length,
					detail: `${sessions.length} tracked sessions with ${lockedUsers} locked accounts`
				},
				{
					name: 'Open Intake Queue',
					value: pendingApplications + openRequests,
					detail: `${pendingApplications} applications and ${openRequests} service requests awaiting action`
				},
				{
					name: 'Broadcast Reach',
					value: activeBroadcasts,
					detail: `${broadcasts.filter((broadcast) => broadcast.type === 'critical' && broadcast.active).length} critical broadcasts currently active`
				}
			],
			systems: [
				{
					name: 'Convex Data Plane',
					provider: 'Convex',
					location: 'Primary Workspace',
					status: integrations.convex ? 'online' : 'degraded',
					detail: `${users.length} users, ${auditLogs.length} recent audit events`
				},
				{
					name: 'Realtime Session Sync',
					provider: 'Convex Sessions',
					location: 'Unified App',
					status: activeSessions.length > 0 ? 'online' : 'idle',
					detail: `${activeSessions.length} active sessions in the last 30 minutes`
				},
				{
					name: 'Firebase Identity',
					provider: 'Firebase Auth',
					location: 'Global',
					status: integrations.firebase ? 'online' : 'attention',
					detail: integrations.firebase ? 'Public Firebase environment detected' : 'Firebase public keys missing'
				},
				{
					name: 'Email Delivery',
					provider: 'Resend',
					location: 'Transactional',
					status: integrations.email ? 'online' : 'attention',
					detail: integrations.email ? 'Transactional notifications enabled' : 'RESEND_API_KEY not configured'
				},
				{
					name: 'Admin Access Control',
					provider: 'SvelteKit Server',
					location: 'Protected Routes',
					status: integrations.adminAuth ? 'online' : 'attention',
					detail: integrations.adminAuth ? 'Signed admin session cookies enabled' : 'Admin auth environment incomplete'
				}
			],
			recentEvents: auditLogs.map((log) => ({
				id: log._id,
				action: log.action,
				adminEmail: log.adminEmail ?? 'system',
				timestamp: log.timestamp
			})),
			integrations,
			settings: {
				registration_open:
					settings.find((setting) => setting.key === 'registration_open')?.value ?? true,
				maintenance_mode:
					settings.find((setting) => setting.key === 'maintenance_mode')?.value ?? false,
				email_notifications:
					settings.find((setting) => setting.key === 'email_notifications')?.value ?? true
			}
		};
	}
});
