import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import {
	getPublicRuntimeFlags,
	shouldBypassMaintenance,
	shouldProtectRegistration
} from '$lib/server/platformRuntime';
import { reportServerError } from '$lib/server/observability';
import { initPlatformEnv } from '$lib/server/safeEnv';

// ── Main Handle hook ───────────────────────────────────────────────
export const handle: Handle = async ({ event, resolve }) => {
	// ── CRITICAL: Prime env cache from Cloudflare platform bindings ──
	// On Cloudflare Workers, environment variables are passed via
	// event.platform.env — NOT via process.env or module-level imports.
	// We must initialize safeEnv with this object BEFORE any other code
	// attempts to read environment variables. This is the root cause fix
	// for the 500 internal error on Cloudflare Pages.
	initPlatformEnv(event.platform);

	const pathname = event.url.pathname;

	// URL Normalization — /platform/ → /platforms/ (SEO redirect)
	if (pathname.startsWith('/platform/') && !pathname.startsWith('/platforms/')) {
		const newPath = pathname.replace('/platform/', '/platforms/');
		throw redirect(301, newPath.endsWith('/') ? newPath.slice(0, -1) : newPath);
	}

	// Domain Standardization (SEO — canonical domain)
	const targetDomain = 'danjumaomaleogale.dev';
	if (
		event.url.hostname.startsWith('www.') &&
		!event.url.hostname.includes('localhost') &&
		!event.url.hostname.includes('pages.dev')
	) {
		const newUrl = new URL(event.url.href);
		newUrl.hostname = targetDomain;
		throw redirect(301, newUrl.toString());
	}

	const runtimeFlags = await getPublicRuntimeFlags();
	event.locals.runtimeFlags = runtimeFlags;

	if (runtimeFlags.maintenance_mode && !shouldBypassMaintenance(pathname)) {
		throw redirect(307, '/?maintenance=1');
	}

	if (!runtimeFlags.registration_open && shouldProtectRegistration(pathname)) {
		throw redirect(307, '/?registration=closed');
	}

	// Resolve request
	const response = await resolve(event);

	// Technical SEO Headers (AEO/GEO Integration)
	if (
		pathname.startsWith('/admin') ||
		pathname.startsWith('/dashboard') ||
		pathname.startsWith('/auth')
	) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
	} else {
		response.headers.set(
			'X-Robots-Tag',
			'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
		);
	}

	// Detect AI Agent User Agents (Observability)
	const userAgent = event.request.headers.get('user-agent')?.toLowerCase() || '';
	const isAIBot =
		/gptbot|claudebot|perplexitybot|google-extended|anthropic-ai|cohere-ai|applebot-extended/i.test(
			userAgent
		);
	if (isAIBot) {
		response.headers.set('X-AI-Bot-Detected', 'true');
	}

	// Security Headers
	const secHeaders: Record<string, string> = {
		'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
		'X-Frame-Options': 'SAMEORIGIN',
		'X-Content-Type-Options': 'nosniff',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
	};

	for (const [k, v] of Object.entries(secHeaders)) {
		response.headers.set(k, v);
	}

	// Cache static assets
	if (
		pathname.endsWith('.jpg') ||
		pathname.endsWith('.png') ||
		pathname.endsWith('.svg') ||
		pathname.endsWith('.webp')
	) {
		response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
	}

	return response;
};

// ── Error Handler ──────────────────────────────────────────────────
export const handleError: HandleServerError = ({ error, event }) => {
	const errorId = crypto.randomUUID();

	console.error('─── SERVER ERROR ───────────────────────────────');
	console.error(`ID:        ${errorId}`);
	console.error(`Timestamp: ${new Date().toISOString()}`);
	console.error(`Path:      ${event.url.pathname}`);
	console.error(`Error:     `, error);
	console.error('────────────────────────────────────────────────');

	void reportServerError(errorId, error, event);

	return {
		message: 'An unexpected error occurred. Please try again.',
		errorId
	};
};
