import { fail, redirect } from '@sveltejs/kit';
import {
	ADMIN_SESSION_COOKIE,
	createAdminSessionToken,
	getAdminRuntimeStatus,
	getAdminSessionCookieOptions,
	validateAdminCredentials,
	verifyAdminSessionToken
} from '$lib/server/adminAuth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = await verifyAdminSessionToken(cookies.get(ADMIN_SESSION_COOKIE));
	if (session) {
		throw redirect(303, '/admin');
	}

	return {
		adminRuntime: getAdminRuntimeStatus()
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		if (!email || !password) {
			return fail(400, {
				email,
				error: 'Provide the configured admin email and password.'
			});
		}

		const validation = await validateAdminCredentials(email, password);
		if (!validation.ok) {
			const error =
				validation.reason === 'missing_config'
					? 'Admin authentication is not configured in the deployment environment.'
					: 'Invalid admin credentials.';
			return fail(validation.reason === 'missing_config' ? 500 : 401, { email, error });
		}

		cookies.set(
			ADMIN_SESSION_COOKIE,
			await createAdminSessionToken(validation.email),
			getAdminSessionCookieOptions()
		);

		throw redirect(303, '/admin');
	}
};
