import { ConvexHttpClient } from 'convex/browser';
import { env } from '$env/dynamic/public';

export function createServerConvexClient(token?: string) {
	const url = env.PUBLIC_CONVEX_URL?.trim();
	if (!url) {
		throw new Error('PUBLIC_CONVEX_URL is not configured.');
	}

	const client = new ConvexHttpClient(url);
	if (token) {
		client.setAuth(token);
	}
	return client;
}
