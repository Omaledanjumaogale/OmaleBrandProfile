import { jwtVerify, createRemoteJWKSet } from 'jose';

type PlatformClaims = {
	[platformKey: string]:
		| string
		| {
				role?: string | null;
				access?: boolean | null;
		  };
};

// Google JWKS URI for Firebase Auth
const JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const jwks = createRemoteJWKSet(new URL(JWKS_URL));

function getFirebaseProjectId(): string | null {
	// 1. Try FIREBASE_ADMIN_PROJECT_ID
	let projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
	if (projectId) return projectId;

	// 2. Try PUBLIC_FIREBASE_PROJECT_ID
	projectId = process.env.PUBLIC_FIREBASE_PROJECT_ID?.trim();
	if (projectId) return projectId;

	// 3. Try parsing service account JSON
	const serviceAccountJson = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON?.trim();
	if (serviceAccountJson) {
		try {
			const parsed = JSON.parse(serviceAccountJson);
			if (parsed.project_id) {
				return parsed.project_id;
			}
		} catch (e) {
			// ignore
		}
	}

	return null;
}

export function getFirebaseAdminRuntimeStatus() {
	return {
		configured: Boolean(getFirebaseProjectId())
	};
}

export async function verifyFirebaseIdToken(idToken: string) {
	const projectId = getFirebaseProjectId();
	if (!projectId) {
		throw new Error('Firebase Project ID is not configured.');
	}

	const issuer = `https://securetoken.google.com/${projectId}`;
	const audience = projectId;

	try {
		const { payload } = await jwtVerify(idToken, jwks, {
			issuer,
			audience,
			algorithms: ['RS256']
		});

		// Format output to match standard DecodedIdToken structure
		return {
			uid: payload.sub as string,
			email: payload.email as string | undefined,
			email_verified: payload.email_verified as boolean | undefined,
			name: payload.name as string | undefined,
			...payload
		};
	} catch (err) {
		console.error('[firebaseAdmin] JWT verification failed:', err);
		throw err;
	}
}

export function getClaimedPlatformRole(
	token: { role?: unknown; platforms?: unknown } & Record<string, unknown>,
	platformKey: string
) {
	const platforms = token.platforms as PlatformClaims | undefined;
	const platformClaim = platforms?.[platformKey];

	if (typeof platformClaim === 'string') {
		return platformClaim;
	}

	if (platformClaim && typeof platformClaim === 'object' && platformClaim.role) {
		return platformClaim.role;
	}

	if (typeof token.role === 'string') {
		return token.role;
	}

	return null;
}

export function hasClaimedPlatformAccess(
	token: { platforms?: unknown } & Record<string, unknown>,
	platformKey: string
) {
	const platforms = token.platforms as PlatformClaims | undefined;
	const platformClaim = platforms?.[platformKey];

	if (platformClaim == null) {
		return null;
	}

	if (typeof platformClaim === 'string') {
		return true;
	}

	if (typeof platformClaim === 'object' && 'access' in platformClaim) {
		return Boolean(platformClaim.access);
	}

	return true;
}
