import { dev } from '$app/environment';
import { api } from '$convex/_generated/api';
import { createServerConvexClient } from './convexServer';
import {
	resolvePlatformAccess,
	verifyFirebaseIdentityToken,
	type VerifiedFirebaseIdentity
} from './firebaseIdentity';
import { getFirebaseAdminRuntimeStatus } from './firebaseAdmin';
import {
	createSignedSessionPayload,
	verifySignedSessionPayload,
	type SignedSessionPayload
} from './sessionToken';
import { getEnvVar } from './safeEnv';

const PLATFORM_KEY = 'ewinproject';

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
			getEnvVar('ADMIN_SESSION_SECRET')?.trim() &&
				getFirebaseAdminRuntimeStatus().configured &&
				getEnvVar('PUBLIC_CONVEX_URL')?.trim()
		),
		firebaseAdmin: getFirebaseAdminRuntimeStatus().configured,
		push: Boolean(getEnvVar('PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY')?.trim() && getEnvVar('WEB_PUSH_VAPID_PRIVATE_KEY')?.trim()),
		observability: Boolean(getEnvVar('OBSERVABILITY_WEBHOOK_URL')?.trim() || getEnvVar('SENTRY_DSN')?.trim())
	};
}

async function getSecret() {
	const secret = getEnvVar('ADMIN_SESSION_SECRET')?.trim();
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
	if (!getFirebaseAdminRuntimeStatus().configured) {
		throw new Error('Firebase Admin SDK is not configured for secure server-side token verification.');
	}

	const identity = await verifyFirebaseIdentityToken(idToken, PLATFORM_KEY);
	const convex = createServerConvexClient(idToken);
	const platformUser = await convex.query(api.functions.getCurrentUser, {});
	const access = resolvePlatformAccess({
		role: platformUser?.role,
		subscriptionStatus: platformUser?.subscriptionStatus,
		isLocked: platformUser?.isLocked
	});

	if (identity.claimedPlatformAccess === false) {
		throw new Error('This Firebase account is restricted from accessing the E-WIN admin surface.');
	}

	if (!platformUser || !access.allowed) {
		throw new Error(
			access.reason === 'inactive_subscription'
				? 'Your platform subscription is not active for admin access.'
				: access.reason === 'locked'
					? 'This account is locked.'
					: 'This Firebase account is not authorized for admin access.'
		);
	}

	if (identity.claimedRole && identity.claimedRole !== platformUser.role) {
		throw new Error(
			`Role mismatch detected between Firebase claims (${identity.claimedRole}) and platform access (${platformUser.role}).`
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
		role: platformUser.role
	});
}

export type AdminSession = Awaited<ReturnType<typeof verifyAdminSessionToken>>;
export type FirebaseAdminIdentity = VerifiedFirebaseIdentity;
