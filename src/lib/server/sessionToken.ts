export type SignedSessionPayload = {
	uid: string;
	email: string;
	role: 'user' | 'admin' | 'auditor' | 'superadmin';
	exp: number;
};

function toBase64Url(input: Uint8Array | string) {
	const buffer = typeof input === 'string' ? Buffer.from(input, 'utf8') : Buffer.from(input);
	return buffer
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/g, '');
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

export async function createSignedSessionPayload(
	payload: Omit<SignedSessionPayload, 'exp'>,
	secret: string,
	ttlMs: number
) {
	const value: SignedSessionPayload = {
		...payload,
		exp: Date.now() + ttlMs
	};
	const serialized = JSON.stringify(value);
	const signature = await signPayload(serialized, secret);
	return `${encodeURIComponent(serialized)}.${signature}`;
}

export async function verifySignedSessionPayload(token: string, secret: string) {
	const dotIndex = token.lastIndexOf('.');
	if (dotIndex === -1) {
		return null;
	}

	const encodedPayload = token.slice(0, dotIndex);
	const signature = token.slice(dotIndex + 1);
	const payload = decodeURIComponent(encodedPayload);
	const expectedSignature = await signPayload(payload, secret);

	if (signature !== expectedSignature) {
		return null;
	}

	try {
		const data = JSON.parse(payload) as SignedSessionPayload;
		if (!data.uid || !data.email || !data.role || data.exp < Date.now()) {
			return null;
		}
		return data;
	} catch {
		return null;
	}
}
