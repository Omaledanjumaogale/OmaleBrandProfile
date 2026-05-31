import { redirect } from '@sveltejs/kit';
import {
	ADMIN_SESSION_COOKIE,
	getAdminSessionCookieOptions,
	verifyAdminSessionToken
} from '$lib/server/adminAuth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	if (url.pathname === '/admin/login' || url.pathname === '/admin/logout') {
		return {};
	}

	const session = await verifyAdminSessionToken(cookies.get(ADMIN_SESSION_COOKIE));
	if (!session) {
		cookies.delete(ADMIN_SESSION_COOKIE, getAdminSessionCookieOptions());
		throw redirect(302, '/admin/login');
	}

	return {
		isAdmin: true,
		adminEmail: session.email,
		adminUid: session.uid,
		adminRole: session.role
	};
};
