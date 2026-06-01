import type { RequestEvent } from '@sveltejs/kit';

type ObservabilityEvent = {
	level: 'info' | 'warning' | 'error';
	category: 'server_error' | 'uptime' | 'security' | 'runtime';
	message: string;
	context?: Record<string, unknown>;
};

export function getObservabilityRuntimeStatus() {
	return {
		errorAggregation: Boolean(process.env.OBSERVABILITY_WEBHOOK_URL?.trim() || process.env.SENTRY_DSN?.trim()),
		uptimeWebhook: Boolean(process.env.UPTIME_WEBHOOK_URL?.trim() || process.env.OBSERVABILITY_WEBHOOK_URL?.trim()),
	};
}

async function postJson(url: string, body: Record<string, unknown>) {
	await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
}

export async function emitOperationalEvent(event: ObservabilityEvent) {
	const endpoint = process.env.OBSERVABILITY_WEBHOOK_URL?.trim();
	if (!endpoint) {
		return;
	}

	try {
		await postJson(endpoint, {
			...event,
			timestamp: new Date().toISOString(),
			platform: 'ewinproject'
		});
	} catch (error) {
		console.error('[observability] Failed to dispatch webhook event', error);
	}
}

export async function reportServerError(errorId: string, error: unknown, event: RequestEvent) {
	await emitOperationalEvent({
		level: 'error',
		category: 'server_error',
		message: error instanceof Error ? error.message : 'Unhandled server error',
		context: {
			errorId,
			path: event.url.pathname,
			method: event.request.method,
			userAgent: event.request.headers.get('user-agent'),
			ipAddress: event.getClientAddress?.(),
		}
	});
}

export async function emitUptimeHeartbeat(context: Record<string, unknown>) {
	const endpoint = process.env.UPTIME_WEBHOOK_URL?.trim();
	if (!endpoint) {
		return;
	}

	try {
		await postJson(endpoint, {
			level: 'info',
			category: 'uptime',
			message: 'E-WIN health check heartbeat',
			timestamp: new Date().toISOString(),
			platform: 'ewinproject',
			context,
		});
	} catch (error) {
		console.error('[observability] Failed to dispatch uptime heartbeat', error);
	}
}
