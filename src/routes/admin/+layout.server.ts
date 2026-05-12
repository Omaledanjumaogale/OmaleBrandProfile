import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

/**
 * Admin layout guard — runs on every /admin/* request.
 * hooks.server.ts already redirects unauthenticated users but
 * this provides an extra layer and passes user data to the layout.
 */
export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user.role !== 'admin') {
		throw redirect(303, '/admin/login');
	}
	return {
		user: {
			uid: locals.user.uid,
			email: locals.user.email,
			role: locals.user.role
		}
	};
};
