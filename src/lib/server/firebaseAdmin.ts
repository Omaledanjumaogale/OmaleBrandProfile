import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';

type PlatformClaims = {
	[platformKey: string]:
		| string
		| {
				role?: string | null;
				access?: boolean | null;
		  };
};

function normalizePrivateKey(value: string) {
	return value.replace(/\\n/g, '\n');
}

function getServiceAccountConfig() {
	const serviceAccountJson = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON?.trim();
	if (serviceAccountJson) {
		const parsed = JSON.parse(serviceAccountJson) as {
			project_id: string;
			client_email: string;
			private_key: string;
		};
		return {
			projectId: parsed.project_id,
			clientEmail: parsed.client_email,
			privateKey: normalizePrivateKey(parsed.private_key),
		};
	}

	const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
	const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim();
	const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.trim();

	if (!projectId || !clientEmail || !privateKey) {
		return null;
	}

	return {
		projectId,
		clientEmail,
		privateKey: normalizePrivateKey(privateKey),
	};
}

export function getFirebaseAdminRuntimeStatus() {
	return {
		configured: Boolean(getServiceAccountConfig()),
	};
}

let cachedApp: App | null = null;

export function getFirebaseAdminApp() {
	if (cachedApp) {
		return cachedApp;
	}

	const serviceAccount = getServiceAccountConfig();
	if (!serviceAccount) {
		throw new Error(
			'Firebase Admin SDK is not configured. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.'
		);
	}

	cachedApp =
		getApps()[0] ??
		initializeApp({
			credential: cert(serviceAccount),
		});

	return cachedApp;
}

export async function verifyFirebaseIdToken(idToken: string) {
	const app = getFirebaseAdminApp();
	return getAuth(app).verifyIdToken(idToken, true);
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
