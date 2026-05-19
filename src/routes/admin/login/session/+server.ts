import { json } from '@sveltejs/kit';
import {
	ADMIN_SESSION_COOKIE,
	createAdminSessionFromFirebase,
	getAdminRuntimeStatus,
	getAdminSessionCookieOptions
} from '$lib/server/adminAuth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!getAdminRuntimeStatus().configured) {
		return json(
			{ error: 'Admin authentication is not configured in the deployment environment.' },
			{ status: 500 }
		);
	}

	try {
		const body = (await request.json()) as { idToken?: string };
		if (!body.idToken) {
			return json({ error: 'Missing Firebase ID token.' }, { status: 400 });
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
