import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { api } from '$convex/_generated/api';
import { createServerConvexClient } from './convexServer';
import {
	resolvePlatformAccess,
	verifyFirebaseIdentityToken,
	type VerifiedFirebaseIdentity
} from './firebaseIdentity';
import {
	createSignedSessionPayload,
	verifySignedSessionPayload,
	type SignedSessionPayload
} from './sessionToken';

export const ADMIN_SESSION_COOKIE = 'admin_session';
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 6;

export function getAdminSessionCookieOptions() {
	return {
		path: '/',
		httpOnly: true,
		sameSite: 'strict' as const,
		secure: !dev,
		maxAge: ADMIN_SESSION_TTL_SECONDS
	};
}

export function getAdminRuntimeStatus() {
	return {
		configured: Boolean(
			env.ADMIN_SESSION_SECRET?.trim() &&
				publicEnv.PUBLIC_FIREBASE_API_KEY?.trim() &&
				publicEnv.PUBLIC_CONVEX_URL?.trim()
		)
	};
}

async function getSecret() {
	const secret = env.ADMIN_SESSION_SECRET?.trim();
	if (!secret) {
		throw new Error('ADMIN_SESSION_SECRET is not configured.');
	}
	return secret;
}

export async function createAdminSessionToken(payload: Omit<SignedSessionPayload, 'exp'>) {
	return createSignedSessionPayload(
		payload,
		await getSecret(),
		ADMIN_SESSION_TTL_SECONDS * 1000
	);
}

export async function verifyAdminSessionToken(token: string | undefined) {
	if (!token) {
		return null;
	}
	return verifySignedSessionPayload(token, await getSecret());
}

export async function verifyAdminLogin(idToken: string) {
	const apiKey = publicEnv.PUBLIC_FIREBASE_API_KEY?.trim();
	if (!apiKey) {
		throw new Error('PUBLIC_FIREBASE_API_KEY is not configured.');
	}

	const identity = await verifyFirebaseIdentityToken(idToken, apiKey);
	const convex = createServerConvexClient(idToken);
	const platformUser = await convex.query(api.functions.getCurrentUser, {});
	const access = resolvePlatformAccess({
		role: platformUser?.role,
		subscriptionStatus: platformUser?.subscriptionStatus,
		isLocked: platformUser?.isLocked
	});

	if (!platformUser || !access.allowed) {
		throw new Error(
			access.reason === 'inactive_subscription'
				? 'Your platform subscription is not active for admin access.'
				: access.reason === 'locked'
					? 'This account is locked.'
					: 'This Firebase account is not authorized for admin access.'
		);
	}

	return {
		identity,
		platformUser
	};
}

export async function createAdminSessionFromFirebase(idToken: string) {
	const { identity, platformUser } = await verifyAdminLogin(idToken);

	return createAdminSessionToken({
		uid: identity.uid,
		email: platformUser.email,
		role: 'admin'
	});
}

export type AdminSession = Awaited<ReturnType<typeof verifyAdminSessionToken>>;
export type FirebaseAdminIdentity = VerifiedFirebaseIdentity;
