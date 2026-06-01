import { getEnvVar } from '$lib/server/safeEnv';
import { getAdminRuntimeStatus } from '$lib/server/adminAuth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const adminRuntime = getAdminRuntimeStatus();

	return {
		runtimeStatus: {
			adminAuth: adminRuntime.configured,
			convex: Boolean(getEnvVar('PUBLIC_CONVEX_URL')),
			firebase: adminRuntime.firebaseAdmin,
			email: Boolean(getEnvVar('RESEND_API_KEY')),
			push: adminRuntime.push,
			observability: adminRuntime.observability
		}
	};
};
