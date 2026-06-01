import { json } from '@sveltejs/kit';
import { getEnvVar } from '$lib/server/safeEnv';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const publicKey = getEnvVar('PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY')?.trim();
	if (!publicKey) {
		return json({ error: 'Push notifications are not configured.' }, { status: 503 });
	}

	return json({ publicKey });
};
