import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

export const ADMIN_SESSION_COOKIE = 'admin_session';
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12;

type AdminConfig = {
	email: string;
	password: string;
	secret: string;
	source: 'private' | 'legacy-public';
};

function toBase64Url(input: Uint8Array | string) {
	const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input;
	let binary = '';

	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}

	return btoa(binary)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/g, '');
}

function getAdminConfig(): AdminConfig | null {
	const secret = env.ADMIN_SESSION_SECRET?.trim();
	const privateEmail = env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
	const privatePassword = env.SUPER_ADMIN_PASSWORD?.trim();
	const publicEmail = publicEnv.PUBLIC_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
	const publicPassword = publicEnv.PUBLIC_SUPER_ADMIN_PASSWORD?.trim();

	if (privateEmail && privatePassword && secret) {
		return {
			email: privateEmail,
			password: privatePassword,
			secret,
			source: 'private'
		};
	}

	if (publicEmail && publicPassword && secret) {
		return {
			email: publicEmail,
			password: publicPassword,
			secret,
			source: 'legacy-public'
		};
	}

	return null;
}

async function signPayload(payload: string, secret: string) {
	const key = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
	return toBase64Url(new Uint8Array(signature));
}

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
	const config = getAdminConfig();
	return {
		configured: Boolean(config),
		email: config?.email ?? null,
		source: config?.source ?? 'private'
	};
}

export async function validateAdminCredentials(email: string, password: string) {
	const config = getAdminConfig();
	if (!config) {
		return { ok: false as const, reason: 'missing_config' as const };
	}

	if (email.trim().toLowerCase() !== config.email || password !== config.password) {
		return { ok: false as const, reason: 'invalid_credentials' as const };
	}

	return { ok: true as const, email: config.email };
}

export async function createAdminSessionToken(email: string) {
	const config = getAdminConfig();
	if (!config) {
		throw new Error('Admin authentication environment is not configured.');
	}

	const payload = JSON.stringify({
		email,
		exp: Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000
	});
	const signature = await signPayload(payload, config.secret);
	return `${encodeURIComponent(payload)}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
	const config = getAdminConfig();
	if (!config || !token) {
		return null;
	}

	const dotIndex = token.lastIndexOf('.');
	if (dotIndex === -1) {
		return null;
	}

	const encodedPayload = token.slice(0, dotIndex);
	const signature = token.slice(dotIndex + 1);
	const payload = decodeURIComponent(encodedPayload);
	const expectedSignature = await signPayload(payload, config.secret);

	if (signature !== expectedSignature) {
		return null;
	}

	try {
		const data = JSON.parse(payload) as { email?: string; exp?: number };
		if (!data.email || !data.exp || data.exp < Date.now()) {
			return null;
		}

		if (data.email.toLowerCase() !== config.email) {
			return null;
		}

		return { email: data.email };
	} catch {
		return null;
	}
}
