import { redirect } from '@sveltejs/kit';
import { ADMIN_SESSION_COOKIE, getAdminSessionCookieOptions } from '$lib/server/adminAuth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete(ADMIN_SESSION_COOKIE, getAdminSessionCookieOptions());
	throw redirect(303, '/admin/login');
};
