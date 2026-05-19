import { redirect } from '@sveltejs/kit';
import {
	ADMIN_SESSION_COOKIE,
	getAdminRuntimeStatus,
	verifyAdminSessionToken
} from '$lib/server/adminAuth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = await verifyAdminSessionToken(cookies.get(ADMIN_SESSION_COOKIE));
	if (session) {
		throw redirect(303, '/admin');
	}

	return {
		adminRuntime: getAdminRuntimeStatus()
	};
};
