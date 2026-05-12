import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import {
	createSessionToken,
	makeSessionCookie,
	clearSessionCookie
} from '$lib/server/session';
import type { SessionPayload } from '$lib/server/session';

// ── Verify Firebase ID token via Identity Toolkit REST API ─────────
async function verifyFirebaseToken(
	idToken: string
): Promise<{ uid: string; email: string } | null> {
	try {
		const res = await fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.PUBLIC_FIREBASE_API_KEY}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ idToken })
			}
		);
		if (!res.ok) return null;
		const data = await res.json();
		const u = data.users?.[0];
		return u ? { uid: u.localId, email: u.email ?? '' } : null;
	} catch {
		return null;
	}
}

// ── POST /api/session — exchange Firebase token for session cookie ──
export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body?.idToken) {
		return new Response(JSON.stringify({ error: 'Missing idToken' }), { status: 400 });
	}

	const firebaseUser = await verifyFirebaseToken(body.idToken);
	if (!firebaseUser) {
		return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 401 });
	}

	const secret = env.SESSION_SECRET ?? 'dev-secret-please-set-in-prod';
	const payload: SessionPayload = {
		uid: firebaseUser.uid,
		email: firebaseUser.email,
		role: (body.role === 'admin' ? 'admin' : 'user') as 'admin' | 'user',
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
	};

	const token = await createSessionToken(payload, secret);

	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': makeSessionCookie(token)
		}
	});
};

// ── DELETE /api/session — clear session on logout ─────────────────
export const DELETE: RequestHandler = async () => {
	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': clearSessionCookie()
		}
	});
};
