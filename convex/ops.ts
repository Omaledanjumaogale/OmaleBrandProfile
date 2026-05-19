import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { PLATFORM_KEY } from "./auth";

export const setPlatformUserAccess = internalMutation({
	args: {
		email: v.optional(v.string()),
		firebaseUid: v.optional(v.string()),
		role: v.union(v.literal("admin"), v.literal("user")),
		plan: v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise")),
		subscriptionStatus: v.union(v.literal("active"), v.literal("inactive"), v.literal("pending")),
		isLocked: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const user =
			(args.firebaseUid
				? await ctx.db
						.query("users")
						.withIndex("by_firebaseUid", (q) => q.eq("firebaseUid", args.firebaseUid!))
						.unique()
				: null) ??
			(args.email
				? await ctx.db
						.query("users")
						.withIndex("by_email", (q) => q.eq("email", args.email!))
						.unique()
				: null);

		if (!user) {
			throw new Error("Platform user not found for provisioning.");
		}

		const now = Date.now();
		await ctx.db.patch(user._id, {
			role: args.role,
			plan: args.plan,
			subscriptionStatus: args.subscriptionStatus,
			isLocked: args.isLocked ?? false,
			updatedAt: now,
			lastLogin: now,
		});

		await ctx.db.insert("auditLogs", {
			action: "OPS_PLATFORM_ACCESS_UPDATED",
			payload: {
				targetUserId: user._id,
				targetEmail: user.email,
				role: args.role,
				plan: args.plan,
				subscriptionStatus: args.subscriptionStatus,
				isLocked: args.isLocked ?? false,
			},
			timestamp: now,
			adminEmail: "system",
			actorUid: "system",
			actorRole: "system",
			platformKey: PLATFORM_KEY,
		});

		return await ctx.db.get(user._id);
	},
});
