import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { getAdminRuntimeStatus } from '$lib/server/adminAuth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const adminRuntime = getAdminRuntimeStatus();

	return {
		runtimeStatus: {
			adminAuth: adminRuntime.configured,
			convex: Boolean(publicEnv.PUBLIC_CONVEX_URL),
			firebase: Boolean(publicEnv.PUBLIC_FIREBASE_API_KEY && publicEnv.PUBLIC_FIREBASE_PROJECT_ID),
			email: Boolean(privateEnv.RESEND_API_KEY)
		}
	};
};
