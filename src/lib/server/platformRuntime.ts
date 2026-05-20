import { api } from '$convex/_generated/api';
import { createServerConvexClient } from './convexServer';
export { shouldBypassMaintenance, shouldProtectRegistration } from './routeGuards';

export type PublicRuntimeFlags = {
	registration_open: boolean;
	maintenance_mode: boolean;
	email_notifications: boolean;
	updatedAt: number | null;
};

const DEFAULT_FLAGS: PublicRuntimeFlags = {
	registration_open: true,
	maintenance_mode: false,
	email_notifications: true,
	updatedAt: null
};

const CACHE_TTL_MS = 15_000;

let cachedFlags: PublicRuntimeFlags | null = null;
let cachedAt = 0;

export async function getPublicRuntimeFlags(force = false): Promise<PublicRuntimeFlags> {
	if (!force && cachedFlags && Date.now() - cachedAt < CACHE_TTL_MS) {
		return cachedFlags;
	}

	try {
		const convex = createServerConvexClient();
		const flags = await convex.query(api.functions.getPublicRuntimeFlags, {});
		cachedFlags = {
			registration_open: Boolean(flags?.registration_open ?? DEFAULT_FLAGS.registration_open),
			maintenance_mode: Boolean(flags?.maintenance_mode ?? DEFAULT_FLAGS.maintenance_mode),
			email_notifications: Boolean(flags?.email_notifications ?? DEFAULT_FLAGS.email_notifications),
			updatedAt: typeof flags?.updatedAt === 'number' ? flags.updatedAt : null
		};
		cachedAt = Date.now();
		return cachedFlags;
	} catch (error) {
		console.error('[runtime] Failed to load runtime flags:', error);
		return cachedFlags ?? DEFAULT_FLAGS;
	}
}
