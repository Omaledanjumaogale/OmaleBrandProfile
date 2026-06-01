import { json } from '@sveltejs/kit';
import { api } from '$convex/_generated/api';
import {
	ADMIN_SESSION_COOKIE,
	createAdminSessionFromFirebase,
	getAdminRuntimeStatus,
	getAdminSessionCookieOptions
} from '$lib/server/adminAuth';
import { createServerConvexClient } from '$lib/server/convexServer';
import { buildAdminLoginRateLimitKey } from '$lib/server/authRateLimit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
	const body = (await request.json()) as { idToken?: string };
	if (!body.idToken) {
		return json({ error: 'Missing Firebase ID token.' }, { status: 400 });
	}

	if (!getAdminRuntimeStatus().configured) {
		return json(
			{ error: 'Admin authentication is not configured in the deployment environment.' },
			{ status: 500 }
		);
	}

	try {
		const limiterClient = createServerConvexClient();
		const rateLimitKey = buildAdminLoginRateLimitKey(
			getClientAddress(),
			request.headers.get('user-agent')
		);
		const limiter = await limiterClient.mutation(api.functions.consumeAdminLoginRateLimit, {
			key: rateLimitKey
		});
		if (!limiter.allowed) {
			return json(
				{
					error: 'Too many admin login attempts. Please wait a few minutes and try again.',
					resetAt: limiter.resetAt
				},
				{ status: 429 }
			);
		}

		const token = await createAdminSessionFromFirebase(body.idToken);
		cookies.set(ADMIN_SESSION_COOKIE, token, getAdminSessionCookieOptions());
		return json({ ok: true });
	} catch (error) {
		return json(
			{ error: error instanceof Error ? error.message : 'Unable to create admin session.' },
			{ status: 403 }
		);
	}
};
