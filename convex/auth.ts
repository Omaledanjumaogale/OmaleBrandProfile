import type { UserIdentity } from 'convex/server';
import type { Doc } from './_generated/dataModel';
import type { MutationCtx, QueryCtx } from './_generated/server';

export const PLATFORM_KEY = 'ewinproject';

type AnyCtx = MutationCtx | QueryCtx;
type PlatformUser = Doc<'users'>;
export type PlatformRole = PlatformUser['role'];
export const roleRank: Record<PlatformRole, number> = {
	user: 0,
	admin: 1,
	auditor: 2,
	superadmin: 3,
};

export type AuthenticatedActor = {
	identity: UserIdentity;
	firebaseUid: string;
	user: PlatformUser;
};

export function hasRequiredRole(role: PlatformRole, minimum: PlatformRole) {
	return roleRank[role] >= roleRank[minimum];
}

function getFirebaseUid(identity: UserIdentity) {
	return identity.subject ?? identity.tokenIdentifier;
}

export async function requireIdentity(ctx: AnyCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		throw new Error('Unauthorized: Firebase identity required.');
	}
	return identity;
}

export async function findUserByFirebaseUid(ctx: AnyCtx, firebaseUid: string) {
	return await ctx.db
		.query('users')
		.withIndex('by_firebaseUid', (q) => q.eq('firebaseUid', firebaseUid))
		.unique();
}

export async function requireActor(ctx: AnyCtx): Promise<AuthenticatedActor> {
	const identity = await requireIdentity(ctx);
	const firebaseUid = getFirebaseUid(identity);
	const user = await findUserByFirebaseUid(ctx, firebaseUid);
	if (!user) {
		throw new Error('Unauthorized: Platform user not found.');
	}
	if (user.isLocked) {
		throw new Error('Unauthorized: Account is locked.');
	}
	return { identity, firebaseUid, user };
}

export async function getOptionalActor(ctx: AnyCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		return null;
	}
	const firebaseUid = getFirebaseUid(identity);
	const user = await findUserByFirebaseUid(ctx, firebaseUid);
	if (!user || user.isLocked) {
		return null;
	}
	return { identity, firebaseUid, user } satisfies AuthenticatedActor;
}

export async function requireAdminActor(ctx: AnyCtx) {
	const actor = await requireActor(ctx);
	if (!hasRequiredRole(actor.user.role, 'admin')) {
		throw new Error('Forbidden: Administrative privileges required.');
	}
	if (actor.user.subscriptionStatus !== 'active') {
		throw new Error('Forbidden: Active admin subscription required.');
	}
	return actor;
}

export async function requireAuditorActor(ctx: AnyCtx) {
	const actor = await requireActor(ctx);
	if (!hasRequiredRole(actor.user.role, 'auditor')) {
		throw new Error('Forbidden: Auditor privileges required.');
	}
	if (actor.user.subscriptionStatus !== 'active') {
		throw new Error('Forbidden: Active auditor subscription required.');
	}
	return actor;
}

export async function requireSuperadminActor(ctx: AnyCtx) {
	const actor = await requireActor(ctx);
	if (!hasRequiredRole(actor.user.role, 'superadmin')) {
		throw new Error('Forbidden: Superadmin privileges required.');
	}
	if (actor.user.subscriptionStatus !== 'active') {
		throw new Error('Forbidden: Active superadmin subscription required.');
	}
	return actor;
}

export async function requireActivePlatformActor(ctx: AnyCtx) {
	const actor = await requireActor(ctx);
	if (actor.user.subscriptionStatus !== 'active') {
		throw new Error('Forbidden: Active platform subscription required.');
	}
	return actor;
}

export function buildAuditActor(actor?: AuthenticatedActor) {
	return {
		adminEmail: actor?.user.email ?? actor?.identity.email ?? 'system',
		actorUid: actor?.firebaseUid ?? 'system',
		actorRole: actor?.user.role ?? 'system',
		platformKey: PLATFORM_KEY
	};
}
