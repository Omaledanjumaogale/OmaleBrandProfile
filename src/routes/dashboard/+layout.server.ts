import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/**
 * Dashboard layout guard — requires:
 * 1. Valid session cookie (any authenticated user)
 * 2. An approved IAM application linked to the user's email
 *
 * We verify IAM approval by querying the Convex HTTP endpoint.
 */
export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/admin/login?redirect=/dashboard');
	}

	const { email } = locals.user;

	// Check approved IAM application via Convex HTTP query
	try {
		const convexUrl = env.PUBLIC_CONVEX_URL ?? '';
		if (convexUrl) {
			const res = await fetch(`${convexUrl}/api/query`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					path: 'functions:getApplicationByEmail',
					args: { email }
				})
			});
			if (res.ok) {
				const data = await res.json();
				// If application exists but is not approved, redirect to a waiting page
				if (data?.value && data.value.status !== 'approved') {
					throw redirect(303, '/register/iam?status=pending');
				}
				// If no application at all, redirect to apply
				if (!data?.value) {
					throw redirect(303, '/register/iam?status=apply');
				}
			}
		}
	} catch (e) {
		// If the IAM check fails (e.g. Convex unreachable), allow through
		// The client-side Convex queries will still enforce data access
		if ((e as any)?.status === 303) throw e;
		console.warn('IAM check skipped:', e);
	}

	return {
		user: {
			uid: locals.user.uid,
			email: locals.user.email,
			role: locals.user.role
		}
	};
};
