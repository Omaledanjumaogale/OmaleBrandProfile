import { ConvexHttpClient } from 'convex/browser';
import { getEnvVar } from './safeEnv';

/**
 * Creates a Convex HTTP client for server-side use.
 * Uses getEnvVar() which safely accesses SvelteKit's dynamic env
 * without crashing on Cloudflare edge during module initialization.
 */
export function createServerConvexClient(token?: string) {
	const url = getEnvVar('PUBLIC_CONVEX_URL')?.trim();
	if (!url) {
		throw new Error('[convex] PUBLIC_CONVEX_URL is not configured.');
	}

	const client = new ConvexHttpClient(url);
	if (token) {
		client.setAuth(token);
	}
	return client;
}
