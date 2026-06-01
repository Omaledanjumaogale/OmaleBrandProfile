/**
 * safeEnv.ts — Edge-safe environment variable access
 *
 * Root cause of 500 errors on Cloudflare Workers:
 * Importing `$env/dynamic/private` or `$env/dynamic/public` at the MODULE
 * TOP-LEVEL crashes the Cloudflare Worker on boot before any request is
 * processed — causing a blank 500 on every page.
 *
 * Solution Strategy:
 * 1. Primary: Use Cloudflare's `platform.env` binding (event.platform.env)
 *    — injected via initPlatformEnv() from hooks.server.ts once per request.
 * 2. Fallback: Lazy dynamic import of $env/dynamic/* on first call.
 * 3. Last resort: process.env (works in Node.js dev server).
 *
 * IMPORTANT: Call initPlatformEnv(event.platform) from hooks.server.ts
 * at the start of every request BEFORE any other env access.
 */

type EnvRecord = Record<string, string | undefined>;

// Populated from Cloudflare platform.env on each request
let _platformEnv: EnvRecord | null = null;
// Populated lazily from $env/dynamic on first async access
let _svelteEnvLoaded = false;
let _privateEnv: EnvRecord | null = null;
let _publicEnv: EnvRecord | null = null;

/**
 * Call this at the top of hooks.server.ts handle() with event.platform.
 * Gives all server modules access to Cloudflare Worker env bindings
 * without any module-level import.
 */
export function initPlatformEnv(platform: App.Platform | undefined): void {
	if (platform?.env) {
		_platformEnv = platform.env as EnvRecord;
	}
}

/**
 * Lazily load SvelteKit's dynamic env modules.
 * Uses dynamic import() so it only runs inside a request context,
 * never at module-init time.
 */
async function loadSvelteEnvs(): Promise<void> {
	if (_svelteEnvLoaded) return;
	_svelteEnvLoaded = true;
	try {
		const [priv, pub] = await Promise.all([
			import('$env/dynamic/private'),
			import('$env/dynamic/public')
		]);
		_privateEnv = (priv.env ?? {}) as EnvRecord;
		_publicEnv = (pub.env ?? {}) as EnvRecord;
	} catch {
		// In test or non-SvelteKit environments, dynamic imports may fail
		_privateEnv = {};
		_publicEnv = {};
	}
}

/**
 * Asynchronously retrieves an environment variable.
 * Checks platform.env → $env/dynamic/private → $env/dynamic/public → process.env
 */
export async function getEnvVarAsync(name: string): Promise<string | undefined> {
	// 1. Cloudflare platform bindings (most reliable on edge)
	if (_platformEnv !== null) {
		const val = _platformEnv[name];
		if (val !== undefined) return val;
	}

	// 2. SvelteKit dynamic env (lazy load)
	await loadSvelteEnvs();
	const privVal = _privateEnv?.[name];
	if (privVal !== undefined) return privVal;
	const pubVal = _publicEnv?.[name];
	if (pubVal !== undefined) return pubVal;

	// 3. process.env fallback (Node.js dev server)
	if (typeof process !== 'undefined' && process.env) {
		return process.env[name];
	}
	return undefined;
}

/**
 * Synchronously retrieves an environment variable from the pre-loaded cache.
 * Returns undefined if envs have not been loaded yet.
 * Use getEnvVarAsync() when in an async context for guaranteed results.
 */
export function getEnvVar(name: string): string | undefined {
	// 1. Cloudflare platform env (available synchronously after initPlatformEnv)
	if (_platformEnv !== null) {
		const val = _platformEnv[name];
		if (val !== undefined) return val;
	}
	// 2. Cached SvelteKit env (available after first async getEnvVarAsync call)
	if (_privateEnv !== null) {
		const val = _privateEnv[name];
		if (val !== undefined) return val;
	}
	if (_publicEnv !== null) {
		const val = _publicEnv[name];
		if (val !== undefined) return val;
	}
	// 3. process.env fallback
	if (typeof process !== 'undefined' && process.env) {
		return process.env[name];
	}
	return undefined;
}

/**
 * @deprecated Use initPlatformEnv() instead.
 * Kept for backward compatibility with existing call sites.
 */
export async function initEnvForRequest(): Promise<void> {
	await loadSvelteEnvs();
}
