import { getEnvVar } from '$lib/server/safeEnv';
import { json } from '@sveltejs/kit';
import { getAdminRuntimeStatus } from '$lib/server/adminAuth';
import { getObservabilityRuntimeStatus, emitUptimeHeartbeat } from '$lib/server/observability';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const adminRuntime = getAdminRuntimeStatus();
	const observability = getObservabilityRuntimeStatus();

	const checks = {
		convex: Boolean(getEnvVar('PUBLIC_CONVEX_URL')?.trim()),
		firebaseClient: Boolean(getEnvVar('PUBLIC_FIREBASE_API_KEY')?.trim() && getEnvVar('PUBLIC_FIREBASE_PROJECT_ID')?.trim()),
		firebaseAdmin: adminRuntime.firebaseAdmin,
		adminAuth: adminRuntime.configured,
		email: Boolean(getEnvVar('RESEND_API_KEY')?.trim()),
		push: adminRuntime.push,
		observability: observability.errorAggregation,
	};

	const healthy = Object.values(checks).every(Boolean);
	const payload = {
		status: healthy ? 'ok' : 'degraded',
		timestamp: new Date().toISOString(),
		service: 'ewinproject',
		checks,
	};

	if (url.searchParams.get('notify') === '1') {
		void emitUptimeHeartbeat(payload);
	}

	return json(payload, { status: healthy ? 200 : 503 });
};
