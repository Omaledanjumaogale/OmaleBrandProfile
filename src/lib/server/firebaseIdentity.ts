import { getClaimedPlatformRole, hasClaimedPlatformAccess, verifyFirebaseIdToken } from './firebaseAdmin';

export type FirebaseLookupUser = {
	localId?: string;
	email?: string;
	emailVerified?: boolean;
	displayName?: string;
	disabled?: boolean;
};

export type FirebaseLookupResponse = {
	users?: FirebaseLookupUser[];
};

export type VerifiedFirebaseIdentity = {
	uid: string;
	email: string | null;
	emailVerified: boolean;
	displayName: string | null;
	claimedRole: string | null;
	claimedPlatformAccess: boolean | null;
};

export type PlatformAccessInput = {
	role?: string | null;
	subscriptionStatus?: string | null;
	isLocked?: boolean | null;
};

export type PlatformAccessResult = {
	allowed: boolean;
	reason:
		| 'authorized'
		| 'locked'
		| 'inactive_subscription'
		| 'insufficient_role'
		| 'claims_restricted';
};

export function isAuthorizedPlatformRole(role: string | null | undefined) {
	return role === 'admin' || role === 'auditor' || role === 'superadmin';
}

export function resolvePlatformAccess(input: PlatformAccessInput): PlatformAccessResult {
	if (input.isLocked) {
		return { allowed: false, reason: 'locked' };
	}
	if (input.subscriptionStatus !== 'active') {
		return { allowed: false, reason: 'inactive_subscription' };
	}
	if (!isAuthorizedPlatformRole(input.role)) {
		return { allowed: false, reason: 'insufficient_role' };
	}
	return { allowed: true, reason: 'authorized' };
}

export async function verifyFirebaseIdentityToken(idToken: string, platformKey: string) {
	const decodedToken = await verifyFirebaseIdToken(idToken);
	return {
		uid: decodedToken.uid,
		email: decodedToken.email ?? null,
		emailVerified: Boolean(decodedToken.email_verified),
		displayName: decodedToken.name ?? null,
		claimedRole: getClaimedPlatformRole(decodedToken as Record<string, unknown> & { role?: string; platforms?: unknown }, platformKey),
		claimedPlatformAccess: hasClaimedPlatformAccess(
			decodedToken as Record<string, unknown> & { platforms?: unknown },
			platformKey
		)
	} satisfies VerifiedFirebaseIdentity;
}
