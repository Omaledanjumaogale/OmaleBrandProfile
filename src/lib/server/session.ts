/**
 * Server-only session utilities (Web Crypto, Cloudflare Edge compatible).
 * Import only from server-side files (+server.ts, +layout.server.ts, hooks.server.ts).
 */

export interface SessionPayload {
	uid: string;
	email: string;
	role: 'admin' | 'user';
	exp: number;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
	return crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign', 'verify']
	);
}

export async function createSessionToken(payload: SessionPayload, secret: string): Promise<string> {
	const key = await getHmacKey(secret);
	const payloadB64 = btoa(JSON.stringify(payload));
	const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64));
	const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
	return `${payloadB64}.${sigB64}`;
}

export async function verifySessionToken(
	token: string,
	secret: string
): Promise<SessionPayload | null> {
	try {
		const [payloadB64, sigB64] = token.split('.');
		if (!payloadB64 || !sigB64) return null;

		const key = await getHmacKey(secret);
		const sigBytes = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));
		const isValid = await crypto.subtle.verify(
			'HMAC',
			key,
			sigBytes,
			new TextEncoder().encode(payloadB64)
		);
		if (!isValid) return null;

		const payload: SessionPayload = JSON.parse(atob(payloadB64));
		if (payload.exp < Math.floor(Date.now() / 1000)) return null;

		return payload;
	} catch {
		return null;
	}
}

export function makeSessionCookie(token: string, maxAge = 60 * 60 * 24 * 7): string {
	return `__session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

export function clearSessionCookie(): string {
	return `__session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}
