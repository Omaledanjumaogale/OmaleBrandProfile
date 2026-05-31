import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { api } from "./_generated/api";
import { z } from "zod";
import { rateLimitMutation } from "./rateLimit";
import { sessionTrackingMutation } from "./sessions";
import {
	buildAuditActor,
	getOptionalActor,
	hasRequiredRole,
	PLATFORM_KEY,
	requireActivePlatformActor,
	requireActor,
	requireAdminActor,
	requireAuditorActor,
	requireIdentity,
	requireSuperadminActor,
} from "./auth";
import { withAuditLog } from "./triggers";

const DEFAULT_SETTINGS = {
	registration_open: true,
	maintenance_mode: false,
	email_notifications: true,
} as const;

const cleanString = (value: string) => value.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();

const serviceRequestSchema = z.object({
	fullName: z.string().min(2).max(120),
	email: z.string().email(),
	whatsappNumber: z.string().min(7).max(32),
	mobileNumber: z.string().min(7).max(32),
	address: z.string().min(5).max(180),
	stateOfResidence: z.string().min(2).max(80),
	lgaOfResidence: z.string().min(2).max(80),
	company: z.string().max(120).optional().or(z.literal("")),
	serviceType: z.string().min(2).max(80),
	budget: z.string().min(2).max(80),
	description: z.string().min(10).max(2500),
	bestTimeToReach: z.string().min(2).max(60),
	urgency: z.string().min(2).max(40),
	preferredCommunication: z.string().min(2).max(40),
	needType: z.string().min(2).max(40),
	sessionId: z.string().uuid().optional(),
	userAgent: z.string().max(300).optional(),
});

const applicationSchema = z.object({
	fullName: z.string().min(2).max(120),
	email: z.string().email(),
	mobileNumber: z.string().min(7).max(32),
	whatsappNumber: z.string().min(7).max(32),
	stateOfOrigin: z.string().min(2).max(80),
	lgaOfOrigin: z.string().min(2).max(80),
	stateOfResidence: z.string().min(2).max(80),
	lgaOfResidence: z.string().min(2).max(80),
	nin: z.string().min(6).max(32),
	academicBackground: z.string().min(2).max(600),
	workingExperience: z.string().min(2).max(1600),
	skills: z.string().min(2).max(800),
	motivationalStatement: z.string().min(10).max(2500),
	monthlyEarningsTarget: z.string().min(2).max(80),
	sessionId: z.string().uuid().optional(),
	userAgent: z.string().max(300).optional(),
});

const taskCreationSchema = z.object({
	assigneeId: z.string().min(1),
	title: z.string().min(3).max(140),
	description: z.string().max(2000),
	deadline: z.number().int().positive(),
});

const pushSubscriptionSchema = z.object({
	endpoint: z.string().url(),
	keys: z.object({
		p256dh: z.string().min(16),
		auth: z.string().min(8),
	}),
	expirationTime: z.number().nullable().optional(),
	sessionId: z.string().uuid().optional(),
	userAgent: z.string().max(300).optional(),
});

function normalizeObject<T extends Record<string, unknown>>(input: T) {
	return Object.fromEntries(
		Object.entries(input).map(([key, value]) => [
			key,
			typeof value === "string" ? cleanString(value) : value,
		]),
	) as T;
}

async function getSettingValue(ctx: Parameters<typeof query>[0] extends never ? never : any, key: string) {
	const setting = await ctx.db.query("settings").withIndex("by_key", (q: any) => q.eq("key", key)).unique();
	if (setting) return setting.value;
	return DEFAULT_SETTINGS[key as keyof typeof DEFAULT_SETTINGS] ?? null;
}

async function getRuntimeFlags(ctx: Parameters<typeof query>[0] extends never ? never : any) {
	return {
		registration_open: Boolean(await getSettingValue(ctx, "registration_open")),
		maintenance_mode: Boolean(await getSettingValue(ctx, "maintenance_mode")),
		email_notifications: Boolean(await getSettingValue(ctx, "email_notifications")),
	};
}

async function assertPlatformOperationAllowed(
	ctx: Parameters<typeof query>[0] extends never ? never : any,
	options: { allowDuringMaintenance?: boolean; requiresRegistrationOpen?: boolean } = {},
) {
	const flags = await getRuntimeFlags(ctx);
	if (flags.maintenance_mode && !options.allowDuringMaintenance) {
		throw new Error("The platform is currently in maintenance mode. Please try again later.");
	}
	if (options.requiresRegistrationOpen && !flags.registration_open) {
		throw new Error("Registration is currently closed.");
	}
	return flags;
}

export const syncUser = mutation({
	args: {
		email: v.string(),
		name: v.string(),
		image: v.optional(v.string()),
		sessionId: v.optional(v.string()),
		userAgent: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await requireIdentity(ctx);
		const firebaseUid = identity.subject ?? identity.tokenIdentifier;
		const now = Date.now();
		const email = cleanString(identity.email ?? args.email);
		const name = cleanString(args.name || identity.name || "User");
		const image = args.image || undefined;

		const existing = await ctx.db
			.query("users")
			.withIndex("by_firebaseUid", (q) => q.eq("firebaseUid", firebaseUid))
			.unique();

		const userData = {
			firebaseUid,
			platformKey: PLATFORM_KEY,
			email,
			name,
			image,
			lastLogin: now,
			updatedAt: now,
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
				subscriptionStatus: "active",
				createdAt: now,
			});
			await ctx.db.insert("auditLogs", {
				action: "USER_REGISTERED",
				payload: { firebaseUid, email, platformKey: PLATFORM_KEY },
				timestamp: now,
				adminEmail: email,
				actorUid: firebaseUid,
				actorRole: "user",
				platformKey: PLATFORM_KEY,
			});
		}

		if (args.sessionId) {
			await sessionTrackingMutation(ctx, {
				sessionId: args.sessionId,
				firebaseUid,
				userAgent: args.userAgent,
			});
		}

		return await ctx.db.get(userId);
	},
});

export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		const actor = await requireActor(ctx);
		return actor.user;
	},
});

export const getUserByFirebaseUid = query({
	args: { firebaseUid: v.string() },
	handler: async (ctx, { firebaseUid }) => {
		const actor = await requireActor(ctx);
		if (actor.firebaseUid !== firebaseUid && !hasRequiredRole(actor.user.role, "auditor")) {
			throw new Error("Forbidden: You can only access your own profile.");
		}
		return await ctx.db
			.query("users")
			.withIndex("by_firebaseUid", (q) => q.eq("firebaseUid", firebaseUid))
			.unique();
	},
});

export const getPlatformAccessSnapshot = query({
	args: {},
	handler: async (ctx) => {
		const actor = await requireActor(ctx);
		return {
			platformKey: PLATFORM_KEY,
			firebaseUid: actor.firebaseUid,
			email: actor.user.email,
			role: actor.user.role,
			plan: actor.user.plan,
			subscriptionStatus: actor.user.subscriptionStatus,
			isLocked: Boolean(actor.user.isLocked),
		};
	},
});

export const submitServiceRequest = mutation({
	args: {
		fullName: v.string(),
		email: v.string(),
		whatsappNumber: v.string(),
		mobileNumber: v.string(),
		address: v.string(),
		stateOfResidence: v.string(),
		lgaOfResidence: v.string(),
		company: v.optional(v.string()),
		serviceType: v.string(),
		budget: v.string(),
		description: v.string(),
		bestTimeToReach: v.string(),
		urgency: v.string(),
		preferredCommunication: v.string(),
		needType: v.string(),
		sessionId: v.optional(v.string()),
		userAgent: v.optional(v.string()),
	},
	handler: async (ctx, rawArgs) => {
		const actor = await getOptionalActor(ctx);
		await assertPlatformOperationAllowed(ctx);
		const args = serviceRequestSchema.parse(normalizeObject(rawArgs));
		const limiter = await rateLimitMutation(ctx, {
			key: `service:${actor?.firebaseUid ?? args.email}:${args.sessionId ?? "anonymous"}`,
			max: 5,
			window: 60 * 60 * 1000,
		});
		if (!limiter.allowed) throw new Error("Rate limit exceeded. Please try again later.");

		if (args.sessionId) {
			await sessionTrackingMutation(ctx, {
				sessionId: args.sessionId,
				firebaseUid: actor?.firebaseUid,
				userAgent: args.userAgent,
			});
		}

		return await withAuditLog(
			ctx,
			"SERVICE_REQUEST_SUBMITTED",
			{ ...args, firebaseUid: actor?.firebaseUid },
			async () => {
				const id = await ctx.db.insert("serviceRequests", {
					fullName: args.fullName,
					email: args.email,
					whatsappNumber: args.whatsappNumber,
					mobileNumber: args.mobileNumber,
					address: args.address,
					stateOfResidence: args.stateOfResidence,
					lgaOfResidence: args.lgaOfResidence,
					company: args.company || undefined,
					serviceType: args.serviceType,
					budget: args.budget,
					description: args.description,
					bestTimeToReach: args.bestTimeToReach,
					urgency: args.urgency,
					preferredCommunication: args.preferredCommunication,
					needType: args.needType,
					userId: actor?.user._id,
					status: "pending",
					createdAt: Date.now(),
				});

				await ctx.scheduler.runAfter(0, api.functions.dispatchEmail, {
					to: "danjumaumar.ogale@gmail.com",
					subject: `New Service Request: ${args.serviceType}`,
					body: `New request from ${args.fullName} (${args.email})\n\nDescription: ${args.description}`,
					replyTo: args.email,
				});

				return id;
			},
			actor ?? undefined,
		);
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
		userAgent: v.optional(v.string()),
	},
	handler: async (ctx, rawArgs) => {
		const actor = await getOptionalActor(ctx);
		await assertPlatformOperationAllowed(ctx, { requiresRegistrationOpen: true });
		const args = applicationSchema.parse(normalizeObject(rawArgs));
		const limiter = await rateLimitMutation(ctx, {
			key: `apply:${actor?.firebaseUid ?? args.email}:${args.sessionId ?? "anonymous"}`,
			max: 2,
			window: 24 * 60 * 60 * 1000,
		});
		if (!limiter.allowed) {
			throw new Error("You have already submitted an application recently.");
		}

		const existing = await ctx.db
			.query("applications")
			.withIndex("by_email", (q) => q.eq("email", args.email))
			.unique();
		if (existing) throw new Error("An application already exists for this email.");

		if (args.sessionId) {
			await sessionTrackingMutation(ctx, {
				sessionId: args.sessionId,
				firebaseUid: actor?.firebaseUid,
				userAgent: args.userAgent,
			});
		}

		return await withAuditLog(
			ctx,
			"IAM_APPLICATION_SUBMITTED",
			{ email: args.email, firebaseUid: actor?.firebaseUid },
			async () => {
				const id = await ctx.db.insert("applications", {
					...args,
					userId: actor?.user._id,
					status: "pending",
					createdAt: Date.now(),
				});

				await ctx.scheduler.runAfter(0, api.functions.dispatchEmail, {
					to: args.email,
					subject: "Application Received — I-AM Network",
					body: `Hello ${args.fullName}, your application is now under review.`,
				});

				return id;
			},
			actor ?? undefined,
		);
	},
});

export const dispatchEmail = action({
	args: {
		to: v.string(),
		subject: v.string(),
		body: v.string(),
		replyTo: v.optional(v.string()),
	},
	handler: async (_ctx, args) => {
		const key = process.env.RESEND_API_KEY;
		if (!key) return;

		await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${key}`,
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

export const getApplicationsPaginated = query({
	args: { paginationOpts: paginationOptsValidator, status: v.optional(v.string()) },
	handler: async (ctx, { paginationOpts, status }) => {
		await requireAdminActor(ctx);
		if (status) {
			return ctx.db
				.query("applications")
				.withIndex("by_status", (q) => q.eq("status", status as "pending" | "approved" | "declined"))
				.order("desc")
				.paginate(paginationOpts);
		}
		return ctx.db.query("applications").order("desc").paginate(paginationOpts);
	},
});

export const getUsers = query({
	args: {},
	handler: async (ctx) => {
		await requireAuditorActor(ctx);
		return await ctx.db.query("users").order("desc").collect();
	},
});

export const getAuditLogs = query({
	args: { paginationOpts: v.optional(paginationOptsValidator) },
	handler: async (ctx, { paginationOpts }) => {
		await requireAuditorActor(ctx);
		if (paginationOpts) {
			return ctx.db.query("auditLogs").order("desc").paginate(paginationOpts);
		}
		return ctx.db.query("auditLogs").order("desc").take(100);
	},
});

export const getApplications = query({
	args: {},
	handler: async (ctx) => {
		await requireAdminActor(ctx);
		return await ctx.db.query("applications").order("desc").collect();
	},
});

export const getApplicationByEmail = query({
	args: { email: v.string() },
	handler: async (ctx, { email }) => {
		await requireAdminActor(ctx);
		return await ctx.db
			.query("applications")
			.withIndex("by_email", (q) => q.eq("email", cleanString(email)))
			.unique();
	},
});

export const getServiceRequests = query({
	args: {},
	handler: async (ctx) => {
		await requireAdminActor(ctx);
		return await ctx.db.query("serviceRequests").order("desc").collect();
	},
});

export const getTasksForAdmin = query({
	args: {},
	handler: async (ctx) => {
		await requireAdminActor(ctx);
		return await ctx.db.query("tasks").order("desc").collect();
	},
});

export const getTasksForUser = query({
	args: {},
	handler: async (ctx) => {
		const actor = await requireActivePlatformActor(ctx);
		const application = await ctx.db
			.query("applications")
			.withIndex("by_userId", (q) => q.eq("userId", actor.user._id))
			.unique();

		if (!application) return [];

		return await ctx.db
			.query("tasks")
			.withIndex("by_assignee", (q) => q.eq("assigneeId", application._id))
			.order("desc")
			.collect();
	},
});

export const createTask = mutation({
	args: {
		assigneeId: v.id("applications"),
		title: v.string(),
		description: v.string(),
		deadline: v.number(),
	},
	handler: async (ctx, rawArgs) => {
		const actor = await requireAdminActor(ctx);
		const args = taskCreationSchema.parse({
			...normalizeObject(rawArgs as unknown as Record<string, unknown>),
			assigneeId: String(rawArgs.assigneeId),
			deadline: rawArgs.deadline,
		});
		return await withAuditLog(
			ctx,
			"ADMIN_TASK_CREATED",
			args,
			async () =>
				await ctx.db.insert("tasks", {
					assigneeId: rawArgs.assigneeId,
					title: args.title,
					description: args.description,
					deadline: args.deadline,
					status: "pending",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					createdByUserId: actor.user._id,
				}),
			actor,
		);
	},
});

export const updateTaskStatus = mutation({
	args: {
		taskId: v.id("tasks"),
		status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("submitted"), v.literal("completed")),
		report: v.optional(v.string()),
	},
	handler: async (ctx, { taskId, status, report }) => {
		const actor = await requireActor(ctx);
		const task = await ctx.db.get(taskId);
		if (!task) throw new Error("Task not found.");

		if (!hasRequiredRole(actor.user.role, "admin")) {
			const application = await ctx.db
				.query("applications")
				.withIndex("by_userId", (q) => q.eq("userId", actor.user._id))
				.unique();
			if (!application || String(application._id) !== String(task.assigneeId)) {
				throw new Error("Forbidden: You can only update your own tasks.");
			}
		}

		await withAuditLog(
			ctx,
			"TASK_STATUS_UPDATED",
			{ taskId, status, report },
			async () => {
				await ctx.db.patch(taskId, {
					status,
					report: report ? cleanString(report) : undefined,
					updatedAt: Date.now(),
				});
			},
			actor,
		);
	},
});

export const getLatestBroadcasts = query({
	args: {},
	handler: async (ctx) => {
		await requireActivePlatformActor(ctx);
		return await ctx.db
			.query("broadcasts")
			.withIndex("by_active", (q) => q.eq("active", true))
			.order("desc")
			.take(10);
	},
});

export const updateApplicationStatus = mutation({
	args: { id: v.id("applications"), status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")) },
	handler: async (ctx, { id, status }) => {
		const actor = await requireAdminActor(ctx);
		await withAuditLog(
			ctx,
			"ADMIN_APP_STATUS_UPDATE",
			{ id, status },
			async () => {
				await ctx.db.patch(id, { status, updatedAt: Date.now() });
			},
			actor,
		);
	},
});

export const updateServiceRequestStatus = mutation({
	args: {
		id: v.id("serviceRequests"),
		status: v.union(v.literal("pending"), v.literal("contacted"), v.literal("completed"), v.literal("archived")),
	},
	handler: async (ctx, { id, status }) => {
		const actor = await requireAdminActor(ctx);
		await withAuditLog(
			ctx,
			"ADMIN_SERVICE_REQUEST_UPDATE",
			{ id, status },
			async () => {
				await ctx.db.patch(id, { status, updatedAt: Date.now() });
			},
			actor,
		);
	},
});

export const updateSetting = mutation({
	args: { key: v.string(), value: v.any() },
	handler: async (ctx, args) => {
		const actor = await requireSuperadminActor(ctx);
		await withAuditLog(
			ctx,
			"ADMIN_SETTING_UPDATE",
			args,
			async () => {
				const existing = await ctx.db.query("settings").withIndex("by_key", (q) => q.eq("key", args.key)).unique();
				if (existing) {
					await ctx.db.patch(existing._id, { value: args.value, updatedAt: Date.now() });
				} else {
					await ctx.db.insert("settings", { key: args.key, value: args.value, updatedAt: Date.now() });
				}
			},
			actor,
		);
	},
});

export const getSetting = query({
	args: { key: v.string() },
	handler: async (ctx, { key }) => await getSettingValue(ctx, key),
});

export const getPublicRuntimeFlags = query({
	args: {},
	handler: async (ctx) => {
		const flags = await getRuntimeFlags(ctx);
		const settings = await ctx.db.query("settings").collect();
		return {
			...flags,
			updatedAt: settings.reduce((latest, setting) => Math.max(latest, setting.updatedAt), 0) || null,
		};
	},
});

export const consumeAdminLoginRateLimit = mutation({
	args: {
		key: v.string(),
	},
	handler: async (ctx, { key }) => {
		const limiter = await rateLimitMutation(ctx, {
			key: `admin-login:${cleanString(key)}`,
			max: 5,
			window: 15 * 60 * 1000,
		});
		return limiter;
	},
});

export const getAdminSettingsSnapshot = query({
	args: {},
	handler: async (ctx) => {
		await requireAuditorActor(ctx);
		const settings = await ctx.db.query("settings").collect();
		const map = new Map(settings.map((setting) => [setting.key, setting]));

		return {
			registration_open: map.get("registration_open")?.value ?? DEFAULT_SETTINGS.registration_open,
			maintenance_mode: map.get("maintenance_mode")?.value ?? DEFAULT_SETTINGS.maintenance_mode,
			email_notifications: map.get("email_notifications")?.value ?? DEFAULT_SETTINGS.email_notifications,
			updatedAt: settings.reduce((latest, setting) => Math.max(latest, setting.updatedAt), 0) || null,
		};
	},
});

export const updateUserAdminState = mutation({
	args: {
		userId: v.id("users"),
		role: v.union(v.literal("user"), v.literal("admin"), v.literal("auditor"), v.literal("superadmin")),
		plan: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
		subscriptionStatus: v.union(v.literal("active"), v.literal("inactive"), v.literal("pending")),
		isLocked: v.boolean(),
	},
	handler: async (ctx, args) => {
		const actor = await requireSuperadminActor(ctx);
		await withAuditLog(
			ctx,
			"ADMIN_USER_STATE_UPDATE",
			args,
			async () => {
				await ctx.db.patch(args.userId, {
					role: args.role,
					plan: args.plan,
					subscriptionStatus: args.subscriptionStatus,
					isLocked: args.isLocked,
					updatedAt: Date.now(),
				});
			},
			actor,
		);
	},
});

export const upsertPushSubscription = mutation({
	args: {
		subscription: v.object({
			endpoint: v.string(),
			keys: v.object({
				p256dh: v.string(),
				auth: v.string(),
			}),
			expirationTime: v.optional(v.union(v.number(), v.null())),
		}),
		sessionId: v.optional(v.string()),
		userAgent: v.optional(v.string()),
	},
	handler: async (ctx, rawArgs) => {
		const actor = await requireActivePlatformActor(ctx);
		const args = pushSubscriptionSchema.parse({
			...rawArgs.subscription,
			sessionId: rawArgs.sessionId,
			userAgent: rawArgs.userAgent,
		});
		const now = Date.now();
		const existing = await ctx.db
			.query("pushSubscriptions")
			.withIndex("by_endpoint", (q) => q.eq("endpoint", args.endpoint))
			.unique();

		const payload = {
			endpoint: args.endpoint,
			p256dh: args.keys.p256dh,
			auth: args.keys.auth,
			expirationTime: args.expirationTime ?? undefined,
			firebaseUid: actor.firebaseUid,
			userId: actor.user._id,
			platformKey: PLATFORM_KEY,
			userAgent: args.userAgent,
			sessionId: args.sessionId,
			updatedAt: now,
			lastUsedAt: now,
			isActive: true,
		};

		if (existing) {
			await ctx.db.patch(existing._id, payload);
			return existing._id;
		}

		return await ctx.db.insert("pushSubscriptions", {
			...payload,
			createdAt: now,
		});
	},
});

export const removePushSubscription = mutation({
	args: {
		endpoint: v.string(),
	},
	handler: async (ctx, { endpoint }) => {
		const actor = await requireActivePlatformActor(ctx);
		const existing = await ctx.db
			.query("pushSubscriptions")
			.withIndex("by_endpoint", (q) => q.eq("endpoint", endpoint))
			.unique();

		if (!existing) {
			return { removed: false };
		}

		if (existing.firebaseUid && existing.firebaseUid !== actor.firebaseUid && !hasRequiredRole(actor.user.role, "admin")) {
			throw new Error("Forbidden: Cannot remove another user's push subscription.");
		}

		await ctx.db.patch(existing._id, {
			isActive: false,
			updatedAt: Date.now(),
		});

		return { removed: true };
	},
});

export const getPushSubscriptionStatus = query({
	args: {},
	handler: async (ctx) => {
		const actor = await requireActivePlatformActor(ctx);
		const subscriptions = await ctx.db
			.query("pushSubscriptions")
			.withIndex("by_firebaseUid", (q) => q.eq("firebaseUid", actor.firebaseUid))
			.collect();

		return {
			total: subscriptions.length,
			active: subscriptions.filter((subscription) => subscription.isActive).length,
		};
	},
});
