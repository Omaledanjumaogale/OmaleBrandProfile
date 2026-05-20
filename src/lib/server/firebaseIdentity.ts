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
		| 'insufficient_role';
};

export function isAuthorizedPlatformRole(role: string | null | undefined) {
	return role === 'admin';
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

export function extractFirebaseIdentity(payload: FirebaseLookupResponse): VerifiedFirebaseIdentity {
	const user = payload.users?.[0];
	if (!user?.localId) {
		throw new Error('Invalid Firebase identity payload.');
	}

	return {
		uid: user.localId,
		email: user.email ?? null,
		emailVerified: Boolean(user.emailVerified),
		displayName: user.displayName ?? null
	};
}

export async function verifyFirebaseIdentityToken(idToken: string, apiKey: string) {
	const response = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ idToken })
		}
	);

	if (!response.ok) {
		throw new Error('Firebase token verification failed.');
	}

	const payload = (await response.json()) as FirebaseLookupResponse;
	return extractFirebaseIdentity(payload);
}
