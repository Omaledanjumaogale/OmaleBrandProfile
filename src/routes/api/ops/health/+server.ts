import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { json } from '@sveltejs/kit';
import { getAdminRuntimeStatus } from '$lib/server/adminAuth';
import { getObservabilityRuntimeStatus, emitUptimeHeartbeat } from '$lib/server/observability';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const adminRuntime = getAdminRuntimeStatus();
	const observability = getObservabilityRuntimeStatus();

	const checks = {
		convex: Boolean(publicEnv.PUBLIC_CONVEX_URL?.trim()),
		firebaseClient: Boolean(publicEnv.PUBLIC_FIREBASE_API_KEY?.trim() && publicEnv.PUBLIC_FIREBASE_PROJECT_ID?.trim()),
		firebaseAdmin: adminRuntime.firebaseAdmin,
		adminAuth: adminRuntime.configured,
		email: Boolean(privateEnv.RESEND_API_KEY?.trim()),
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
